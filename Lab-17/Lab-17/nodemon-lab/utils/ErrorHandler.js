/**
 * Custom error class used to standardize error responses.
 * When thrown, it ensures a message and a status code are available 
 * for the central Express error handler.
 */
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Capture the stack trace to help with debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;