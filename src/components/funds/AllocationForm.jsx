import React, { useState } from 'react';

export default function AllocationForm({ onClose, onSave, programmes = [] }) {
  const [programme, setProgramme] = useState('');
  const [amount, setAmount] = useState('');
  const [fy, setFy] = useState('2024-25');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!programme || !amount) return;
    onSave({ programme, amount: Number(amount), fy });
    onClose();
  };

  return (
    <div style={{background: '#f4f3ec', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem'}}>
      <h3 style={{marginTop: 0}}>Allocate new funds</h3>
      <form onSubmit={handleSubmit} style={{display:'flex', gap:'1rem', alignItems:'flex-end'}}>
        <div style={{flex: 1}}>
          <label style={{display:'block', fontSize:'14px', marginBottom:'4px'}}>Programme Name</label>
          <input 
            type="text" 
            value={programme} 
            onChange={(e) => setProgramme(e.target.value)} 
            placeholder="e.g. Footpathshala"
            style={{width:'100%', padding:'8px 12px', border:'1px solid #e5e4e7', borderRadius:'4px', boxSizing:'border-box'}}
            required
          />
        </div>
        <div style={{flex: 1}}>
          <label style={{display:'block', fontSize:'14px', marginBottom:'4px'}}>Amount (₹)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            style={{width:'100%', padding:'8px 12px', border:'1px solid #e5e4e7', borderRadius:'4px', boxSizing:'border-box'}}
            required
          />
        </div>
        <div>
          <label style={{display:'block', fontSize:'14px', marginBottom:'4px'}}>Financial Year</label>
          <select 
            value={fy} 
            onChange={(e) => setFy(e.target.value)}
            style={{width:'100%', padding:'8px 12px', border:'1px solid #e5e4e7', borderRadius:'4px', boxSizing:'border-box'}}
          >
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
          </select>
        </div>
        <div style={{display:'flex', gap:'8px'}}>
          <button type="button" onClick={onClose} style={{padding:'8px 16px', border:'1px solid #e5e4e7', background:'white', borderRadius:'4px', cursor:'pointer'}}>Cancel</button>
          <button type="submit" style={{padding:'8px 16px', border:'none', background:'#185FA5', color:'white', borderRadius:'4px', cursor:'pointer'}}>Allocate</button>
        </div>
      </form>
    </div>
  );
}
