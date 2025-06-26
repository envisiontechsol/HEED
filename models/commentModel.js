const pool = require('../config/db');

const getAllComments = async () => {
  const res = await pool.query('SELECT * FROM comments');
  return res.rows;
};

const createComment = async (userId, blogId, commentsDesc, createdOn) => {
  const res = await pool.query(
    'INSERT INTO comments (user_id, blog_id, comments_desc, created_on) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, blogId, commentsDesc, createdOn]
  );
  return res.rows[0];
};

const updateComment = async (commentId, commentsDesc) => {
  const res = await pool.query(
    'UPDATE comments SET comments_desc = $1 WHERE comments_id = $2 RETURNING *',
    [commentsDesc, commentId]
  );
  return res.rows[0];
};

const deleteComment = async (commentId) => {
  await pool.query('DELETE FROM comments WHERE comments_id = $1', [commentId]);
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment
};
