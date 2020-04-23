const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    if (currentUser.isAdmin) {
      const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
      })
      res.json(users)
    } else {
      res.status(401).send('Log in to admin account to view user data.')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }
    const id = req.params.id

    if (currentUser.isAdmin) {
      const user = await User.findByPk(id, {
        attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
      })
      res.json(user)
    } else {
      res.status(401).send('Log in to admin account to view user data.')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body
    // **Destructuring the body SHOULD prevent user from setting isAdmin to true upon user creation; isAdmin should only be able to be modified by another admin.
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    if (newUser) {
      res.status(201).send(newUser)
    } else {
      res.status(500).send('Unable to create user.')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const currentUser = req.user.dataValues
    const id = req.params.id

    const {firstName, lastName, email, password, isAdmin} = req.body
    const reqBody = {firstName, lastName, email, password, isAdmin}
    let productObj = {}

    for (let key in reqBody) {
      if (reqBody[key]) productObj[key] = reqBody[key]
    }

    if (currentUser.isAdmin) {
      const updatedUser = await User.update(productObj, {where: {id: id}})
      if (updatedUser > 0) {
        res.send('Update successful!')
      } else {
        throw new Error('Update failed.')
      }
    } else {
      res.status(401).send('Log in to admin account to edit users.')
    }
  } catch (err) {
    next(err)
  }
})
