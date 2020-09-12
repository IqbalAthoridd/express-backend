const { Router } = require('express')
const router = Router()

const { authRegister, authLogin } = require('../controllers/auth')

router.post('/register', authRegister)
router.post('/login', authLogin)

module.exports = router
