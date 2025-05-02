import React, { useState } from 'react';
import axios from 'axios';

const ReportPage = () => {
    const [courtId, setCourtId] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setNoResults(false);
        try {
            const params = new URLSearchParams();
            if (courtId) params.append('courtId', courtId);
            if (start) params.append('start', start);
            if (end) params.append('end', end);

            const res = await axios.get(`http://localhost:5000/api/bookings/report?${params.toString()}`);
            setReport(res.data);
            setNoResults(res.data.bookings.length === 0);
        } catch (err) {
            console.error('Error fetching report:', err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Court Booking Report</h1>
            <form onSubmit={handleSubmit} className="space-y-2 mb-6">
                <select
                    value={courtId}
                    onChange={(e) => setCourtId(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">All Courts</option>
                    {[1, 2, 3, 4, 5, 6].map((id) => (
                        <option key={id} value={id}>Court {id}</option>
                    ))}
                </select>
                <label className="block text-sm font-medium text-gray-700">Date Range:</label>
                <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="border p-2 w-full rounded" />
                <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="border p-2 w-full rounded" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Generate Report</button>
            </form>
            {loading && (
                <div className="text-center text-gray-600">Loading report...</div>
            )}

            {!loading && noResults && (
                <div className="text-center text-red-500 font-medium">No bookings found for the selected filters.</div>
            )}


            {report && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Stats</h2>
                    <ul className="mb-4">
                        <li>Total Bookings: {report.stats.total}</li>
                        <li>Average Duration: {report.stats.avgDuration} minutes</li>
                        <li>Unique Students: {report.stats.uniqueStudents}</li>
                        <li>Most Booked Court: {report.stats.mostBookedCourt ? `Court ${report.stats.mostBookedCourt}` : 'N/A'}</li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-2">Matching Bookings</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2">Student</th>
                                <th className="border p-2">Court</th>
                                <th className="border p-2">Duration</th>
                                <th className="border p-2">Time</th>
                                <th className="border p-2">Manager</th>

                            </tr>
                        </thead>
                        <tbody>
                            {report.bookings.map((b) => (
                                <tr key={b._id}>
                                    <td className="border p-2">{b.studentEmail}</td>
                                    <td className="border p-2">{b.courtId}</td>
                                    <td className="border p-2">{b.duration} mins</td>
                                    <td className="border p-2">{new Date(b.time).toLocaleString()}</td>
                                    <td className="border p-2">{b.manager}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReportPage;
