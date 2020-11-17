const { Router } = require('express')
const router = Router()
const adress = require('../controllers/adress')

router.post('/', adress.createAdress)
router.put('/:id', adress.updateAdress)
router.patch('/:id', adress.updatePartAdress)
router.delete('/:id', adress.deleteAdress)

module.exports = router
