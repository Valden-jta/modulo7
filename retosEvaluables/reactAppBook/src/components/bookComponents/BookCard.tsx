import type { Book } from "../../config/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

type BookCardProps = {
  book: Book;
};

function BookItem(props: BookCardProps) {
  const { book } = props;

  const handleEditBook = () => {
    alert("editado");
  }
  const handleDeleteBook = () => {
    alert("Eliminado")
  }

  return (
    <>
      <div className="w-full max-w-[140px] sm:max-w-xs flex flex-col items-center justify-center rounded-lg transition-all duration-200 transform hover:perspective-800 hover:rotate-y-10 group cursor-pointer">
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
                  <span className="text-[8px] sm:text-xs bg-light-info-a20 dark:bg-dark-info-a20 text-light-info-a0 dark:text-dark-info-a0 px-1 py-0.5 sm:px-2 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:delay-400 transition-all duration-300 line-clamp-1">
                    {book.genre}
                  </span>
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
                <button className="cursor-pointer p-2 rounded-md text-xl hover:scale-110 hover:text-light-primary-a20 hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40 transition-all duration-300"
                onClick={handleEditBook}>
                  <CiEdit />
                </button>
                <button className="cursor-pointer p-2 rounded-md text-xl hover:scale-110 hover:text-light-primary-a20 hover:bg-light-surface-a30 dark:hover:bg-dark-surface-a40 transition-all duration-300"
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

//  <div className="w-fit rounded-md hover:shadow-xl hover:w-1/2 overflow-visible z-[100] relative cursor-pointer snap-start shrink-0 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group ">
//         {/* Imagen */}
//         <div className=" h-60 relative mr-auto z-20 transition-all duration-300 group-hover:-translate-x-1/2">
//           <img
//             src={book.image}
//             className="bg-center rounded-lg bg-cover w-full h-full object-cover
//                    transition-transform duration-300"
//           />
//           {/* Datos */}
//           <div className="break-words tooltips absolute top-0 right-0 translate-x-[10%] h-full p-2 flex flex-col items-start justify-between transition-all duration-300 group-hover:translate-x-full ">
//             <button  className="ml-auto mr-1"><RxDotsVertical/></button>
//             <div className="items-end">
//             <p className="font-semibold text-xl uppercase transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300 ">
//               {book.title}
//             </p>
//           {/* Línea decorativa */}
//           <div className=" my-2 h-[1px] w-full bg-gray-400 opacity-0
//                   group-hover:opacity-100 transition-all duration-300 z-10"></div>
//             <ul className="flex flex-col items-start gap-2">
//               <li className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300">
//                 <p className=" italic font-semibold">
//                   {book.author}
//                 </p>
//               </li>
//               <li className="inline-flex gap-2 items-center justify-center group-hover:delay-300 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300">
//                 <p className="text-xs font-semibold ">
//                   {book.genre}
//                 </p>
//               </li>
//               <li className="inline-flex gap-2 items-center justify-center group-hover:delay-400 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300">
//                 <p className="text-xs font-semibold text-[#495c48]">
//                   {book.type}
//                 </p>
//               </li>
//               <li className="inline-flex gap-2 items-center justify-center group-hover:delay-500 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300">
//                 <p className="text-xs font-semibold text-[#495c48]">
//                   {book.price} €
//                 </p>
//               </li>
//             </ul>
//           </div>
//             </div>
//         </div>
//       </div>
