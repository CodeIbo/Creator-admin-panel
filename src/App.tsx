import { Navigate, Route, Routes } from 'react-router';
import LoginScreen from './Pages/LoginScreen/LoginScreen';
import PrivateRoute from './Services/PrivateRoutes/PrivateRoutes';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
