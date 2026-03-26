import React from 'react';

export default function ExpenseDetail({ expense, onClose, isAdmin, onStatusChange }) {
  if (!expense) return null;

  return (
    <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100}}>
      <div style={{background:'white', padding:'2rem', borderRadius:'8px', width:'500px', maxWidth:'90%'}}>
        <h2 style={{marginTop:0}}>Expense Details</h2>
        <div style={{marginBottom:'1rem'}}><strong>Title:</strong> {expense.title}</div>
        <div style={{marginBottom:'1rem'}}><strong>Amount:</strong> ₹{expense.amount?.toLocaleString('en-IN')}</div>
        <div style={{marginBottom:'1rem'}}><strong>Category:</strong> {expense.category}</div>
        <div style={{marginBottom:'1rem'}}><strong>Code/Notes:</strong> {expense.notes || 'None'}</div>
        <div style={{marginBottom:'2rem'}}><strong>Status:</strong> {expense.status}</div>

        <div style={{display:'flex', gap:'1rem', justifyContent:'flex-end'}}>
          <button onClick={onClose} style={{padding:'8px 16px', border:'1px solid #ccc', background:'white', cursor:'pointer'}}>Close</button>
          {isAdmin && expense.status === 'pending' && (
            <>
              <button onClick={() => { onStatusChange(expense._id, 'approved'); onClose(); }} style={{padding:'8px 16px', background:'#1D9E75', color:'white', border:'none', cursor:'pointer'}}>Approve</button>
              <button onClick={() => { onStatusChange(expense._id, 'rejected'); onClose(); }} style={{padding:'8px 16px', background:'#E24B4A', color:'white', border:'none', cursor:'pointer'}}>Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
