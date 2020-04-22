const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'completed', 'credit card declined']
  }
})

module.exports = Order
