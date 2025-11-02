import type { ReactNode } from "react";

type ItemProps = {
  title: string;
  icon?: ReactNode;
  onClick?: () => void;
};

function MenuItem(props: ItemProps) {
  const { title, icon, onClick } = props;

  return (
    <>
      <button
        className="font-semibold text-[14px] w-fit p-2 inline-flex justify-start items-center gap-3 rounded-md cursor-pointer hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100"
        onClick={onClick}>
        {icon && <span>{icon}</span>}
        <span>{title}</span>
      </button>
    </>
  );
}

export default MenuItem;
