const router = require('express').Router()
const clientController = require('../controllers/clientController')
const authenticate = require('../middlewares/auth')

router.post('/clients', authenticate, clientController.createClient)
router.get('/clients', authenticate, clientController.getClients)
router.put('/clients/:id', authenticate, clientController.updateClient)
router.delete('/clients/:id', authenticate, clientController.deleteClient)


module.exports = router