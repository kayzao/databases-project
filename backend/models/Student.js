const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid'); // generates unique student IDs

const StudentSchema = new mongoose.Schema({
  student_id: { type: String, default: "later", unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;
