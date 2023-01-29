import axios from 'axios';
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import NavigationBar from './navigation/Navigation';
import { UpperBar } from './upper-bar/UpperBar';
import './dashboard.scss';

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const logout = () => {
    userContext.logout();
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
      <UpperBar></UpperBar>
      <main>
        <NavigationBar></NavigationBar>
      </main>
      <h2>Login User: {userContext.user?.email} </h2>
    </>
  );
};

export default Dashboard;

