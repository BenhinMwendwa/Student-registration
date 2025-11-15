const express = require('express');
const {
  enrollInCourse,
  getStudentCourses,
  dropCourse
} = require('../controllers/enrollmentController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All enrollment routes require authentication
router.use(authenticateToken);

router.post('/enroll', enrollInCourse);
router.get('/my-courses', getStudentCourses);
router.delete('/drop/:enrollmentId', dropCourse);

module.exports = router;