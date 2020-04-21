const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Find out where logged in user is stored for isAdmin function!!

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body
    // **Destructuring the body SHOULD prevent user from setting isAdmin to true upon user creation; isAdmin should only be able to be modified by another admin.
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    if (newUser) {
      res.status(201).send(newUser)
    } else {
      res.status(500).send('Unable to create user.')
    }
  } catch (err) {
    next(err)
  }
})
