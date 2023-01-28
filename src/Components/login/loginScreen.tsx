import { useState } from "react";
import { auth } from "./firebase-config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginScreen = ({ updateUser }: any) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    let sessionUserUID
    try{
        sessionUserUID = JSON.parse(sessionStorage.getItem("user")!);
    }
    catch{
        sessionUserUID = null  
    }
    
    if (currentUser && currentUser.uid === sessionUserUID) {
      axios
        .post("http://localhost:8888/generate-token", {
          uid: sessionUserUID,
        })
        .then((response) => {
          signInWithCustomToken(auth, response.data.token).then((response) => {
            updateUser(response.user);
          });
        })
        .then(() => navigate("/dashboard"));
    } else {
      sessionStorage.removeItem("user");
    }
  });

  const login = async () => {
    await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    )
      .then((response) => {
        updateUser(response.user);
        sessionStorage.setItem("user", JSON.stringify(response.user.uid));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
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

