const { Router } = require('express')
const router = Router()
const { upload } = require('../helpers/init_multer')
const item = require('../controllers/items')
const profile = require('../controllers/seller')

router.post('/storeprofile', profile.storeProfile)

// Items for Seller
router.post('/items', upload.array('picture'), item.createItem)
router.get('/items/:id', item.getDetailItem)
router.put('/items/:id', item.updateItem)
router.get('/items/:id', item.getDetailItem)
router.patch('/items/:id', item.updatePatrialItem)
router.delete('/items/:id', item.deleteItem)

module.exports = router
