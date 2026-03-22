import { useState, useEffect } from 'react';
// import * as expenseService from '../services/expenseService';

const MOCK = [
  { id:1,  title:'School stationery',     amount:14200, category:'Education', submittedBy:'Shlok T',   date:'2026-03-20', status:'pending',  notes:'Annual supplies for 3 schools' },
  { id:2,  title:'Medical camp supplies', amount:32000, category:'Medical',   submittedBy:'Akshat J',  date:'2026-03-18', status:'pending',  notes:'Camp at Gandhinagar ward' },
  { id:3,  title:'Food distribution',     amount:8600,  category:'Food',      submittedBy:'Bhargav Y', date:'2026-03-15', status:'approved', notes:'March food drive' },
  { id:4,  title:'Vehicle hire',          amount:6400,  category:'Transport', submittedBy:'Kumar P',   date:'2026-03-12', status:'pending',  notes:'Distribution run' },
  { id:5,  title:'Office printing',       amount:3200,  category:'Admin',     submittedBy:'Manas G',   date:'2026-03-10', status:'approved', notes:'Monthly admin materials' },
  { id:6,  title:'Lab equipment',         amount:18500, category:'Education', submittedBy:'Akshat J',  date:'2026-03-07', status:'approved', notes:'Science kits' },
  { id:7,  title:'Emergency rations',     amount:12000, category:'Food',      submittedBy:'Bhargav Y', date:'2026-03-04', status:'rejected', notes:'Duplicate — already covered' },
];

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    setTimeout(() => { setExpenses(MOCK); setLoading(false); }, 400);
    // Real: expenseService.getAll().then(setExpenses).finally(()=>setLoading(false));
  }, []);

  const addExpense = (record) => {
    const newExp = { ...record, id: Date.now(), status: 'pending' };
    setExpenses(prev => [newExp, ...prev]);
    // Real: expenseService.create(record).then(e => setExpenses(prev=>[e,...prev]));
  };

  const updateStatus = (id, status) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    // Real: expenseService.updateStatus(id, status).then(() => setExpenses(...));
  };

  return { expenses, addExpense, updateStatus, loading };
};