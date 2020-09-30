const { Router } = require('express')
const router = Router()
const adress = require('../controllers/adress')

router.post('/', adress.createAdress)
router.put('/:id', adress.updateAdress)
router.put('/:id', adress.updatePartAdress)

module.exports = router
