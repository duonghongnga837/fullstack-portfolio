// routes/userRoutes.js
const router = require('express').Router();
const userController = require('../controllers/userController');

// Define the registration endpoint
router.post('/register', userController.registerUser);

// New Login route
router.post('/login', userController.loginUser); // Connects to the new function
module.exports = router;