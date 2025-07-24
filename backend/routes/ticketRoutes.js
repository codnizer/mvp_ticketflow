const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const ticketController = require('../controllers/ticketController');
const { rules, validate } = require('../utils/validation');
const { body } = require('express-validator');
router.use(protect);

router.get('/', ticketController.getTickets);
router.post('/', validate(rules.ticket), ticketController.createTicket);
router.get('/:id', ticketController.getTicketById); 
router.put('/:id', validate(rules.ticket), ticketController.updateTicket);
router.patch('/:id/status', 
  validate([
    body('status')
      .isIn(['todo', 'inprogress', 'done'])
      .withMessage('Invalid status')
  ]), 
  ticketController.updateStatus
);
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;