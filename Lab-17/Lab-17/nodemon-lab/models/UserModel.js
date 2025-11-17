// models/UserModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    // **NEW FIELD FOR RBAC**
    role: {
        type: String,
        enum: ['user', 'admin'], // Restricts values to 'user' or 'admin'
        default: 'user' // Most users start as a regular user
    }
}, { timestamps: true });

// Mongoose Pre-Save Middleware: Hash password BEFORE saving to DB
UserSchema.pre('save', async function (next) {
    // Only hash if the password field has been modified (e.g., on registration)
    if (!this.isModified('password')) { 
        return next();
    }
    
    // Generate salt and hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
});

// Custom method to compare the entered password with the stored hash
UserSchema.methods.matchPassword = async function (enteredPassword) {
    // 'this.password' is the stored hash (retrieved specially for login)
    return await bcrypt.compare(enteredPassword, this.password); 
};

module.exports = mongoose.model('User', UserSchema);