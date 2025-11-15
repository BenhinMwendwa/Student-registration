const { sequelize } = require('../config/database');
const Student = require('./Student')
const Course = require('./Course');
const Enrollment = require('./Enrollment');

// Define Relationships

// Student ↔ Enrollment (One-to-Many)
Student.hasMany(Enrollment, {
  foreignKey: 'studentId',
  as: 'enrollments'
});
Enrollment.belongsTo(Student, {
  foreignKey: 'studentId',
  as: 'student'
});

// Course ↔ Enrollment (One-to-Many)
Course.hasMany(Enrollment, {
  foreignKey: 'courseId',
  as: 'enrollments'
});
Enrollment.belongsTo(Course, {
  foreignKey: 'courseId',
  as: 'course'
});

// Student ↔ Course (Many-to-Many through Enrollment)
Student.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'studentId',
  otherKey: 'courseId',
  as: 'courses'
});
Course.belongsToMany(Student, {
  through: Enrollment,
  foreignKey: 'courseId',
  otherKey: 'studentId',
  as: 'students'
});

// Export all models
module.exports = {
  sequelize,
  Student,
  Course,
  Enrollment
};