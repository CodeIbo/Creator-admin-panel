import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signInWithCustomToken, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const LoginScreen = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [currentUser,setCurrentUser] = useState<User | null>(null)
  const navigate = useNavigate();
  const userContext = useContext(UserContext);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentUser(currentUser);
      
      try {
        const sessionUserUID = JSON.parse(sessionStorage.getItem("user")!);
        
        if (currentUser && currentUser.uid === sessionUserUID) {
          const response = await axios.post("http://localhost:8888/generate-token", {
            uid: sessionUserUID,
          });
  
          const authResponse = await signInWithCustomToken(auth, response.data.token);
          userContext.setUser(authResponse.user);
          navigate("/dashboard");
        } else {
          sessionStorage.removeItem("user");
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => unsubscribe();
  }, [auth]);




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

