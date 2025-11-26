import React, { type ReactNode } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  title?: string;
  label?: string;
  preIcon?: ReactNode;
  postIcon?: ReactNode;
  error?: string | null;
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
    // `type`, `value`, `onChange`, etc. vienen en `...rest`
    ...rest
  } = props;

  const labelText = label ?? title;

  return (
    <div className={`input-wrapper ${className ?? ""}`}>
      {labelText && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-dark-a0 dark:text-dark-surface-a70">
          {labelText}
        </label>
      )}
      <div className="flex items-center rounded-md border border-gray-200 dark:border-light-surface-a70 bg-white dark:bg-dark-surface-a50">
        {preIcon && (
          <span className="px-2 text-gray-500 dark:text-light-a0 select-none">
            {preIcon}
          </span>
        )}
        <input
          id={id}
          aria-invalid={!!error}
          className="flex-1 px-3 py-2 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
          {...rest}
        />
        {postIcon && (
          <span className="px-2 text-gray-500 dark:text-light-a0">
            {postIcon}
          </span>
        )}
      </div>
      {error && (
        <div
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
