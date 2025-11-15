const { sequelize, Course } = require('./models');
require('dotenv').config();

const courses = [
  {
    code: "CS102",
    title: "Introduction to Computer Science",
    description: "Fundamentals of programming, algorithms, and computer systems",
    credits: 3,
    instructor: "Dr. Smith",
    capacity: 30,
    schedule: "Mon-Wed-Fri 10:00-11:00"
  },
  {
    code: "MATH202",
    title: "Calculus I",
    description: "Differential and integral calculus with applications",
    credits: 4,
    instructor: "Prof. Johnson",
    capacity: 25,
    schedule: "Tue-Thu 09:00-10:30"
  },
  {
    code: "ENG102",
    title: "English Composition",
    description: "Academic writing and communication skills",
    credits: 3,
    instructor: "Dr. Williams",
    capacity: 35,
    schedule: "Mon-Wed 14:00-15:30"
  },
  {
    code: "PHY302",
    title: "Classical Mechanics",
    description: "Newtonian mechanics, kinematics, and dynamics",
    credits: 4,
    instructor: "Dr. Brown",
    capacity: 20,
    schedule: "Mon-Wed-Fri 13:00-14:00"
  },
  {
    code: "CS302",
    title: "Data Structures and Algorithms",
    description: "Advanced data structures and algorithm analysis",
    credits: 3,
    instructor: "Prof. Davis",
    capacity: 25,
    schedule: "Tue-Thu 11:00-12:30"
  },
  {
    code: "CS402",
    title: "Database Systems",
    description: "Relational databases, SQL, and database design",
    credits: 3,
    instructor: "Dr. Wilson",
    capacity: 28,
    schedule: "Mon-Wed 16:00-17:30"
  },
  {
    code: "CS352",
    title: "Web Application Development",
    description: "Full-stack web development with modern frameworks",
    credits: 3,
    instructor: "Prof. Taylor",
    capacity: 22,
    schedule: "Tue-Thu 14:00-15:30"
  },
  {
    code: "STAT251",
    title: "Probability and Statistics",
    description: "Statistical methods and probability theory",
    credits: 3,
    instructor: "Dr. Martinez",
    capacity: 30,
    schedule: "Mon-Wed-Fri 08:00-09:00"
  },
  {
    code: "CS502",
    title: "Introduction to Artificial Intelligence",
    description: "AI fundamentals, machine learning, and neural networks",
    credits: 3,
    instructor: "Dr. Anderson",
    capacity: 18,
    schedule: "Tue-Thu 16:00-17:30"
  },
  {
    code: "CS451",
    title: "Software Engineering Principles",
    description: "Software development methodologies and project management",
    credits: 3,
    instructor: "Prof. Clark",
    capacity: 24,
    schedule: "Mon-Wed 10:00-11:30"
  }
];

async function createCourses() {
  try {
    console.log('📚 Creating sample courses...');
    
    // Test database connection first
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    for (const courseData of courses) {
      try {
        const course = await Course.create(courseData);
        console.log(`✅ Created: ${course.code} - ${course.title}`);
      } catch (courseError) {
        console.log(`❌ Failed to create: ${courseData.code}`);
        console.log('   Error details:', courseError.errors ? courseError.errors[0].message : courseError.message);
      }
    }
    
    console.log('🎉 Course creation completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ General error:', error.message);
    if (error.errors) {
      error.errors.forEach(err => {
        console.log('   -', err.message);
      });
    }
    process.exit(1);
  }
}

createCourses();