/**
 * BookRows
 *
 * Fila de tabla para representar un libro usando `BookViewModel`.
 *
 * Responsabilidades:
 * - Mostrar portada, título y autor en formato tabla.
 * - Ser agnóstica del origen del dato (usuario vs Open Library).
 * - Notificar al padre al hacer clic en la fila completa (`onOpen`).
 * - Mostrar acciones de **edición** / **eliminación** cuando se
 *   proporcionan `onEdit` / `onDelete`.
 */

import type { BookViewModel } from "../types/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useTheme } from "../../../shared/hooks/useTheme";

type BookRowsProps = {
  item: BookViewModel;
  onOpen?: (value: BookViewModel) => void;
  onEdit?: (book: BookViewModel) => void;
  onDelete?: (book: BookViewModel) => void;
};

function BookRows(props: BookRowsProps) {
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
          {(onEdit || onDelete) && (
            <div className="flex">
              {onEdit && (
                <button
                  className="flex-1 cursor-pointer text-xl hover:scale-110 transition-transform duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(item);
                  }}>
                  <CiEdit />
                </button>
              )}
              {onDelete && (
                <button
                  className="flex-1 cursor-pointer text-xl hover:scale-110 transition-transform duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBook();
                  }}>
                  <MdDeleteOutline />
                </button>
              )}
            </div>
          )}
        </td>
      </tr>
    </>
  );
}

export default BookRows;
