import React from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">CS348 Project Student Registration Page</h1>
      <StudentForm />
      <StudentList />
    </div>
  );
};

export default App;
