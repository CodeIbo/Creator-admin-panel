import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { createContext, useState } from "react";
import { childrenInterface } from "../Interfaces/childrenInterface";
import { userContextInterface } from "../Interfaces/userContextInterface";
import { Auth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Components/login/firebase-config";

export const UserContext = createContext<userContextInterface>({
    user: null,
    setUser: () => {},
    login : () => {},
    logout: () => {}
})

export const UserContextProvider = ({children}:childrenInterface) =>{
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const login = async (auth:Auth,loginEmail:string,loginPassword:string) => {
        await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        )
          .then((response) => {
            setUser(response.user);
            sessionStorage.setItem("user", JSON.stringify(response.user.uid));
            navigate("/dashboard");
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const logout = async () => {
        await signOut(auth);
        sessionStorage.removeItem('user')
        setUser(null)
    };

    const value ={
        user: user,
        setUser: setUser,
        login: login,
        logout: logout
    }



    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}