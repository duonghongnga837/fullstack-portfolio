const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler'); 
// asyncHandler wraps async middleware to handle errors easily

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

     try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token payload ID, but exclude the password field
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }
        
        // **Success!** Move to the next middleware/controller
        next(); 

    } catch (error) {
        // This handles expired, invalid signature, or other verification errors
        console.error("JWT Verification Error:", error.message); // <-- Add this line
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});

module.exports = { protect };