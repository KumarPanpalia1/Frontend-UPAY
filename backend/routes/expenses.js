const express = require('express');
const jwt = require('jsonwebtoken');
const Expense = require('../models/Expense');

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

// GET /api/expenses
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { submittedBy: req.user.id };
    const expenses = await Expense.find(query).populate('submittedBy', 'name');
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/expenses
router.post('/', auth, async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, submittedBy: req.user.id });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/expenses/:id/status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    const { status } = req.body;
    const expense = await Expense.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;