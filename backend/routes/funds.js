const express = require('express');
const jwt = require('jsonwebtoken');
const Fund = require('../models/Fund');
const FundTransaction = require('../models/FundTransaction');

const router = express.Router();

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET /api/funds
router.get('/', auth, async (req, res) => {
  try {
    const funds = await Fund.find();
    res.json(funds);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/funds/transactions
router.get('/transactions', auth, async (req, res) => {
  try {
    const transactions = await FundTransaction.find().populate('by', 'name');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/funds/allocate
router.post('/allocate', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    const { programme, amount, fy } = req.body;
    // Update or create fund
    let fund = await Fund.findOne({ name: programme, fy });
    if (!fund) {
      fund = new Fund({ name: programme, fy, allocated: amount });
    } else {
      fund.allocated += amount;
    }
    await fund.save();
    // Create transaction
    const transaction = new FundTransaction({ programme, amount, type: 'allocation', by: req.user.id, date: new Date(), fy });
    await transaction.save();
    res.status(201).json({ fund, transaction });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;