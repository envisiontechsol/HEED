const pool = require('../config/db');


const getAllBlogs = async () => {
  const res = await pool.query('SELECT * FROM blogs');
  return res.rows;
};

const getBlogById = async (blogId) => {
  const res = await pool.query('SELECT * FROM blogs WHERE blog_id=$1', [blogId]);
  return res.rows[0];
};

const createBlog = async (userId, blogTitle, blogDesc, imageUrl, createdOn) => {
  const res = await pool.query(
    'INSERT INTO blogs (user_id, blog_title, blog_desc, image_url, created_on) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [userId, blogTitle, blogDesc, imageUrl, createdOn]
  );
  return res.rows[0];
};

const updateBlog = async (blogId, blogTitle, blogDesc, imageUrl) => {
  const res = await pool.query(
    'UPDATE blogs SET blog_title=$1, blog_desc=$2, image_url=$3 WHERE blog_id=$4 RETURNING *',
    [blogTitle, blogDesc, imageUrl, blogId]
  );
  return res.rows[0];
};

const deleteBlog = async (blogId) => {
  await pool.query('DELETE FROM blogs WHERE blog_id=$1', [blogId]);
};

module.exports = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
