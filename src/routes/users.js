const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', UserController.registerUser);
router.get('/profile', auth, UserController.getUserProfile);
router.put('/profile', auth, UserController.updateUserProfile);

module.exports = router;