import { onAuthStateChanged, signInWithCustomToken, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { childrenInterface } from "../Interfaces/childrenInterface";
import { userContextInterface } from "../Interfaces/userContextInterface";
import { Auth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../Components/login/firebase-config";
import axios from "axios";
import Cookies from "universal-cookie";

export const UserContext = createContext<userContextInterface>({
    user: null,
    setUser: () => {},
    login : () => {},
    logout: () => {}
})

export const UserContextProvider = ({children}:childrenInterface) =>{
    const [user, setUser] = useState<User | null>(null);
    const cookies = new Cookies();
    const navigation = useNavigate()
    const location = useLocation();

    const expTime = (expTime=3600) =>{
      let now = new Date()
      let time = now.getTime()
      time += expTime * 1000
      now.setTime(time)
      return now
    }
    useEffect(() => {
      console.log(location)
      let userCookies = cookies.get('user');
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

        if (userCookies) {
          await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_API_KEY}`,{
            grant_type: 'refresh_token',
            refresh_token: userCookies
          },{
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response) =>{
            cookies.set('user',response.data['refresh_token'],{
              expires: expTime(response.data['expires_in'])
            })
            setUser(currentUser)
            navigation(location.pathname,{replace:true})
            
          }).catch((error)=>console.log(error))
          
          
        } else {
          cookies.remove('user');
        }
       
      });
      return () => unsubscribe();
    }, []);

    const login = async (auth:Auth,loginEmail:string,loginPassword:string) => {
        await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        )
          .then((response) => {
            setUser(response.user);
            cookies.set('user',response.user.refreshToken,{
              expires: expTime()
            })
            navigation('/dashboard')
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const logout = async () => {
        await signOut(auth);
        navigation('/login')
        cookies.remove('user');
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