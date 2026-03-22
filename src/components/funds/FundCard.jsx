const utilStatus = (pct) => {
  if (pct >= 80) return { label: 'Critical', cls: 'badge-critical' };
  if (pct >= 60) return { label: 'Review',   cls: 'badge-warning'  };
  return              { label: 'On track',  cls: 'badge-success'  };
};

const utilColor = (pct) => pct >= 80 ? '#E24B4A' : pct >= 60 ? '#BA7517' : '#185FA5';

export default function FundCard({ fund, selected, onClick }) {
  const pct       = fund.allocated > 0 ? Math.round((fund.spent / fund.allocated) * 100) : 0;
  const remaining = fund.allocated - fund.spent;
  const status    = utilStatus(pct);
  const fmt       = n => '₹' + n.toLocaleString('en-IN');

  return (
    <div className={`fund-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="fund-card-header">
        <span className="fund-name">{fund.name}</span>
        <span className={`badge ${status.cls}`}>{status.label}</span>
      </div>

      <p className="fund-desc">{fund.desc}</p>

      <div className="progress-section">
        <div className="progress-labels">
          <span>{pct}% utilised</span>
          <span>{fmt(fund.spent)} of {fmt(fund.allocated)}</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${pct}%`, background: utilColor(pct) }}
          />
        </div>
      </div>

      <div className="fund-stats">
        <div className="fund-stat">
          <span className="stat-label">Allocated</span>
          <span className="stat-value">{fmt(fund.allocated)}</span>
        </div>
        <div className="fund-stat">
          <span className="stat-label">Spent</span>
          <span className="stat-value">{fmt(fund.spent)}</span>
        </div>
        <div className="fund-stat">
          <span className="stat-label">Remaining</span>
          <span className="stat-value" style={{ color: remaining < 5000 ? '#A32D2D' : 'inherit' }}>
            {fmt(remaining)}
          </span>
        </div>
      </div>
    </div>
  );
}