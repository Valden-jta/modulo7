import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type SubmenuProps = {
  title: string;
  path: string;
  children: ReactNode;
  end?: boolean;
};

function Submenu(props: SubmenuProps) {
  const { title, path, children, end } = props;

  return (
    <>
      <div className="flex flex-col p-3 gap-y-1">
        <NavLink
          end={end}
          to={path}
          className={({ isActive }) =>
            `p-2 inline-flex justify-start items-center gap-3 rounded-md cursor-pointer hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100 ${
              isActive
                ? "text-light-primary-a20 dark:text-dark-primary-a20"
                : "text-dark-a0 dark:text-light-a0"
            }`
          }>
          <span className="font-bold text-uppercase whitespace-nowrap overflow-hidden transition-all ease-in duration-100">
            {title}
          </span>
        </NavLink>

        {children}
      </div>
    </>
  );
}

export default Submenu;
