const { Router } = require('express')
const router = Router()
const { upload } = require('../helpers/init_multer')

const { authRegister, authLogin, editUser } = require('../controllers/auth')

router.post('/register', upload.single('avatar',1), authRegister)
router.post('/login', authLogin)
router.patch('/myAccount/:id', editUser)

module.exports = router
