const Post = require('../models/Post'); // Assumes your model file is in 'models/Post.js'
const ErrorHandler = require('../utils/ErrorHandler');

// --- 1. CREATE a new post (Securely set the author) ---
// Route: POST /api/posts (protected by 'protect' middleware)
exports.createPost = async (req, res, next) => {
  try {
    // Extract title and content from the body
    const { title, content } = req.body;
    
    // **CRITICAL UPDATE:** Attach the author ID from the authenticated user (req.user)
    const post = await Post.create({
        title,
        content,
        author: req.user.id // <-- Securely set the owner's ID
    });
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// --- 2. READ all posts ---
// Route: GET /api/posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'username email');;
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// --- 3. READ a single post by ID ---
// Route: GET /api/posts/:id
exports.getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id) .populate({
        path: 'author', // The field to populate
        select: 'username email -_id' // INCLUDE username/email, EXCLUDE _id
        // Note: Use a '-' prefix to explicitly exclude a field (e.g., password)
    });;

    if (!post) {
      return next(new ErrorHandler('Post not found with that ID', 404));
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    // Handle invalid ID format (CastError)
    if (error.name === 'CastError') {
      return next(new ErrorHandler(`Invalid Post ID: ${req.params.id}`, 400));
    }
    next(new ErrorHandler(error.message, 500));
  }
};

// postController.js (UPDATED - updatePost)

// --- 4. UPDATE a post by ID (Add RBAC check) ---
exports.updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHandler('Post not found with that ID', 404));
    }
    
    // **RBAC and Ownership Check**
    // 1. Check if the user is NOT an admin AND NOT the owner of the post
    if (req.user.role !== 'admin' && post.author.toString() !== req.user.id.toString()) {
        // Forbidden if neither an admin nor the owner
        return next(new ErrorHandler('Forbidden: You lack the required permissions to modify this post.', 403));
    }

    // If the user is an admin OR they are the owner, proceed with update
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true 
    });

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    // ... existing error handling
    if (error.name === 'CastError') {
      return next(new ErrorHandler(`Invalid Post ID: ${req.params.id}`, 400));
    }
    if (error.name === 'ValidationError') {
      return next(new ErrorHandler(error.message, 400));
    }
    next(new ErrorHandler(error.message, 500));
  }
};

// --- 5. DELETE a post by ID (Add RBAC check) ---
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHandler('Post not found with that ID', 404));
    }
    
    // **RBAC and Ownership Check**
    // 1. Check if the user is NOT an admin AND NOT the owner of the post
    if (req.user.role !== 'admin' && post.author.toString() !== req.user.id.toString()) {
        // Forbidden if neither an admin nor the owner
        return next(new ErrorHandler('Forbidden: You lack the required permissions to delete this post.', 403));
    }

    // If the user is an admin OR they are the owner, proceed with deletion
    await post.deleteOne(); 

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    // ... existing error handling
    if (error.name === 'CastError') {
      return next(new ErrorHandler(`Invalid Post ID: ${req.params.id}`, 400));
    }
    next(new ErrorHandler(error.message, 500));
  }
};