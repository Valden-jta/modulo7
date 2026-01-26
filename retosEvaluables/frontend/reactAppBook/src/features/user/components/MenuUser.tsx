/**
 * MenuUser
 *
 * Menú desplegable del usuario en el header.
 *
 * Responsabilidades:
 * - Mostrar el avatar o un icono genérico (`LuCircleUser`).
 * - Mostrar un badge con el número de notificaciones pendientes (mock).
 * - Desplegar un menú con accesos a "Perfil" y "Configuración".
 * - Incluir el botón de cierre de sesión (`LogoutButton`).
 * - Cerrar el menú automáticamente al hacer clic fuera (listener global de `mousedown`).
 */
import { useState, useRef, useEffect } from "react";
import { GoGear } from "react-icons/go";
import { LuCircleUser } from "react-icons/lu";
import MenuItem from "../../../shared/ui/navigation/MenuItem";
import LogoutButton from "./LogoutButton";

type UserDropProps = {
  name: string;
  thumb?: string;
  onLogOut: () => void;
  defaultDropdown?: boolean;
};
function MenuUser(props: UserDropProps) {
  const notifications: number = 10;
  const { name, thumb, onLogOut, defaultDropdown = false } = props;
  const [isOpen, setIsOpen] = useState(defaultDropdown);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside); // ← CORRECTO

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block h-fit mx-3" ref={dropdownRef}>
      {/* Botón de usuario */}
      <button
        className="relative inline-flex items-center justify-center shadow-sm rounded-full size-12 overflow-hidden cursor-pointer transition-all duration-200
                 hover:shadow-lg hover:scale-105 group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true">
        <div className="size-12 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-light-info-a20 dark:group-hover:ring-dark-info-a20 transition-all duration-200">
          {!thumb ? (
            <div className="size-full bg-light-surface-a20 dark:bg-dark-surface-a70 flex items-center justify-center">
              <LuCircleUser className="text-5xl" />
            </div>
          ) : (
            <img
              src={thumb}
              alt="foto de perfil de usuario"
              className="object-cover size-full"
            />
          )}
        </div>
      </button>
      {/* Badge de notificaciones */}
      {notifications > 0 && (
        <div className="absolute -top-1 -right-1 rounded-full bg-light-info-a20 dark:bg-dark-info-a20 text-white font-bold text-sm px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center">
          {notifications > 9 ? "9+" : notifications}
        </div>
      )}
      {/* Desplegable */}
      <div
        className={`absolute top-17 right-0 mt-2 w-48 z-50 flex justify-center items-start flex-col pt-3 rounded-lg bg-light-surface-a10 dark:bg-dark-surface-a10 border border-light-surface-a30 dark:border-dark-surface-a70 ${
          isOpen
            ? "opacity-100 visible transform translate-y-0"
            : "opacity-0 invisible transform -translate-y-2"
        } transition-all ease-in-out duration-300`}>
        <div className="px-4 py-3 w-full border-b border-light-surface-a30 dark:border-dark-surface-a70">
          <span className="font-bold py-2 mb-1">{name}</span>
        </div>
        <div className="p-2 w-full">
          <MenuItem
            title="Perfil"
            path="/perfil"
            icon={<LuCircleUser className="text-lg" />}
          />
          <MenuItem
            title="Configuración"
            path="/configuracion"
            icon={<GoGear className="text-lg" />}
          />

          {/* Separador */}
          <div className="border-t border-light-surface-a30 dark:border-dark-surface-a70 my-1"></div>

          <div className="w-full">
            <LogoutButton onLogOut={onLogOut} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuUser;
