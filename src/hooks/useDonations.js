import { useState, useEffect } from 'react';
import * as donationService from '../services/donationService';

const MOCK_DONATIONS = [
  { id:1,  donorName:'Rahul Sharma',   amount:12000, mode:'UPI',    date:'2026-03-20', purpose:'Education' },
  { id:2,  donorName:'Priya Mehta',    amount:8500,  mode:'Cash',   date:'2026-03-18', purpose:'Food relief' },
  { id:3,  donorName:'Amit Desai',     amount:25000, mode:'NEFT',   date:'2026-03-15', purpose:'Medical' },
  { id:4,  donorName:'Sunita Rao',     amount:5000,  mode:'UPI',    date:'2026-03-12', purpose:'Education' },
  { id:5,  donorName:'Vijay Kulkarni', amount:18000, mode:'Cheque', date:'2026-03-10', purpose:'General' },
  { id:6,  donorName:'Deepak Nair',    amount:50000, mode:'NEFT',   date:'2026-03-05', purpose:'Education' },
];

export const useDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    // setTimeout(() => { setDonations(MOCK_DONATIONS); setLoading(false); }, 400);
    // Real: 
    donationService.fetchDonations().then(res => setDonations(res.data)).finally(() => setLoading(false));
  }, []);

  const addDonation = (record) => {
    const newRecord = { ...record, id: Date.now() };
    setDonations(prev => [newRecord, ...prev]);
    // Real: donationService.create(record).then(r => setDonations(prev=>[r,...prev]));
  };

  const addMany = (records) => {
    const withIds = records.map((r, i) => ({ ...r, id: Date.now() + i }));
    setDonations(prev => [...withIds, ...prev]);
  };

  return { donations, addDonation, addMany, loading };
};