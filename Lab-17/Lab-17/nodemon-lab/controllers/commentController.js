// controllers/commentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const ErrorHandler = require('../utils/ErrorHandler');

// GET /api/blog/:postId/comments - Get all comments for a post (Public)
exports.getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// POST /api/blog/:postId/comments - Create a comment (Protected)
exports.createComment = async (req, res, next) => {
  try {
    const { body } = req.body;
    const postId = req.params.postId;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return next(new ErrorHandler('Post not found', 404));
    }

    const comment = await Comment.create({
      body,
      author: req.user.id,
      post: postId
    });

    // Populate author info before sending response
    await comment.populate('author', 'username email');

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

