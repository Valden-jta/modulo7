import { useState } from "react";
import Toggle from "../../../shared/ui/Toggle";
import Select from "../../../shared/ui/Select";
import CheckboxGroup from "../../../shared/ui/forms/CheckboxGroup";
import { CiFilter } from "react-icons/ci";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";

type BookFilterProps = {
  view: boolean;
  onViewChange: () => void;
  elementsInPage: string;
  onElementsChange: (value: string) => void;
  elementsOptions: { value: string; label: string }[];
  authors: string[];
  onAuthorToggle: (author: string) => void;
  authorsOptions: { value: string; label: string }[];
  genres: string[];
  onGenreToggle: (genre: string) => void;
  genresOptions: { value: string; label: string }[];
  onResetFilters: () => void;
};

function BookFilterBar(props: BookFilterProps) {
  const {
    view,
    onViewChange,
    elementsInPage,
    onElementsChange,
    elementsOptions,
    authors,
    onAuthorToggle,
    authorsOptions,
    genres,
    onGenreToggle,
    genresOptions,
    onResetFilters,
  } = props;

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hasAuthors = authors.length > 0;
  const hasGenres = genres.length > 0;
  const totalFilters = authors.length + genres.length;

  return (
    <div className="w-full flex flex-col px-0">
      {/* Barra de filtros responsiva */}
      <div className="w-full md:rounded-md bg-light-surface-a10 dark:bg-dark-surface-a0 md:dark:bg-dark-surface-a10 border-b border-light-surface-tonal-a70 md:border-0">
        {/* DESKTOP: Una sola fila*/}
        <div className="hidden lg:flex gap-2 items-center justify-between p-3">
          <div className="flex items-center">
            <Toggle
              action={onViewChange}
              checked={view}
              activeIcon={<BsGrid3X3GapFill className="text-md" />}
              icon={<BsList className="text-md" />}
              iconColors="text-dark-a0 dark:text-light-a0"
              activeColors="bg-light-surface-a0 dark:bg-dark-surface-a60"
              inactiveColors="bg-light-surface-a40 dark:dark-surface-a60"
              circleColors="bg-light-surface-a20 dark:bg-dark-surface-a40"
            />
          </div>

          <div className="text-xl border-r px-1 mx-1 border-light-surface-a30 dark:border-dark-surface-a60">
            <CiFilter />
          </div>

          <div className="min-w-[180px]">
            <Select
              value={elementsInPage}
              onChange={onElementsChange}
              options={elementsOptions}
              placeholder="Libros por página"
            />
          </div>

          <div className="min-w-[200px]">
            <CheckboxGroup
              options={authorsOptions}
              selectedValues={authors}
              onChange={onAuthorToggle}
              title="Filtrar por autor"
              defaultDropdown={false}
            />
          </div>

          <div className="min-w-[200px]">
            <CheckboxGroup
              options={genresOptions}
              selectedValues={genres}
              onChange={onGenreToggle}
              title="Filtrar por géneros"
              defaultDropdown={false}
            />
          </div>

          <button
            className="p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap"
            onClick={onResetFilters}>
            Borrar filtros
          </button>
        </div>

        {/* TABLET: Dos filas  */}
        <div className="hidden md:block lg:hidden">
          {/* Fila 1: Toggle + Select + Reset */}
          <div className="flex gap-2 items-center justify-between p-3 pb-2">
            <div className="flex items-center gap-3">
              <Toggle
                action={onViewChange}
                checked={view}
                activeIcon={<BsGrid3X3GapFill className="text-md" />}
                icon={<BsList className="text-md" />}
                iconColors="text-dark-a0 dark:text-light-a0"
                activeColors="bg-light-surface-a0 dark:bg-dark-surface-a60"
                inactiveColors="bg-light-surface-a40 dark:dark-surface-a60"
                circleColors="bg-light-surface-a20 dark:bg-dark-surface-a40"
              />

              <div className="text-xl border-r px-2 border-light-surface-a30 dark:border-dark-surface-a60">
                <CiFilter />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-40">
                <Select
                  value={elementsInPage}
                  onChange={onElementsChange}
                  options={elementsOptions}
                  placeholder="Por página"
                />
              </div>

              <button
                className="p-2 text-xs font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap"
                onClick={onResetFilters}>
                Borrar filtros
              </button>
            </div>
          </div>

          {/* Fila 2: Filtros */}
          <div className="flex gap-2 items-center px-3 pb-3">
            <div className="flex-1">
              <CheckboxGroup
                options={authorsOptions}
                selectedValues={authors}
                onChange={onAuthorToggle}
                title="Autores"
                defaultDropdown={false}
              />
            </div>

            <div className="flex-1">
              <CheckboxGroup
                options={genresOptions}
                selectedValues={genres}
                onChange={onGenreToggle}
                title="Géneros"
                defaultDropdown={false}
              />
            </div>
          </div>
        </div>

        {/* Movil: Header desplegable */}
        <div className="block md:hidden">
          {/* ✅ NUEVO: Header desplegable */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-light-surface-a20 dark:hover:bg-dark-surface-a20 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <CiFilter className="text-lg text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filtros y opciones
              </span>
              {totalFilters > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs bg-light-primary-a10/40 text-light-primary-a20 font-medium">
                  {totalFilters}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {totalFilters > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onResetFilters();
                  }}
                  className="text-xs font-medium px-2 py-1 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  Limpiar
                </button>
              )}

              <GoChevronDown
                className={`text-sm transition-transform duration-200 ${
                  isMobileOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </button>

          {/* Cambiar style a tailwind */}
          <div
            className="grid transition-all duration-300 ease-in-out border-t border-light-surface-a20 dark:border-dark-surface-a40"
            style={{
              gridTemplateRows: isMobileOpen ? "1fr" : "0fr",
            }}>
            <div className="overflow-hidden">
              {" "}
              <div className="p-4 space-y-4 bg-light-surface-a5 dark:bg-dark-surface-a5 relative">
                {" "}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Libros por página
                  </label>
                  <Select
                    value={elementsInPage}
                    onChange={onElementsChange}
                    options={elementsOptions}
                    placeholder="Seleccionar cantidad"
                  />
                </div>
                {/* ✅ Filtros en móvil con espacio extra para dropdowns */}
                <div className="space-y-6 pb-48">
                  {" "}
                  {/* ← Padding bottom extra para dropdowns */}
                  <div className="relative">
                    {" "}
                    {/* ← Añadir relative */}
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Filtrar por autor
                    </label>
                    <CheckboxGroup
                      options={authorsOptions}
                      selectedValues={authors}
                      onChange={onAuthorToggle}
                      title="Seleccionar autores"
                      defaultDropdown={false}
                    />
                  </div>
                  <div className="relative">
                    {" "}
                    {/* ← Añadir relative */}
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Filtrar por géneros
                    </label>
                    <CheckboxGroup
                      options={genresOptions}
                      selectedValues={genres}
                      onChange={onGenreToggle}
                      title="Seleccionar géneros"
                      defaultDropdown={false}
                    />
                  </div>
                </div>
                {/* Botones en posición fija abajo */}
                <div className="flex gap-2 pt-2 sticky bottom-0 bg-light-surface-a5 dark:bg-dark-surface-a5 border-t border-light-surface-a20 dark:border-dark-surface-a40 -mx-4 px-4 py-3">
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium rounded-md bg-light-primary-a10 dark:bg-dark-primary-a20 text-light-primary-a90 dark:text-dark-primary-a90 hover:bg-light-primary-a20 dark:hover:bg-dark-primary-a30 transition-colors">
                    Aplicar filtros
                  </button>

                  {totalFilters > 0 && (
                    <button
                      onClick={() => {
                        onResetFilters();
                        setIsMobileOpen(false);
                      }}
                      className="px-4 py-2 text-sm font-medium rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      Limpiar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Chips responsivos - FILA 1: Autores (igual que antes) */}
      <div
        className="grid transition-all duration-500 ease-in-out"
        style={{
          gridTemplateRows: hasAuthors ? "1fr" : "0fr",
        }}>
        <div className="overflow-hidden">
          <div className="px-0 pb-2">
            <div className="animate-fadeIn">
              <label className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Autores seleccionados: {authors.length}
              </label>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {authors.map((author) => (
                  <span
                    key={author}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-light-primary-a10/40 text-light-primary-a20 animate-slideIn">
                    <span className="truncate max-w-24 md:max-w-none">
                      {author}
                    </span>
                    <button
                      onClick={() => onAuthorToggle(author)}
                      className="ml-1 md:ml-1.5 text-light-primary-a60 hover:text-light-primary-a90 dark:text-dark-primary-a60 dark:hover:text-dark-primary-a90 hover:bg-light-primary-a20 dark:hover:bg-dark-primary-a30 rounded-full w-4 h-4 flex items-center justify-center transition-colors duration-150 flex-shrink-0"
                      aria-label={`Eliminar ${author}`}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Chips responsivos - FILA 2: Géneros (igual que antes) */}
      <div
        className="grid transition-all duration-500 ease-in-out"
        style={{
          gridTemplateRows: hasGenres ? "1fr" : "0fr",
        }}>
        <div className="overflow-hidden">
          <div className="px-0 pb-2">
            <div className="animate-fadeIn">
              <label className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Géneros seleccionados: {genres.length}
              </label>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-light-secondary-a10/40 text-light-secondary-a20 animate-slideIn">
                    <span className="truncate max-w-24 md:max-w-none">
                      {genre}
                    </span>
                    <button
                      onClick={() => onGenreToggle(genre)}
                      className="ml-1 md:ml-1.5 text-light-secondary-a60 hover:text-light-secondary-a90 dark:text-dark-secondary-a60 dark:hover:text-dark-secondary-a90 hover:bg-light-secondary-a20 dark:hover:bg-dark-secondary-a30 rounded-full w-4 h-4 flex items-center justify-center transition-colors duration-150 flex-shrink-0"
                      aria-label={`Eliminar ${genre}`}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookFilterBar;
