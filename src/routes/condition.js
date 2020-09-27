const { Router } = require('express')
const router = Router()
const condition = require('../controllers/condition')

router.post('/', condition.createCondition)
router.put('/:id', condition.editCondition)
router.delete('/:id', condition.deleteCondition)
router.get('/', condition.getCondition)

module.exports = router
