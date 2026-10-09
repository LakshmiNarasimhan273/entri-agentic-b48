import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Logged-in only pages (replaces protectRoute() from the original auth.js)
export function ProtectedRoute() {
  const session = useSelector((s) => s.auth.session);
  return session ? <Outlet /> : <Navigate to="/login" replace />;
}

// Login / register: redirect to dashboard if already logged in
export function PublicRoute() {
  const session = useSelector((s) => s.auth.session);
  return session ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
