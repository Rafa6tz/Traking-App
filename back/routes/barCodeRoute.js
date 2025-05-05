const router = require('express').Router()
const barCodeController = require('../controllers/barCodeController')
const authenticate = require('../middlewares/auth')

router.post('/barcodes', authenticate, barCodeController.createBarCode)
router.get('/barcodes', authenticate, barCodeController.getBarCodes)
router.delete('/barcodes/:id', authenticate, barCodeController.deleteBarCode)

module.exports = router