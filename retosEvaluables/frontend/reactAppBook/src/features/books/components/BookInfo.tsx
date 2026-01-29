// TODO: usar el idioma seleccionado por el usuario y traducir automáticamente sin necesidad de botón.
/**
 * BookInfo
 *
 * Muestra la ficha detallada de un libro seleccionado.
 *
 * Responsabilidades:
 * - Renderizar la información principal del libro: título, autor, año, páginas, género, sinopsis e imagen.
 * - Mostrar y permitir modificar la **valoración del usuario** mediante estrellas (`ReactStars`).
 * - Mostrar acciones relacionadas con el libro (marcar como leído, favorito, compartir).
 * - Mostrar un **skeleton de carga** cuando no hay libro seleccionado, para mantener una buena UX.
 *
 * Nota importante (pendiente de backend):
 * - Actualmente el `rating` se mantiene únicamente en estado local.
 * - Cuando exista API/BBDD, esta lógica debería integrarse con el modelo `user_book`
 *   para guardar la valoración persistida por usuario.
 *
 * Props:
 * - `selectedItem`: elemento seleccionado (Book, BookViewModel u OpenLibraryWork)
 *   o `null` si no hay selección.
 * - `selectedBook`: alias legacy usado por componentes antiguos (AddBookPage).
 * - `onClose`: callback opcional para cerrar el panel en dispositivos móviles.
 */

import type { Book, BookViewModel } from "../types/types";
import type { OpenLibraryWork } from "../api/openLibrary";
import { useState, useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import GenreBadge from "../../../shared/ui/GenreBadge";
import ReactStars from "react-rating-stars-component";
import { CiShare2 } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";

type AnyItem = Book | OpenLibraryWork | BookViewModel;

type BookInfoProps = {
  // API nueva: se usa en UserBookPage, UserMainPage y SearchBook
  selectedItem?: AnyItem | null;
  // API legacy: se usaba en AddBookPage, la mantenemos para compatibilidad
  selectedBook?: Book | BookViewModel | null;
  onClose?: () => void;
};

const isBook = (item: AnyItem): item is Book => {
  // Consideramos libro de dominio cualquier objeto que tenga
  // identificador interno o sinopsis (caso de mocks / AddBookPage).
  return "book_id" in item || "sinopsis" in item;
};

const isOpenLibraryWork = (item: AnyItem): item is OpenLibraryWork => {
  return "key" in item && !("book_id" in item);
};

function BookInfo(props: BookInfoProps) {
  const { selectedItem, selectedBook, onClose } = props;
  const item = selectedItem ?? selectedBook ?? null;
  const [rating, setRating] = useState<number>(0);

  console.log(item);

  useEffect(() => {
    if (item && isBook(item)) {
      setRating(item.rating ?? 0);
      return;
    }
    // Para BookViewModel u OpenLibraryWork, inicializamos rating a 0
    setRating(0);
  }, [item]);

  const rate = (newRating: number) => {
    setRating(newRating);
  };

  if (!item) {
    return (
      <div className="w-full p-6 bg-white dark:bg-dark-surface-a10 rounded-lg shadow-sm border border-light-surface-a30 dark:border-dark-surface-a60">
        <button
          className="absolute top right-10 md:hidden p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap"
          onClick={onClose}>
          X
        </button>
        <h2 className="text-center text-3xl mb-5 p-5 border-b border-b-light-surface-a60 dark:border-b-dark-surface-a70">
          Datos del libro
        </h2>

        {/* Skeleton para título */}
        <div className="h-8 w-3/4 bg-light-surface-a20 dark:bg-dark-surface-a30 rounded-md animate-pulse mb-4"></div>
        {/* Skeleton para autor */}
        <div className="h-5 w-1/2 bg-light-surface-a20 dark:bg-dark-surface-a30 rounded-md animate-pulse mb-6"></div>
        {/* Skeleton para portada + info */}
        <div className="flex gap-6">
          {/* Portada */}
          <div className="w-32 h-48 bg-light-surface-a20 dark:bg-dark-surface-a30 rounded-lg animate-pulse flex-shrink-0"></div>
          {/* Información */}
          <div className="flex-1 md:hidden lg:block space-y-3">
            <div className="h-4 w-full bg-light-surface-a20 dark:bg-dark-surface-a30 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-light-surface-a20 dark:bg-dark-surface-a30 rounded animate-pulse"></div>
            <div className="h-4 w-4/6 bg-light-surface-a20 dark:bg-dark-surface-a30 rounded animate-pulse"></div>
            <div className="h-4 w-3/6 bg-light-surface-a20 dark:bg-dark-surface-a30 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Skeleton para descripción */}
        <div className="mt-6 space-y-2">
          <div className="h-4 w-1/4 bg-light-surface-a20 dark:bg-dark-surface-a30 rounded animate-pulse mb-3"></div>
          <div className="h-3 w-full bg-light-surface-a20 dark:bg-dark-surface-a30 rounded animate-pulse"></div>
          <div className="h-3 w-full bg-light-surface-a20 dark:bg-dark-surface-a30 rounded animate-pulse"></div>
          <div className="h-3 w-3/4 bg-light-surface-a20 dark:bg-dark-surface-a30 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Vista para libros internos (Book) o view model (BookViewModel)
  if (!isOpenLibraryWork(item)) {
    const isDomainBook = isBook(item);

    const title = item.title;
    const author = isDomainBook
      ? item.author
      : (item.author ?? "Autor desconocido");
    const image = isDomainBook
      ? item.image || "/images/placeholder-book.jpg"
      : item.image || "/images/placeholder-book.jpg";
    const genre = isDomainBook ? item.genre : (item as BookViewModel).genre;
    const year = isDomainBook ? item.year : (item as BookViewModel).year;
    const pages = isDomainBook ? item.pages : (item as BookViewModel).pages;
    const baseRating = isDomainBook
      ? item.rating
      : (item as BookViewModel).rating;

    const descriptionText = isDomainBook
      ? item.sinopsis
      : (item as BookViewModel).description;

    return (
      <div className="relative w-full p-6 bg-white dark:bg-dark-surface-a10 rounded-lg shadow-sm">
        <button
          className="absolute top right-10 md:hidden p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap"
          onClick={onClose}>
          X
        </button>
        {/* Título del libro */}
        <h2 className="text-2xl md:text-3xl font-bold text-light-primary-a80 dark:text-dark-surface-a70 mb-2">
          {title}
        </h2>

        {/* Autor */}
        <p className="text-lg text-light-primary-a50 dark:text-dark-surface-a50 mb-6">
          por <span className="font-medium">{author}</span>
        </p>

        {/* Contenido principal: Portada + Información */}
        <div className="flex flex-row md:flex-col lg:flex-row gap-6 mb-6">
          {/* Portada */}
          <div className="flex-shrink-0 self-center md:self-start">
            <img
              src={image}
              alt={title}
              className="aspect[3/4] w-32 h-48 md:w-40 md:h-60 object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
            />
          </div>
          {/* Información del libro */}
          <div className="flex-1 flex flex-col justify-evenly lg:justify-between lg:min-h-48">
            <div className="w-full inline-flex md:justify-end mb-6">
              <GenreBadge genre={genre ?? "Sin género"}></GenreBadge>
            </div>
            <div className="flex flex-col space-y-4 items-start justify-end mt-auto">
              <div className="flex gap-2">
                <div className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full bg-light-surface-a10 dark:bg-dark-surface-a20">
                  Año
                </div>
                <span className=" font-bold">{year}</span>
              </div>
              <div className="flex gap-2">
                <div className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full bg-light-surface-a10 dark:bg-dark-surface-a20">
                  Páginas
                </div>
                <span className=" font-bold">{pages}</span>
              </div>
              <div className="flex gap-2">
                <div className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full bg-light-surface-a10 dark:bg-dark-surface-a20">
                  Valoración
                </div>
                <span className=" font-bold">{baseRating}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Valoracion del usuario */}
        <div className="flex flex-col lg:flex-row gap-3 border-t border-light-surface-a30 dark:border-dark-surface-a60 py-6">
          <p>¿Te ha gustado?</p>

          <ReactStars
            count={5}
            char={<IoIosStar />}
            value={rating}
            size={20}
            activeColor="#ffd700"
            isHalf={true}
            onChange={rate}
            edit={true}
          />
        </div>
        {/* Descripción / sinopsis */}
        {descriptionText && (
          <div className="border-t border-light-surface-a30 dark:border-dark-surface-a60 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Descripción
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
              {descriptionText}
            </p>
          </div>
        )}

        {/* Acciones opcionales */}
        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-light-surface-a30 dark:border-dark-surface-a60">
          <button className="p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap">
            Marcar como leído
          </button>

          {/* TODO:  añadir dropdown de colecciones (cuando las cree)*/}
          {/* <CheckboxGroup></CheckboxGroup> */}

          <button className="p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap">
            <MdFavoriteBorder />
          </button>
          <button className="p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap">
            <CiShare2 />
          </button>
        </div>
      </div>
    );
  }

  // Vista para works de Open Library
  const coverId = item.covers?.[0];
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "/images/placeholder-book.jpg";

  const description =
    typeof item.description === "string"
      ? item.description
      : (item.description?.value ?? "");

  const yearLabel = item.first_publish_date ?? "Año desconocido";

  const mainSubject = item.subjects?.[0] ?? "Sin género";

  return (
    <div className="relative w-full p-6 bg-white dark:bg-dark-surface-a10 rounded-lg shadow-sm">
      <button
        className="absolute top right-10 md:hidden p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap"
        onClick={onClose}>
        X
      </button>
      {/* Título del libro */}
      <h2 className="text-2xl md:text-3xl font-bold text-light-primary-a80 dark:text-dark-surface-a70 mb-2">
        {item.title}
      </h2>

      {/* Autor (no siempre disponible en este tipo) */}
      <p className="text-lg text-light-primary-a50 dark:text-dark-surface-a50 mb-6">
        por <span className="font-medium">Autor no disponible</span>
      </p>

      {/* Contenido principal: Portada + Información */}
      <div className="flex flex-row md:flex-col lg:flex-row gap-6 mb-6">
        {/* Portada */}
        <div className="flex-shrink-0 self-center md:self-start">
          <img
            src={imageUrl}
            alt={item.title}
            className="aspect[3/4] w-32 h-48 md:w-40 md:h-60 object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
          />
        </div>
        {/* Información del libro */}
        <div className="flex-1 flex flex-col justify-evenly lg:justify-between lg:min-h-48">
          <div className="w-full inline-flex md:justify-end mb-6">
            <GenreBadge genre={mainSubject}></GenreBadge>
          </div>
          <div className="flex flex-col space-y-4 items-start justify-end mt-auto">
            <div className="flex gap-2">
              <div className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full bg-light-surface-a10 dark:bg-dark-surface-a20">
                Año
              </div>
              <span className=" font-bold">{yearLabel}</span>
            </div>
            <div className="flex gap-2">
              <div className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full bg-light-surface-a10 dark:bg-dark-surface-a20">
                Páginas
              </div>
              <span className=" font-bold">N/D</span>
            </div>
            <div className="flex gap-2">
              <div className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full bg-light-surface-a10 dark:bg-dark-surface-a20">
                Valoración
              </div>
              <span className=" font-bold">{rating}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Valoracion del usuario */}
      <div className="flex flex-col lg:flex-row gap-3 border-t border-light-surface-a30 dark:border-dark-surface-a60 py-6">
        <p>¿Te ha gustado?</p>

        <ReactStars
          count={5}
          char={<IoIosStar />}
          value={rating}
          size={20}
          activeColor="#ffd700"
          isHalf={true}
          onChange={rate}
          edit={true}
        />
      </div>
      {/* Descripción */}
      {description && (
        <div className="border-t border-light-surface-a30 dark:border-dark-surface-a60 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Descripción
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
            {description}
          </p>
        </div>
      )}

      {/* Acciones opcionales */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-light-surface-a30 dark:border-dark-surface-a60">
        <button className="p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap">
          Marcar como leído
        </button>

        <button className="p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap">
          <MdFavoriteBorder />
        </button>
        <button className="p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap">
          <CiShare2 />
        </button>
      </div>
    </div>
  );
}

export default BookInfo;
