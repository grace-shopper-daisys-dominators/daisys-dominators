const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Find out where logged in user is stored for isAdmin function!!

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
