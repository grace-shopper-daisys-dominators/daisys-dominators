const router = require('express').Router()
const {Order, User, Order_Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    const orderProduct = await Order_Product.findByPk(req.params.id, {
      include: User
    })

    if (currentUser.id === orderProduct.user.id || currentUser.isAdmin) {
      res.json(orderProduct)
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
      const newOrderProduct = await Order_Product.create({
        productId: productId,
        quantity: 1,
        price: price,
        orderId: orderId,
        total: 0
      })

      if (newOrderProduct) {
        await Order_Product.updateTotal(orderId)

        let orderProduct = await Order_Product.findOne({
          where: {orderId, productId}
        })

        res.status(201).send(orderProduct)
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

    let orderProduct = await Order_Product.findOne({
      where: {orderId: orderId, productId: productId}
    })

    const {userId} = await Order.findByPk(orderId)

    if (userId === currentUser.id) {
      let result
      if (operation === 'add') {
        result = await orderProduct.add(price)
      } else if (operation === 'remove') {
        result = await orderProduct.remove(price)
      }

      if (result) {
        await Order_Product.updateTotal(orderId)

        orderProduct = await Order_Product.findOne({
          where: {orderId: orderId, productId: productId}
        })

        res.send(orderProduct)
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
      const deleted = await Order_Product.destroy({
        where: {orderId: orderId, productId: productId}
      })
      if (deleted > 0) {
        Order_Product.updateTotal(orderId)
        let newData = await Order_Product.findOne({where: {orderId: orderId}})
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
