const { Router } = require('express')
const router = Router()
const { upload } = require('../helpers/init_multer')
const cart = require('../controllers/cart')
const auth = require('../controllers/customer')
const adress = require('../controllers/adress')
const rating = require('../controllers/rating')
const checkOut = require('../controllers/checkout')
const transaction = require('../controllers/transactions')

// Profile
router.patch('/myaccount', upload.single('avatar', 1), auth.myaccount)
router.post('/adress', adress.createAdress)
router.put('/adress/:id', adress.updateAdress)
router.put('/adress/:id', adress.updatePartAdress)
router.delete('/adress/:id', adress.deleteAdress)
router.get('/adress', adress.getAdress)
router.get('/adress/:id', adress.getById)
router.get('/profile', auth.profile)

// Cart Routes
router.post('/carts', cart.createCart)
router.get('/carts', cart.getCart)
router.delete('/carts/:id', cart.deleteCart)
router.put('/carts/:id', cart.UpdateTotalItem)

// Rating
router.post('/ratings/:id', rating.createRating)
router.patch('/ratings/:id', rating.updateRating)

// checkOut
router.post('/checkout', checkOut.createCheckout)

// transaction
router.post('/transaction', transaction.createTransaction)

module.exports = router
