import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../config/types";

type PrivateRoutesProps = {
  user: User | null;
};

function PrivateRoutes({ user }: PrivateRoutesProps) {
  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default PrivateRoutes;
