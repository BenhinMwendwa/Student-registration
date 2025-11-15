const jwt = require('jsonwebtoken');   // imports
const { Student } = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN // picks only the header token 

    if (!token) {    //if no token send anauthorized
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); /// verify the token
    const student = await Student.findByPk(decoded.id, {  // finds the student in DB
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