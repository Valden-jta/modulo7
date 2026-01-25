/**
 * BookItem
 *
 * Tarjeta visual de libro que puede representar tanto:
 * - Un libro propio (`Book`) guardado en la BBDD.
 * - Un resultado devuelto por la API de Open Library (`OpenLibraryDoc`).
 *
 * Responsabilidades:
 * - Calcular de forma segura los campos comunes (título, autor, imagen, id) usando un type guard (`isBook`).
 * - Mostrar la portada, título, autor y género (cuando es un `Book`).
 * - Exponer acciones de **edición** y **eliminación** solo para libros propios.
 * - Notificar al padre cuándo se selecciona la tarjeta (`onOpen`) o se pide editar (`onEdit`).
 *
 * Props:
 * - `book`: libro de la BBDD.
 * - `doc`: documento devuelto por Open Library.
 *   - Sólo uno de los dos suele venir definido.
 * - `onOpen(value)`: callback cuando el usuario hace clic en la tarjeta completa.
 * - `onEdit(book)`: callback específico para editar libros propios.
 */

import type { Book } from "../types/types";
import type { OpenLibraryDoc } from "../api/openLibrary";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import GenreBadge from "../../../shared/ui/GenreBadge";
import { useTheme } from "../../../shared/hooks/useTheme";

type BookCardProps = {
  book?: Book;
  doc?: OpenLibraryDoc;
  onOpen?: (value: Book | OpenLibraryDoc) => void;
  onEdit?: (book: Book) => void;
};

function BookItem(props: BookCardProps) {
  const { book, doc, onOpen, onEdit } = props;

  const { theme } = useTheme();

  const isBook = (item: Book | OpenLibraryDoc): item is Book =>
    (item as Book).id_book !== undefined;
  const item = book ?? doc;
  if (!item) return null;

  const hasExternalCover = isBook(item)
    ? Boolean(item.image)
    : typeof item.cover_i === "number" && item.cover_i > 0;

  const initialImage = isBook(item)
    ? item.image
    : hasExternalCover
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
      : "";

  const fallbackLogo =
    theme === "dark" ? "/img/myBooks_logo_dark.svg" : "/img/myBooks_logo.svg";

  const image = initialImage || fallbackLogo;

  const title = item.title ?? "Título desconocido";

  const authorName = isBook(item)
    ? item.author
    : (item.author_name?.[0] ?? "Autor desconocido");

  const authorUrl =
    !isBook(item) && item.author_key?.[0]
      ? `https://openlibrary.org/authors/${item.author_key[0]}`
      : undefined;

  const id = isBook(item) ? String(item.id_book) : (item.key ?? "");

  const handleDeleteBook = () => {
    alert("Eliminado");
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
                {isBook(item) && (
                  <div className="flex justify-between items-center gap-1 my-2">
                    <div className="py-3 opacity-0 group-hover:opacity-100 group-hover:delay-400 transition-all duration-300 line-clamp-1">
                      <GenreBadge genre={item.genre}></GenreBadge>
                    </div>
                  </div>
                )}
              </div>
              {isBook(item) && (
                <div className="flex items-center justify-start gap-3">
                  <p
                    className="flex-1 italic opacity-0 
                         group-hover:opacity-100 group-hover:delay-300 
                         transition-all duration-300 line-clamp-1">
                    {item.type}
                  </p>
                </div>
              )}
              {isBook(item) && (
                <div className="flex justify-center items-center gap-5 mt-2 pt-2 border-t-1 border-light-surface-a50 dark:border-dark-surface-a50">
                  <button
                    className="cursor-pointer p-2 rounded-md text-xl hover:scale-110 hover:text-light-primary-a20 hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(item);
                    }}>
                    <CiEdit />
                  </button>
                  <button
                    className="cursor-pointer p-2 rounded-md text-xl hover:scale-110 hover:text-light-primary-a20 hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40 transition-all duration-300"
                    onClick={handleDeleteBook}>
                    <MdDeleteOutline />
                  </button>
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
