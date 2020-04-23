const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log(req)
    const id = req.params.id
    const product = await Product.findByPk(id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, color, description, price} = req.body
    const productObj = {name, color, description, price}
    const {imageURL, region, size, year, rating} = req.body
    const optionals = {imageURL, region, size, year, rating}

    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    for (let key in optionals) {
      if (optionals[key]) productObj[key] = optionals[key]
    }

    if (currentUser.isAdmin) {
      const newProduct = await Product.create(productObj)

      if (newProduct) {
        res.status(201).send(newProduct)
      } else {
        res.status(500).send('Unable to create product.')
      }
    } else {
      res.status(401).send('Log in with admin account to add products.')
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

    const id = req.params.id

    const {
      name,
      color,
      description,
      price,
      imageURL,
      region,
      size,
      year,
      rating
    } = req.body
    const reqBody = {
      name,
      color,
      description,
      price,
      imageURL,
      region,
      size,
      year,
      rating
    }
    let productObj = {}

    for (let key in reqBody) {
      if (reqBody[key]) productObj[key] = reqBody[key]
    }

    if (currentUser.isAdmin) {
      const updatedProduct = await Product.update(productObj, {where: {id: id}})
      if (updatedProduct) {
        res.send('Update successful!')
      } else {
        throw new Error('Update failed.')
      }
    } else {
      res.status(401).send('Log in with admin account to edit products.')
    }
  } catch (err) {
    next(err)
  }
})
