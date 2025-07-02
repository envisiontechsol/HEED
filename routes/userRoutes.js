const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyAccessToken = require('../middleware/authMiddleware'); 

// Public
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);


//Protected
router.put('/:userId', verifyAccessToken, userController.updateUser);
router.delete('/:userId', verifyAccessToken, userController.deleteUser);

module.exports = router;
