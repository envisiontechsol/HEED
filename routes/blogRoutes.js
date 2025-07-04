const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const verifyAccessToken = require('../middleware/authMiddleware'); 

//public
router.get('/', blogController.getAllBlogs);
router.get('/:blogId', blogController.getBlogById);

//Protected
router.post('/', verifyAccessToken, blogController.createBlog);
router.put('/:blogId', verifyAccessToken, blogController.updateBlog);
router.delete('/:blogId', verifyAccessToken, blogController.deleteBlog);

module.exports = router;
