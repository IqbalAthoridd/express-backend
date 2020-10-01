const { Router } = require('express')
const router = Router()
const { authRegister, authLogin, editUser, sellerRegister } = require('../controllers/auth')
const { upload } = require('../helpers/init_multer')
const { verifyAccessToken } = require('../middleware/auth')

router.post('/register', authRegister)
router.post('/seller/register', sellerRegister)
router.post('/login', authLogin)
router.patch('/myAccount', verifyAccessToken, upload.single('avatar', 1), editUser)

module.exports = router
