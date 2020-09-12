const { Router } = require('express')
const router = Router()

const { createCategory, getCategoryById } = require('../controllers/category')

router.post('/', createCategory)
router.get('/:id', getCategoryById)

module.exports = router
