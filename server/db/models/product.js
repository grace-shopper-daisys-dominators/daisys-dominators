const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/g/e/generic-red.png'
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  region: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  size: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  year: {
    type: Sequelize.STRING,
    defaultValue: 'Unknown'
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Product
