import { useAuth } from '../context/AuthContext';
import SummaryCard from '../components/dashboard/SummaryCard';
import LineChart from '../components/dashboard/LineChart';
import DonutChart from '../components/dashboard/DonutChart';
import RecentDonations from '../components/dashboard/RecentDonations';
import PendingExpenses from '../components/dashboard/PendingExpenses';
import FundAllocation from '../components/dashboard/FundAllocation';
import { useDashboardData } from '../hooks/useDashboardData';
import './Dashboard.css';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const { summary, monthly, categories, recentDonations, pendingExpenses, funds, loading } =
    useDashboardData();

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-header-text">
          <h1>Finance Overview</h1>
          <p>Welcome back, {user?.name || 'Admin'}!</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn-primary" onClick={() => alert('Excel Import functionality to be integrated for Nagpur Expenses struct.')}>
            + Import Excel
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <SummaryCard
          label="Total donations"
          value={`₹${summary.totalDonations.toLocaleString('en-IN')}`}
          sub="+12% vs last month"
          color="green"
        />
        <SummaryCard
          label="Total expenses"
          value={`₹${summary.totalExpenses.toLocaleString('en-IN')}`}
          sub="+4% vs last month"
          color="coral"
        />
        <SummaryCard
          label="Available balance"
          value={`₹${summary.balance.toLocaleString('en-IN')}`}
          sub={`${summary.balancePct}% of funds unused`}
          color="blue"
        />
        {isAdmin && (
          <SummaryCard
            label="Pending approvals"
            value={summary.pendingCount}
            sub="Expenses awaiting review"
            color="amber"
          />
        )}
      </div>

      {/* Charts row */}
      <div className="charts-row">
        <div className="card">
          <h3>Monthly donations vs expenses</h3>
          <LineChart data={monthly} />
        </div>
        <div className="card">
          <h3>Expense by category</h3>
          <DonutChart data={categories} />
        </div>
      </div>

      {/* Bottom row — role-dependent */}
      <div className="bottom-row">
        <div className="card">
          <h3>Recent donations</h3>
          <RecentDonations data={recentDonations} />
        </div>
        {isAdmin
          ? <div className="card"><h3>Pending expenses</h3><PendingExpenses data={pendingExpenses} /></div>
          : <div className="card"><h3>Fund allocation</h3><FundAllocation data={funds} /></div>
        }
      </div>
    </div>
  );
}