const { Router } = require('express')
const router = Router()
const { authRegister, authLogin, editUser } = require('../controllers/auth')
const { upload } = require('../helpers/init_multer')
const { verifyAccessToken } = require('../middleware/auth')

router.post('/register', upload.single('avatar', 1), authRegister)
router.post('/login', authLogin)
router.patch('/myAccount', verifyAccessToken, upload.single('avatar', 1), editUser)

module.exports = router
