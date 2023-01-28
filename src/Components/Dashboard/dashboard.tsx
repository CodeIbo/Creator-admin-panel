import { signOut } from "firebase/auth";
import { auth } from "../login/firebase-config";
import axios from 'axios';
import { useEffect } from "react";


const Dashboard = ({ user,setUser }: any) => {
  const logout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('user')
    setUser(null)
  };
  const requestAPI = async () => {
    try {
      const res = await axios.get('http://localhost:8888/posts');
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    requestAPI();
  }, []);
  return (
    <>
      <button onClick={logout}>signOut</button>
      <h2>Login User: {user?.email} </h2>
    </>
  );
};

export default Dashboard;

