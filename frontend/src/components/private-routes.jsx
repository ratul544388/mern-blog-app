import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const { user } = useSelector(({ user }) => user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};
