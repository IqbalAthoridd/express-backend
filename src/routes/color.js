const { Router } = require('express')
const router = Router()
const color = require('../controllers/color')

router.put('/:id', color.updateColors)
router.delete('/:id', color.deleteColor)

module.exports = router
