const express = require('express'); // setup
const cors = require('cors');
const path = require('path');

const app=express(); // our app
const PORT= 3000;

// Middleware
app.use(cors()); // allows API communication
app.use(express.json());
app.use(express.static('public'));

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
    console.log('  GET  /api/users');
    console.log('  POST /api/users');
});