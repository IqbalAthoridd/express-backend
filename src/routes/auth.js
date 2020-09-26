const { Router } = require('express')
const router = Router()
const { authRegister, authLogin, editUser } = require('../controllers/auth')

router.post('/register', authRegister)
router.post('/login', authLogin)
router.patch('/myAccount/:id', editUser)

module.exports = router
