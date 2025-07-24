const { isCelebrateError } = require('celebrate');
const { Sequelize } = require('sequelize');

/**
 * Custom API Error Class
 */
class APIError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handler
 */
const errorHandler = (err, req, res, next) => {
  // Default values for unexpected errors
  err.statusCode = err.statusCode || 500;
  err.status = err.statusCode >= 500 ? 'error' : 'fail';

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.error('💥 ERROR STACK:', err.stack);
    console.error('💥 ERROR DETAILS:', {
      message: err.message,
      statusCode: err.statusCode,
      path: req.path,
      method: req.method,
      body: req.body
    });
  }

  // Handle specific error types
  let error = { ...err };
  error.message = err.message;

  // Celebrate validation errors
  if (isCelebrateError(err)) {
    const details = [];
    for (const [segment, joiError] of err.details.entries()) {
      details.push(...joiError.details.map(d => d.message));
    }
    error = new APIError('Validation failed', 400, details);
  }

  // Sequelize errors
  else if (err instanceof Sequelize.ValidationError) {
    error = new APIError('Database validation failed', 400, err.errors.map(e => e.message));
  }
  else if (err instanceof Sequelize.UniqueConstraintError) {
    error = new APIError('Duplicate field value', 400, err.errors.map(e => e.message));
  }
  else if (err instanceof Sequelize.DatabaseError) {
    error = new APIError('Database operation failed', 400);
  }

  // JWT errors
  else if (err.name === 'JsonWebTokenError') {
    error = new APIError('Invalid authentication token', 401);
  }
  else if (err.name === 'TokenExpiredError') {
    error = new APIError('Authentication token expired', 401);
  }

  // Send response
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message || 'Something went wrong',
    ...(error.details && { details: error.details }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * 404 Not Found handler
 */
const notFound = (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} on this server`, 404));
};

module.exports = {
  APIError,
  errorHandler,
  notFound
};