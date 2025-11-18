import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type ItemProps = {
  title: string;
  path: string;
  icon?: ReactNode;
  onClick?: () => void;
  isCollapsed?: boolean;
  end?: boolean;
};

function MenuItem(props: ItemProps) {
  const { title, path, icon, isCollapsed, end, onClick } = props;

  return (
    <>
      <NavLink
        end={end}
        to={path}
        onClick={onClick}
        className={({ isActive }) =>
          `p-2 inline-flex justify-start items-center gap-3 rounded-md cursor-pointer hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100 ${
            isCollapsed ? "w-10" : "w-full"
          } ${
            isActive
              ? "text-light-primary-a20 dark:text-dark-primary-a20"
              : "text-dark-a0"
          }`
        }>
        {icon && <span>{icon}</span>}
        <span
          className={`font-semibold text-[14px] whitespace-nowrap overflow-hidden transition-all ease-in duration-100 ${
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100 delay-100"
          }`}>
          {title}
        </span>
      </NavLink>
    </>
  );
}

export default MenuItem;
