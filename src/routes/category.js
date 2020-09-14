const { Router } = require('express')
const router = Router()

const { createCategory, getCategory, deleteCategory, getAllCategory, updateCategory } = require('../controllers/category')

router.post('/', createCategory)
router.get('/:id', getCategory)
router.delete('/:id', deleteCategory)
router.get('/', getAllCategory)
router.put('/:id', updateCategory)

module.exports = router
