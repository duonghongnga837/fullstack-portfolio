// routes/blogRoutes.js
const router = require('express').Router();
const { 
  getAllPosts, 
  createPost, 
  getSinglePost, 
  updatePost, 
  deletePost 
} = require('../controllers/postController');
const { getCommentsByPost, createComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Blog post routes
router.get('/', getAllPosts);
router.post('/', protect, createPost);
router.get('/:id', getSinglePost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

// Comment routes
router.get('/:postId/comments', getCommentsByPost);
router.post('/:postId/comments', protect, createComment);

module.exports = router;

