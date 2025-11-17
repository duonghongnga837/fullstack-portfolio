const express = require('express');
const router = require('express').Router(); 
const { 
    getAllPosts, 
    createPost, 
    getSinglePost, 
    updatePost, 
    deletePost 
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import here!


// Define routes using the router object
router.get('/', getAllPosts);        // GET /
router.post('/',protect, createPost);        // POST /
router.get('/:id', getSinglePost);   // GET /:id
router.put('/:id',protect, updatePost);      // PUT /:id
router.delete('/:id',protect, deletePost);  // DELETE /:id

module.exports = router; // Export the router