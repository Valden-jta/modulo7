import { type ReactNode, useId } from "react";

type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "prefix" | "suffix"
> & {
  id?: string;
  children: ReactNode;
  title?: string;
  label?: string;
  preIcon?: ReactNode;
  postIcon?: ReactNode;
  error?: string | null;
  touched?: boolean;
  className?: string;
};

export default function Select(props: SelectProps) {
  const {
    id,
    title,
    label,
    preIcon,
    postIcon,
    error,
    touched,
    className,
    children,
    ...rest
  } = props;

  const labelText = label ?? title;
  const inputId = useId();
  const showError = Boolean(error && touched);
  const wrapperClass = `select-wrapper ${className ?? ""} ${
    showError ? "pb-5" : ""
  }`;

  return (
    <div className={wrapperClass}>
      {labelText && (
        <label
          htmlFor={id || inputId}
          className="text-sm font-medium text-dark-a0 dark:text-light-a0">
          {labelText}
        </label>
      )}

      <div className="flex items-center rounded-md border border-light-surface-a30 dark:border-dark-surface-a70 bg-light-surface-a0 dark:bg-dark-surface-a20">
        {preIcon && (
          <span className="px-2 text-gray-500 select-none dark:text-gray-300">
            {preIcon}
          </span>
        )}

        <select
          id={id || inputId}
          aria-invalid={!!error}
          aria-describedby={showError ? `${id || inputId}-error` : undefined}
          className="flex-1 px-3 py-2 bg-transparent text-sm outline-none text-dark-a0 dark:text-light-a0"
          {...rest}>
          {children}
        </select>

        {postIcon && (
          <span className="px-2 dark:text-gray-300">{postIcon}</span>
        )}
      </div>

      {showError && (
        <div
          id={`${id || inputId}-error`}
          role="alert"
          className="mt-1 text-xs text-light-danger-a0">
          {error}
        </div>
      )}
    </div>
  );
}
