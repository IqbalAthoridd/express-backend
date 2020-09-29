const { Router } = require('express')
const router = Router()
const { upload } = require('../helpers/init_multer')

const { createCategory, getCategory, deleteCategory, getAllCategory, updateCategory } = require('../controllers/category')

router.post('/', upload.single('avatar', 1), createCategory)
router.get('/:id', getCategory)
router.delete('/:id', deleteCategory)
router.get('/', getAllCategory)
router.put('/:id', updateCategory)

module.exports = router
