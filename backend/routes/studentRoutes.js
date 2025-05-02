/*
 * Routes for handling student-related operations.
 * - POST /register: Registers a new student with a randomly generated ID.
 * - GET /         : Retrieves all students.
 * - PUT /update/:id: Updates a student's name by their MongoDB document ID.
 * - GET /students : Duplicate of GET / (can be removed for clarity).
 * 
 * This file defines the student API endpoints and interacts with the Student model.
 * It is mounted in server.js under the /api/students path.
 */

const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// create student
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const randomId = Math.floor(Math.random() * 9000000000);

    const newStudent = new Student({ student_id: randomId, name: name, email: email, password: password });
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
    console.log("// access")
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
    console.log("/studnets accesss"); // Log the students to the console
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
