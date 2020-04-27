const router = require('express').Router()
const {Order, Product} = require('../db/models')
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
      const orders = await Order.findAll({
        include: [
          {
            model: Product
          }
        ]
      })
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
      currentUser = {id: 0}
    }

    if (currentUser.id) {
      const orders = await Order.findAll({
        where: {userId: currentUser.id},
        include: Product
      })
      res.json(orders)
    } else {
      res.send('Log in to view your orders.')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {id: -1}
    }

    const order = await Order.findByPk(req.params.id, {include: Product})

    if (currentUser.id === order.userId || currentUser.isAdmin) {
      res.json(order)
    } else {
      res.send("Only admins can view other people's orders.")
    }
  } catch (err) {
    next(err)
  }
})

router.get('/me/current', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    if (currentUser.id) {
      const cart = await Order.findAll({
        where: {status: 'pending', userId: currentUser.id},
        include: Product
      })

      res.json(cart)
    } else {
      res.send('Log in to view your cart.')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let currentUserId
    if (req.user) {
      currentUserId = req.user.dataValues.id
    } else {
      currentUserId = 0
    }

    if (currentUserId) {
      const productObj = {status: 'pending', userId: currentUserId}

      const newOrder = await Order.create(productObj)
      if (newOrder) {
        res.status(201).send(newOrder)
      } else {
        res.status(304).send('Failed to create order.')
      }
    } else {
      res.status(304).send('Log in to create an order.')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    const order = await Order.findByPk(req.params.id)

    if (currentUser.id === order.userId || currentUser.isAdmin) {
      const {status} = req.body

      const updateOrder = await Order.update(
        {status},
        {where: {id: req.params.id}}
      )

      if (updateOrder) {
        res.status(202).send('Order updated!')
      } else {
        res.status(304).send('Failed to update order.')
      }
    } else {
      res.status(304).send('Log in to update your orders.')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    const order = await Order.findByPk(req.params.id)

    if (currentUser.id === order.userId || currentUser.isAdmin) {
      const deleteOrder = await Order.destroy({where: {id: req.params.id}})

      if (deleteOrder) {
        res.status(204).send('Order deleted.')
      } else {
        res.status(304).send('Failed to delete order.')
      }
    } else {
      res.status(304).send('Log in to delete orders.')
    }
  } catch (err) {
    next(err)
  }
})
