import LoginScreen from "./Components/login/loginScreen";
import {  Navigate, Route, Routes  } from "react-router-dom";
import Dashboard from "./Components/Dashboard/dashboard";
import PrivateRoutes from "./Components/PrivateRoutes/PrivateRoutes";
import { UserContextProvider } from "./Context/UserContext";



function App() {
  
  return (
    <UserContextProvider>
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
    </UserContextProvider>
  );
}

export default App;

