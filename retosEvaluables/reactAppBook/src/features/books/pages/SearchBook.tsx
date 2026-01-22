import { useEffect, useState, useRef } from "react";
// import type { Book } from "../types/types";
import type { OpenLibraryDoc } from "../api/openLibrary"
import { GetOLBookList } from "../api/openLibrary";
// import { books } from "../../../config/data";
import Input from "../../../shared/ui/forms/Input";
import Button from "../../../shared/ui/forms/button";
import BookCard from "../components/BookCard";
import { GridLoader } from "react-spinners";
import { LuSearch } from "react-icons/lu";
import { CgSmileSad } from "react-icons/cg";
import Select from "../../../shared/ui/forms/Select";

type SearchParams = {
  q: string;
  limit: string;
  language: string;
};

function SearchBook() {
  const term = useRef<HTMLInputElement | null>(null);
  const offset = useRef<HTMLSelectElement | null>(null);
  const preferredLanguage = useRef<HTMLSelectElement | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [results, setResults] = useState<OpenLibraryDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Cambiar control de formulario: solo debe atender cambios en el submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("enviando query:", term);
    if (!term) return;
    const limit = offset.current?.value ?? "10";
    const language = preferredLanguage.current?.value ?? "spa";
    const q = `${term.current?.value.trim().toLowerCase()} language:${language}`;
    setSearchParams({ q, limit, language });
    setHasSearched(true);
  };

  useEffect(() => {
    if (!searchParams) return;
    setLoading(true);
    GetOLBookList({
      q: searchParams.q,
      page: 1,
      limit: searchParams.limit,
      language: searchParams.language,
    })
      .then((data) => {
        setResults(data.docs ?? []);
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
                className="flex-1">
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
              <Select ref={preferredLanguage} label="Idioma" className="flex-1">
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

          {hasSearched && results.length === 0 && (
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
                Resultados encontrados: {results.length}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map((doc) => (
                  <BookCard key={doc.key} book={doc} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchBook;
