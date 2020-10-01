const { Router } = require('express')
const router = Router()
const controller = require('../controllers/public')

router.get('/newItem', controller.newProducts)
router.get('/details/:id', controller.detailProduct)

module.exports = router
