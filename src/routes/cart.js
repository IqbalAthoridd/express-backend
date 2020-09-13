const { Router } = require('express')
const router = Router()

const { createCart, getCart, deleteCart, UpdateTotalItem } = require('../controllers/cart')

router.post('/', createCart)
router.get('/:id', getCart)
router.delete('/:id', deleteCart)
router.put('/:id', UpdateTotalItem)

module.exports = router
