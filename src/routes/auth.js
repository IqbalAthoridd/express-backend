const { Router } = require('express')
const router = Router()
const { customerRegister, authLogin, sellerRegister, authResetPassword } = require('../controllers/auth')

router.post('/customer/register', customerRegister)
router.post('/seller/register', sellerRegister)
router.post('/login', authLogin)
router.post('/resetPassword', authResetPassword)

module.exports = router
