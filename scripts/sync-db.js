const { sequelize, Student, Course, Enrollment } = require('../models');

async function syncDatabase() {
  try {
    console.log('🔄 Syncing database...');
    
    // Test connection first
    await sequelize.authenticate();
    console.log('✅ Database connection OK');
    
    // This creates tables if they don't exist
    await sequelize.sync({ force: false });
    
    console.log('✅ Database synced successfully!');
    console.log('📊 Tables created:');
    console.log('   - Students');
    console.log('   - Courses'); 
    console.log('   - Enrollments');
    
  } catch (error) {
    console.error('❌ Database sync failed:', error.message);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();