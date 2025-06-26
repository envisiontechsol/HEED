const commentModel = require('../models/commentModel');

const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.getAllComments();
    res.json(comments);
  } catch (err) {
    console.error('getAllComments Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createComment = async (req, res) => {
  try {
    const { userId, blogId, commentsDesc, createdOn } = req.body;
    const newComment = await commentModel.createComment(userId, blogId, commentsDesc, createdOn);
    res.json(newComment);
  } catch (err) {
    console.error('createComment Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { commentsDesc } = req.body;

    const updatedComment = await commentModel.updateComment(commentId, commentsDesc);
    res.json(updatedComment);
  } catch (err) {
    console.error('updateComment Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    await commentModel.deleteComment(req.params.commentId);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error('deleteComment Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};
