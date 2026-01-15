import { type ReactNode, useId, useRef } from "react";
import type { FieldError } from "react-hook-form";

type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "prefix" | "suffix"
> & {
  id?: string;
  ref?: React.Ref<HTMLSelectElement|null>
  children: ReactNode;
  title?: string;
  label?: string;
  preIcon?: ReactNode;
  postIcon?: ReactNode;
  error?: string | FieldError | null;
  touched?: boolean;
  className?: string;
};

export default function Select(props: SelectProps) {
  const {
    id,
    ref,
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
   const inputRef = useRef<HTMLSelectElement | null>(null)
  const msg = typeof error === "string" ? error : error?.message;
  const show = !!msg && !!touched;
  const wrapperClass = `select-wrapper ${className ?? ""} ${
    show ? "pb-5" : ""
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
          ref={ref || inputRef}
          aria-invalid={!!msg}
          aria-describedby={show ? `${id || inputId}-error` : undefined}
          className="flex-1 px-3 py-2 bg-transparent text-sm outline-none text-dark-a0 dark:text-light-a0"
          {...rest}>
          {children}
        </select>

        {postIcon && (
          <span className="px-2 dark:text-gray-300">{postIcon}</span>
        )}
      </div>

      {show && (
        <div
          id={`${id || inputId}-error`}
          role="alert"
          className="mt-1 text-xs text-light-danger-a0">
          {msg}
        </div>
      )}
    </div>
  );
}
