const { Router } = require('express')
const router = Router()

const { createCategory } = require('../controllers/category')

router.post('/', createCategory)

module.exports = router
