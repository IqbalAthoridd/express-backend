const { Router } = require('express')
const router = Router()
const color = require('../controllers/color')

router.post('/', color.updateColors)

module.exports = router
