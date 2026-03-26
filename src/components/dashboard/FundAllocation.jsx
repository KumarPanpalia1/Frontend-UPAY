import React from 'react';

export default function FundAllocation({ data = [] }) {
  // Horizontal bar simulation
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      {data.map((fund, i) => {
        const pct = Math.min(100, Math.round((fund.spent / fund.allocated) * 100)) || 0;
        return (
          <div key={i}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'4px', fontSize:'14px'}}>
              <strong>{fund.name}</strong>
              <span style={{color: '#6b6375'}}>{pct}% spent</span>
            </div>
            <div style={{height:'12px', background:'#e5e4e7', borderRadius:'6px', overflow:'hidden'}}>
              <div style={{height:'100%', width:`${pct}%`, background: fund.colour || '#185FA5'}} />
            </div>
            <div style={{fontSize:'12px', color:'#6b6375', marginTop:'4px'}}>
              ₹{fund.spent?.toLocaleString('en-IN')} / ₹{fund.allocated?.toLocaleString('en-IN')}
            </div>
          </div>
        );
      })}
      {data.length === 0 && <div style={{textAlign:'center', color:'#6b6375', padding:'1rem'}}>No fund data available</div>}
    </div>
  );
}
