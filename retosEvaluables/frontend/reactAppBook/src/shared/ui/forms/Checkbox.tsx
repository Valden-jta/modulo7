import { type InputHTMLAttributes, useId, useState, useRef } from "react";
import type { FieldError } from "react-hook-form";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  ref?: React.Ref<HTMLInputElement | null>;
  label?: string;
  description?: string;
  error?: string | FieldError | null;
  touched?: boolean;
  className?: string;
};

export default function Checkbox(props: CheckboxProps) {
  const {
    id,
    ref,
    label,
    description,
    error,
    touched = false,
    className,
    ...rest
  } = props;
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const msg = typeof error === "string" ? error : error?.message;
  const show = !!msg && !!touched;
  const [checked, setChecked] = useState(false);

  return (
    <div className={`relative flex flex-col pb-5 ${className ?? ""}`}>
      {label && (
        <label
          htmlFor={id || inputId}
          className="text-sm font-medium text-dark-a0 dark:text-light-a0 mb-2">
          {label}
        </label>
      )}

      <div className="flex items-center justify-start gap-3 rounded-md p-2">
        <input
          id={id || inputId}
          ref={ref || inputRef}
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="h-4 w-4"
          style={{ accentColor: "var(--color-light-primary-a20)" }}
          aria-invalid={!!msg}
          aria-describedby={show ? `${id || inputId}-error` : undefined}
          {...rest}
        />
        <div
          className={`text-sm text-dark-a0 dark:text-light-a0 ${
            checked ? "text-bold" : ""
          }`}>
          {description}
        </div>
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
