const express = require('express');
const mongoose = require('./db');
const emailRoutes = require('./routes/emailRoutes');
const { startEmailScheduler } = require('./utils/emailSender');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/emails', emailRoutes);

// Start the email scheduler
startEmailScheduler();

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 3000');
});