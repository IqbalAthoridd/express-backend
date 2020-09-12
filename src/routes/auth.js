const { Router } = require('express')
const router = Router()

const { authRegister } = require('../controllers/auth')

router.post('/register', authRegister)

module.exports = router
