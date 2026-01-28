/**
 * Página de búsqueda de libros en Open Library.
 *
 * - Permite buscar por título o autor usando el formulario superior.
 * - Obtiene una lista de documentos de Open Library
 * - Rermite seleccionar edición concreta para añadir a la biblioteca del usuario
 * - Aplica filtros de idioma y tamaño de página (límite de resultados).
 * - Sincroniza la paginación con ReactPaginate mediante el estado `searchParams.page`.
 * - Gestiona estados de carga, error y ausencia de resultados para mostrar mensajes claros.
 *
 * No recibe props: se renderiza dentro del flujo de rutas de la feature de libros.
 */
import { useEffect, useState, useRef } from "react";
// import type { Book } from "../types/types";
import type { OpenLibraryDoc } from "../api/openLibrary";
import { GetOLBookList } from "../api/openLibrary";
import BookCard from "../components/BookCard";
import ReactPaginate from "react-paginate";
import { GridLoader } from "react-spinners";
import Input from "../../../shared/ui/forms/Input";
import Button from "../../../shared/ui/forms/button";
import Select from "../../../shared/ui/forms/Select";
import { LuSearch } from "react-icons/lu";
import { CgSmileSad } from "react-icons/cg";
import OffCanvas from "../../../shared/ui/OffCanvas";

type SearchParams = {
  q: string;
  page: number;
  limit: string;
  language: string;
};

function SearchBook() {
  // Refs del formulario
  const term = useRef<HTMLInputElement | null>(null);
  const offset = useRef<HTMLSelectElement | null>(null);
  // Estado de filtros y parámetros de búsqueda
  // Límite de resultados por página (controla el Select y la query)
  const [limit, setLimit] = useState("10");
  // Idioma preferido para las ediciones enriquecidas
  const [language, setLanguage] = useState("spa");
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [results, setResults] = useState<OpenLibraryDoc[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  // Control para Guardar libro
  const [isSaved, setIsSaved] = useState<Book | null>(null)
  // Offcanvas
  // Control del off-canvas (separamos la visibilidad del selectedBook)
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const OFFCANVAS_ANIMATION_MS = 500;
  const [selectedItem, setSelectedItem] = useState(null)

  // Derivados para la paginación
  // número de elementos por página (por defecto 10 si aún no hay valor en el select)
  const itemsPerPage = parseInt(limit, 10) || 10;
  const pageCount = Math.ceil(
    totalResults / (itemsPerPage > 0 ? itemsPerPage : 10),
  );

  // Índice de página actual para sincronizar el control de paginación
  const currentPageIndex = searchParams ? searchParams.page - 1 : 0;
  const safePageIndex =
    currentPageIndex >= 0 && currentPageIndex < pageCount
      ? currentPageIndex
      : 0;

  // Handlers
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("enviando query:", term);
    if (!term.current || !term.current.value.trim()) return;
    setError(null);
    const q = `${term.current.value.trim().toLowerCase()} language:${language}`;
    setSearchParams({ q, page: 1, limit, language });
    setHasSearched(true);
  };

  const handlePagination = (data: { selected: number }) => {
    if (!searchParams) return;
    const nextPage = data.selected + 1;
    setSearchParams((prev) => (prev ? { ...prev, page: nextPage } : prev));
  };

  // Cerrar inmediatamente (uso en desktop)
  const handleCloseImmediate = () => {
    setSelectedItem(null);
    setOffcanvasOpen(false);
  };

  // Guardar libro en la base de datos
  const handleSaveBook = (Item:Book) => {
    // Mapear item de OpenLibraryDoc a Book

    /*  Llamar al API my_books: (esta operacion debe hacerse en el backend)
     *  -  Comprobar si existe el libro en tabla books
     *      Si no existe: incluir en la tabla books y crear entrada en la tabla user_book
     *      Si existe: capturar book_id y crear entrada en tabla user_book
     *  -
    */
  }


  // Cerrar con animación en móvil: ocultar offcanvas y limpiar selectedItem tras la animación
  const handleCloseAnimated = () => {
    setOffcanvasOpen(false);
    setTimeout(() => setSelectedItem(null), OFFCANVAS_ANIMATION_MS);
  };



  useEffect(() => {
    if (!searchParams) return;
    setLoading(true);
    GetOLBookList(
      {
        q: searchParams.q,
        page: searchParams.page,
        limit: searchParams.limit,
        language: searchParams.language,
      },
      "https://openlibrary.org/search.json",
      searchParams.language,
    )
      .then((data) => {
        setResults(data.docs ?? []);
        setTotalResults(data.numFound ?? data.docs?.length ?? 0);
        console.log(data.docs);
      })
      .catch((error: string) => {
        setError(error);
        console.error(error);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <section className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-dark-a0 dark:text-light-a0">
            Buscar libros
          </h1>
          <p className="text-sm text-dark-surface-a40 dark:text-light-surface-a40 mt-1">
            Encuentra libros por título o autor en la base de datos de{" "}
            <a
              className="underline italic hover:font-bold transition-all duration-200"
              href="https://openlibrary.org/">
              Open Library
            </a>
            . Introduce una o varias palabras para acotar la búsqueda.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-dark-surface-a0 p-4 rounded-md shadow-sm flex flex-col md:flex-row gap:2 md:gap-4 md:items-stretch">
          <div className="flex-1">
            <div className="flex-1">
              <Input
                ref={term}
                type="text"
                placeholder="Escribe un título o autor"
                label="Buscar libro"
                preIcon={<LuSearch />}
              />
            </div>
            <div className="flex flex-row flex-1 gap-2">
              <Select
                ref={offset}
                label="elementos por página"
                className="flex-1"
                value={limit}
                onChange={(e) => {
                  const newLimit = e.target.value;
                  setLimit(newLimit);
                  setSearchParams((prev) =>
                    prev ? { ...prev, limit: newLimit, page: 1 } : prev,
                  );
                }}>
                <option className="text-dark-a0" value="10">
                  10
                </option>
                <option className="text-dark-a0" value="20">
                  20
                </option>
                <option className="text-dark-a0" value="50">
                  50
                </option>
              </Select>
              <Select
                label="Idioma"
                className="flex-1"
                value={language}
                onChange={(e) => {
                  const newLanguage = e.target.value;
                  setLanguage(newLanguage);
                  setSearchParams((prev) => {
                    if (!prev || !term.current || !term.current.value.trim()) {
                      return prev;
                    }
                    const nextQ = `${term.current.value
                      .trim()
                      .toLowerCase()} language:${newLanguage}`;
                    return {
                      ...prev,
                      language: newLanguage,
                      q: nextQ,
                      page: 1,
                    };
                  });
                }}>
                <option className="text-dark-a0" value="spa">
                  Español
                </option>
                <option className="text-dark-a0" value="fre">
                  Francés
                </option>
                <option className="text-dark-a0" value="eng">
                  Inglés
                </option>
                <option className="text-dark-a0" value="por">
                  Portugues
                </option>
                <option className="text-dark-a0" value="ger">
                  Alemán
                </option>
              </Select>
            </div>
          </div>
          <div className="flex items-start justify-center w-full md:w-auto">
            <Button
              type="submit"
              size="md"
              text="Buscar"
              // disabled={!term.current?.value.trim()}
              preIcon={<LuSearch />}
            />
          </div>
        </form>

        <div className="mt-8">
          {!hasSearched && (
            <p className="text-sm text-dark-surface-a60 dark:text-light-surface-a60">
              Empieza escribiendo un término de búsqueda para ver resultados.
            </p>
          )}

          {hasSearched && !loading && !error && results.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
              <CgSmileSad className="text-5xl text-light-surface-a40 dark:text-dark-surface-a50" />
              <div>
                <h2 className="text-xl font-semibold text-dark-a0 dark:text-light-a0">
                  No se encontraron resultados
                </h2>
                <p className="mt-2 text-sm text-dark-surface-a60 dark:text-light-surface-a60">
                  Prueba con otro título, autor o un término más general.
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex h-full justify-center pt-30 ">
              <GridLoader color="var(--color-light-primary-a0)" size={20} />
            </div>
          )}

          {!loading && error && (
            <p className="text-sm text-light-danger-a0">{error}</p>
          )}

          {!loading && !error && results.length > 0 && hasSearched && (
            <div className="mt-4">
              <p className="mb-4 text-sm text-dark-surface-a60 dark:text-light-surface-a60">
                Resultados encontrados: {totalResults}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map((doc) => (
                  <BookCard key={doc.key} doc={doc} />
                  // TODO: vista de rows para movil
                ))}
              </div>
              <ReactPaginate
                previousLabel={"← Anterior"}
                nextLabel={"Siguiente →"}
                breakLabel={"..."}
                pageCount={pageCount}
                forcePage={safePageIndex}
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
          )}
        </div>
      </div>
      <OffCanvas
        isOpen={offcanvasOpen}
        onClose={handleCloseAnimated}
        position="right"
        animationDuration={OFFCANVAS_ANIMATION_MS}>
        <div>Hola</div>
      </OffCanvas>
    </section>
  );
}

export default SearchBook;
