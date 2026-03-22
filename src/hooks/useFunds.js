import { useState, useEffect } from 'react';
// import * as fundService from '../services/fundService';

const MOCK_FUNDS = [
  { id:1, name:'Education',      color:'#185FA5', allocated:90000, spent:43900, fy:'2025-26', desc:'Schools, stationery, lab kits'   },
  { id:2, name:'Food Relief',    color:'#1D9E75', allocated:65000, spent:20600, fy:'2025-26', desc:'Monthly food drives, rations'     },
  { id:3, name:'Healthcare',     color:'#E24B4A', allocated:50000, spent:41500, fy:'2025-26', desc:'Medical camps, ambulance'         },
  { id:4, name:'Transport',      color:'#BA7517', allocated:22000, spent:11200, fy:'2025-26', desc:'Field visits, distribution runs'  },
  { id:5, name:'Administration', color:'#888780', allocated:13000, spent:4800,  fy:'2025-26', desc:'Office, printing, misc'           },
];

const MOCK_TRANSACTIONS = [
  { id:1,  programme:'Education',      amount:90000, type:'allocation',  by:'Admin',    date:'2026-01-05', fy:'2025-26' },
  { id:2,  programme:'Food Relief',    amount:65000, type:'allocation',  by:'Admin',    date:'2026-01-05', fy:'2025-26' },
  { id:3,  programme:'Healthcare',     amount:50000, type:'allocation',  by:'Admin',    date:'2026-01-05', fy:'2025-26' },
  { id:4,  programme:'Transport',      amount:22000, type:'allocation',  by:'Admin',    date:'2026-01-05', fy:'2025-26' },
  { id:5,  programme:'Administration', amount:13000, type:'allocation',  by:'Admin',    date:'2026-01-05', fy:'2025-26' },
  { id:6,  programme:'Education',      amount:14200, type:'expenditure', by:'Akshat J', date:'2026-03-20', fy:'2025-26' },
  { id:7,  programme:'Healthcare',     amount:32000, type:'expenditure', by:'Shlok T',  date:'2026-03-18', fy:'2025-26' },
  { id:8,  programme:'Food Relief',    amount:8600,  type:'expenditure', by:'Bhargav Y',date:'2026-03-15', fy:'2025-26' },
  { id:9,  programme:'Transport',      amount:6400,  type:'expenditure', by:'Kumar P',  date:'2026-03-12', fy:'2025-26' },
  { id:10, programme:'Administration', amount:3200,  type:'expenditure', by:'Manas G',  date:'2026-03-10', fy:'2025-26' },
];

export const useFunds = () => {
  const [funds,        setFunds]        = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFunds(MOCK_FUNDS);
      setTransactions(MOCK_TRANSACTIONS);
      setLoading(false);
    }, 400);
    // Real:
    // Promise.all([fundService.getFunds(), fundService.getTransactions()])
    //   .then(([f, t]) => { setFunds(f); setTransactions(t); })
    //   .finally(() => setLoading(false));
  }, []);

  const allocate = ({ programme, amount, fy }) => {
    // Update the fund card's allocated amount
    setFunds(prev => prev.map(f =>
      f.name === programme ? { ...f, allocated: f.allocated + Number(amount) } : f
    ));
    // Add a transaction record
    setTransactions(prev => [{
      id: Date.now(), programme, amount: Number(amount),
      type: 'allocation', by: 'Admin',
      date: new Date().toISOString().slice(0, 10), fy,
    }, ...prev]);
    // Real: fundService.allocate({ programme, amount, fy }).then(refresh)
  };

  return { funds, transactions, allocate, loading };
};