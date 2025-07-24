const { verifyToken } = require('../utils/jwtUtils');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error('Not authorized');

    const decoded = verifyToken(token);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = { protect };