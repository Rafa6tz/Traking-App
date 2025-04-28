const router = require('express').Router()
const userController = require('../controllers/userController')
const authenticate = require('../middlewares/auth')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/profile', authenticate, userController.profileUser)

module.exports = router