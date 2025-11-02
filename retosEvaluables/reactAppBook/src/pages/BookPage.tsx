import BookList from "../components/bookComponents/BookList";

import { books } from "../config/data";

function BookPage() {
  return (
    <>
        <div className="p-5 flex flex-1">Filtros y cosas</div>
        {/* <FilterBar /> */}
        <BookList BookList={books} />
        {/* <Pagination /> */}
        <div className="p-5">Paginación</div>
    
    </>
  );
}

export default BookPage;
