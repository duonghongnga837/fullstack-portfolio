/**
 * Centralized error handler middleware.
 * This runs when an error is passed via next(error).
 */
const errorHandlerMiddleware = (err, req, res, next) => {
    // Use the status code from the error object, or default to 500
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // In a real application, you'd add logic here to handle specific 
    // Mongoose errors (e.g., CastError, ValidationError) and assign 400 status.

    // Send the final, consistent JSON response
    res.status(err.statusCode).json({
        success: false,
        status: err.statusCode,
        message: err.message,
        // (Optional) Include stack trace only in development environment
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, 
    });
};

module.exports = errorHandlerMiddleware;