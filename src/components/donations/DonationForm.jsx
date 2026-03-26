import React, { useState } from 'react';

export default function DonationForm({ onClose, onSave }) {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState('UPI');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [purpose, setPurpose] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ donorName, amount: Number(amount), mode, date, purpose });
    onClose();
  };

  return (
    <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{background:'white', padding:'2rem', borderRadius:'8px', width:'400px', maxWidth:'90%'}}>
        <h2 style={{marginTop:0}}>Add Donation</h2>
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
          <input type="text" placeholder="Donor Name" value={donorName} onChange={e=>setDonorName(e.target.value)} required style={{padding:'8px'}} />
          <input type="number" placeholder="Amount (₹)" value={amount} onChange={e=>setAmount(e.target.value)} required style={{padding:'8px'}} />
          <select value={mode} onChange={e=>setMode(e.target.value)} style={{padding:'8px'}}>
            <option value="UPI">UPI</option>
            <option value="NEFT">NEFT</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
          </select>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} required style={{padding:'8px'}} />
          <input type="text" placeholder="Purpose" value={purpose} onChange={e=>setPurpose(e.target.value)} style={{padding:'8px'}} />
          <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
            <button type="button" onClick={onClose} style={{flex:1, padding:'8px'}}>Cancel</button>
            <button type="submit" style={{flex:1, padding:'8px', background:'#1D9E75', color:'white', border:'none'}}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
