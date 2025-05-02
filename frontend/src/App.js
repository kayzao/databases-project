import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CourtRegistration from './components/CourtRegistration';
import ReportPage from './components/ReportPage';
import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import axios from 'axios';

const App = () => {
  // state holding list of students
  const [students, setStudents] = useState([]);

  // Function to fetch the current list of students from the backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data); // Update the state with fetched students
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch students once when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        {/* Navigation links */}
        <nav className="mb-6 space-x-4">
          <Link to="/" className="text-blue-500 hover:underline">Court Registration</Link>
          <Link to="/students" className="text-blue-500 hover:underline">Student Registration</Link>
          <Link to="/reports" className="text-blue-500 hover:underline">Booking Report</Link>
        </nav>

        <Routes>
          <Route path="/" element={ <CourtRegistration />} />
          <Route
            path="/students"
            element={
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">CS348 Project Student Registration Page</h1>
                <StudentForm onStudentRegistered={fetchStudents} />
                <StudentList students={students} onUpdate={fetchStudents} />
              </div>
            }
          />
          <Route path="/reports" element={<ReportPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
