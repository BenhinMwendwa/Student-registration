const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.ENUM('registered', 'waitlisted', 'dropped'),
    allowNull: false,
    defaultValue: 'registered'
  },
  enrolledAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [['A', 'B', 'C', 'D', 'F', null]]
    }
  }
});

module.exports = Enrollment;