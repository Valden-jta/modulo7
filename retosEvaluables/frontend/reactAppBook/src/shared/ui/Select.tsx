import type { FilterOption } from "../../config/types"

type SelectProps = {
  value: string;
  onChange: (value: string) => void;           
  options: FilterOption[];
  placeholder?: string;
};

function Select(props: SelectProps) {
  const { value, onChange, options, placeholder = "Selecciona..." } = props;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full px-3 py-2 text-sm border border-light-surface-a30 dark:border-dark-surface-a60 rounded-md shadow-sm bg-white dark:bg-dark-surface-a20 text-dark-a0 dark:text-light-a0 focus:outline-none focus:ring-2 focus:ring-light-primary-a10/40 focus:border-transparent transition-colors"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;