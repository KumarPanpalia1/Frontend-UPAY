import { useState, useMemo } from 'react';

const STATUSES   = ['All', 'Pending', 'Approved', 'Rejected'];
const PAGE_SIZE  = 8;
const HIGH_VALUE = 25000;

export default function ExpenseTable({ expenses, isAdmin, onApprove, onReject, onView }) {
  const [tab,    setTab]    = useState('All');
  const [search, setSearch] = useState('');
  const [cat,    setCat]    = useState('');
  const [sort,   setSort]   = useState('date-desc');
  const [page,   setPage]   = useState(1);

  const filtered = useMemo(() => {
    return expenses
      .filter(e => {
        const tabOk    = tab === 'All' || e.status === tab.toLowerCase();
        const catOk    = !cat || e.category === cat;
        const searchOk = e.title.toLowerCase().includes(search.toLowerCase()) ||
                         e.submittedBy.toLowerCase().includes(search.toLowerCase());
        return tabOk && catOk && searchOk;
      })
      .sort((a, b) => {
        if (sort === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sort === 'amt-desc')  return b.amount - a.amount;
        return a.amount - b.amount;
      });
  }, [expenses, tab, search, cat, sort]);

  const pages    = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  const fmt      = n => '₹' + n.toLocaleString('en-IN');
  const fmtDate  = d => new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'2-digit' });

  return (
    <div>
      {/* Status tabs */}
      <div className="tab-row">
        {STATUSES.map(s => (
          <button key={s} className={`tab ${tab===s?'active':''}`}
            onClick={() => { setTab(s); setPage(1); }}>
            {s}
            {s !== 'All' && (
              <span className="tab-count">
                {expenses.filter(e => e.status === s.toLowerCase()).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <input type="text" placeholder="Search title or submitter..."
          value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select value={cat} onChange={e => { setCat(e.target.value); setPage(1); }}>
          <option value="">All categories</option>
          {['Education','Food','Medical','Transport','Admin'].map(c =>
            <option key={c}>{c}</option>
          )}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="date-desc">Newest first</option>
          <option value="amt-desc">Highest amount</option>
          <option value="amt-asc">Lowest amount</option>
        </select>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Submitted by</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map(e => (
            <tr key={e.id} className={e.amount >= HIGH_VALUE && e.status==='pending' ? 'high-value-row' : ''}>
              <td>
                {e.amount >= HIGH_VALUE && e.status==='pending' && (
                  <span className="flag-icon" title="High value">▲</span>
                )}
                {e.title}
              </td>
              <td className={`amount ${e.amount >= HIGH_VALUE ? 'high-value' : ''}`}>
                {fmt(e.amount)}
              </td>
              <td><span className={`badge cat-${e.category.toLowerCase()}`}>{e.category}</span></td>
              <td className="muted">{e.submittedBy}</td>
              <td className="muted">{fmtDate(e.date)}</td>
              <td><span className={`badge status-${e.status}`}>{e.status}</span></td>
              <td>
                {isAdmin && e.status === 'pending' ? (
                  <div className="action-group">
                    <button className="btn approve" onClick={() => onApprove(e.id)}>Approve</button>
                    <button className="btn reject"  onClick={() => onReject(e.id)}>Reject</button>
                  </div>
                ) : (
                  <button className="btn" onClick={() => onView(e)}>View</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <span>{filtered.length} records</span>
        <div className="page-btns">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i+1} className={page===i+1?'active':''} onClick={() => setPage(i+1)}>
              {i+1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}