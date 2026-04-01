import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Pages
import Home from '../pages/Home';
import Directory from '../pages/Directory';
import StartupProfile from '../pages/StartupProfile';
import FounderProfile from '../pages/FounderProfile';
import Submit from '../pages/Submit';
import Login from '../pages/Login';

// Admin
import AdminLayout from '../pages/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Verification from '../pages/admin/Verification';
import ManageStartups from '../pages/admin/ManageStartups';
import Analytics from '../pages/admin/Analytics';

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ requiredRoles, children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: '#1A6B3A', borderTopColor: 'transparent' }} />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function GuestOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/startups', element: <Directory /> },
      { path: '/startups/:slug', element: <StartupProfile /> },
      { path: '/founders/:slug', element: <FounderProfile /> },
      {
        path: '/submit',
        element: (
          <ProtectedRoute>
            <Submit />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <GuestOnly>
            <Login />
          </GuestOnly>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRoles={['admin', 'reviewer']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'verification', element: <Verification /> },
      {
        path: 'startups',
        element: (
          <ProtectedRoute requiredRoles={['admin']}>
            <ManageStartups />
          </ProtectedRoute>
        ),
      },
      { path: 'analytics', element: <Analytics /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
