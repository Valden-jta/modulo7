import type { ReactNode } from "react";
import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

type MenuItemExpandProps = {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
  defaultExpanded?: boolean;
};

function MenuItemExpand(props: MenuItemExpandProps) {
  const { title, icon, children, defaultExpanded = false } = props;
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  return (
    <>
      <div
        className={`w-fit px-2 pt-2 pb-0 inline-flex flex-col justify-start items-center gap-3 rounded-md overflow-hidden focus:border-0 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100 group
           ${
             isOpen
               ? "hover:bg-light-surface-a10 dark:hover:bg-dark-surface-a10"
               : "hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40"
           }`}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <div className="w-full flex items-center justify-start gap-3 rounded-md cursor-pointer transition-colors duration-300">
            <div className="flex items-center space-x-3">
              {icon && <span>{icon}</span>}
              <span>{title}</span>
            </div>
            <GoChevronDown
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
        <div
          className={`flex flex-col overflow-y-auto custom-scrollbar pr-3 transition-all duration-300 ${
            isOpen ? "max-h-32" : "max-h-0"
          }`}>
          {children}
        </div>
      </div>
    </>
  );
}

export default MenuItemExpand;
