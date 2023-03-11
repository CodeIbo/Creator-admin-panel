import {useState } from "react";
import { auth } from "./firebase-config";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const LoginScreen = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const userContext = useContext(UserContext);

  const login = () => {
    userContext.login(auth, loginEmail, loginPassword);
  };

  return (
    <>
      <div>
        <h1>Login Screen</h1>
        <input
          type="email"
          placeholder="Email..."
          required
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          required
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    </>
  );
};

export default LoginScreen;

