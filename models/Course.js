const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');  // ✅ CORRECT IMPORT

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
    validate: {
      min: 1,
      max: 6
    }
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'TBA'
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 30,
    validate: {
      min: 1,
      max: 300
    }
  },
  enrolledCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Mon-Wed-Fri 10:00-11:00'
  }
});

module.exports = Course;