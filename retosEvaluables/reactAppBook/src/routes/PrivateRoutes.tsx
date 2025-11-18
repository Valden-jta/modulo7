import { Navigate, Outlet } from "react-router-dom";

type PrivateRoutesProps = {
  user: unknown | null;
};

function PrivateRoutes({ user }: PrivateRoutesProps) {
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default PrivateRoutes;
