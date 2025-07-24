const { Ticket } = require('../models');

const createTicket = async (title, description, status, priority, userId) => {
  return await Ticket.create({
    title,
    description,
    status,
    priority,
    user_id: userId
  });
};

const getTicketsByUser = async (userId, filters = {}) => {
  const where = { user_id: userId };
  
  // Apply filters if provided
  if (filters.status) where.status = filters.status;
  if (filters.priority) where.priority = filters.priority;

  return await Ticket.findAll({
    where,
    order: [['created_at', 'DESC']]
  });
};

const updateTicket = async (ticketId, userId, updateData) => {
  const [affectedRows] = await Ticket.update(updateData, {
    where: { id: ticketId, user_id: userId }
  });
  
  if (affectedRows === 0) {
    throw new Error('Ticket not found or not owned by user');
  }
  
  return await Ticket.findByPk(ticketId);
};

const deleteTicket = async (ticketId, userId) => {
  const affectedRows = await Ticket.destroy({
    where: { id: ticketId, user_id: userId }
  });
  
  if (affectedRows === 0) {
    throw new Error('Ticket not found or not owned by user');
  }
};

const updateTicketStatus = async (ticketId, userId, newStatus) => {
  return await updateTicket(ticketId, userId, { status: newStatus });
};

const getTicketById = async (ticketId, userId) => {
  const ticket = await Ticket.findOne({
    where: {
      id: ticketId,
      user_id: userId
    }
  });
  return ticket;
};

module.exports = {getTicketById, createTicket,updateTicket, getTicketsByUser,deleteTicket ,updateTicketStatus};