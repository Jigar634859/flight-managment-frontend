import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAdminAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return children;
}