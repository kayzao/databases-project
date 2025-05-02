const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  courtId: { type: Number, required: true },
  duration: { type: Number, required: true }, 
  time: { type: Date, required: true, default: Date.now },
  manager: { type: String, required: true }
});

bookingSchema.index({ courtId: 1, time: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
