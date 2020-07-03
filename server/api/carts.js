const router = require('express').Router()
const {Order, User, Cart, Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    const cart = await Cart.findByPk(req.params.id, {include: User})

    if (currentUser.id === cart.user.id || currentUser.isAdmin) {
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // Assume this route will only be activated once front end has already checked to make sure that the item is not already present in the cart - in that case, they will send a put request instead.

    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    const {productId, orderId, price} = req.body

    const {userId} = await Order.findByPk(orderId)

    if (currentUser.id === userId) {
      const newCart = await Cart.create({
        productId: productId,
        quantity: 1,
        price: price,
        orderId: orderId,
        total: 0
      })

      if (newCart) {
        await Cart.updateTotal(orderId)

        let cart = await Cart.findOne({where: {orderId, productId}})

        res.status(201).send(cart)
      } else {
        res.status(204).send('Failed to add item.')
      }
    } else {
      res.status(401).send('You can only add items to your own cart.')
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
    const {price, operation, productId} = req.body

    const orderId = req.params.id

    let cart = await Cart.findOne({
      where: {orderId: orderId, productId: productId}
    })

    const {userId} = await Order.findByPk(orderId)

    if (userId === currentUser.id) {
      let result
      if (operation === 'add') {
        result = await cart.add(price)
      } else if (operation === 'remove') {
        result = await cart.remove(price)
      }

      if (result) {
        await Cart.updateTotal(orderId)

        cart = await Cart.findOne({
          where: {orderId: orderId, productId: productId}
        })

        res.send(cart)
      } else {
        res.status(304).send('Failed to edit cart.')
      }
    } else {
      res.status(401).send('You may only edit your own cart.')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }
    const {orderId, productId} = req.params

    const {userId} = await Order.findByPk(orderId)

    if (userId === currentUser.id) {
      const deleted = await Cart.destroy({
        where: {orderId: orderId, productId: productId}
      })
      if (deleted > 0) {
        Cart.updateTotal(orderId)
        let newData = await Cart.findOne({where: {orderId: orderId}})
        let total = 0
        if (newData) {
          total = newData.total
        }
        res.send(200)
      } else {
        res.status(304).send('Failed to delete item.')
      }
    } else {
      res.status(401).send('You may only delete items from your own cart.')
    }
  } catch (err) {
    next(err)
  }
})
