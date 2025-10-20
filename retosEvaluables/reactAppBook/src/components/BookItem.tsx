import { RxDotsVertical } from "react-icons/rx";
import type { Book } from "./../config/types" 


function BookItem(props: Book) {
  return (
    <>
      <div className="rounded-md hover:shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group ">
        {/* Imagen */}
        <div className="w-[180px] h-60 relative z-20 transition-all duration-300 group-hover:-translate-x-1/2">
          <img
            src={props.image}
            className="bg-center rounded-lg bg-cover w-full h-full object-cover 
                   transition-transform duration-300"
          />
          {/* Datos */}
          <div className="break-words tooltips absolute top-0 right-0 translate-x-[10%] h-full p-2 flex flex-col items-start justify-between transition-all duration-300 group-hover:translate-x-full ">
            <RxDotsVertical className="self-end mr-1"/>
            <div className="items-end">
            <p className="font-semibold text-xl uppercase transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300 ">
              {props.title}
            </p>
          {/* Línea decorativa */}
          <div className=" my-2 h-[1px] w-full bg-gray-400 opacity-0 
                  group-hover:opacity-100 transition-all duration-300 z-10"></div>
            <ul className="flex flex-col items-start gap-2">
              <li className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300">
                <p className=" italic font-semibold">
                  {props.author}
                </p>
              </li>
              <li className="inline-flex gap-2 items-center justify-center group-hover:delay-300 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300">
                <p className="text-xs font-semibold ">
                  {props.genre}
                </p>
              </li>
              <li className="inline-flex gap-2 items-center justify-center group-hover:delay-400 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300">
                <p className="text-xs font-semibold text-[#495c48]">
                  {props.type}
                </p>
              </li>
              <li className="inline-flex gap-2 items-center justify-center group-hover:delay-500 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300">
                <p className="text-xs font-semibold text-[#495c48]">
                  {props.price} €
                </p>
              </li>
            </ul>
          </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default BookItem;
