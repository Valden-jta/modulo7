import type { Book } from "../../config/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import GenreBadge from "../ui/GenreBadge";

type BookCardProps = {
  book: Book;
  onBookClick?: (value: Book) => void;
};

function BookItem(props: BookCardProps) {
  const { book, onBookClick } = props;

  const handleEditBook = () => {
    alert("editado");
  };
  const handleDeleteBook = () => {
    alert("Eliminado");
  };

  return (
    <>
      <div
        id={`${book.id_book}`}
        className="max-w-[140px] sm:max-w-xs flex flex-col items-center justify-center rounded-lg transition-all duration-200 transform hover:perspective-800 hover:rotate-y-10 group cursor-pointer"
        onClick={() => onBookClick?.(book)}>
        {/* imagen - más pequeña en móvil */}
        <div
          className="w-full aspect-[3/4] sm:aspect-[2/3] relative overflow-hidden 
                     rounded-lg shadow-md transition-all duration-300">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover
                   transition-all duration-300 
                   group-hover:scale-95 group-hover:brightness-110"
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
                {book.title}
              </h3>

              <div
                className="h-px w-full bg-gray-300 opacity-0 
                         group-hover:opacity-100 group-hover:delay-200 
                         transition-all duration-300"></div>

              <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs">
                <p
                  className="italic opacity-0 
                         group-hover:opacity-100 group-hover:delay-300 
                         transition-all duration-300 line-clamp-1">
                  {book.author}
                </p>

                <div className="flex justify-between items-center gap-1 my-2">
                  <div className="py-3 opacity-0 group-hover:opacity-100 group-hover:delay-400 transition-all duration-300 line-clamp-1">
                    <GenreBadge genre={book.genre}></GenreBadge>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start gap-3">
                <p
                  className="flex-1 italic opacity-0 
                         group-hover:opacity-100 group-hover:delay-300 
                         transition-all duration-300 line-clamp-1">
                  {book.type}
                </p>
                <span
                  className="font-bold text-light-success-a0 dark:text-dark-success-a0
                               text-[10px] sm:text-xs
                               opacity-0 group-hover:opacity-100 group-hover:delay-500 
                               transition-all duration-300">
                  {book.price}€
                </span>
              </div>
              <div className="flex justify-center items-center gap-5 mt-2 pt-2 border-t-1 border-light-surface-a50 dark:border-dark-surface-a50">
                <button
                  className="cursor-pointer p-2 rounded-md text-xl hover:scale-110 hover:text-light-primary-a20 hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40 transition-all duration-300"
                  onClick={handleEditBook}>
                  <CiEdit />
                </button>
                <button
                  className="cursor-pointer p-2 rounded-md text-xl hover:scale-110 hover:text-light-primary-a20 hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40 transition-all duration-300"
                  onClick={handleDeleteBook}>
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookItem;
