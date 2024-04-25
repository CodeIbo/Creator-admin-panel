import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router';
import { useCookies } from 'react-cookie';

import LoginScreen from './Pages/LoginScreen/LoginScreen';
import PrivateRoute from './Services/PrivateRoutes/PrivateRoutes';
import Dashboard from './Pages/Dashboard/Dashboard';
import AlertDialog from './Components/AlertDialog/AlertDialog';
import ErrorPage from './Pages/Error/ErrorPage';
import useAuth from './Services/Hooks/useAuth';
import { useAlert } from './Services/Context/Alert/AlertProvider';

function App() {
  const [cookies] = useCookies(['user']);
  const prevRoute = useLocation();
  const navigation = useNavigate();
  const { setAuth } = useAuth();
  const { triggerAlert } = useAlert();
  const checkAuth = async () => {
    if (cookies.user && cookies.user.accessToken) {
      setAuth({
        email: cookies.user.email,
        accessToken: cookies.user.accessToken,
      });
      triggerAlert('Welcome Back', 'success');
      if (prevRoute.pathname.includes('login')) {
        navigation('/dashboard');
      } else {
        navigation(prevRoute);
      }
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <AlertDialog />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
