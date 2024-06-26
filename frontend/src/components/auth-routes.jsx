import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoutes = () => {
  const { user } = useSelector(({ user }) => user);

  return user ? <Navigate to="/" /> : <Outlet />;
};
