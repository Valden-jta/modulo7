import { Outlet } from "react-router-dom";

function Social() {
  return (
    <div>
      <h1>Sección Social</h1>
      {/* Aquí se renderizan amigos / grupos / foro */}
      <Outlet />
    </div>
  );
}

export default Social;