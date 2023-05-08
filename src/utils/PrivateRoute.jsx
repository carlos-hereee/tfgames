import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../utils/context/AuthContext";

const PrivateRoute = () => {
  const { accessToken } = useContext(AuthContext);
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
