import { Navigate, Outlet } from "react-router-dom";
import type { PublicUser } from "../../config/types";

type PrivateRoutesProps = {
  user: PublicUser | null;
};

function PrivateRoutes({ user }: PrivateRoutesProps) {
  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default PrivateRoutes;
