/**
 * BookCard (BookItem)
 *
 * Tarjeta visual de libro basada en el modelo de vista `BookViewModel`.
 *
 * Responsabilidades:
 * - Mostrar portada, título, autor y género del libro recibido.
 * - Ser agnóstica del origen de los datos (BBDD propia u Open Library).
 * - Exponer acciones opcionales de **edición** y **eliminación** cuando se
 *   proporcionan los callbacks `onEdit` / `onDelete`.
 * - Notificar al padre cuándo se selecciona la tarjeta completa (`onOpen`).
 */

import type { BookViewModel } from "../types/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import GenreBadge from "../../../shared/ui/GenreBadge";
import { useTheme } from "../../../shared/hooks/useTheme";

type BookCardProps = {
  item: BookViewModel;
  onOpen?: (value: BookViewModel) => void;
  onEdit?: (book: BookViewModel) => void;
  onDelete?: (book: BookViewModel) => void;
};

function BookItem(props: BookCardProps) {
  const { item, onOpen, onEdit, onDelete } = props;

  const { theme } = useTheme();
  const hasExternalCover = Boolean(item.image);

  const fallbackLogo =
    theme === "dark" ? "/img/myBooks_logo_dark.svg" : "/img/myBooks_logo.svg";

  const image = item.image || fallbackLogo;

  const title = item.title ?? "Título desconocido";

  const authorName = item.author ?? "Autor desconocido";

  const authorUrl = item.authorUrl;

  const id = item.id;

  const handleDeleteBook = () => {
    onDelete?.(item);
  };

  return (
    <>
      <div
        id={id}
        className="max-w-[140px] sm:max-w-xs flex flex-col items-center justify-center rounded-lg transition-all duration-200 transform hover:perspective-800 hover:rotate-y-10 group cursor-pointer"
        onClick={() => onOpen?.(item)}>
        {/* imagen - más pequeña en móvil */}
        <div
          className={`w-full aspect-[3/4] sm:aspect-[2/3] relative overflow-hidden 
                     rounded-lg shadow-md transition-all duration-300 ${
                       hasExternalCover
                         ? ""
                         : theme === "dark"
                           ? "bg-dark-surface-a20"
                           : "bg-light-surface-a10"
                     }`}>
          <img
            src={image}
            alt={title}
            onError={(e) => {
              // Fallback seguro al logo si la portada no carga
              if (!e.currentTarget.src.includes("myBooks_logo")) {
                e.currentTarget.src = fallbackLogo;
              }
            }}
            className={`transition-all duration-300 ${
              hasExternalCover
                ? "object-cover size-full group-hover:scale-95 group-hover:brightness-110"
                : "object-contain p-4 "
            }`}
          />

          {/* datos - adaptados para móvil */}
          <div
            className="absolute inset-x-1 bottom-1 sm:inset-x-2 sm:bottom-2
                       bg-light-surface-a10 dark:bg-dark-surface-a10 
                       backdrop-blur-sm
                       opacity-0 rounded-md sm:rounded-lg p-1 sm:p-2 md:p-3
                       transition-all duration-300 
                       group-hover:opacity-100 group-hover:shadow-lg
                       group-hover:translate-y-2">
            <div className="space-y-0.5 sm:space-y-1">
              <h3
                className="font-semibold text-[10px] sm:text-xs md:text-sm
                         uppercase line-clamp-2
                         transition-all opacity-0 
                         group-hover:opacity-100 group-hover:delay-100">
                {title}
              </h3>

              <div
                className="h-px w-full bg-gray-300 opacity-0 
                         group-hover:opacity-100 group-hover:delay-200 
                         transition-all duration-300"></div>

              <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs">
                {authorUrl ? (
                  <a
                    href={authorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 underline">
                    {authorName}
                  </a>
                ) : (
                  <p className="text-xs text-dark-surface-a60 dark:text-light-surface-a60">
                    {authorName}
                  </p>
                )}
                {item.genre && (
                  <div className="flex justify-between items-center gap-1 my-2">
                    <div className="py-3 opacity-0 group-hover:opacity-100 group-hover:delay-400 transition-all duration-300 line-clamp-1">
                      <GenreBadge genre={item.genre}></GenreBadge>
                    </div>
                  </div>
                )}
              </div>
              {item.type && (
                <div className="flex items-center justify-start gap-3">
                  <p
                    className="flex-1 italic opacity-0 
                         group-hover:opacity-100 group-hover:delay-300 
                         transition-all duration-300 line-clamp-1">
                    {item.type}
                  </p>
                </div>
              )}
              {onEdit && (
                <div className="flex justify-center items-center gap-5 mt-2 pt-2 border-t-1 border-light-surface-a50 dark:border-dark-surface-a50">
                  <button
                    className="cursor-pointer p-2 rounded-md text-xl hover:scale-110 hover:text-light-primary-a20 hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(item);
                    }}>
                    <CiEdit />
                  </button>
                  {onDelete && (
                    <button
                      className="cursor-pointer p-2 rounded-md text-xl hover:scale-110 hover:text-light-primary-a20 hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40 transition-all duration-300"
                      onClick={handleDeleteBook}>
                      <MdDeleteOutline />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookItem;
