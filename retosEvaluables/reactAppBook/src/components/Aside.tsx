import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiBooksLight } from "react-icons/pi";
import { MdShelves } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { BsSearch } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
import { IoFolderOpenOutline } from "react-icons/io5";

function Aside() {
  const [isLibrosOpen, setIsLibrosOpen] = useState(false); 
  const [isListasOpen, setIsListasOpen] = useState(false);
  
  return (
    <nav className="mt-10 rounded-md h-full p-3 space-y-2 w-60 bg-stone-800 text-gray-100">
    {/* Avatar */}
      <div className="flex items-center p-2 space-x-4">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-12 h-12 rounded-full bg-gray-500"
        />
        <div>
          <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
          <span className="flex items-center space-x-1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-xs hover:underline text-gray-400">
              Perfil de usuario
            </a>
          </span>
        </div>
      </div>
    {/* Dashboard */}
      <div className="border-b-1 border-gray-700 cursor-pointer rounded-md">
        <button className="group w-full space-y-1 text-sm hover:bg-stone-900 focus:ring-4 active:text-white">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center p-2 space-x-3 rounded-md">
            <RxDashboard className="w-6 h-6 text-gray-400" />
            <span>Dashboard</span>
          </a>
        </button>
    </div>
    {/* Libros y colecciones */}
    <div className="border-b-1 border-gray-700 cursor-pointer rounded-md">
      <button 
          className="group w-full space-y-1 text-sm"
          onClick={() => setIsLibrosOpen(!isLibrosOpen)}
        >
         <div className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-300 ${
    isLibrosOpen 
      ? 'bg-stone-900 text-white' 
      : 'hover:bg-stone-900 hover:text-white'
  }`}>
            <div className="flex items-center space-x-3">
              <PiBooksLight className="w-6 h-6 text-gray-400" />
              <span>Mis libros</span>
            </div>
            <GoChevronDown 
              className={`transition-transform duration-300 ${
                isLibrosOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${
            isLibrosOpen ? 'max-h-40' : 'max-h-0'
          }`}>
             <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center px-5 py-2 space-x-3 rounded-md">
            <IoIosAdd className="w-5 h-5 text-gray-400" />
            <span>Añadir libro</span>
          </a>
              <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center px-5 py-2 space-x-3 rounded-md">
            <CiImport className="w-5 h-5 text-gray-400" />
            <span>Importar libros</span>
          </a>
              <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center px-5 py-2 space-x-3 rounded-md">
            <BsSearch className="w-5 h-5 text-gray-400" />
            <span>Buscar libro</span>
          </a>
          </div>
        </button>
      <button 
          className="group w-full space-y-1 text-sm"
          onClick={() => setIsListasOpen(!isListasOpen)}
        >
          <div className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-300 ${
    isListasOpen 
      ? 'bg-stone-900 text-white' 
      : 'hover:bg-stone-900 hover:text-white'
  }`}>
            <div className="flex items-center space-x-3">
              <MdShelves className="w-6 h-6 text-gray-400" />
              <span>Mis Listas</span>
            </div>
            <GoChevronDown 
              className={`transition-transform duration-300 ${
                isListasOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${
            isListasOpen ? 'max-h-40' : 'max-h-0'
          }`}>
            <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center px-5 py-2 space-x-3 rounded-md">
            <IoIosStarOutline className="w-5 h-5 text-gray-400" />
            <span>Favoritos</span>
          </a>
             <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center px-5 py-2 space-x-3 rounded-md">
            <IoFolderOpenOutline className="w-5 h-5 text-gray-400" />
            <span>Colecciones</span>
          </a>
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center px-5 py-2 space-x-3 rounded-md">
            <IoIosAdd className="w-5 h-5 text-gray-400" />
            <span>Añadir colección</span>
          </a>
          </div>
        </button>
      </div>
     {/* Settings y Log Out */}
      <div className=" cursor-pointer rounded-md">
           <button className="group w-full space-y-1 text-sm hover:bg-stone-900 focus:ring-4 active:text-white">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center p-2 space-x-3 rounded-md">
            <GoGear className="w-6 h-6 text-gray-400" />
            <span>Configuración</span>
          </a>
        </button>
         <button className="group w-full space-y-1 text-sm hover:bg-stone-900 focus:ring-4 active:text-white">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center p-2 space-x-3 rounded-md">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current text-gray-400">
              <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
              <rect width="32" height="64" x="256" y="232"></rect>
            </svg>
            <span>Logout</span>
          </a>
        </button>
      </div>
    </nav>
  );
}

export default Aside;
