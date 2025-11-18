 # 🎓 Student Registration System

A full-stack Student Course Registration System built with Express.js, PostgreSQL, and a modern web interface. This system allows students to register, browse courses, and manage their enrollments in a secure and user-friendly environment.

https://img.shields.io/badge/Status-Production%2520Ready-brightgreen
https://img.shields.io/badge/Node.js-18.x-green
https://img.shields.io/badge/PostgreSQL-16.x-blue

# 🚀 Features

# 🔐 Authentication & Security
Student Registration & Login with JWT tokens

Password Hashing using bcryptjs

Protected API Routes with middleware

Input Validation and error handling

# 📚 Course Management
Course Catalog with search and filter capabilities

Real-time Enrollment Tracking with capacity limits

Course Details including schedule, credits, and instructor information

Automatic Course Creation on server startup

# 👨‍🎓 Student Portal
Personal Dashboard with enrollment statistics

My Courses management interface

Student Profile with academic information

Responsive Design for all devices

# 🗄️ Database Features
PostgreSQL with Sequelize ORM

Automatic Table Creation and synchronization

Data Relationships between students, courses, and enrollments

Data Validation and constraints

# 🏗️ Technology Stack

# Backend
Express.js - Web framework

PostgreSQL - Database

Sequelize - ORM for database management

JWT - Authentication tokens

bcryptjs - Password hashing

CORS - Cross-origin resource sharing

# Frontend
HTML5 - Semantic markup

CSS3 - Modern styling with CSS Grid and Flexbox

Vanilla JavaScript - ES6+ features with async/await

Responsive Design - Mobile-first approach



 # Clone and setup the project

git clone <repository-url>
cd student-reg-project
npm install

Database Setup
# Access PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE student_portal;
CREATE USER benhin WITH PASSWORD 'student123';
GRANT ALL PRIVILEGES ON DATABASE student_portal TO benhin;
ALTER USER benhin CREATEDB;
\q

# Environment Configuration

DB_NAME=student_portal
DB_USER=benhin
DB_PASSWORD=student123
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3000

# Database Synchronization
node scripts/sync-db.js

# Start the Application
npm start