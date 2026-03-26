const mongoose = require('mongoose');

const fundTransactionSchema = new mongoose.Schema({
  programme: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['allocation', 'expenditure'], required: true },
  by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  fy: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('FundTransaction', fundTransactionSchema);