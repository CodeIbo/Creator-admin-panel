import LoginScreen from "./Components/login/loginScreen";
import "./App.css";
import {  User } from "firebase/auth";
import { useState } from "react";
import {  Navigate, Route, Routes  } from "react-router-dom";
import Dashboard from "./Components/Dashboard/dashboard";
import PrivateRoutes from "./Components/PrivateRoutes/PrivateRoutes";



function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginScreen updateUser={setUser}/>} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route element={<PrivateRoutes user={user}/>}>
          <Route
            path="/dashboard"
            element={<Dashboard user={user} setUser={setUser}/>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

