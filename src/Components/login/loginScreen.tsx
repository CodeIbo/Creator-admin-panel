import { useState } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const LoginScreen = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  onAuthStateChanged(auth, (currentUser) => {
    let sessionUserUID;
    try {
      sessionUserUID = JSON.parse(sessionStorage.getItem("user")!);
    } catch {
      sessionUserUID = null;
    }

    if (currentUser && currentUser.uid === sessionUserUID) {
      axios
        .post("http://localhost:8888/generate-token", {
          uid: sessionUserUID,
        })
        .then((response) => {
          signInWithCustomToken(auth, response.data.token).then((response) => {
            userContext.setUser(response.user);
          });
        })
        .then(() => navigate("/dashboard"));
    } else {
      sessionStorage.removeItem("user");
    }
  });

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
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          required
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    </>
  );
};

export default LoginScreen;

