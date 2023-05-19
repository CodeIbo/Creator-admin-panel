import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const PrivateRoutes = () => {
  const {user} = useContext(UserContext);
  const location = useLocation();
  return user ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>;
};

export default PrivateRoutes;
