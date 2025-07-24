const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Import models
const User = require('./user.model')(sequelize, Sequelize.DataTypes);
const Ticket = require('./ticket.model')(sequelize, Sequelize.DataTypes);

// Set up associations
User.associate({ Ticket });
Ticket.associate({ User });

module.exports = {
  sequelize,
  User,
  Ticket
};