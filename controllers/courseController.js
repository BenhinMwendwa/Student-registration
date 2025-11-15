const { Course, Enrollment, Student } = require('../models');

// Get all available courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      order: [['code', 'ASC']]
    });

    res.json({
      success: true,
      data: courses,
      message: 'Courses fetched successfully'
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses'
    });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      include: [{
        model: Student,
        as: 'students',
        through: { attributes: [] } // Exclude enrollment details
      }]
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course,
      message: 'Course fetched successfully'
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course'
    });
  }
};

// Create new course (Admin functionality)
const createCourse = async (req, res) => {
  try {
    const { code, title, description, credits, instructor, capacity, schedule } = req.body;

    const course = await Course.create({
      code,
      title,
      description,
      credits: credits || 3,
      instructor: instructor || 'TBA',
      capacity: capacity || 30,
      schedule: schedule || 'Mon-Wed-Fri 10:00-11:00'
    });

    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error.message
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse
};