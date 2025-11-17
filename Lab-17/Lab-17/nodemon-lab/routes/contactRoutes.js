// routes/contactRoutes.js
const router = require('express').Router();
const { submitContactForm, getAllMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.post('/', submitContactForm);

// Protected route (admin only)
router.get('/', protect, getAllMessages);

module.exports = router;

