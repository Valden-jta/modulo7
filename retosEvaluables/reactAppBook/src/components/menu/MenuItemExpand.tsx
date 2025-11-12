import type { ReactNode } from "react";
import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

type MenuItemExpandProps = {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
  isCollapsed: boolean;
  defaultExpanded?: boolean;
  onToggleSidebar:()=>void;
};

function MenuItemExpand(props: MenuItemExpandProps) {
  const {
    title,
    icon,
    children,
    isCollapsed,
    defaultExpanded = false,
    onToggleSidebar
  } = props;
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  const handleClick = () => {
    // Si está colapsado, primero expandir el sidebar
    if (isCollapsed && onToggleSidebar) {
      onToggleSidebar();
      // Después de un pequeño delay, abrir el menú
      setTimeout(() => {
        setIsOpen(!isOpen);
      }, 300); // Tiempo para que termine la animación del sidebar
    } else {
      // Comportamiento normal si no está colapsado
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div
        className={`px-2 pt-2 pb-0 inline-flex flex-col justify-start items-center gap-3 rounded-md overflow-hidden focus:border-0 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100 group ${
          isCollapsed ? "w-10" : "w-fit"
        } ${
          isOpen
            ? "hover:bg-light-surface-a10 dark:hover:bg-dark-surface-a10"
            : "hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40"
        }`}>
        <button
          onClick={handleClick}
          className={`${isCollapsed ? "w-8" : "w-full"}`}>
          <div
            className={`flex items-center rounded-md cursor-pointer transition-colors duration-300 ${
              isCollapsed ? "justify-center" : "justify-start gap-3"
            }`}>
            <div
              className={`font-semibold text-[14px] flex items-center ${
                isCollapsed ? "" : "space-x-3"
              }`}>
              {icon && <span>{icon}</span>}
              <span
                className={`whitespace-nowrap overflow-hidden transition-all ease-in duration-100 ${
                  isCollapsed
                    ? "w-0 opacity-0"
                    : "w-auto opacity-100 delay-100"
                }`}>
                {title}
              </span>
            </div>
             <GoChevronDown
              className={`transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              } ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100 delay-100" 
              }`}
            />
          </div>
        </button>
        <div
          className={`flex flex-col overflow-y-auto custom-scrollbar pr-3 transition-all duration-300 ${
            isOpen && !isCollapsed ? "max-h-32" : "max-h-0" 
          }`}>
          {children}
        </div>
      </div>
    </>
  );
}

export default MenuItemExpand;
