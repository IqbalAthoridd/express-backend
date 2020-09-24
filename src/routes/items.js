const { Router } = require('express')
const { upload } = require('../helpers/init_multer')

const { getDetailItem, getItem, updateItem, updatePatrialItem, deleteItem, createItem } = require('../controllers/items')

const router = Router()

router.post('/',  createItem)
router.get('/', getItem)
router.get('/:id', getDetailItem)
router.put('/:id', updateItem)
router.patch('/:id', updatePatrialItem)
router.delete('/:id', deleteItem)

module.exports = router
