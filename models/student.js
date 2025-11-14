const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 100]
    }
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Computer Science'
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  hooks: {  // use hoook to allow runnning of the project before or after
    beforeCreate: async (student) => {
      // Hash password before saving
      student.password = await bcrypt.hash(student.password, 12);
    },
    beforeUpdate: async (student) => {
      // Hash password if it's being updated
      if (student.changed('password')) {
        student.password = await bcrypt.hash(student.password, 12);
      }
    }
  }
});

// Instance method to check password
Student.prototype.checkPassword = async function(candidatePassword) {    
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = Student;