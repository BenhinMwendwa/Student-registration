const express = require('express');
const {
  registerStudent,
  loginStudent,
  getCurrentStudent
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Protected route (requires authentication)
router.get('/me', authenticateToken, getCurrentStudent);

module.exports = router;