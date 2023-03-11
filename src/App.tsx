import LoginScreen from "./Components/login/loginScreen";
import {  Navigate, Route, Routes  } from "react-router-dom";
import Dashboard from "./Components/Dashboard/dashboard";
import PrivateRoutes from "./Components/PrivateRoutes/PrivateRoutes";





function App() {
  
  return (
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<PrivateRoutes/>}>
          <Route
            path="/dashboard/*"
            element={<Dashboard />}
          />
        </Route>
      </Routes>
  );
}

export default App;

