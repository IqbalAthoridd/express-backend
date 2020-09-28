const { Router } = require('express')
const router = Router()
const role = require('../controllers/role')

router.post('/', role.createRole)
router.put('/:id', role.editRole)
router.delete('/:id', role.deleteRole)

module.exports = router
