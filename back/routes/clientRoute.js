const router = require('express').Router()
const clientController = require('../controllers/clientController')
const authenticate = require('../middlewares/auth')

router.post('/clients', authenticate, clientController.createClient)
router.get('/clients', authenticate, clientController.getClients)


module.exports = router