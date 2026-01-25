import type { PublicUser } from "../features/user/types/types";

import Menu from "./Menu";
import MenuButtons from "../shared/ui/navigation/MenuButtons";
import MenuUser from "../features/user/components/MenuUser";
import Logo from "../shared/ui/Logo";

type HeaderProps = {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
  user: PublicUser | null;
  onLogOut: () => void;
};

/**
 * Header
 *
 * Barra superior fija de la aplicación.
 *
 * Responsabilidades:
 * - Mostrar el **logo** cuando no hay usuario autenticado.
 * - Mostrar los **botones de menú** para abrir/cerrar el sidebar cuando el usuario está logueado.
 * - Renderizar el menú principal (`Menu`) y el menú de usuario (`MenuUser`).
 * - Delegar en `onLogOut` el cierre de sesión cuando el usuario pulsa sobre la acción correspondiente.
 *
 * Props:
 * - `onToggleSidebar`: función que alterna entre sidebar colapsado/expandido.
 * - `isCollapsed`: indica si el sidebar está actualmente colapsado.
 * - `user`: usuario autenticado o `null` si no hay sesión.
 * - `onLogOut`: callback que se ejecuta al pedir cierre de sesión.
 */
function Header(props: HeaderProps) {
  const { onToggleSidebar, isCollapsed, user, onLogOut } = props;

  return (
    <>
      <header
        className="sticky top-0 z-20 flex justify-between items-center p-3
                       bg-light-surface-a10 dark:bg-dark-surface-a10 
                       border-b border-light-surface-a30 dark:border-dark-surface-a70">
        <div className="flex-1 flex items-center justify-between">
          {!user && <Logo heightClass="h-20"></Logo>}
          {user && (
            <MenuButtons
              onToggleSidebar={onToggleSidebar}
              isCollapsed={isCollapsed}></MenuButtons>
          )}
          <Menu user={user} />
          {user && (
            <MenuUser
              name={user?.nickName ?? ""}
              thumb={user?.thumb}
              onLogOut={onLogOut}
            />
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
