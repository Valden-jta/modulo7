import { useState } from "react";
import type { Book } from "../config/types";
import BookList from "../components/bookComponents/BookList";
import BookFilterBar from "../components/bookComponents/BookFilterBar";
import ReactPaginate from "react-paginate";
import BookInfo from "../components/bookComponents/BookInfo";
import useBookListFilters from "../hooks/useBookListFilter";
import { CgSmileSad } from "react-icons/cg";

import { books } from "../config/data";
import OffCanvasMobile from "../components/elements/OffCanvasMobile";

function BookPage() {
  // useBookListFilters
  const {
    view,
    elementsInPage,
    authors,
    genres,
    toggleView,
    currentPage,
    setElementsInPage,
    toggleAuthor,
    toggleGenre,
    setCurrentPage,
    resetFilters,
  } = useBookListFilters();

  // Selección de un libro
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  // Control del off-canvas en móvil (separamos la visibilidad del selectedBook)
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  const OFFCANVAS_ANIMATION_MS = 500; // debe coincidir con OffCanvasMobile.animationDuration

  const onBookClick = (newBook: Book) => {
    setSelectedBook(newBook);
    setOffcanvasOpen(true);
  };

  // Cerrar con animación en móvil: ocultar offcanvas y limpiar selectedBook tras la animación
  // Cerrar inmediatamente (uso en desktop)
  const handleCloseImmediate = () => {
    setSelectedBook(null);
    setOffcanvasOpen(false);
  };

  // Mostrar BookInfo en movil
  const handleCloseAnimated = () => {
    setOffcanvasOpen(false);
    setTimeout(() => setSelectedBook(null), OFFCANVAS_ANIMATION_MS);
  };

  // Filtrado de libros
  const filteredBooks = books.filter((book) => {
    if (authors.length > 0 && !authors.includes(book.author)) return false;
    if (genres.length > 0 && !genres.includes(book.genre)) return false;
    return true;
  });

  // Paginación
  const booksPerPage = parseInt(elementsInPage) || 15; // ← Usar elementsInPage
  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);
  const offset = currentPage * booksPerPage;
  const renderedBooks = filteredBooks.slice(offset, offset + booksPerPage);

  // Handlers con reset de página
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleElementsChange = (newValue: string) => {
    setElementsInPage(newValue);
    setCurrentPage(0);
  };

  const handleAuthorChange = (newAuthor: string) => {
    toggleAuthor(newAuthor);
    setCurrentPage(0);
  };

  const handleGenreChange = (newGenre: string) => {
    toggleGenre(newGenre);
    setCurrentPage(0);
  };

  // Opciones filtros

  // Elementos por página
  const elementsOptions = [
    { value: "15", label: "15" },
    { value: "30", label: "30" },
    { value: "60", label: "60" },
    { value: "120", label: "120" },
  ];
  // autores
  const uniqueAuthors = [...new Set(books.map((book) => book.author))];
  const authorsOptions = uniqueAuthors.map((author) => ({
    value: author,
    label: author,
  }));
  // generos
  const uniqueGenres = [...new Set(books.map((book) => book.genre))];
  const genresOptions = uniqueGenres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  return (
    <>
      <div className="w-full flex">
        {/* <Filtros /> */}
        <div className="w-full  md:w-2/3 lg:w-2/3">
          <div className="p-0 md:p-5 lg:p-5  flex flex-1">
            <BookFilterBar
              view={view}
              onViewChange={toggleView}
              elementsInPage={elementsInPage}
              onElementsChange={handleElementsChange}
              elementsOptions={elementsOptions}
              authors={authors}
              onAuthorToggle={handleAuthorChange}
              authorsOptions={authorsOptions}
              genres={genres}
              onGenreToggle={handleGenreChange}
              genresOptions={genresOptions}
              onResetFilters={resetFilters}></BookFilterBar>
          </div>
          {/* Lista de libros */}
          {!filteredBooks.length ? (
            <div className="flex flex-col items-center justify-center gap-6 p-10 mx-auto max-w-2xl text-center">
              <div className="flex flex-col items-center gap-4">
                <CgSmileSad className="text-8xl md:text-9xl text-gray-400 dark:text-gray-600" />

                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300">
                    No se encontraron libros
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    No se encuentran libros bajo los criterios seleccionados.
                    <br />
                    Modifica los criterios de filtrado para ver otros
                    resultados:
                  </p>

                  <div className="p-4 mt-4">
                    <ul className="list-disc text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>
                        Comprueba que el autor o los autores seleccionados
                        tengan libros del género elegido
                      </li>
                      <li>
                        Intenta con menos filtros activos para obtener más
                        resultados
                      </li>
                      <li>
                        Verifica que los criterios de búsqueda sean correctos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                className="p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap"
                onClick={resetFilters}>
                Borrar filtros
              </button>
            </div>
          ) : (
            <BookList
              BookList={renderedBooks}
              view={view}
              onBookClick={onBookClick}
            />
          )}

          {/* <Pagination /> */}
          <ReactPaginate
            previousLabel={"← Anterior"}
            nextLabel={"Siguiente →"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            // Estilos
            containerClassName="flex items-center justify-center gap-3 p-4"
            pageClassName="hidden sm:block"
            pageLinkClassName="p-2 inline-flex justify-center items-center gap-3 rounded-full cursor-pointer hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100 size-10 font-semibold text-[14px]"
            previousClassName="inline-block"
            previousLinkClassName="p-2 inline-flex justify-center items-center gap-3 rounded-md cursor-pointer hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100 font-semibold text-[14px] px-4"
            nextClassName="inline-block"
            nextLinkClassName="p-2 inline-flex justify-center items-center gap-3 rounded-md cursor-pointer hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-all ease-in duration-100 font-semibold text-[14px] px-4"
            breakClassName="hidden sm:block"
            breakLinkClassName="p-2 inline-flex justify-center items-center text-light-surface-a60 dark:text-dark-surface-a50 cursor-default font-semibold text-[14px]"
            activeClassName="text-light-primary-a20 bg-light-primary-a10/40 dark:text-dark-primary-a20 rounded-full"
            activeLinkClassName="text-light-primary-a20 bg-light-primary-a10/40 dark:text-dark-primary-a20 hover:bg-light-primary-a10/40 dark:hover:bg-dark-primary-a10/40"
            disabledClassName="opacity-50 cursor-not-allowed"
            disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent"
          />
        </div>
        {/* Info del 1 libro (desktop) */}
        <div className="hidden p-2 md:flex md:w-1/3 lg:w-1/4">
          <BookInfo
            selectedBook={selectedBook}
            onClose={handleCloseImmediate}></BookInfo>
        </div>
        {/* Off-canvas móvil: solo muestra/oculta el children */}
        <OffCanvasMobile
          isOpen={offcanvasOpen}
          onClose={handleCloseAnimated}
          position="right"
          animationDuration={OFFCANVAS_ANIMATION_MS}>
          <BookInfo
            selectedBook={selectedBook}
            onClose={handleCloseAnimated}></BookInfo>
        </OffCanvasMobile>
      </div>
    </>
  );
}

export default BookPage;
