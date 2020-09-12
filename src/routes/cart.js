const { Router } = require('express')
const router = Router()

const { createCart, getCart } = require('../controllers/cart')

router.post('/', createCart)
router.get('/', getCart)

module.exports = router
