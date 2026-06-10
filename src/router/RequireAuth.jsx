import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthed } from '@/features/auth/authSlice';

export const RequireAuth = ({ children }) => {
  const authed = useSelector(selectIsAuthed);
  const loc = useLocation();
  if (!authed) return <Navigate to={`/auth/login?next=${encodeURIComponent(loc.pathname)}`} replace />;
  return children;
};
