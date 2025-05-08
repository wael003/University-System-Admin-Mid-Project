const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  enrollmentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
