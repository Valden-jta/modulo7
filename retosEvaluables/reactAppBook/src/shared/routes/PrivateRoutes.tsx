/**
 * PrivateRoutes
 *
 * Componente "guard" para proteger rutas privadas.
 *
 * - Si **no hay usuario** (`user === null`), redirige automáticamente a `/`.
 * - Si **hay usuario**, renderiza el `<Outlet />` con la ruta hija que corresponda.
 *
 * Se usa como envoltorio en `PublicRoutes` para todas las rutas que requieren autenticación.
 */

import { Navigate, Outlet } from "react-router-dom";
import type { PublicUser } from "../../features/user/types/types";

type PrivateRoutesProps = {
  user: PublicUser | null;
};
function PrivateRoutes({ user }: PrivateRoutesProps) {
  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default PrivateRoutes;
