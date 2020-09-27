const { Router } = require('express')
const router = Router()
const condition = require('../controllers/condition')
router.post('/', condition.createCondition)

module.exports = router
