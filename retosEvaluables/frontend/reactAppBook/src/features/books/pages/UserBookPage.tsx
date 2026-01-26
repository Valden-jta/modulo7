import { useState } from "react";
import type { Book } from "../types/types";
import BookList from "../components/BookList";
import BookFilterBar from "../components/BookFilterBar";
import ReactPaginate from "react-paginate";
import BookInfo from "../components/BookInfo";
import useBookListFilters from "../hooks/useBookListFilter";
import { CgSmileSad } from "react-icons/cg";
import { LuBookOpen } from "react-icons/lu";

import { books } from "../../../config/data";
import OffCanvas from "../../../shared/ui/OffCanvas";
import BookForm from "../components/forms/BookForm";
import Button from "../../../shared/ui/forms/button";

function UserBookPage() {
  // Hooks de filtros y vista
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

  // Estado de selección y edición
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  // Control del off-canvas (separamos la visibilidad del selectedBook)
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const OFFCANVAS_ANIMATION_MS = 500; // debe coincidir con OffCanvasMobile.animationDuration

  // Handlers de selección y edición
  const onBookClick = (newBook: Book) => {
    setSelectedBook(newBook);
    setOffcanvasOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsEditing(true);
    setOffcanvasOpen(true);
  };

  // Cerrar inmediatamente (uso en desktop)
  const handleCloseImmediate = () => {
    setSelectedBook(null);
    setOffcanvasOpen(false);
  };

  // Cerrar con animación en móvil: ocultar offcanvas y limpiar selectedBook tras la animación
  const handleCloseAnimated = () => {
    setOffcanvasOpen(false);
    setTimeout(() => setSelectedBook(null), OFFCANVAS_ANIMATION_MS);
  };

  // Filtrado de libros a partir de los filtros activos
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

  // Handlers de paginación y filtros (con reset de página cuando aplica)
  const handlePagination = (data: { selected: number }) => {
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
      <div className="w-full flex items-center justify-center">
        {/* <Filtros /> */}
        <div className="w-full md:w-2/3 lg:w-2/3">
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
              onEdit={handleEditBook}
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
            onPageChange={handlePagination}
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
        <OffCanvas
          isOpen={offcanvasOpen}
          onClose={handleCloseAnimated}
          position="right"
          animationDuration={OFFCANVAS_ANIMATION_MS}>
          {isEditing && selectedBook ? (
            <div className="w-full flex flex-col gap-5 p-2">
              <h3 className="text-3xl">Edita los campos que necesites</h3>
              <div className="w-1/2 flex justify-end ml-auto">
                <Button
                  text="Cerrar sin guardar"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                />
              </div>
              <hr />
              <BookForm
                book={selectedBook}
                onSave={() => {
                  // Actualizar el libro, cerrar modo edición, etc.
                  setIsEditing(false);
                  // Llamar API book para guardar (actualiza parametros: onSave={(data) =>{} cuando prepares la callback)
                }}
              />
            </div>
          ) : selectedBook ? (
            <BookInfo
              selectedItem={selectedBook}
              onClose={handleCloseImmediate}
            />
          ) : (
            <div className="flex flex-col flex-1 items-center justify-center h-96 p-8 border-2 border-dashed border-light-surface-a30 dark:border-dark-surface-a50 rounded-lg gap-4">
              <LuBookOpen size={48} className="text-light-surface-a40" />
              <h3 className="text-lg font-medium text-light-surface-a30">
                Sin libro seleccionado
              </h3>
              <p className="text-sm text-light-surface-a40 text-center">
                Haz clic en una tarjeta de libro a la izquierda o crea uno nuevo
                desde el botón "Añadir libro"
              </p>
            </div>
          )}
        </OffCanvas>
      </div>
    </>
  );
}

export default UserBookPage;
