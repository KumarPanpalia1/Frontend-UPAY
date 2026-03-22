import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import ExpenseTable from '../components/expenses/ExpenseTable';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseDetail from '../components/expenses/ExpenseDetail';
import SummaryCard from '../components/dashboard/SummaryCard';
import StackedBarChart from '../components/expenses/StackedBarChart';
import DonutChart from '../components/dashboard/DonutChart';
import { useExpenses } from '../hooks/useExpenses';
import './Expenses.css';

export default function Expenses() {
  const { user, isAdmin } = useAuth();
  const { expenses, addExpense, updateStatus, loading } = useExpenses();

  const [showForm,    setShowForm]    = useState(false);
  const [detailItem,  setDetailItem]  = useState(null);

  // Volunteers only see their own submissions
  const visible = isAdmin
    ? expenses
    : expenses.filter(e => e.submittedBy === user.name);

  const summary = useMemo(() => {
    const approved  = visible.filter(e => e.status === 'approved');
    const pending   = visible.filter(e => e.status === 'pending');
    const total     = approved.reduce((s, e) => s + e.amount, 0);
    const thisMonth = approved
      .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
      .reduce((s, e) => s + e.amount, 0);
    return { total, thisMonth, pendingCount: pending.length };
  }, [visible]);

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className="expenses-page">
      <div className="page-header">
        <div>
          <h1>Expenses</h1>
          <p>Submission, review &amp; approval</p>
        </div>
        <button className="btn primary" onClick={() => setShowForm(true)}>
          + Submit expense
        </button>
      </div>

      {/* KPI strip */}
      <div className="kpi-grid">
        <SummaryCard label="Total expenses"    value={`₹${summary.total.toLocaleString('en-IN')}`}     sub="All approved"          color="coral"  />
        <SummaryCard label="This month"        value={`₹${summary.thisMonth.toLocaleString('en-IN')}`} sub="Approved spend"        color="amber"  />
        <SummaryCard label="Pending approval"  value={summary.pendingCount}                             sub="Awaiting review"       color="amber"  />
        <SummaryCard label="Budget utilised"   value={`${budgetPct(summary.total)}%`}                  sub="Of total donations"    color="blue"   />
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="card">
          <h3>Monthly expenses by category</h3>
          <StackedBarChart data={expenses} />
        </div>
        <div className="card">
          <h3>Spend by category</h3>
          <DonutChart data={categoryBreakdown(expenses)} />
        </div>
      </div>

      {/* Alert banner — admin only, only when pending items exist */}
      {isAdmin && summary.pendingCount > 0 && (
        <PendingAlert expenses={expenses} />
      )}

      {/* Main table */}
      <div className="card">
        <ExpenseTable
          expenses={visible}
          isAdmin={isAdmin}
          onApprove={id => updateStatus(id, 'approved')}
          onReject={id  => updateStatus(id, 'rejected')}
          onView={item  => setDetailItem(item)}
        />
      </div>

      {showForm   && <ExpenseForm   onClose={() => setShowForm(false)}  onSave={addExpense} user={user} />}
      {detailItem && <ExpenseDetail item={detailItem} isAdmin={isAdmin}
                       onApprove={() => { updateStatus(detailItem.id,'approved'); setDetailItem(null); }}
                       onReject={() =>  { updateStatus(detailItem.id,'rejected'); setDetailItem(null); }}
                       onClose={() => setDetailItem(null)} />}
    </div>
  );
}

const budgetPct = (spent) => Math.round((spent / 284500) * 100 * 10) / 10;

function categoryBreakdown(expenses) {
  const colors = { Education:'#185FA5', Food:'#1D9E75', Medical:'#E24B4A', Transport:'#BA7517', Admin:'#888780' };
  const totals = {};
  expenses.filter(e => e.status === 'approved').forEach(e => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });
  return Object.entries(totals).map(([label, value]) => ({ label, value, color: colors[label] }));
}

function PendingAlert({ expenses }) {
  const pending  = expenses.filter(e => e.status === 'pending');
  const highVal  = pending.filter(e => e.amount >= 25000);
  return (
    <div className="alert-banner warning">
      <AlertIcon />
      <span>
        {pending.length} expense{pending.length > 1 ? 's' : ''} pending your approval
        {highVal.length > 0 && ` — including ${highVal.length} high-value item${highVal.length > 1 ? 's' : ''} over ₹25,000`}
      </span>
    </div>
  );
}