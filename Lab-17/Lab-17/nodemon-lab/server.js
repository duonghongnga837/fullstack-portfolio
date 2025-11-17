// Load environment variables from .env file
require('dotenv').config();
const ErrorHandler = require('./utils/ErrorHandler'); 
const errorHandlerMiddleware = require('./middleware/error');
const connectDB = require('./utils/db'); // <-- 1. IMPORT IT HERE



const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const postRoutes = require('./routes/postRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for frontend
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes); // Keep old route for compatibility
app.use('/api/blog', blogRoutes); // New blog route with comments
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.use((req, res, next) => {
    // Create a new 404 error and pass it to the central handler
    next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});



// CENTRAL ERROR HANDLER: MUST BE THE LAST middleware!
app.use(errorHandlerMiddleware);

// --- Server Startup Logic ---
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 2. CALL IT HERE
    await connectDB();

    // 3. Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// 4. Run the app
startServer();






