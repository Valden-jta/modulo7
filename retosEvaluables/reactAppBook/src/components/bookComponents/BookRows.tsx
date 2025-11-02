import type { Book } from "../../config/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

type BookRowsProps = {
  book: Book;
};

function BookRows(props: BookRowsProps) {
  const { book } = props;

  const handleEditBook = () => {
    alert("editado");
  };
  const handleDeleteBook = () => {
    alert("Eliminado");
  };

  return (
    <>
      <tr
        className="hover:bg-surface-a70 dark:hover:bg-dark-surface-a20 even:bg-light-surface-a10 even:dark:bg-dark-surface-a10
                   odd:bg-transparent transition-all duration-200 ease-in-out group">
        <td className="w-1/7 p-1 border-b-1 border-light-surface-tonal-a70 text-left">
          <div className="w-12 aspect-[2/3] overflow-hidden rounded-md">
            <img
              src={book.image}
              alt="Portada"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </td>
        <td className="w-1/7 p-1 border-b-1 border-surface-tonal-a70 text-left font-bold">
          {book.title}
        </td>
        <td className="w-1/7 p-1 border-b-1 border-surface-tonal-a70 text-left">
          {book.author}
        </td>
        <td className="w-1/7 p-1 border-b-1 border-surface-tonal-a70 text-left">
          {book.genre}
        </td>
        <td className="w-1/7 p-1 border-b-1 border-surface-tonal-a70 text-left">
          {book.type}
        </td>
        <td className="w-1/7 p-1 border-b-1 border-surface-tonal-a70 text-left">
          {book.price} €
        </td>
        <td className="w-1/7 p-1 border-b-1 border-surface-tonal-a70 text-left">
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
