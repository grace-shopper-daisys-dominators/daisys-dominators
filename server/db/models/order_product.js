const Sequelize = require('sequelize')
const db = require('../db')

const Order_Product = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.INTEGER
  }
})

Order_Product.prototype.add = async function(price) {
  try {
    this.quantity++
    this.price = this.price * 1 + price * 1
    await this.save()
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

Order_Product.prototype.remove = async function(price) {
  try {
    if (this.quantity > 1) {
      this.quantity--
      this.price = this.price * 1 - price * 1
      await this.save()
      return true
    } else {
      return false
    }
  } catch (err) {
    console.error(err)
    return false
  }
}

Order_Product.updateTotal = async function(orderId) {
  try {
    let cartsInOrder = await Order_Product.findAll({
      where: {orderId: orderId}
    })
    let newTotal = 0
    for (let key in cartsInOrder) {
      newTotal += cartsInOrder[key].price
    }
    await Order_Product.update({total: newTotal}, {where: {orderId: orderId}})
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = Order_Product
