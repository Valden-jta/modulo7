// https://openlibrary.org/developers
import URLBuilder from "../../../shared/utils/urlBuilder";
// import type { Book } from "../types/types";

/****  tipado respuestas ****/

type OpenLibraryDoc = {
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  number_of_pages_median?: number;
  cover_i?: number;
  key?: string;
  language?: string[];
  subtitle?: string;
};

type OpenLibrarySearchResponse = {
  numFound: number;
  docs: OpenLibraryDoc[];
};

/****  Busqueda de libros ****/

function GetOLBookList(
  params: Record<string, string | number | undefined>,
): Promise<OpenLibrarySearchResponse> {
  const url = URLBuilder("https://openlibrary.org/search.json", params);

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      return res.json() as Promise<OpenLibrarySearchResponse>;
    })
    .catch((error) => {
      console.error(`Error al llamar a OpenLibrary: ${error}`);
      throw error;
    });
}

/****  Obtener portadas de los libros ****/
// function GetOLBookCover(
//     // https://openlibrary.org/dev/docs/api/covers

// )

/****  Información sobre un libro ****/
// function GetOLBookInfo(params: Record<string, string | number | undefined>) {
//     /* param -> key
//         https://openlibrary.org/works/<key>.json
//         https://openlibrary.org/books/<key>.json (para ediciones concretas)

//     */
//      const url = URLBuilder("https://openlibrary.org/", params);

// }

// function GetOLAuthor() {
//     https://openlibrary.org/dev/docs/api/authors
// }

export type { OpenLibraryDoc };
export { GetOLBookList };
