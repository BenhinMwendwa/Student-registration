const jwt = require('jsonwebtoken');
const { Student } = require('../models');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Student Registration
const registerStudent = async (req, res) => {
  try {
    const { name, email, password, department, year } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student already exists with this email'
      });
    }

    // Create new student
    const student = await Student.create({
      name,
      email,
      password, // Will be automatically hashed by model hook
      department: department || 'Computer Science',
      year: year || 1
    });

    // Generate token
    const token = generateToken(student.id);

    // Return student data (without password) and token
    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
          department: student.department,
          year: student.year
        },
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// Student Login
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await student.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(student.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
          department: student.department,
          year: student.year
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// Get Current Student Profile
const getCurrentStudent = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        student: req.student
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student profile'
    });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getCurrentStudent
};