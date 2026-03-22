/* ============================================================
   UPAY NGO Finance Portal — Data Layer
============================================================ */

// ── Default Sample Users ────────────────────────────────────
const DEFAULT_USERS = [
  {
    id: 'u1',
    name: 'Ananya Sharma',
    email: 'admin@upay.org',
    password: 'Admin@123',
    role: 'Admin',
    initials: 'AS',
  },
  {
    id: 'u2',
    name: 'Rohan Verma',
    email: 'volunteer@upay.org',
    password: 'Vol@123',
    role: 'Volunteer',
    initials: 'RV',
  },
  {
    id: 'u3',
    name: 'Priya Nair',
    email: 'priya@upay.org',
    password: 'Priya@123',
    role: 'Volunteer',
    initials: 'PN',
  },
];

// ── Default Donations ───────────────────────────────────────
const DEFAULT_DONATIONS = [
  { id: 'd1',  donor: 'Ramesh Agarwal',    amount: 50000, mode: 'Bank Transfer', date: '2026-03-15', category: 'Education' },
  { id: 'd2',  donor: 'Sunita Mehta',      amount: 25000, mode: 'UPI',           date: '2026-03-10', category: 'Health' },
  { id: 'd3',  donor: 'TCS Foundation',    amount: 200000,mode: 'Cheque',        date: '2026-03-01', category: 'Infrastructure' },
  { id: 'd4',  donor: 'Vijay Kulkarni',    amount: 10000, mode: 'Cash',          date: '2026-02-28', category: 'Education' },
  { id: 'd5',  donor: 'Infosys BPO',       amount: 150000,mode: 'Bank Transfer', date: '2026-02-20', category: 'Women Empowerment' },
  { id: 'd6',  donor: 'Anita Desai',       amount: 5000,  mode: 'UPI',           date: '2026-02-15', category: 'Health' },
  { id: 'd7',  donor: 'Rotary Club Ngp',   amount: 75000, mode: 'Cheque',        date: '2026-02-05', category: 'Education' },
  { id: 'd8',  donor: 'Prakash Joshi',     amount: 12000, mode: 'Cash',          date: '2026-01-30', category: 'Environment' },
  { id: 'd9',  donor: 'Lion Club Nagpur',  amount: 90000, mode: 'Bank Transfer', date: '2026-01-20', category: 'Vocational Training' },
  { id: 'd10', donor: 'CSR Wipro',         amount: 300000,mode: 'Bank Transfer', date: '2026-01-10', category: 'Infrastructure' },
  { id: 'd11', donor: 'Dr. Meena Tiwari',  amount: 8000,  mode: 'UPI',           date: '2025-12-25', category: 'Health' },
  { id: 'd12', donor: 'Nagpur Steel Corp', amount: 60000, mode: 'Cheque',        date: '2025-12-15', category: 'Education' },
  { id: 'd13', donor: 'Komal Bhatt',       amount: 3000,  mode: 'Cash',          date: '2025-12-10', category: 'Women Empowerment' },
  { id: 'd14', donor: 'SBI Foundation',    amount: 180000,mode: 'Bank Transfer', date: '2025-11-30', category: 'Vocational Training' },
  { id: 'd15', donor: 'Anonymous',         amount: 1500,  mode: 'Cash',          date: '2025-11-20', category: 'Education' },
];

// ── Default Expenses ────────────────────────────────────────
const DEFAULT_EXPENSES = [
  { id: 'e1',  title: 'Science Lab Equipment',      category: 'Education',          amount: 45000,  submittedBy: 'Rohan Verma',  status: 'Approved',  date: '2026-03-18', description: 'New microscopes and lab kits for school program.' },
  { id: 'e2',  title: 'Medical Camp Supplies',       category: 'Health',             amount: 22000,  submittedBy: 'Priya Nair',   status: 'Approved',  date: '2026-03-12', description: 'Medicines and diagnostic tools for free health camp.' },
  { id: 'e3',  title: 'Computer Training Software',  category: 'Vocational Training',amount: 18000,  submittedBy: 'Rohan Verma',  status: 'Pending',   date: '2026-03-20', description: 'Software licenses for digital literacy program.' },
  { id: 'e4',  title: 'Office Stationery & Prints',  category: 'Administration',     amount: 5500,   submittedBy: 'Priya Nair',   status: 'Approved',  date: '2026-03-08', description: 'Printing, stationery and office supplies.' },
  { id: 'e5',  title: 'Transportation — March',      category: 'Administration',     amount: 8200,   submittedBy: 'Rohan Verma',  status: 'Approved',  date: '2026-03-05', description: 'Vehicle hire for outreach field visits.' },
  { id: 'e6',  title: 'Women Skill Workshop',        category: 'Women Empowerment',  amount: 35000,  submittedBy: 'Priya Nair',   status: 'Pending',   date: '2026-03-21', description: 'Venue, materials and trainer fees for tailoring workshop.' },
  { id: 'e7',  title: 'Plantation Drive Saplings',   category: 'Environment',        amount: 12000,  submittedBy: 'Rohan Verma',  status: 'Rejected',  date: '2026-02-25', description: 'Saplings and tools — exceeds approved budget.' },
  { id: 'e8',  title: 'Scholarship Disbursement',    category: 'Education',          amount: 60000,  submittedBy: 'Priya Nair',   status: 'Approved',  date: '2026-02-18', description: 'Merit scholarships for 12 students.' },
  { id: 'e9',  title: 'Roof Repair — Centre',        category: 'Infrastructure',     amount: 90000,  submittedBy: 'Rohan Verma',  status: 'Pending',   date: '2026-03-22', description: 'Emergency roof repair at Butibori training centre.' },
  { id: 'e10', title: 'COVID Awareness Campaign',    category: 'Health',             amount: 7500,   submittedBy: 'Priya Nair',   status: 'Approved',  date: '2026-02-10', description: 'Pamphlets, masks, sanitisers for awareness drive.' },
];

// ── Default Projects (Fund Allocation) ──────────────────────
const DEFAULT_PROJECTS = [
  { id: 'p1', name: 'Digital Education Initiative',  category: 'Education',          allocated: 350000, spent: 180000, startDate: '2026-01-01', status: 'Active',  description: 'Providing digital literacy and computer training to underprivileged students across Nagpur.' },
  { id: 'p2', name: 'Community Health Camp',          category: 'Health',             allocated: 120000, spent: 75000,  startDate: '2026-02-01', status: 'Active',  description: 'Regular free health check-ups, medicine distribution and awareness camps.' },
  { id: 'p3', name: 'Women Skill Development',        category: 'Women Empowerment',  allocated: 200000, spent: 45000,  startDate: '2026-01-15', status: 'Active',  description: 'Vocational training in tailoring, food processing and handicrafts.' },
  { id: 'p4', name: 'Scholarship Program 2026',       category: 'Education',          allocated: 250000, spent: 220000, startDate: '2025-11-01', status: 'Active',  description: 'Annual merit-cum-need scholarship for 50 students from low-income households.' },
  { id: 'p5', name: 'Green Nagpur Plantation',        category: 'Environment',        allocated: 80000,  spent: 15000,  startDate: '2026-03-01', status: 'Active',  description: 'Tree plantation drive targeting 2500 saplings across 10 slum localities.' },
  { id: 'p6', name: 'Butibori Training Centre',       category: 'Infrastructure',     allocated: 500000, spent: 430000, startDate: '2025-09-01', status: 'Active',  description: 'Renovation and infrastructure upgrades to the main vocational training centre.' },
];

// ── Monthly Stats (for bar chart) ──────────────────────────
const DEFAULT_MONTHLY_STATS = [
  { month: 'Oct 25', donations: 185000, expenses: 120000 },
  { month: 'Nov 25', donations: 220000, expenses: 148000 },
  { month: 'Dec 25', donations: 310000, expenses: 175000 },
  { month: 'Jan 26', donations: 275000, expenses: 198000 },
  { month: 'Feb 26', donations: 390000, expenses: 245000 },
  { month: 'Mar 26', donations: 168500, expenses: 110000 },
];

// ── LocalStorage Helpers ────────────────────────────────────
const STORAGE_KEYS = {
  USERS:    'upay_users',
  DONATIONS:'upay_donations',
  EXPENSES: 'upay_expenses',
  PROJECTS: 'upay_projects',
  SESSION:  'upay_session',
};

function getData(key) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[key]);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setData(key, value) {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
  } catch(e) { console.error('Storage error', e); }
}

// ── Initialise data on first load ───────────────────────────
function initData() {
  if (!getData('USERS'))     setData('USERS',    DEFAULT_USERS);
  if (!getData('DONATIONS')) setData('DONATIONS',DEFAULT_DONATIONS);
  if (!getData('EXPENSES'))  setData('EXPENSES', DEFAULT_EXPENSES);
  if (!getData('PROJECTS'))  setData('PROJECTS', DEFAULT_PROJECTS);
}

// ── Summary Helpers ─────────────────────────────────────────
function getSummary() {
  const donations = getData('DONATIONS') || [];
  const expenses  = getData('EXPENSES')  || [];
  const projects  = getData('PROJECTS')  || [];

  const totalDonations = donations.reduce((s, d) => s + Number(d.amount), 0);
  const totalExpenses  = expenses.filter(e => e.status === 'Approved')
                                  .reduce((s, e) => s + Number(e.amount), 0);
  const balance        = totalDonations - totalExpenses;
  const totalAllocated = projects.reduce((s, p) => s + Number(p.allocated), 0);
  const utilPct        = totalAllocated ? Math.round((totalExpenses / totalAllocated) * 100) : 0;

  return { totalDonations, totalExpenses, balance, utilPct };
}
