import React, { type ReactNode } from "react";

type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "prefix" | "suffix"
> & {
  id: string;
  children: ReactNode;
  title?: string;
  label?: string;
  preIcon?: ReactNode;
  postIcon?: ReactNode;
  error?: string | null;
};

export default function Select(props: SelectProps) {
  const {
    id,
    title,
    label,
    preIcon,
    postIcon,
    error,
    className,
    children,
    ...rest
  } = props;

  const labelText = label ?? title;

  return (
    <div className={`select-wrapper ${className ?? ""}`}>
      {labelText && (
        <label
          htmlFor={id}
          className="text-sm font-medium"
          style={{ color: "var(--color-dark-a0)" }}>
          {labelText}
        </label>
      )}

      <div
        className="flex items-center rounded-md"
        style={{
          border: "1px solid var(--color-light-surface-a30)",
          backgroundColor: "var(--color-light-surface-a0)",
        }}>
        {preIcon && (
          <span
            className="px-2 text-gray-500 select-none"
            style={{ color: "var(--color-dark-a0)" }}>
            {preIcon}
          </span>
        )}

        <select
          id={id}
          aria-invalid={!!error}
          className="flex-1 px-3 py-2 bg-transparent text-sm outline-none"
          style={{ color: "var(--color-dark-a0)" }}
          {...rest}>
          {children}
        </select>

        {postIcon && (
          <span className="px-2" style={{ color: "var(--color-dark-a0)" }}>
            {postIcon}
          </span>
        )}
      </div>

      {error && (
        <div
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-xs"
          style={{ color: "var(--color-dark-danger-a0)" }}>
          {error}
        </div>
      )}
    </div>
  );
}
