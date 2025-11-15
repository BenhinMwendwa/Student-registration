const jwt = require('jsonwebtoken');
const { Student } = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - student not found'
      });
    }

    req.student = student; // Add student to request object
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

module.exports = { authenticateToken };