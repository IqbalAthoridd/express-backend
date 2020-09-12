const { Router } = require('express')
const router = Router()

const { createCart, getCart, deleteCart } = require('../controllers/cart')

router.post('/', createCart)
router.get('/', getCart)
router.delete('/:id', deleteCart)

module.exports = router
