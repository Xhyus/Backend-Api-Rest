const Controller = require('./controller')
const express = require('express')
const auth = require('../middlewares/auth.js')
const validateBody = require('../middlewares/validateBody')
const createUserDTO = require('./dto/createUserDTO')

const router = express.Router()

router.post('/user', validateBody(createUserDTO), auth, Controller.createUser)
router.get('/users', auth, Controller.getUsers)
router.post('/login', Controller.login)

module.exports = router