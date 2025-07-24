const {body, validationResult } = require('express-validator');
const { APIError } = require('../middleware/errorMiddleware');

/**
 * Validation middleware wrapper
 */
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMessages = errors.array().map(err => err.msg);
    throw new APIError(`Validation failed: ${errorMessages.join(', ')}`, 400);
  };
};

/**
 * Common validation rules
 */
const rules = {
  register: [
    body('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
    body('password')
      .trim()
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  login: [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
    body('password')
      .trim()
      .notEmpty().withMessage('Password is required')
  ],
  ticket: [
    body('title')
      .trim()
      .notEmpty().withMessage('Title is required')
      .isLength({ max: 100 }).withMessage('Title too long'),
    body('description')
      .trim()
      .optional()
      .isLength({ max: 500 }).withMessage('Description too long'),
    body('status')
      .isIn(['todo', 'inprogress', 'done']).withMessage('Invalid status'),
    body('priority')
      .isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
  ],
  ticketUpdate: [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ max: 100 }).withMessage('Title too long'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description too long'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
]
};

module.exports = {
  validate,
  rules
};