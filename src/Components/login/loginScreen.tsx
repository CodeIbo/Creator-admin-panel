import {useState } from "react";
import { auth } from "./firebase-config";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Button } from "../Custom/Button/Button";
import { ClassicTextInput } from "../Custom/Inputs/Inputs";
import './loginScreen.scss'
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const login = () => {
    userContext.login(auth, loginEmail, loginPassword);
    if(userContext.user){
      navigate('/dashboard')
    }
  };

  return (
    <section className="login-section container d-flex justify-content-center align-items-center">
      <div className="w-80 py-2 px-3 bg-tertiary-color shadow login-section__content">
        <h1>Login Screen</h1>
        <ClassicTextInput label="email" labelText="Email" value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value) } required={true} type="text"/>
        <ClassicTextInput label="password" labelText="Password" value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value) } required={true} type="password"/>
        <div className="d-flex justify-content-center"><Button clickFunction={login} name="Login" backgroundColorClass="bg-secondary" textColorClass="text-primary"></Button></div>
      </div>
    </section>
  );
};

export default LoginScreen;

