import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  size: "sm" | "md" | "lg";
  preIcon?: ReactNode;
  postIcon?: ReactNode;
};

export default function Button(props: ButtonProps) {
  const { text, size, preIcon, postIcon, ...rest } = props;

  let sizeClass = "";
  switch (size) {
    case "sm":
      sizeClass = "px-2 py-1 text-sm";
      break;
    case "md":
      sizeClass = "px-4 py-2 text-base";
      break;
    case "lg":
      sizeClass = "px-6 py-3 text-lg";
      break;
    default:
      break;
  }

  return (
    <button
      className={`${sizeClass} inline-flex justify-start items-center gap-3 rounded-md cursor-pointer bg-light-primary-a20 text-white hover:bg-light-primary-a30 disabled:opacity-50 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100 disabled:opacity-50 disabled:cursor-not-allowed`}
      {...rest}>
      {preIcon && (
        <span className="px-2 text-gray-500 dark:text-light-a0 select-none">
          {preIcon}
        </span>
      )}
      {text}
      {postIcon && (
        <span className="px-2 text-gray-500 dark:text-light-a0 select-none">
          {postIcon}
        </span>
      )}
    </button>
  );
}
