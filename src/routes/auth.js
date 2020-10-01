const { Router } = require('express')
const router = Router()
const { authRegister, authLogin, editUser, sellerRegister, editSeller } = require('../controllers/auth')
const { upload } = require('../helpers/init_multer')
const { verifyAccessToken } = require('../middleware/auth')

router.post('/register', authRegister)
router.post('/seller/register', sellerRegister)
router.post('/seller/storeprofile', editSeller)
router.post('/login', authLogin)
router.patch('/myaccount', verifyAccessToken, upload.single('avatar', 1), editUser)

module.exports = router
