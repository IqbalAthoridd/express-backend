const { Router, request } = require('express')
const router = Router()
const adress = require('../controllers/adress')

router.post('/', adress.createAdress)

module.exports = router
