const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Donation = require('./models/Donation');
const Expense = require('./models/Expense');
const Fund = require('./models/Fund');
const FundTransaction = require('./models/FundTransaction');
require('dotenv').config();

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  // Clear existing data
  await User.deleteMany();
  await Donation.deleteMany();
  await Expense.deleteMany();
  await Fund.deleteMany();
  await FundTransaction.deleteMany();

  // Create users
  const admin = new User({
    name: 'Admin User',
    email: 'admin@upay.org',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin'
  });
  await admin.save();

  const volunteer = new User({
    name: 'Volunteer User',
    email: 'volunteer@upay.org',
    password: await bcrypt.hash('vol123', 10),
    role: 'volunteer'
  });
  await volunteer.save();

  // Create donations
  const donations = [
    { donorName: 'Rahul Sharma', amount: 12000, mode: 'UPI', date: new Date('2026-03-20'), purpose: 'Education', createdBy: admin._id },
    { donorName: 'Priya Mehta', amount: 8500, mode: 'Cash', date: new Date('2026-03-18'), purpose: 'Food', createdBy: admin._id },
    { donorName: 'Amit Desai', amount: 25000, mode: 'NEFT', date: new Date('2026-03-15'), purpose: 'Medical', createdBy: admin._id },
  ];
  await Donation.insertMany(donations);

  // Create expenses
  const expenses = [
    { title: 'School supplies', amount: 14200, category: 'Education', submittedBy: volunteer._id, date: new Date('2026-03-10'), status: 'pending' },
    { title: 'Medical camp', amount: 32000, category: 'Medical', submittedBy: volunteer._id, date: new Date('2026-03-08'), status: 'pending' },
    { title: 'Food drive', amount: 8600, category: 'Food', submittedBy: volunteer._id, date: new Date('2026-03-05'), status: 'approved' },
  ];
  await Expense.insertMany(expenses);

  // Create funds
  const funds = [
    { name: 'Education', colour: '#1D9E75', allocated: 85000, spent: 32000, fy: '2025-26', description: 'School programs' },
    { name: 'Food relief', colour: '#185FA5', allocated: 62000, spent: 18000, fy: '2025-26', description: 'Food distribution' },
    { name: 'Healthcare', colour: '#D85A30', allocated: 45000, spent: 25000, fy: '2025-26', description: 'Medical aid' },
    { name: 'Transport', colour: '#BA7517', allocated: 28000, spent: 12000, fy: '2025-26', description: 'Transportation' },
  ];
  await Fund.insertMany(funds);

  console.log('Database seeded');
  process.exit();
};

seed();