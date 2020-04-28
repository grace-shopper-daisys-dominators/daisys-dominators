const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
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

Cart.prototype.add = async function(price) {
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

Cart.prototype.remove = async function(price) {
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

Cart.prototype.updateTotal = async function() {
  try {
    const orderId = this.orderId
    let cartsInOrder = await Cart.findAll({
      where: {orderId: orderId}
    })
    let newTotal = 0
    for (let key in cartsInOrder) {
      newTotal += cartsInOrder[key].price
    }
    await Cart.update({total: newTotal}, {where: {orderId: orderId}})
    await this.save()
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = Cart
