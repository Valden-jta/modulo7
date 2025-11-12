import { useState, useRef, useEffect } from "react";
import type { FilterOption } from "../../config/types";
import { GoChevronDown } from "react-icons/go";

type CheckboxGroupProps = {
  options: FilterOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  title?: string;
  defaultDropdown?: boolean;
};

function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    options,
    selectedValues,
    onChange,
    title,
    defaultDropdown = false,
  } = props;
  const [isOpen, setIsOpen] = useState(defaultDropdown);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside); // ← CORRECTO

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full h-fit" ref={dropdownRef}>
      <button
        className="relative w-full inline-flex items-center gap-2 px-4 py-2 rounded-md border border-light-surface-a30 dark:border-dark-surface-a60 bg-white dark:bg-dark-surface-a20 hover:bg-light-surface-a10 dark:hover:bg-dark-surface-a30 transition-all duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true">
        <div className="flex items-center gap-2 min-w-0">
          {" "}
          {/* ← Contenedor flex */}
          <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
            {title || "Seleccionar"}
          </span>
          {/* Contador de seleccionados */}
          {selectedValues.length > 0 && (
            <span className="inline-flex items-center justify-center px-1.5 md:px-2 py-0.5 rounded-full text-xs bg-light-primary-a10/40 text-light-primary-a20 flex-shrink-0">
              {selectedValues.length}
            </span>
          )}
        </div>
        <GoChevronDown
          className={`text-sm transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute z-50 top-full left-0 mt-2 w-full min-w-64 max-w-sm rounded-lg bg-light-surface-a10 dark:bg-dark-surface-a10 border border-light-surface-a30 dark:border-dark-surface-a70 shadow-lg ${
        isOpen
          ? "opacity-100 visible transform translate-y-0"
          : "opacity-0 invisible transform -translate-y-2"
      } transition-all ease-in-out duration-300`}>
        {title && (
          <div className="px-4 py-3 border-b border-light-surface-a30 dark:border-dark-surface-a70">
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
              {title}
            </span>
            {selectedValues.length > 0 && (
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                ({selectedValues.length} seleccionados)
              </span>
            )}
          </div>
        )}

        {/* Lista de opciones con checkboxes */}
        <div className="p-2 max-h-48 md:max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer hover:bg-light-surface-a20 dark:hover:bg-dark-surface-a30 p-2 rounded transition-colors duration-150">
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => onChange(option.value)}
                className="w-4 h-4 text-light-primary-a0 bg-white border-gray-300 rounded focus:ring-light-primary-a0 dark:focus:ring-dark-primary-a0 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-900 dark:text-gray-300">
                {option.label}
              </span>
            </label>
          ))}

          {/* Mensaje si no hay opciones */}
          {options.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No hay opciones disponibles
            </div>
          )}
        </div>

        {/* Limpiar seleccion */}
        {selectedValues.length > 0 && (
          <div className="p-2 border-t border-light-surface-a30 dark:border-dark-surface-a70">
            <button
              onClick={() => {
                selectedValues.forEach((value) => onChange(value));
                setIsOpen(false);
              }}
              className="w-full text-left px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-150">
              Limpiar selección
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckboxGroup;
