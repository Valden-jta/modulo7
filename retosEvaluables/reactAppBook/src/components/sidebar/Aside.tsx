import Submenu from "../menu/Submenu";
import MenuItem from "../menu/MenuItem";
import MenuItemExpand from "../menu/MenuItemExpand";
import Logo from "./Logo";
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
import { MdList } from "react-icons/md";

type AsideProps = {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
};
function Aside(props: AsideProps) {
  const { isCollapsed, onToggleSidebar } = props;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 h-screen ${
          isCollapsed ? "w-10 md:w-13 lg:w-15" : "w-64"
        } z-20 overflow-y-auto shadow-lg border-r border-light-surface-a30 dark:border-dark-surface-a70  bg-light-surface-a10 dark:bg-dark-surface-a10 custom-scrollbar transition-all duration-300`}>
        <Logo />
        {/* Sección Home */}
        <Submenu title={isCollapsed ? "..." : "Home"}>
          <MenuItem
            title="Inicio"
            icon={<MdOutlineCottage className="text-xl" />}
            isCollapsed={isCollapsed}
            onClick={() => console.log("Ir a inicio")}
          />
          <MenuItem
            title="Dashboard"
            icon={<RxDashboard className="text-xl" />}
            isCollapsed={isCollapsed}
            onClick={() => console.log("Ir a dashboard")}
          />
          <MenuItem
            title="Buscar libros"
            icon={<BsSearch className="text-xl" />}
            isCollapsed={isCollapsed}
          />
        </Submenu>
        {/* Sección social */}
        <Submenu title={isCollapsed ? "..." : "Social"}>
          <MenuItem
            title="amigos"
            icon={<LiaUserFriendsSolid className="text-xl" />}
            isCollapsed={isCollapsed}
            onClick={() => console.log("Ir a amigos")}
          />
          <MenuItem
            title="grupos"
            icon={<GrGroup className="text-xl" />}
            isCollapsed={isCollapsed}
            onClick={() => console.log("Ir a amigos")}
          />
          <MenuItem
            title="Mensajes"
            icon={<TiMessages className="text-xl" />}
            isCollapsed={isCollapsed}
            onClick={() => console.log("Ir a mensajes")}
          />
        </Submenu>
        {/* Sección Libros */}
        <Submenu title={isCollapsed ? "..." : "Libros"}>
          <MenuItem
            title="Mis Libros"
            icon={<PiBooks className="text-xl" />}
            isCollapsed={isCollapsed}
          />
          <MenuItem
            title="Añadir"
            icon={<IoIosAdd className="text-xl" />}
            isCollapsed={isCollapsed}
          />
          <MenuItem
            title="Importar lista"
            icon={<CiImport className="text-xl" />}
            isCollapsed={isCollapsed}
          />
        </Submenu>
        {/* Sección Colecciones */}
        <Submenu title={isCollapsed ? "..." : "Colecciones"}>
          <MenuItem
            title="Favoritos"
            icon={<IoIosStarOutline className="text-xl" />}
            isCollapsed={isCollapsed}
          />
          <MenuItemExpand
            title="Mis listas"
            icon={<MdShelves className="text-xl" />}
            isCollapsed={isCollapsed}
            defaultExpanded={false}
            onToggleSidebar={onToggleSidebar}>
            <MenuItem
              title="Lista 1"
              icon={<MdList />}
              isCollapsed={isCollapsed}
            />
            <MenuItem
              title="Lista 2"
              icon={<MdList />}
              isCollapsed={isCollapsed}
            />
            <MenuItem
              title="Lista 3"
              icon={<MdList />}
              isCollapsed={isCollapsed}
            />
            <MenuItem
              title="Lista 4"
              icon={<MdList />}
              isCollapsed={isCollapsed}
            />
          </MenuItemExpand>
          <MenuItem
            title="Nueva colección"
            icon={<MdOutlinePlaylistAdd className="text-xl" />}
            isCollapsed={isCollapsed}
          />
          <MenuItem
            title="Gestionar colecciones"
            icon={<BsCollection className="text-xl" />}
            isCollapsed={isCollapsed}
          />
        </Submenu>
      </nav>
    </>
  );
}

export default Aside;
