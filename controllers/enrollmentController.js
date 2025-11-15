const { Enrollment, Course, Student } = require('../models');

// Student enrolls in a course
const enrollInCourse = async (req, res) => {
  try {
    const studentId = req.student.id; // From auth middleware
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: { studentId, courseId }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Check course capacity
    if (course.enrolledCount >= course.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Course is full'
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      studentId,
      courseId,
      status: 'registered'
    });

    // Update enrolled count
    await course.increment('enrolledCount');

    res.status(201).json({
      success: true,
      data: enrollment,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Enrollment failed',
      error: error.message
    });
  }
};

// Get student's enrolled courses
const getStudentCourses = async (req, res) => {
  try {
    const studentId = req.student.id;

    const enrollments = await Enrollment.findAll({
      where: { studentId },
      include: [{
        model: Course,
        as: 'course'
      }]
    });

    res.json({
      success: true,
      data: enrollments,
      message: 'Student courses fetched successfully'
    });
  } catch (error) {
    console.error('Get student courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student courses'
    });
  }
};

// Drop a course
const dropCourse = async (req, res) => {
  try {
    const studentId = req.student.id;
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findOne({
      where: { id: enrollmentId, studentId },
      include: [{ model: Course, as: 'course' }]
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Update course enrolled count
    await enrollment.course.decrement('enrolledCount');

    // Delete enrollment
    await enrollment.destroy();

    res.json({
      success: true,
      message: 'Successfully dropped the course'
    });
  } catch (error) {
    console.error('Drop course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to drop course'
    });
  }
};

module.exports = {
  enrollInCourse,
  getStudentCourses,
  dropCourse
};