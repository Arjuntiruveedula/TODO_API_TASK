const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
// Connect to database
connectDB();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// Routes
app.get('/', (req, res) => {
  res.send('TODO LIST API');
  });
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/todos', require('./routes/todoRoutes'));

// Serve static assets in production


// Error handling middleware
app.use(errorHandler);
module.exports = app;