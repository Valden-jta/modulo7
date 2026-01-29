/**
 * Modelo de dominio principal para un libro en la app.
 *
 * Atributos:
 * - `book_id`: identificador interno de la obra en la BBDD (`book.book_id`).
 *   Puede ser 0 o `undefined` si aún no existe en la BBDD.
 * - `edition_id`: identificador interno de la edición concreta (`edition.edition_id`).
 *   Opcional, porque puede existir la obra sin una edición asociada.
 * - `user_id`: usuario propietario de la edición en su biblioteca (`user_book.user_id`).
 *   Normalmente informado cuando el backend devuelve la biblioteca personal.
 * - `openlibrary_work_id`: clave de la obra en Open Library, p.ej. "/works/OL123W"
 *   (columna `book.openlibrary_work_id`).
 * - `openlibrary_edition_id`: clave de la edición en Open Library, p.ej. "/books/OL123M"
 *   (columna `edition.openlibrary_edition_id`).
 * - `isbn_10` / `isbn_13`: identificadores ISBN de la edición (tabla `edition`).
 * - `title`: título de la obra. Campo principal usado por la UI.
 * - `author`: autor desnormalizado para mostrar en la UI.
 * - `type`: tipo/formato mostrado en la UI (p.ej. "tapa dura", "epub");
 *   puede mapearse desde `edition.format`.
 * - `image`: URL de la imagen de portada a mostrar en la UI.
 * - `genre`: género literario principal.
 * - `pages`: número de páginas de la edición.
 * - `year`: año de publicación.
 * - `rating`: valoración del usuario (`user_book.rating`).
 * - `sinopsis`: descripción o sinopsis de la obra (`book.description` o `work.description`).
 */
type Book = {
  book_id: number;
  edition_id?: number;
  user_id?: number;
  openlibrary_work_id?: string;
  openlibrary_edition_id?: string;
  isbn_10?: string;
  isbn_13?: string;
  title: string;
  author?: string;
  type: "tapa dura" | "tapa blanda" | "epub";
  image: string;
  genre: string;
  pages: number;
  year: number;
  rating: number;
  sinopsis: string;
};

type FilterOption = {
  value: string;
  label: string;
};

/**
 * Modelo de vista unificado para representar libros en la UI.
 *
 * Se usa en componentes de presentación (BookCard, BookRows, BookList) para
 * abstraer el origen de los datos (BBDD propia vs Open Library).
 */
type BookViewModel = {
  /** Identificador único para la UI (id interno o key externa). */
  id: string;
  title: string;
  author: string;
  /** Enlace opcional al autor (usado en resultados de Open Library). */
  authorUrl?: string;
  /** URL de portada (puede ser vacía; el componente aplica fallback). */
  image: string;
  genre?: string;
  type?: string;
  pages?: number | string;
  year?: number | string;
  rating?: number;
  description?: string;
  /** Origen del dato para lógica de alto nivel. */
  origin: "user" | "openlibrary";
};

export type { Book, FilterOption, BookViewModel };
