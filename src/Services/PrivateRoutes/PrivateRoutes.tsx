import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

function PrivateRoute() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
