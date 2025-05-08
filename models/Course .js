const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  creditHours: { type: Number, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
