import { useMemo } from 'react';

const PROGRAMMES = ['Education', 'Food Relief', 'Healthcare', 'Transport', 'Administration'];

export default function AllocationTable({ transactions, activeFilter, onFilterChange }) {
  const filtered = useMemo(() =>
    transactions
      .filter(t => !activeFilter || t.programme === activeFilter)
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [transactions, activeFilter]
  );

  const fmt    = n  => '₹' + n.toLocaleString('en-IN');
  const fmtD   = d  => new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'2-digit' });

  return (
    <div>
      <div className="table-header-row">
        <h3>{activeFilter ? `${activeFilter} transactions` : 'All allocation transactions'}</h3>
        <select
          value={activeFilter}
          onChange={e => onFilterChange(e.target.value)}
        >
          <option value="">All programmes</option>
          {PROGRAMMES.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Programme</th>
            <th>Amount</th>
            <th>Type</th>
            <th>By</th>
            <th>Date</th>
            <th>FY</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              <td><span className={`badge prog-${t.programme.toLowerCase().replace(' ','-')}`}>{t.programme}</span></td>
              <td style={{ fontWeight: 500, color: t.type === 'expenditure' ? '#A32D2D' : '#3B6D11' }}>
                {t.type === 'expenditure' ? '− ' : '+ '}{fmt(t.amount)}
              </td>
              <td className="muted" style={{ textTransform: 'capitalize' }}>{t.type}</td>
              <td className="muted">{t.by}</td>
              <td className="muted">{fmtD(t.date)}</td>
              <td className="muted">{t.fy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}