require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER, 
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: console.log // Show SQL queries for debugging
  }
);

async function testDB() {
  try {
    console.log('🔌 Testing database connection...');
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    console.log(`👤 User: ${process.env.DB_USER}`);
    console.log(`🌐 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    
    await sequelize.authenticate();
    console.log('🎉 SUCCESS: Connected to PostgreSQL database!');
    
    // Test basic query
    const result = await sequelize.query('SELECT version()');
    console.log('📋 PostgreSQL Version:', result[0][0].version);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ FAILED: Cannot connect to database');
    console.error('💡 Error details:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Is PostgreSQL running?');
    console.log('2. Check .env file credentials');
    console.log('3. Database "student_portal" exists?');
    console.log('4. User "benhin" has permissions?');
    process.exit(1);
  }
}

testDB();