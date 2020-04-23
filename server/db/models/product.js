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
      'https://assets.epicurious.com/photos/5ad4bae8c5c3140bdf98db71/16:9/w_2560%2Cc_limit/1203-GT-WN01-01.jpg'
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
    //IN PENNIES!!!!!!!
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
