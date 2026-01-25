/**
 * Aside
 *
 * Navegación lateral principal de la aplicación.
 *
 * Responsabilidades:
 * - Mostrar el **logo** y la estructura de navegación agrupada en secciones: Home, Social y Libros.
 * - Adaptar su anchura (colapsada/expandida) según `isCollapsed`.
 * - Ocultarse completamente si no hay usuario (`user === null`).
 *
 * Props:
 * - `isCollapsed`: controla si el sidebar muestra solo iconos o también los textos.
 * - `user`: usuario autenticado; si es `null` no se renderiza el menú lateral.
 */

import Submenu from "../shared/ui/navigation/Submenu";
import MenuItem from "../shared/ui/navigation/MenuItem";
import Logo from "../shared/ui/Logo";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineCottage } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { GrGroup } from "react-icons/gr";
import { TiMessages } from "react-icons/ti";
import { PiBooks } from "react-icons/pi";
import { MdShelves } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { BsSearch } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
import { BsCollection } from "react-icons/bs";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import type { PublicUser } from "../features/user/types/types";

type AsideProps = {
  isCollapsed: boolean;
  user: PublicUser | null;
};

function Aside(props: AsideProps) {
  const { isCollapsed, user } = props;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 h-screen z-20 overflow-y-auto shadow-lg border-r border-light-surface-a30 dark:border-dark-surface-a70  bg-light-surface-a10 dark:bg-dark-surface-a10 custom-scrollbar transition-all duration-300 ${
          !user ? "hidden" : ""
        } ${isCollapsed ? "w-10 md:w-13 lg:w-15" : "w-64"} `}>
        <Logo heightClass="h-30" />
        {/* Sección Home */}
        <Submenu title={isCollapsed ? "..." : "Home"} path="/user">
          <MenuItem
            title="Inicio"
            path="/userPage"
            icon={<MdOutlineCottage className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="Dashboard"
            path="/dashboard"
            icon={<RxDashboard className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
        </Submenu>
        {/* Sección social */}
        <Submenu title={isCollapsed ? "..." : "Social"} path="/social">
          <MenuItem
            title="amigos"
            path="/social/amigos"
            icon={<LiaUserFriendsSolid className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="grupos"
            path="/social/grupos"
            icon={<GrGroup className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="Foro"
            path="/social/foro"
            icon={<TiMessages className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
        </Submenu>
        {/* Sección Libros */}
        <Submenu title={isCollapsed ? "..." : "Libros"} path="/libros">
          <MenuItem
            title="Mis Libros"
            path="/libros/mis_libros"
            icon={<PiBooks className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="Favoritos"
            path="/listas/favoritos"
            icon={<IoIosStarOutline className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="Buscar libros"
            path="/libros/buscar"
            icon={<BsSearch className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="Añadir Libro"
            path="/libros/añadir"
            icon={<IoIosAdd className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="Importar libros"
            path="/libros/importar"
            icon={<CiImport className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="Mis listas"
            path="/libros/listas"
            icon={<MdShelves className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="Nueva colección"
            path="libros/listas/añadir"
            icon={<MdOutlinePlaylistAdd className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
          <MenuItem
            title="Gestionar colecciones"
            path="libros/listas/gestion"
            icon={<BsCollection className="text-xl" />}
            isCollapsed={isCollapsed}
            end
          />
        </Submenu>
      </nav>
    </>
  );
}

export default Aside;
