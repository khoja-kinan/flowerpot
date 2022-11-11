import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const username = localStorage.getItem("Fusername");
  const co = localStorage.getItem("@@123@@");
  return allowedRoles === co ? (
    <Outlet />
  ) : username ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/dashboard/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
