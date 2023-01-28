import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ user }: any) => {
  return user ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoutes;
