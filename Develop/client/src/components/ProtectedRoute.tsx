import { Navigate, Outlet } from "react-router-dom";
import auth from "../utils/auth";

const ProtectedRoute = () => {
  if (!auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
