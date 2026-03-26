const colorMap = {
  green: '#003C64',   // primary
  coral: '#F7AC2D',   // accent
  blue:  '#005086',   // primary-light
  amber: '#fcd34d',   // accent-light
  purple:'#534AB7',
  red:   '#E24B4A',
};

const trendColorMap = {
  up:      '#003C64',
  down:    '#E24B4A',
  warning: '#F7AC2D',
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