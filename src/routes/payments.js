const router = require('express').Router()
const Payments = require('../controllers/payments')
const { upload } = require('../helpers/init_multer')

router.post('/', upload.single('picture'), Payments.createPayment)
router.patch('/:id', upload.single('picture'), Payments.updatePayment)
router.delete('/:id', Payments.deletePayment)
router.get('/', Payments.getPayment)

module.exports = router
