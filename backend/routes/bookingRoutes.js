const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a new booking
router.post('/register', async (req, res) => {
    const { studentEmail, courtId, duration, time, manager } = req.body;

    const startTime = new Date(time);
    const endTime = new Date(startTime.getTime() + duration * 60000); // Add duration in milliseconds
  
    try {
      // Check for overlapping bookings
      const conflicting = await Booking.findOne({
        courtId: Number(courtId),
        time: {
          $lt: endTime,       // existing booking starts before this ends
          $gte: new Date(startTime.getTime() - 60000)
        }
      });
  
      if (conflicting) {
        return res.status(400).json({ error: 'Booking conflicts with an existing reservation.' });
      }
  
      const newBooking = new Booking({
        studentEmail,
        courtId: Number(courtId),
        duration: Number(duration),
        time: new Date(time),
        manager
      });
  
      await newBooking.save();
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ time: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get a report
router.get('/report', async (req, res) => {
    const { courtId, start, end } = req.query;
  
    try {
      const filter = {};
  
      if (courtId) filter.courtId = Number(courtId);
      if (start || end) {
        filter.time = {};
        if (start) filter.time.$gte = new Date(start);
        if (end) filter.time.$lte = new Date(end);
      }
  
      const bookings = await Booking.find(filter);
  
      const total = bookings.length;
      const avgDuration =
        total > 0 ? bookings.reduce((sum, b) => sum + b.duration, 0) / total : 0;
  
      const uniqueStudents = new Set(bookings.map((b) => b.studentEmail)).size;
  
      const courtFreq = {};
      bookings.forEach((b) => {
        courtFreq[b.courtId] = (courtFreq[b.courtId] || 0) + 1;
      });
  
      const mostBookedCourt =
        Object.keys(courtFreq).length > 0
          ? Object.entries(courtFreq).sort((a, b) => b[1] - a[1])[0][0]
          : null;
  
      res.json({
        bookings,
        stats: {
          total,
          avgDuration: avgDuration.toFixed(2),
          uniqueStudents,
          mostBookedCourt,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

module.exports = router;
