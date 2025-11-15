const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse
} = require('../controllers/courseController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes (require authentication)
router.post('/', authenticateToken, createCourse);

module.exports = router;