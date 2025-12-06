import { type ReactNode, useId, useRef } from "react";
import type { FieldError } from "react-hook-form";

type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "prefix" | "suffix"
> & {
  id?: string;
  ref?: React.Ref<HTMLTextAreaElement | null>;
  title?: string;
  label?: string;
  preIcon?: ReactNode;
  postIcon?: ReactNode;
  className?: string;
  error?: string | FieldError | null;
  touched?: boolean;
};

export default function Textarea(props: TextareaProps) {
  const {
    id,
    ref,
    title,
    label,
    preIcon,
    postIcon,
    error,
    touched = false,
    className,
    ...rest
  } = props;

  const labelText = label ?? title;
  const inputId = useId();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const msg = typeof error === "string" ? error : error?.message;
  const show = !!msg && !!touched;

  return (
    <div className={`relative flex flex-col pb-5 mb-1 ${className ?? ""}`}>
      {labelText && (
        <label
          htmlFor={id || inputId}
          className="text-sm font-medium text-dark-a0 dark:text-dark-surface-a70">
          {labelText}
        </label>
      )}

      <div
        className={`flex items-center rounded-md transition-all duration-300 ease-in ${
          error && touched
            ? "bg-light-danger-a20/40 border-1 border-light-danger-a0 dark:bg-dark-danger-a20 dark:border-dark-danger-a0"
            : "bg-white dark:bg-dark-surface-a50 border border-light-surface-a70 dark:border-light-surface-a70 focus-within:ring-1 focus-within:ring-dark-surface-a20 focus-within:border-dark-surface-a20"
        } `}>
        {preIcon && (
          <span className="px-2 text-gray-500 dark:text-light-a0 select-none">
            {preIcon}
          </span>
        )}

        <textarea
          id={id || inputId}
          ref={ref || inputRef}
          aria-invalid={!!msg}
          aria-describedby={show ? `${id || inputId}-error` : undefined}
          className="flex-1 px-3 py-2 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none peer min-h-[100px] resize-vertical"
          {...rest}
        />

        {postIcon && (
          <span className="px-2 text-gray-500 dark:text-light-a0">
            {postIcon}
          </span>
        )}
      </div>

      {show && (
        <span
          id={`${id || inputId}-error`}
          role="alert"
          className="absolute top-15 text-xs leading-tight text-light-danger-a0 dark:text-dark-danger-a0">
          {msg}
        </span>
      )}
    </div>
  );
}
