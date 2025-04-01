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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post('/api/students/register', async (req, res) => {
  console.log('Received request:', req.body);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log('Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newStudent = new Student({ name, email, password });
    await newStudent.save();
    console.log('Student added:', newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
