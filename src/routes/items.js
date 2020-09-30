const { Router } = require('express')
const { getDetailItem, getItem, updateItem, updatePatrialItem, deleteItem, createItem } = require('../controllers/items')
const { upload } = require('../helpers/init_multer')

const router = Router()

router.post('/', upload.array('picture'), createItem)
router.get('/', getItem)
router.get('/:id', getDetailItem)
router.put('/:id', updateItem)
router.patch('/:id', updatePatrialItem)
router.delete('/:id', deleteItem)

module.exports = router
