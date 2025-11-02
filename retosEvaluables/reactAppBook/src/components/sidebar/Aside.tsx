import Submenu from "./Submenu";
import MenuItem from "./MenuItem";
import MenuItemExpand from "./MenuItemExpand";
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
  CollapsedDefault:boolean
}
function Aside(props: AsideProps) {
  const {CollapsedDefault= false } = props;

  return (
    <>
      <nav className={`fixed top-0 left-0 h-screen ${CollapsedDefault ? "w-64" : "w-10 md:w-13 lg:w-15"} z-20 overflow-y-auto shadow-lg border-r border-light-surface-a30 dark:border-dark-surface-a70  bg-light-surface-a10 dark:bg-dark-surface-a10 custom-scrollbar transition-all duration-300`}>
     <Logo/>
        {/* Sección Home */}
        <Submenu title={CollapsedDefault ? "Home": "..."}>
          <MenuItem
            title="Inicio"
            icon={<MdOutlineCottage className="text-xl"/>}
            onClick={() => console.log("Ir a inicio")}
          />
          <MenuItem
            title="Dashboard"
            icon={<RxDashboard className="text-xl"/>}
            onClick={() => console.log("Ir a dashboard")}
          />
          <MenuItem title="Buscar libros" icon={<BsSearch className="text-xl"/>} />
        </Submenu>
        {/* Sección social */}
        <Submenu title={CollapsedDefault ? "Social": "..."}>
          <MenuItem title="amigos" icon={<LiaUserFriendsSolid className="text-xl" onClick={() => console.log("Ir a amigos")}/>}></MenuItem>
          <MenuItem title="grupos" icon={<GrGroup className="text-xl" onClick={() => console.log("Ir a amigos")}/>}></MenuItem>
          <MenuItem title="Mensajes" icon={<TiMessages className="text-xl" onClick={() => console.log("Ir a mensajes")}/>}></MenuItem>
        </Submenu>
        {/* Sección Libros */}
        <Submenu title={CollapsedDefault ? "Libros": "..."}>
          <MenuItem title="Mis Libros" icon={<PiBooks className="text-xl"/>} />
          <MenuItem title="Añadir" icon={<IoIosAdd className="text-xl"/>} />
          <MenuItem title="Importar lista" icon={<CiImport className="text-xl"/>} />
        </Submenu>
        {/* Sección Colecciones */}
        <Submenu title={CollapsedDefault ? "Colecciones": "..."}>
          <MenuItem title="Favoritos" icon={<IoIosStarOutline className="text-xl"/>} />
          <MenuItemExpand
            title="Mis listas"
            icon={<MdShelves className="text-xl"/>}
            defaultExpanded={false}>
            <MenuItem title="Lista 1" icon={<MdList />} />
            <MenuItem title="Lista 2" icon={<MdList />} />
            <MenuItem title="Lista 3" icon={<MdList />} />
            <MenuItem title="Lista 4" icon={<MdList />} />
          </MenuItemExpand>
          <MenuItem title="Nueva colección" icon={<MdOutlinePlaylistAdd className="text-xl"/>} />
          <MenuItem title="Gestionar colecciones" icon={<BsCollection className="text-xl"/>} />
        </Submenu>
      </nav>
    </>
  );
}

export default Aside;
