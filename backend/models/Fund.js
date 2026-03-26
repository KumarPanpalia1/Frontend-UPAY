const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  colour: { type: String, required: true }, // hex
  allocated: { type: Number, default: 0 },
  spent: { type: Number, default: 0 },
  fy: { type: String, required: true }, // financial year
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Fund', fundSchema);