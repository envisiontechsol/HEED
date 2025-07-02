const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyAccessToken = require('../middleware/authMiddleware'); 

//anyone can view comments
router.get('/', commentController.getAllComments);

//Protected
router.post('/', verifyAccessToken, commentController.createComment);
router.put('/:commentId', verifyAccessToken, commentController.updateComment);
router.delete('/:commentId', verifyAccessToken, commentController.deleteComment);

module.exports = router;
