const router = require('express').Router();

// Controllers
const userController = require('../controllers/user.controller');

// Middlewares
const { userAuth, userPermission } = require('../middlewares/auth');




// ==== Routes ====

router.post('/register-user', userController.registerUser);
router.post('/login', userController.login);
router.delete('/logout', userAuth, userController.logout);
router.get('/get-profile', userAuth, userPermission(['user', 'admin']), userController.getProfile);





module.exports = router 