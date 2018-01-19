const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

router.get('/users', userController.getAll)
router.get('/users/:id', userController.getOne)
router.post('/users', userController.create)
router.patch('/users/:id', userController.update)

module.exports = router