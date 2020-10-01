const { Router } = require('express')
const router = Router()
const { upload } = require('../helpers/init_multer')
const cart = require('../controllers/cart')
const auth = require('../controllers/auth')
const adress = require('../controllers/adress')
const rating = require('../controllers/rating')

// Profile
router.patch('/myaccount', upload.single('avatar', 1), auth.editUser)
router.post('/adress', adress.createAdress)
router.put('/adress/:id', adress.updateAdress)
router.put('/adress/:id', adress.updatePartAdress)
router.delete('/adress/:id', adress.deleteAdress)

// Cart Routes
router.post('/carts', cart.createCart)
router.get('/carts', cart.getCart)
router.delete('/carts/:id', cart.deleteCart)
router.put('/carts/:id', cart.UpdateTotalItem)

// Rating
router.post('/ratings/:id', rating.createRating)
router.patch('/ratings/:id', rating.updateRating)

module.exports = router
