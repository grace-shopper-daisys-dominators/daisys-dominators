const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
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

module.exports = Cart
