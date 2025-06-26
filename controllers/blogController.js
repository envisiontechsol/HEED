const blogModel = require('../models/blogModel');

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.getAllBlogs();
    res.json(blogs);
  } catch (err) {
    console.error('getAllBlogs Error:', err);
    res.status(500).json({ error: 'Internal Server Error at getallblogs' });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await blogModel.getBlogById(req.params.blogId);
    res.json(blog);
  } catch (err) {
    console.error('getBlogById Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createBlog = async (req, res) => {
  try {
    const { userId, blogTitle, blogDesc, imageUrl, createdOn } = req.body;
    const newBlog = await blogModel.createBlog(userId, blogTitle, blogDesc, imageUrl, createdOn);
    res.json(newBlog);
  } catch (err) {
    console.error('createBlog Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { blogTitle, blogDesc, imageUrl } = req.body;
    const updatedBlog = await blogModel.updateBlog(
      req.params.blogId,
      blogTitle,
      blogDesc,
      imageUrl
    );
    res.json(updatedBlog);
  } catch (err) {
    console.error('updateBlog Error:', err);
    res.status(500).json({ error: 'Internal Server Error at updateBlog' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await blogModel.deleteBlog(req.params.blogId);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    console.error('deleteBlog Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
