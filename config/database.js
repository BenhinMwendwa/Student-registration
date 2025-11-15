const { Sequelize } = require('sequelize');
require('dotenv').config();

// ✅ CORRECT ORDER: database, username, password, options
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name (FIRST)
  process.env.DB_USER,      // Username (SECOND)  
  process.env.DB_PASSWORD,  // Password (THIRD)
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully!');
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL database:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection };