/**
 * BookList
 *
 * Lista principal de libros basada en `BookViewModel`.
 *
 * Responsabilidades:
 * - Renderizar los elementos en modo **tarjetas** (grid) o **tabla** según `view`.
 * - Delegar la representación de cada elemento en `BookCard` (tarjetas)
 *   o `BookRows` (filas).
 * - Recibir del padre las acciones disponibles: abrir detalle (`onItemClick`),
 *   editar (`onEdit`) y eliminar (`onDelete`).
 * - No realiza llamadas a APIs ni muta datos: solo pinta la colección que recibe.
 */
import BookCard from "./BookCard";
import BookRows from "./BookRows";
import type { BookViewModel } from "../types/types";

type BookListProps = {
  view: boolean;
  items: BookViewModel[];
  onItemClick: (value: BookViewModel) => void;
  onEdit?: (book: BookViewModel) => void;
  onDelete?: (book: BookViewModel) => void;
};

function BookList(props: BookListProps) {
  const { items, view, onItemClick, onEdit, onDelete } = props;

  return (
    <div className="flex-1 max-h-screen overflow-scroll overflow-x-hidden custom-scrollbar rounded-md">
      {/* Cards: Solo en tablet/desktop cuando view=true */}
      {view && (
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
          {items.map((item, index) => (
            <BookCard
              key={index}
              item={item}
              onOpen={onItemClick}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      {/* Tabla: Móviles siempre + tablet/desktop cuando view=false */}
      {(!view || window.innerWidth < 768) && (
        <div className="block md:block">
          {" "}
          {/* ← Simplificado */}
          <table className="min-w-full table-auto border-collapse bg-white dark:bg-dark-surface-a10">
            <thead>
              <tr className="bg-light-surface-a10 dark:bg-dark-surface-a10 border-surface-a70 border-b-1 text-left">
                <th className="w-1/7 p-3">Portada</th>
                <th className="w-1/7 p-3">Título</th>
                <th className="w-1/7 p-3">Autor</th>
                <th className="hidden md:table-cell w-1/7 p-3">Género</th>
                <th className="hidden md:table-cell w-1/7 p-3">Tipo</th>
                <th className="hidden md:table-cell w-1/7 p-3">Precio</th>
                <th className="w-1/7 p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <BookRows
                    key={item.id}
                    item={item}
                    onOpen={onItemClick}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-sm">
                    No hay libros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookList;
