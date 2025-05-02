import React, { useState } from 'react';
import axios from 'axios';

const StudentList = ({ students, onUpdate }) => {
  const [updateName, setUpdateName] = useState('');

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/students/update/${id}`, { name: updateName });
      onUpdate();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Registered Students</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {students.map(student => (
          <li key={student._id} className="flex justify-between items-center border-b py-2">
            <div>
              <span className="font-semibold">{student.name}</span> ({student.email})
            </div>
            <div className="flex space-x-2">
              <input type="text" placeholder="New Name" onChange={(e) => setUpdateName(e.target.value)}
                className="border rounded-md p-1" />
              <button onClick={() => handleUpdate(student._id)}
                className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700">
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
