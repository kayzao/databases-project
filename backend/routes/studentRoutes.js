const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// create student
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newStudent = new Student({ name, email, password });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// gets all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update student's name
router.put('/update/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
