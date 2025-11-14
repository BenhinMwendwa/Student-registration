const express = require('express'); // setup
const cors = require('cors');
const path = require('path');

const app=express(); // our app
const port= 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));