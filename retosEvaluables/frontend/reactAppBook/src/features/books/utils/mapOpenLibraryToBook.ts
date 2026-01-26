import type { Book } from "../types/types";
import type {
  OpenLibraryDoc,
  OpenLibraryEdition,
  OpenLibraryWork,
} from "../api/openLibrary";

/**
 * mapOpenLibraryToBook
 *
 * Adapta la información procedente de OpenLibrary (resultado de búsqueda,
 * edición concreta e información de la obra) al modelo interno `Book` usado
 * por la aplicación / backend propio.
 *
 * Se asume que:
 * - `doc` proviene de la búsqueda (`search.json` o similar).
 * - `edition` es la edición seleccionada por el usuario.
 * - `work` es opcional y se usa, si existe, para enriquecer sinopsis, etc.
 *
 * NOTA: este mapeo puede ajustarse cuando el modelo de BBDD evolucione
 * (por ejemplo añadiendo campos de autor normalizado, precio, etc.).
 */
export function mapOpenLibraryToBook(
  doc: OpenLibraryDoc,
  edition: OpenLibraryEdition,
  work?: OpenLibraryWork,
): Book {
  const title = edition.title ?? doc.title ?? "Título desconocido";

  const isbn10 = edition.isbn_10?.[0] ?? "";
  const isbn13 = edition.isbn_13?.[0];

  const openLibraryId = edition.key ?? doc.key ?? ""; // puedes ajustar a sólo work o sólo edition

  const imageCoverId =
    (edition.covers && edition.covers[0]) ??
    (typeof doc.cover_i === "number" ? doc.cover_i : undefined);

  const image = imageCoverId
    ? `https://covers.openlibrary.org/b/id/${imageCoverId}-L.jpg`
    : "";

  const pages = edition.number_of_pages ?? doc.number_of_pages_median ?? 0;

  // Intentar obtener año desde publish_date o desde first_publish_year
  let year = 0;
  if (edition.publish_date) {
    const match = edition.publish_date.match(/(\d{4})/);
    if (match) {
      year = Number(match[1]);
    }
  }
  if (!year && doc.first_publish_year) {
    year = doc.first_publish_year;
  }

  // Descripción/sinopsis desde work.description si existe
  let sinopsis = "";
  if (work?.description) {
    sinopsis =
      typeof work.description === "string"
        ? work.description
        : (work.description.value ?? "");
  }

  // TODO: asignar tipo/formato real según la edición o dejar que el usuario lo elija
  const type: Book["type"] = "tapa blanda";

  // TODO: genre no viene normalizado desde OpenLibrary; puede dejarse vacío
  const genre = "";

  const book: Book = {
    book_id: 0, // Se espera que el backend asigne el ID real
    title,
    isbn_10: isbn10,
    isbn_13: isbn13,
    openLibrary_id: openLibraryId,
    type,
    image,
    genre,
    pages,
    year,
    rating: 0,
    sinopsis,
  };

  return book;
}
