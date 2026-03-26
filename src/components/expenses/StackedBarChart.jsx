import React from 'react';

// Using a basic div chart as a fallback if real ChartJS isn't wrapping nicely right now.
export default function StackedBarChart({ data = {} }) {
  return (
    <div style={{height:'300px', display:'flex', alignItems:'center', justifyContent:'center', background:'#f4f3ec', borderRadius:'8px', color:'#6b6375'}}>
      <span>[Stacked Bar Chart Placeholder]</span>
    </div>
  );
}
