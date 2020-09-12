const { Router } = require('express')
const router = Router()

const { createCategory, getCategoryById, deleteCategoryById } = require('../controllers/category')

router.post('/', createCategory)
router.get('/:id', getCategoryById)
router.delete('/:id' , deleteCategoryById)

module.exports = router
