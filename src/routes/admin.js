const { Router } = require('express')
const router = Router()
const { upload } = require('../helpers/init_multer')
const category = require('../controllers/category')

router.post('/category', upload.single('avatar', 1), category.createCategory)
router.get('/category/:id', category.getCategory)
router.delete('/category/:id', category.deleteCategory)
router.get('/category', category.getAllCategory)
router.put('/category/:id', category.updateCategory)

module.exports = router
