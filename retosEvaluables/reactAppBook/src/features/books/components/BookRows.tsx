/**
 * BookRows
 *
 * Fila de tabla para representar un libro o resultado de búsqueda.
 *
 * Similar a `BookItem`, pero en formato **fila de tabla** en lugar de tarjeta.
 *
 * Responsabilidades:
 * - Calcular los campos comunes (id, imagen, título, autor) mediante el type guard `isBook`.
 * - Permitir abrir el detalle del libro al hacer clic en la fila completa (`onOpen`).
 * - Mostrar acciones de edición/eliminación solo cuando el elemento es un `Book` propio.
 *
 * Props:
 * - `book`: libro propio.
 * - `doc`: resultado de Open Library.
 * - `onOpen(value)`: se dispara al hacer clic en la fila.
 * - `onEdit(book)`: se dispara al pulsar el icono de edición.
 */

import type { Book } from "../types/types";
import type { OpenLibraryDoc } from "../api/openLibrary";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useTheme } from "../../../shared/hooks/useTheme";

type BookRowsProps = {
  book?: Book;
  doc?: OpenLibraryDoc;
  onOpen?: (value: Book | OpenLibraryDoc) => void;
  onEdit?: (book: Book) => void;
};

function BookRows(props: BookRowsProps) {
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
      <tr
        id={id}
        className="hover:bg-light-surface-a20 dark:hover:bg-dark-surface-a30 even:bg-light-surface-a10 even:dark:bg-dark-surface-a20
        odd:bg-transparent transition-all duration-200 ease-in-out group text-left text-xs md:text-sm lg:text-lg cursor-pointer"
        onClick={() => onOpen?.(item)}>
        <td className="w-1/7 p-2 border-b-1 border-light-surface-tonal-a70">
          <div
            className={`w-12 aspect-[2/3] overflow-hidden rounded-md isolate ${
              hasExternalCover
                ? "bg-transparent"
                : theme === "dark"
                  ? "bg-dark-surface-a20"
                  : "bg-light-surface-a10"
            }`}>
            <img
              src={image}
              alt="Portada"
              onError={(e) => {
                if (!e.currentTarget.src.includes("myBooks_logo")) {
                  e.currentTarget.src = fallbackLogo;
                }
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </td>
        <td className="w-1/7 p-1 border-b-1 border-light-surface-tonal-a70 font-bold">
          {title}
        </td>
        {authorUrl ? (
          <td className="w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
            <a
              href={authorUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 underline">
              {authorName}
            </a>
          </td>
        ) : (
          <td className="w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
            {authorName}
          </td>
        )}
        {/* <td className="hidden md:table-cell w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
          {genre}
        </td>
        <td className="hidden md:table-cell w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
          {type}
        </td>
        <td className="hidden md:table-cell w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
          {book.price} €
        </td> */}
        <td className="w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
          {isBook(item) && (
            <div className="flex">
              <button
                className="flex-1 cursor-pointer text-xl hover:scale-110 transition-transform duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(item);
                }}>
                <CiEdit />
              </button>
              <button
                className="flex-1 cursor-pointer text-xl hover:scale-110 transition-transform duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBook();
                }}>
                <MdDeleteOutline />
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
}

export default BookRows;
