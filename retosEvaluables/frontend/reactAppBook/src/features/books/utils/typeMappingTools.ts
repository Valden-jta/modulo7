import type { Book, BookViewModel } from "../types/types";
import type { OpenLibraryDoc, OpenLibraryWork } from "../api/openLibrary";

/**
 * mapBookToViewModel
 *
 * Normaliza un `Book` de dominio (proveniente de la BBDD o mocks)
 * a un `BookViewModel` consumible por componentes de presentación
 * como `BookCard`, `BookRows` y `BookList`.
 *
 * No aplica lógica de negocio ni llamadas a API: solo adapta
 * nombres de campos y rellena valores por defecto amigables
 * para la UI.
 */
export function mapBookToViewModel(book: Book): BookViewModel {
  return {
    id: String(book.book_id ?? ""),
    title: book.title,
    author: book.author ?? "Autor desconocido",
    image: book.image,
    genre: book.genre,
    type: book.type,
    pages: book.pages,
    year: book.year,
    rating: book.rating,
    description: book.sinopsis,
    origin: "user",
  };
}

/**
 * mapOpenLibraryDocToViewModel
 *
 * Convierte un `OpenLibraryDoc` devuelto por la API de Open Library
 * en un `BookViewModel` listo para ser pintado en la UI.
 *
 * Se usa principalmente en la página `SearchBook` para que la
 * lista de resultados use los mismos componentes que los libros
 * de la biblioteca del usuario.
 */
export function mapOpenLibraryDocToViewModel(
  doc: OpenLibraryDoc,
): BookViewModel {
  const coverId = typeof doc.cover_i === "number" ? doc.cover_i : undefined;

  return {
    id: doc.key ?? "",
    title: doc.title ?? "Título desconocido",
    author: doc.author_name?.[0] ?? "Autor desconocido",
    authorUrl: doc.author_key?.[0]
      ? `https://openlibrary.org/authors/${doc.author_key[0]}`
      : undefined,
    image: coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "",
    genre: undefined,
    type: undefined,
    pages: doc.number_of_pages_median,
    year: doc.first_publish_year,
    rating: undefined,
    description: undefined,
    origin: "openlibrary",
  };
}

/**
 * mapOpenLibraryWorkToViewModel
 *
 * Convierte un `OpenLibraryWork` (detalle de una obra individual obtenido
 * desde el endpoint `/works/{id}.json`) en un `BookViewModel` listo para la UI.
 *
 * Este mapeo está pensado para futuras funcionalidades donde, tras seleccionar
 * un resultado en `SearchBook`, se recupere la información detallada del work
 * y se muestre usando los mismos componentes de presentación que el resto
 * de libros.
 */
export function mapOpenLibraryWorkToViewModel(
  work: OpenLibraryWork,
): BookViewModel {
  const coverId = work.covers?.[0];

  const image = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "";

  const mainSubject = work.subjects?.[0];

  const firstAuthorRef = work.authors?.[0];
  const authorUrl = firstAuthorRef?.author?.key
    ? `https://openlibrary.org${firstAuthorRef.author.key}`
    : undefined;

  const descriptionText =
    typeof work.description === "string"
      ? work.description
      : work.description?.value;

  return {
    id: work.key ?? "",
    title: work.title ?? "Título desconocido",
    author: "Autor desconocido",
    authorUrl,
    image,
    genre: mainSubject,
    type: undefined,
    pages: undefined,
    year: work.first_publish_date,
    rating: undefined,
    description: descriptionText,
    origin: "openlibrary",
  };
}
