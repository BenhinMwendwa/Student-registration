const express = require('express'); // setup
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // ✅ NEW: Load environment variables

const app=express(); // our app
const PORT= process.env.PORT || 3000; // ✅ UPDATED: Use environment port or default

// Middleware
app.use(cors()); // allows API communication
app.use(express.json());
app.use(express.static('public'));

// ✅ NEW: Import authentication routes
const authRoutes = require('./routes/auth');

// ✅ NEW: Use authentication routes
app.use('/api/auth', authRoutes);

// Sample data storage (in production, use a database)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let nextId = 3;

// GET API - Get all users
app.get('/api/users', (req, res) => {
    console.log('GET /api/users - Fetching all users');
    res.json({
        success: true,
        data: users,
        message: 'Users fetched successfully'
    });
});

// GET API - Get user by ID
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`GET /api/users/${id} - Fetching user`);
    
    const user = users.find(u => u.id === id);
    
    if (user) {
        res.json({
            success: true,
            data: user,
            message: 'User fetched successfully'
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
});

// POST API - Create new user
app.post('/api/users', (req, res) => {
    console.log('POST /api/users - Creating new user', req.body);
    
    const { name, email } = req.body;
    
    // Create new user
    const newUser = {
        id: nextId++,
        name,
        email
    };
    
    users.push(newUser);
    
    res.json({
        success: true,
        data: newUser,
        message: 'User created successfully'
    });
});

// Serve the client page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /api/users');           // ✅ KEEP: Your original
    console.log('  POST /api/users');           // ✅ KEEP: Your original
    console.log('  POST /api/auth/register');   // ✅ NEW: Student registration
    console.log('  POST /api/auth/login');      // ✅ NEW: Student login
    console.log('  GET  /api/auth/me');         // ✅ NEW: Get student profile
});