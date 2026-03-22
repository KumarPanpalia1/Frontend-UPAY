import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import FundCard from '../components/funds/FundCard';
import AllocationForm from '../components/funds/AllocationForm';
import AllocationTable from '../components/funds/AllocationTable';
import GroupedBarChart from '../components/funds/GroupedBarChart';
import DonutChart from '../components/dashboard/DonutChart';
import SummaryCard from '../components/dashboard/SummaryCard';
import { useFunds } from '../hooks/useFunds';
import './FundAllocation.css';

export default function FundAllocation() {
  const { isAdmin } = useAuth();
  const { funds, transactions, allocate, loading } = useFunds();

  const [showForm,    setShowForm]    = useState(false);
  const [activeFilter, setFilter]    = useState('');   // programme name

  const summary = useMemo(() => {
    const totalRaised    = 284500;  // from donations context in real app
    const totalAllocated = funds.reduce((s, f) => s + f.allocated, 0);
    const totalSpent     = funds.reduce((s, f) => s + f.spent, 0);
    const surplus        = totalRaised - totalAllocated;
    const utilisationPct = Math.round((totalSpent / totalRaised) * 1000) / 10;
    const balance        = totalRaised - totalSpent;
    return { totalRaised, totalAllocated, totalSpent, surplus, utilisationPct, balance };
  }, [funds]);

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className="funds-page">
      <div className="page-header">
        <div>
          <h1>Fund allocation</h1>
          <p>How UPAY's funds are distributed across programmes</p>
        </div>
        {isAdmin && (
          <button className="btn primary" onClick={() => setShowForm(true)}>
            + Allocate funds
          </button>
        )}
      </div>

      {/* KPI strip */}
      <div className="kpi-grid">
        <SummaryCard label="Total raised"        value={`₹${summary.totalRaised.toLocaleString('en-IN')}`}    sub="All donations"         color="green"  />
        <SummaryCard label="Total allocated"     value={`₹${summary.totalAllocated.toLocaleString('en-IN')}`} sub={`${funds.length} programmes`} color="blue" />
        <SummaryCard label="Total spent"         value={`₹${summary.totalSpent.toLocaleString('en-IN')}`}     sub={`${summary.utilisationPct}% of raised`} color="coral" />
        <SummaryCard label="Unallocated surplus" value={`₹${summary.surplus.toLocaleString('en-IN')}`}        sub="Available to allocate" color="amber" />
      </div>

      {/* Overall utilisation bar */}
      <UtilisationBar pct={summary.utilisationPct} balance={summary.balance} />

      {/* Allocation form — admin only */}
      {isAdmin && showForm && (
        <AllocationForm
          funds={funds}
          onSave={allocate}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Fund cards */}
      <div className="fund-cards-grid">
        {funds.map(f => (
          <FundCard
            key={f.id}
            fund={f}
            selected={activeFilter === f.name}
            onClick={() => setFilter(prev => prev === f.name ? '' : f.name)}
          />
        ))}
      </div>

      {/* Charts row */}
      <div className="charts-row">
        <div className="card">
          <h3>Allocated vs spent by programme</h3>
          <GroupedBarChart funds={funds} />
        </div>
        <div className="card">
          <h3>Allocation share</h3>
          <DonutChart data={funds.map(f => ({
            label: f.name,
            value: f.allocated,
            color: f.color,
          }))} />
        </div>
      </div>

      {/* Transactions table */}
      <div className="card">
        <AllocationTable
          transactions={transactions}
          activeFilter={activeFilter}
          onFilterChange={setFilter}
        />
      </div>
    </div>
  );
}

function UtilisationBar({ pct, balance }) {
  const barColor = pct >= 80 ? '#E24B4A' : pct >= 60 ? '#BA7517' : '#185FA5';
  return (
    <div className="util-bar-wrap">
      <div className="util-bar-left">
        <span className="util-bar-label">Overall fund utilisation</span>
        <div className="util-bar-track-row">
          <div className="util-bar-track">
            <div className="util-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
          </div>
          <span className="util-bar-pct">{pct}% spent of total raised</span>
        </div>
      </div>
      <div className="util-bar-right">
        <div className="util-bar-balance">₹{balance.toLocaleString('en-IN')}</div>
        <div className="util-bar-note">remaining available balance</div>
      </div>
    </div>
  );
}