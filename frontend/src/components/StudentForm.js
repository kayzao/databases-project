import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    console.log('handleSubmit called');
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/students/register', {
        name, email, password
      });
      alert(`Student Registered! ID: ${response.data.student_id}`);
    } catch (error) {
      console.error('Error registering student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-xl font-bold mb-4">Register Student</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
        className="border rounded-md w-full p-2 mb-2" required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="border rounded-md w-full p-2 mb-2" required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
        className="border rounded-md w-full p-2 mb-2" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default StudentForm;
