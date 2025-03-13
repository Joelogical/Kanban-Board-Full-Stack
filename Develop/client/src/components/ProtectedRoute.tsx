import { Navigate, Outlet } from "react-router-dom";
import Auth from "../utils/auth";

const ProtectedRoute = () => {
  return Auth.loggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
