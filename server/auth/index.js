const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router
const {Order} = require('../db/models')

router.post('/login', async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({where: {email: email}})
    if (!user) {
      console.log('No such user found:', email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body
  try {
    const newUser = await User.create({firstName, lastName, email, password})
    req.login(newUser, err => (err ? next(err) : res.json(newUser)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {status: 'pending', userId: req.user.id}
    })
    req.user.dataValues.orderId = order.id
    res.json(req.user)
  } catch (err) {
    console.log(err)
  }
})

router.use('/google', require('./google'))
