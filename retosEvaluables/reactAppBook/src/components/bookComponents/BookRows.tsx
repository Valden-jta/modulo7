import type { Book } from "../../config/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

type BookRowsProps = {
  book: Book;
  onBookClick?: (value:Book) => void;
};

function BookRows(props: BookRowsProps) {
  const { book, onBookClick } = props;

  const handleEditBook = () => {
    alert("editado");
  };
  const handleDeleteBook = () => {
    alert("Eliminado");
  };

  return (
    <>
      <tr id={`${book.id_book}`}
        className="hover:bg-light-surface-a20 dark:hover:bg-dark-surface-a30 even:bg-light-surface-a10 even:dark:bg-dark-surface-a20
        odd:bg-transparent transition-all duration-200 ease-in-out group text-left text-xs md:text-sm lg:text-lg cursor-pointer"
        onClick={()=>onBookClick?.(book)}           >
        <td className="w-1/7 p-2 border-b-1 border-light-surface-tonal-a70">
          <div className="w-12 aspect-[2/3] overflow-hidden rounded-md bg-transparent isolate">
            <img
              src={book.image}
              alt="Portada"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </td>
        <td className="w-1/7 p-1 border-b-1 border-light-surface-tonal-a70 font-bold">
          {book.title}
        </td>
        <td className="w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
          {book.author}
        </td>
        <td className="hidden md:table-cell w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
          {book.genre}
        </td>
        <td className="hidden md:table-cell w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
          {book.type}
        </td>
        <td className="hidden md:table-cell w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
          {book.price} €
        </td>
        <td className="w-1/7 p-1 border-b-1 border-light-surface-tonal-a70">
          <div className="flex">
            <button
              className="flex-1 cursor-pointer text-xl hover:scale-110 transition-transform duration-300"
              onClick={handleEditBook}>
              <CiEdit />
            </button>
            <button
              className="flex-1 cursor-pointer text-xl hover:scale-110 transition-transform duration-300"
              onClick={handleDeleteBook}>
              <MdDeleteOutline />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default BookRows;
