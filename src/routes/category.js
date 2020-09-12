const { Router } = require('express')
const router = Router()

const { createCategory, getCategoryById, deleteCategoryById, getAllCategory } = require('../controllers/category')

router.post('/', createCategory)
router.get('/:id', getCategoryById)
router.delete('/:id', deleteCategoryById)
router.get('/', getAllCategory)

module.exports = router
