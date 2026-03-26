const colorMap = {
  green: '#1D9E75',
  coral: '#D85A30',
  blue:  '#185FA5',
  amber: '#BA7517',
  purple:'#534AB7',
  red:   '#E24B4A',
};

const trendColorMap = {
  up:      '#1D9E75',
  down:    '#E24B4A',
  warning: '#BA7517',
  neutral: '#888780',
};

export default function SummaryCard({
  label,
  value,
  sub,
  subVariant = 'default',
  trend,
  trendDir = 'neutral',
  color,
  icon,
  urgent = false
}) {
  const subClass = subVariant === 'warn' ? 'kpi-sub-warn' : subVariant === 'danger' ? 'kpi-sub-danger' : 'kpi-sub';
  const trendColor = trendColorMap[trendDir];

  return (
    <div className={`kpi-card ${urgent ? 'urgent' : ''}`}>
      <div className="kpi-top">
        <div className="kpi-icon" style={{ background: colorMap[color] }}>
          {icon}
        </div>
        {trend && (
          <div className="kpi-trend" style={{ background: trendColor }}>
            {trend}
          </div>
        )}
      </div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <div className={subClass}>{sub}</div>
    </div>
  );
}