import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourtRegistration = () => {
  const [studentEmail, setStudentEmail] = useState('');
  const [courtId, setCourtId] = useState('1'); 
  const [duration, setDuration] = useState('');
  
  const [bookings, setBookings] = useState([]);

  const getNext15MinuteIncrement = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15 - (now.getMinutes() % 15)); // round up to next 15
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // adjust for local time
    return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
  };

  const getMaxDate = () => {
    const max = new Date();
    max.setDate(max.getDate() + 7);
    max.setHours(23, 59, 0, 0); // last minute of the 7th day
    max.setMinutes(max.getMinutes() - max.getTimezoneOffset());
    return max.toISOString().slice(0, 16);
  };
  
  const [time, setTime] = useState(getNext15MinuteIncrement());
  const minTime = getNext15MinuteIncrement();
  const maxTime = getMaxDate();

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:5000/api/bookings');
    setBookings(res.data);
  };

  const [students, setStudents] = useState([]);
  const [manager, setManager] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
  
    try {
      console.log('Deleting booking with id:', id);
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bookings/register', {
        studentEmail,
        courtId: Number(courtId),
        duration: Number(duration),
        time,
        manager
      });
  
      // Clear form
      setStudentEmail('');
      setCourtId('');
      setDuration('');
      setTime('');
  
      fetchBookings(); // Refresh table
    } catch (error) {
      if (error.response?.status === 400) {
        alert(error.response.data.error);
      } else {
        console.error('Booking failed:', error);
      }
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Court Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="email"
          placeholder="Student Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          min={minTime}
          max={maxTime}
          className="border p-2 w-full rounded"
          required
        />
        <select
          value={courtId}
          onChange={(e) => setCourtId(e.target.value)}
          className="border p-2 w-full rounded"
          required
        >
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <option key={id} value={id}>
              Court {id}
            </option>
          ))}
        </select>

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Duration</option>
          {[...Array(8)].map((_, i) => {
            const minutes = (i + 1) * 15; // 15 to 120
            return (
              <option key={minutes} value={minutes}>
                {minutes} minutes
              </option>
            );
          })}
        </select>
        <select
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Manager</option>
          {students.map((student) => (
            <option key={student._id} value={student.email}>
              {student.name} ({student.email})
            </option>
          ))}
        </select>


        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register Booking
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Existing Bookings</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Student Email</th>
            <th className="border p-2">Court ID</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td className="border p-2">{b.studentEmail}</td>
              <td className="border p-2">{b.courtId}</td>
              <td className="border p-2">{b.duration} mins</td>
              <td className="border p-2">{new Date(b.time).toLocaleString()}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(b._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourtRegistration;
