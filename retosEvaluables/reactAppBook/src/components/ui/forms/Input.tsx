import { type ReactNode, useId } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  title?: string;
  label?: string;
  preIcon?: ReactNode;
  postIcon?: ReactNode;
  className?: string;
  error?: string | null;
  touched?: boolean | undefined;
};

export default function Input(props: InputProps) {
  const {
    id,
    title,
    label,
    preIcon,
    postIcon,
    error,
    className,
    touched = false,
    // `type`, `value`, `onChange`, etc. vienen en `...rest`
    ...rest
  } = props;

  const inputId = useId();
  const labelText = label ?? title;

  return (
    <div className={`relative flex flex-col pb-5 mb-1 ${className ?? ""}`}>
      {labelText && (
        <label
          htmlFor={id || inputId}
          className="text-sm font-medium text-dark-a0 dark:text-dark-surface-a70">
          {labelText}
        </label>
      )}
      <div className={`flex items-center rounded-md transition-all duration-300 ease-in ${ error && touched
      ? "bg-light-danger-a20/40 border-1 border-light-danger-a0 dark:bg-dark-danger-a20 dark:border-dark-danger-a0"
      : "bg-white dark:bg-dark-surface-a50 border border-light-surface-a70 dark:border-light-surface-a70 focus-within:ring-1 focus-within:ring-dark-surface-a20 focus-within:border-dark-surface-a20"  
      } `}>
        {preIcon && (
          <span className="px-2 text-gray-500 dark:text-light-a0 select-none">
            {preIcon}
          </span>
        )}
        <input
          id={id||inputId}
          aria-invalid={!!error}
          className="flex-1 px-3 py-2 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none peer"
          {...rest}
        />
        {postIcon && (
          <span className="px-2 text-gray-500 dark:text-light-a0">
            {postIcon}
          </span>
        )}
      </div>
      {error && touched && ( 
          <span 
          id={`${id || inputId}-error`}
          role="alert"
          className="absolute top-15 text-xs leading-tight text-light-danger-a0 dark:text-dark-danger-a0">{error}</span>
      
      )}
    </div>
  );
}
