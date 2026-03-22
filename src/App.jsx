import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/common/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Donations from './pages/Donations';
import Expenses from './pages/Expenses';
import FundAllocation from './pages/FundAllocation';

const ProtectedLayout = ({ children, adminOnly }) => (
  <ProtectedRoute adminOnly={adminOnly}>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/donations" element={<ProtectedLayout><Donations /></ProtectedLayout>} />
          <Route path="/expenses"  element={<ProtectedLayout><Expenses /></ProtectedLayout>} />
          <Route path="/funds"     element={<ProtectedLayout><FundAllocation /></ProtectedLayout>} />
          <Route path="*"          element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}