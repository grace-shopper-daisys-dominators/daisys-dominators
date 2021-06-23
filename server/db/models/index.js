const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Order_Product = require('./order_product')

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, {through: Order_Product})
Product.belongsToMany(Order, {through: Order_Product})
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  Order_Product
}
