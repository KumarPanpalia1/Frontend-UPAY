import React from 'react';

export default function PendingExpenses({ data = [] }) {
  return (
    <div style={{overflowX: 'auto'}}>
      <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
        <thead>
          <tr style={{borderBottom: '1px solid #e5e4e7'}}>
            <th style={{padding:'12px'}}>Title</th>
            <th style={{padding:'12px'}}>Amount</th>
            <th style={{padding:'12px'}}>Category</th>
            <th style={{padding:'12px'}}>Submitted By</th>
            <th style={{padding:'12px'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} style={{borderBottom: '1px solid #f4f3ec'}}>
              <td style={{padding:'12px', maxWidth:'150px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{d.title}</td>
              <td style={{padding:'12px', fontWeight:'500', color: d.amount > 25000 ? '#E24B4A' : 'inherit'}}>
                {d.amount > 25000 && '▲ '}₹{d.amount?.toLocaleString('en-IN')}
              </td>
              <td style={{padding:'12px'}}>
                <span style={{background:'#f4f3ec', padding:'4px 8px', borderRadius:'12px', fontSize:'13px'}}>{d.category}</span>
              </td>
              <td style={{padding:'12px'}}>{d.submittedBy?.name || 'Unknown'}</td>
              <td style={{padding:'12px'}}>
                <button style={{marginRight:'8px', padding:'4px 12px', background:'#1D9E75', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>Approve</button>
                <button style={{padding:'4px 12px', background:'#E24B4A', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>Reject</button>
              </td>
            </tr>
          ))}
          {data.length === 0 && <tr><td colSpan="5" style={{padding:'12px', textAlign:'center', color:'#6b6375'}}>No pending expenses</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
