import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export const AdminRoutes = () => {
  const { user } = useSelector(({ user }) => user);

  return user?.role === "ADMIN" ? <Outlet /> : <Navigate to="/" />;
};
