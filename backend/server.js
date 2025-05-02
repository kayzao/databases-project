/* 
 * Entry point for the Student Management System backend.
 * - Loads environment variables (e.g., MongoDB URI).
 * - Sets up and configures the Express server with JSON parsing and CORS.
 * - Connects to the MongoDB database using Mongoose.
 * - Mounts student-related API routes from the studentRoutes module under /api/students.
 * - Starts the server on the specified port.
 * 
 * Note: All route logic is delegated to separate route files for modularity and clarity.
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
