const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllBlogs);
router.get('/:blogId', blogController.getBlogById);
router.post('/', blogController.createBlog);
router.put('/:blogId', blogController.updateBlog);
router.delete('/:blogId', blogController.deleteBlog);

module.exports = router;
