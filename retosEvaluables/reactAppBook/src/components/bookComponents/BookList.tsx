import BookCard from "./BookCard";
import BookRows from "./BookRows";
import type { Book } from "../../config/types";

type BookListProps = {
  view:boolean;
  BookList: Book[];
  onBookClick: (value:Book) => void;
};
function BookList(props: BookListProps) {
  const { BookList, view, onBookClick } = props;

  return (
     <div className="flex-1 max-h-screen overflow-scroll overflow-x-hidden custom-scrollbar custom-scrollbar rounded-md">
      {/* Cards: Solo en tablet/desktop cuando view=true */}
      {view && (
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
          {BookList.map((book, index) => (
            <BookCard key={index} book={book} onBookClick={onBookClick}/>
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
              {BookList.length > 0 ? (
                BookList.map((book: Book) => (
                  <BookRows key={book.id_book} book={book} onBookClick={onBookClick}/>
                ))
              ) : (
                <h3>No hay libros</h3>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookList;
