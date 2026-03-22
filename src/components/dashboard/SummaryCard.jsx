const colorMap = {
  green: '#1D9E75',
  coral: '#D85A30',
  blue:  '#185FA5',
  amber: '#BA7517',
};

export default function SummaryCard({ label, value, sub, color }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">
        <span className="kpi-dot" style={{ background: colorMap[color] }} />
        {label}
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-sub">{sub}</div>
    </div>
  );
}