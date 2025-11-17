// controllers/userController.js
const User = require('../models/UserModel');
const ErrorHandler = require('../utils/ErrorHandler'); // Assume we use the custom error handler
const generateToken = require('../utils/generateToken');


exports.registerUser = async (req, res, next) => {
    try {
        // The req.body contains username, email, and plaintext password
        const { username, email, password, role } = req.body; // <-- ADD 'role' here
        // Mongoose pre-save hook handles the hashing automatically!
        const newUser = await User.create({ username, email, password, role });

        // IMPORTANT: Add _id and role to the response for the client to use
        res.status(201).json({
            success: true,
            user: { 
                _id: newUser._id, // Added: Client needs the ID for context
                username: newUser.username, 
                email: newUser.email,
                role: newUser.role, // Added: Essential for client-side RBAC checks
                token: generateToken(newUser._id), // Optional but often included for immediate use
            }
        });

    } catch (error) {
        // ... error handling remains the same
        if (error.code === 11000) { 
            return next(new ErrorHandler('User with this email or username already exists', 400));
        }
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Find user, forcing Mongoose to include the password hash
    const user = await User.findOne({ email }).select('+password');

    // 2. Check if user exists AND if the password matches the hash
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            success: true,
            _id: user._id,
            email: user.email,
            role: user.role, // Added: Crucial for client-side RBAC
            // 3. Generate the token and send it back to the client
            token: generateToken(user._id), 
        });
    } else {
        // 4. Reject with a generic 401 Unauthorized error
        return next(new ErrorHandler('Invalid email or password', 401)); 
    }
};

