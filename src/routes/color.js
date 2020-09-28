const { Router } = require('express')
const router = Router()
const color = require('../controllers/color')

router.put('/:id', color.updateColors)

module.exports = router
