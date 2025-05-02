import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ onStudentRegistered }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Custom email validation
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/students/register', {
        name,
        email,
        password,
      });
  
      console.log(`Student Registered! ID: ${response.data.student_id}`);
  
      setName('');
      setEmail('');
      setPassword('');
  
      onStudentRegistered();
    } catch (error) {
      console.error('Error registering student:', error);
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-xl font-bold mb-4">Register Student</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
        className="border rounded-md w-full p-2 mb-2" required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="border rounded-md w-full p-2 mb-2" required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
        className="border rounded-md w-full p-2 mb-2" required />
      <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default StudentForm;
