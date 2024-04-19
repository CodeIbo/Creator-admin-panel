import { Navigate, Route, Routes } from 'react-router';
import LoginScreen from './Pages/LoginScreen/LoginScreen';
import PrivateRoute from './Services/PrivateRoutes/PrivateRoutes';
import Dashboard from './Pages/Dashboard/Dashboard';
import AlertDialog from './Components/AlertDialog/AlertDialog';
import ErrorPage from './Pages/Error/ErrorPage';

function App() {
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
