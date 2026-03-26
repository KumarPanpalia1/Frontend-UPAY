import { useState, useEffect } from 'react';
// import { getDashboardSummary } from '../services/dashboardService'; // real API

// --- MOCK DATA (swap with real API call later) ---
const MOCK = {
  summary: {
    totalDonations: 284500,
    totalExpenses:  112300,
    balance:        172200,
    balancePct:     60.5,
    pendingCount:   7,
  },
  monthly: {
    labels:   ['Oct','Nov','Dec','Jan','Feb','Mar'],
    donations:[38000,42000,51000,47000,55000,61000],
    expenses: [18000,22000,25000,21000,28000,24000],
  },
  categories: [
    { label: 'Education', value: 38, color: '#003C64' },
    { label: 'Food',      value: 24, color: '#F7AC2D' },
    { label: 'Medical',   value: 18, color: '#005086' },
    { label: 'Transport', value: 12, color: '#fcd34d' },
    { label: 'Admin',     value: 8,  color: '#888780' },
  ],
  recentDonations: [
    { id:1, name:'Rahul Sharma',  amount:12000, mode:'UPI',  date:'2026-03-20' },
    { id:2, name:'Priya Mehta',   amount:8500,  mode:'Cash', date:'2026-03-18' },
    { id:3, name:'Amit Desai',    amount:25000, mode:'NEFT', date:'2026-03-15' },
  ],
  pendingExpenses: [
    { id:1, title:'School supplies', amount:14200, status:'pending'  },
    { id:2, title:'Medical camp',    amount:32000, status:'pending'  },
    { id:3, title:'Food drive',      amount:8600,  status:'approved' },
  ],
  funds: [
    { label:'Education',  amount:85000 },
    { label:'Food relief',amount:62000 },
    { label:'Healthcare', amount:45000 },
    { label:'Transport',  amount:28000 },
  ],
};

export const useDashboardData = () => {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API latency
    const t = setTimeout(() => {
      setData(MOCK);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);

    // Real API:
    // getDashboardSummary().then(setData).finally(() => setLoading(false));
  }, []);

  return { ...data, loading };
};