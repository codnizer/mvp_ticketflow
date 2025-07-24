const authService = require('../services/authService');
const { User } = require('../models');
const register = async (req, res,next) => {
  try {
    const user = await authService.registerUser(
      req.body.username,
      req.body.email,
      req.body.password
    );
    res.status(201).json(user);
  } catch (error) {
    next(error);
    
   /*  res.status(400).json({ message: error.message }); */
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authData = await authService.loginUser(email, password);
    
  res.cookie('token', authData.token, {
  httpOnly: true,
  secure: true, 
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  domain: 'localhost', 
  path: '/', 
});

   
    const { token, ...userData } = authData;
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      throw new APIError('Not authenticated', 401);
    }
    
    const user = await authService.getAuthUser(req.user.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login ,getCurrentUser,logout};