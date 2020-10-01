const { Router } = require('express')
const router = Router()
const { customerRegister, authLogin, sellerRegister } = require('../controllers/auth')

router.post('/customer/register', customerRegister)
router.post('/seller/register', sellerRegister)
router.post('/login', authLogin)

module.exports = router
