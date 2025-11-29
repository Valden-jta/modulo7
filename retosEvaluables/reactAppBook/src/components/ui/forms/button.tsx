import type { ReactNode, ButtonHTMLAttributes } from "react"


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
}

export default function Button(props:ButtonProps) {
    const {type, children, ...rest} = props
  return (
    <button
              type={type}
              className="p-2 inline-flex justify-start items-center gap-3 rounded-md cursor-pointer bg-light-surface-a30 dark:text-light-a0 hover:bg-light-surface-a50 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
              {...rest}>
              {children}
            </button>
  )
}
