const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'completed', 'credit card declined']
  }
})

module.exports = Order

Order.getCart = async function(userId) {
  try {
    const cart = await this.findOne({
      where: {
        userId,
        status: 'pending'
      },
      include: Product
    })
    cart.dataValues.products = cart.dataValues.products.map(product => {
      product.dataValues.quantity = product.dataValues.order_product.quantity
      product.dataValues.total = product.dataValues.order_product.total

      return product
    })
    console.log(cart.products)

    return cart
  } catch (err) {
    console.error(err)
  }
}
