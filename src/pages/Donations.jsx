import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import DonationTable from '../components/donations/DonationTable';
import DonationForm from '../components/donations/DonationForm';
import ExcelImport from '../components/donations/ExcelImport';
import SummaryCard from '../components/dashboard/SummaryCard';
import LineChart from '../components/dashboard/LineChart';
import DonutChart from '../components/dashboard/DonutChart';
import { useDonations } from '../hooks/useDonations';
import './Donations.css';

export default function Donations() {
  const { isAdmin } = useAuth();
  const { donations, addDonation, addMany, loading } = useDonations();

  const [showForm,   setShowForm]   = useState(false);
  const [showImport, setShowImport] = useState(false);

  const summary = useMemo(() => {
    const total     = donations.reduce((s, d) => s + d.amount, 0);
    const thisMonth = donations
      .filter(d => new Date(d.date).getMonth() === new Date().getMonth())
      .reduce((s, d) => s + d.amount, 0);
    const donors = new Set(donations.map(d => d.donorName)).size;
    const avg    = donations.length ? Math.round(total / donations.length) : 0;
    return { total, thisMonth, donors, avg };
  }, [donations]);

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className="donations-page">
      <div className="page-header">
        <div>
          <h1>Donations</h1>
          <p>All recorded donations · UPAY NGO</p>
        </div>
        {isAdmin && (
          <div className="header-actions">
            <button onClick={() => setShowImport(true)}>Import Excel</button>
            <button className="primary" onClick={() => setShowForm(true)}>+ Add donation</button>
          </div>
        )}
      </div>

      {/* KPI strip */}
      <div className="kpi-grid">
        <SummaryCard label="Total collected"  value={`₹${summary.total.toLocaleString('en-IN')}`}     sub="All time"              color="blue"  />
        <SummaryCard label="This month"        value={`₹${summary.thisMonth.toLocaleString('en-IN')}`} sub="Current month"         color="green" />
        <SummaryCard label="Total donors"      value={summary.donors}                                  sub="Unique donors"         color="purple"/>
        <SummaryCard label="Avg donation"      value={`₹${summary.avg.toLocaleString('en-IN')}`}       sub="Per transaction"       color="amber" />
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="card">
          <h3>Donation trend — last 6 months</h3>
          <LineChart data={monthlyData(donations)} singleSeries />
        </div>
        <div className="card">
          <h3>By payment mode</h3>
          <DonutChart data={modeBreakdown(donations)} />
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <DonationTable donations={donations} />
      </div>

      {/* Modals */}
      {showForm   && <DonationForm onClose={() => setShowForm(false)}   onSave={addDonation} />}
      {showImport && <ExcelImport  onClose={() => setShowImport(false)} onImport={addMany}   />}
    </div>
  );
}

/* Helper — group donations by month for the bar chart */
function monthlyData(donations) {
  const months = ['Oct','Nov','Dec','Jan','Feb','Mar'];
  // in real usage, compute from actual dates
  return {
    labels: months,
    datasets: [{ label: 'Donations', data: [38000,42000,51000,47000,55000,61000],
      backgroundColor: '#185FA5', borderRadius: 4 }],
  };
}

/* Helper — count by payment mode for donut */
function modeBreakdown(donations) {
  const counts = {};
  donations.forEach(d => { counts[d.mode] = (counts[d.mode] || 0) + 1; });
  const colors = { UPI:'#185FA5', Cash:'#1D9E75', NEFT:'#BA7517', Cheque:'#534AB7' };
  return Object.entries(counts).map(([label, value]) => ({
    label, value, color: colors[label] || '#888',
  }));
}