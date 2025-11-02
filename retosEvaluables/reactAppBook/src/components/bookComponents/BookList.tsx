import BookCard from "./BookCard";
import BookRows from "./BookRows";
import type { Book } from "../../config/types";

type BookListProps = {
  BookList: Book[];
};
function BookList(props: BookListProps) {
  const { BookList } = props;
  const layout = false;

  if (!layout) {
    return (
      <>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 h-fit w-fit md:w-full overflow-scroll overflow-x-hidden p-2 sm:p-4 md:p-6 lg:p-10 custom-scrollbar transition-all duration-300 place-items-center">
          {BookList.length > 0 ? (
            BookList.map((book: Book) => (
              <BookCard key={book.id_book} book={book} />
            ))
          ) : (
            <h3>No hay libros</h3>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex h-[90vh] w-full lg:p-5 overflow-scroll  lg:overflow-x-hidden custom-scrollbar transition-all duration-300">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-light-surface-a10 dark:bg-dark-surface-a10 border-surface-a70 border-b-1">
              <th className="w-1/7 p-3 text-left">Portada</th>
              <th className="w-1/7 p-3 text-left">Título</th>
              <th className="w-1/7 p-3 text-left">Autor</th>
              <th className="w-1/7 p-3 text-left">Género</th>
              <th className="w-1/7 p-3 text-left">Tipo</th>
              <th className="w-1/7 p-3 text-left">Precio</th>
              <th className="w-1/7 p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {BookList.length > 0 ? (
              BookList.map((book: Book) => (
                <BookRows key={book.id_book} book={book} />
              ))
            ) : (
              <h3>No hay libros</h3>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BookList;
