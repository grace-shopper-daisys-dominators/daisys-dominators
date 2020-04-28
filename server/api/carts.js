const router = require('express').Router()
const {Order, User, Cart, Product} = require('../db/models')
module.exports = router
const sequelize = require('sequelize')

// router.get('/', async (req, res, next) => {
//   try {
//     let currentUser
//     if (req.user) {
//       currentUser = req.user.dataValues
//     } else {
//       currentUser = {}
//     }

//     if (currentUser.isAdmin) {
//       const carts = await Cart.findAll({include: Product})
//       res.json(carts)
//     } else {
//       res.status(401).send('Log in with admin account to view carts.')
//     }
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    const cart = Cart.findByPk(req.params.id, {include: User})

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

    let total = await Cart.findOne({
      where: {orderId: orderId}
    })

    if (currentUser.id === userId) {
      if (!total) {
        total = price * 1
      } else {
        total = total.total * 1 + price * 1
        Cart.update({total: total}, {where: {orderId: orderId}})
      }
      const newCart = await Cart.create({
        productId: productId,
        quantity: 1,
        price: price,
        orderId: orderId,
        total: total
      })

      if (newCart) {
        res.status(201).send(newCart)
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

// eslint-disable-next-line complexity
router.put('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {id: 1}
    }
    let cart = await Cart.findByPk(req.params.id)
    const {price, operation} = req.body
    const {orderId} = cart
    const {userId} = await Order.findByPk(orderId)

    if (userId === currentUser.id) {
      if (cart) {
        let newPrice
        let newQuantity
        let result

        if (operation === 'add') {
          newPrice = cart.price * 1 + price * 1
          newQuantity = cart.quantity + 1
          result = await Cart.update(
            {quantity: newQuantity, price: newPrice},
            {where: {id: req.params.id}}
          )
        } else if (operation === 'remove') {
          newPrice = cart.price * 1 - price * 1
          newQuantity = cart.quantity - 1
          if (newQuantity < 0) {
            res.send('Quantity cannot go below 0.')
          } else {
            result = await Cart.update(
              {quantity: newQuantity, price: newPrice},
              {where: {id: req.params.id}}
            )
          }
        }

        if (result) {
          cart = await Cart.findByPk(req.params.id)
          res.status(202).send(cart)
        } else {
          res.status(304).send('Failed to edit cart.')
        }
      } else {
        res.status(204).send('Item does not exist in cart')
      }
    } else {
      res.status(401).send('You may only edit your own cart.')
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
    const {orderId} = req.body

    const {userId} = await Order.findByPk(orderId)

    if (userId === currentUser.id) {
      const deleted = await Cart.destroy({where: {id: req.params.id}})
      if (deleted > 0) {
        res.status(204).send('Item successfully deleted.')
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
