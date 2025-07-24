const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');
const APIError = require('../middleware/errorMiddleware').APIError;
const registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });
  if (!user) throw new APIError('No user found with that ID', 404);
  return {
    id: user.id,
    username: user.username,
    email: user.email
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new APIError('No user found with that ID', 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return {
    id: user.id,
    username: user.username,
    token: generateToken(user.id)
  };
};

const getAuthUser = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { 
      exclude: ['password'],
      include: ['id', 'username', 'email']
    }
  });

  if (!user) {
    throw new APIError('User not found', 404);
  }

  return user;
};


module.exports = { registerUser, loginUser,getAuthUser };