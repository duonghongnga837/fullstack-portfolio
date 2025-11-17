// controllers/contactController.js
const Message = require('../models/Message');
const ErrorHandler = require('../utils/ErrorHandler');

// POST /api/contact - Submit contact form (Public)
exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newMessage
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// GET /api/contact - Get all messages (Protected - Admin only)
exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

