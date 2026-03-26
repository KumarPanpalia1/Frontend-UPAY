import React from 'react';

export default function RecentDonations({ data = [] }) {
  return (
    <div style={{overflowX: 'auto'}}>
      <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
        <thead>
          <tr style={{borderBottom: '1px solid #e5e4e7'}}>
            <th style={{padding:'12px'}}>Donor</th>
            <th style={{padding:'12px'}}>Amount</th>
            <th style={{padding:'12px'}}>Mode</th>
            <th style={{padding:'12px'}}>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((d, i) => (
            <tr key={i} style={{borderBottom: '1px solid #f4f3ec'}}>
              <td style={{padding:'12px'}}>{d.donorName}</td>
              <td style={{padding:'12px', fontWeight:'500'}}>₹{d.amount?.toLocaleString('en-IN')}</td>
              <td style={{padding:'12px'}}>
                <span style={{background:'#f4f3ec', padding:'4px 8px', borderRadius:'12px', fontSize:'13px'}}>{d.mode}</span>
              </td>
              <td style={{padding:'12px', color:'#6b6375'}}>{new Date(d.date).toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'2-digit'})}</td>
            </tr>
          ))}
          {data.length === 0 && <tr><td colSpan="4" style={{padding:'12px', textAlign:'center', color:'#6b6375'}}>No recent donations</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
