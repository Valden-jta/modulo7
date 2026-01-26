import { Outlet } from "react-router-dom";

/**
 * Social
 *
 * Contenedor raíz de la feature social.
 *
 * Actualmente solo maqueta el título y un `<Outlet />` donde se renderizan
 * las subrutas `SocialFriends`, `SocialGroups` y `SocialForum`.
 *
 * TODO (feature Social):
 * - Definir el modelo de datos para amigos, grupos y foro.
 * - Conectar con la API de `group`, `group_member`, `thread` y `message`.
 * - Mostrar un feed de actividad social relevante para el usuario.
 */
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
