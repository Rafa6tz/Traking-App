const router = require('express').Router()
const supplierController = require('../controllers/supplierController')
const authenticate = require('../middlewares/auth')

router.post('/suppliers', authenticate, supplierController.createSupplier)
router.get('/suppliers', authenticate, supplierController.getSuppliers)
router.put('/suppliers/:id', authenticate, supplierController.updateSupplier)
router.delete('/suppliers/:id', authenticate, supplierController.deleteSupplier)


module.exports = router