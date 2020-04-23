const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    if (currentUser.isAdmin) {
      const orders = await Order.findAll({include: User})
      res.json(orders)
    } else {
      res.status(401).send('Log in as an admin to view all orders.')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/me', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {id: -1}
    }

    const orders = await Order.findAll(
      {where: {userId: currentUser.id}},
      {include: User}
    )
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
