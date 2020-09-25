const { Router } = require('express')
const router = Router()
const controller = require('../controllers/public')

router.get('/newItem', controller.newProducts)

module.exports = router
