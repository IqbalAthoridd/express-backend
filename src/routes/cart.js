const { Router } = require('express')
const router = Router()

const { createCart } = require('../controllers/cart')

router.post('/', createCart)

module.exports = router
