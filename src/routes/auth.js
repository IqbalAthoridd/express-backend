const { Router } = require('express')
const router = Router()
const { authRegister, authLogin, editUser } = require('../controllers/auth')
const { upload } = require('../helpers/init_multer')

router.post('/register', authRegister)
router.post('/login', authLogin)
router.patch('/myAccount/:id', upload.single('avatar', 1), editUser)

module.exports = router
