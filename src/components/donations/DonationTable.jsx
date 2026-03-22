import { useState, useMemo } from 'react';

const MODES = ['All', 'UPI', 'Cash', 'NEFT', 'Cheque'];
const PAGE_SIZE = 8;

const modeBadgeClass = { UPI: 'badge-blue', Cash: 'badge-green', NEFT: 'badge-amber', Cheque: 'badge-purple' };

export default function DonationTable({ donations }) {
  const [search, setSearch]   = useState('');
  const [mode,   setMode]     = useState('All');
  const [sort,   setSort]     = useState('date-desc');
  const [page,   setPage]     = useState(1);

  const filtered = useMemo(() => {
    return donations
      .filter(d => {
        const matchMode = mode === 'All' || d.mode === mode;
        const matchName = d.donorName.toLowerCase().includes(search.toLowerCase());
        return matchMode && matchName;
      })
      .sort((a, b) => {
        if (sort === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sort === 'date-asc')  return new Date(a.date) - new Date(b.date);
        if (sort === 'amt-desc')  return b.amount - a.amount;
        return a.amount - b.amount;
      });
  }, [donations, search, mode, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const initials = name => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const fmtDate  = d => new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'2-digit' });
  const fmtAmt   = n => '₹' + n.toLocaleString('en-IN');

  return (
    <div>
      {/* Mode tabs */}
      <div className="tab-row">
        {MODES.map(m => (
          <button key={m} className={`tab ${mode === m ? 'active' : ''}`}
            onClick={() => { setMode(m); setPage(1); }}>
            {m}
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <input
          type="text" placeholder="Search donor name..."
          value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amt-desc">Highest amount</option>
          <option value="amt-asc">Lowest amount</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Donor</th>
              <th>Amount</th>
              <th>Mode</th>
              <th>Date</th>
              <th>Purpose</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(d => (
              <tr key={d.id}>
                <td>
                  <div className="donor-cell">
                    <span className="avatar">{initials(d.donorName)}</span>
                    {d.donorName}
                  </div>
                </td>
                <td className="amount">{fmtAmt(d.amount)}</td>
                <td><span className={`badge ${modeBadgeClass[d.mode]}`}>{d.mode}</span></td>
                <td className="muted">{fmtDate(d.date)}</td>
                <td className="muted">{d.purpose}</td>
                <td><button className="link-btn">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>{filtered.length} records</span>
        <div className="page-btns">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i+1} className={page === i+1 ? 'active' : ''} onClick={() => setPage(i+1)}>
              {i+1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}