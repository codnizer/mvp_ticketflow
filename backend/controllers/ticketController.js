const ticketService = require('../services/ticketService');

const createTicket = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const ticket = await ticketService.createTicket(
      title,
      description,
      status,
      priority,
      req.user.id
    );
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTickets = async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    const tickets = await ticketService.getTicketsByUser(req.user.id, {
      ...(status && { status }),
      ...(priority && { priority })
    });
    res.json(tickets);
  } catch (error) {
    next(error);
  }
};


const updateTicket = async (req, res, next) => {
  try {
    const ticket = await ticketService.updateTicket(
      req.params.id,
      req.user.id,
      req.body
    );
    res.json(ticket);
  } catch (error) {
    next(error);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    await ticketService.deleteTicket(req.params.id, req.user.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const ticket = await ticketService.updateTicketStatus(
      req.params.id,
      req.user.id,
      req.body.status
    );
    res.json(ticket);
  } catch (error) {
    next(error);
  }
};
const getTicketById = async (req, res, next) => {
  try {
    const ticket = await ticketService.getTicketById(
      req.params.id,
      req.user.id
    );
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getTicketById,
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  updateStatus
};