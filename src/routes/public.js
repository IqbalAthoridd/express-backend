const { Router } = require('express')
const router = Router()
const controller = require('../controllers/public')

router.get('/newItem', controller.newProducts)
router.get('/popular', controller.pupularProduct)
router.get('/details/:id', controller.detailProduct)
router.get('/category', controller.categoryList)
router.get('/category/:name', controller.searchCategory)

module.exports = router
