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
 * - `selectedItem`: libro actualmente seleccionado o `null` si no hay selección.
 * - `onClose`: callback opcional para cerrar el panel en dispositivos móviles.
 */

import type { OpenLibraryDoc } from "../api/openLibrary";
import { useState, useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import GenreBadge from "../../../shared/ui/GenreBadge";
import { CiShare2 } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import { translateText } from "../../../shared/utils/translate";

type OpenLibraryInfoProps = {
  selectedItem: OpenLibraryDoc | null;
  onClose?: () => void;
};

function OpenLibraryInfo(props: OpenLibraryInfoProps) {
  const { selectedItem, onClose } = props;
  const [translatedSinopsis, setTranslatedSinopsis] = useState<string | null>(
    null,
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedItem) 
    setTranslatedSinopsis(null);
    setTranslateError(null);
    setIsTranslating(false);
  }, [selectedItem]);


  const handleTranslate = async () => {
    if (!selectedItem?.sinopsis) return;
    try {
      setIsTranslating(true);
      setTranslateError(null);
      const result = await translateText(selectedItem.sinopsis, "es", "auto");
      setTranslatedSinopsis(result);
    } catch (error) {
      console.error(error);
      setTranslateError(
        "No se pudo traducir la descripción. Inténtalo de nuevo más tarde.",
      );
    } finally {
      setIsTranslating(false);
    }
  };

  if (selectedItem) {
    return (
      <div className="relative w-full p-6 bg-white dark:bg-dark-surface-a10 rounded-lg shadow-sm">
        <button
          className="absolute top right-10 md:hidden p-2 text-sm font-bold rounded-md shadow-sm text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 focus:text-light-primary-a20 focus:bg-light-primary-a10/40 focus:border-0 dark:hover:bg-dark-surface-a40 dark:focus:text-dark-primary-a20 transition-colors whitespace-nowrap"
          onClick={onClose}>
          X
        </button>
        {/* Título del libro */}
        <h2 className="text-2xl md:text-3xl font-bold text-light-primary-a80 dark:text-dark-surface-a70 mb-2">
          {selectedItem.title}
        </h2>

        {/* Autor */}
        <p className="text-lg text-light-primary-a50 dark:text-dark-surface-a50 mb-6">
          por <span className="font-medium">{selectedItem.author}</span>
        </p>

        {/* Contenido principal: Portada + Información */}
        <div className="flex flex-row md:flex-col lg:flex-row gap-6 mb-6">
          {/* Portada */}
          <div className="flex-shrink-0 self-center md:self-start">
            <img
              src={selectedItem.image || "/images/placeholder-book.jpg"}
              alt={selectedItem.title}
              className="aspect[3/4] w-32 h-48 md:w-40 md:h-60 object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
            />
          </div>
          {/* Información del libro */}
          <div className="flex-1 flex flex-col justify-evenly lg:justify-between lg:min-h-48">
            <div className="w-full inline-flex md:justify-end mb-6">
              <GenreBadge genre={selectedItem.genre}></GenreBadge>
            </div>
            <div className="flex flex-col space-y-4 items-start justify-end mt-auto">
              <div className="flex gap-2">
                <div className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full bg-light-surface-a10 dark:bg-dark-surface-a20">
                  Año
                </div>
                <span className=" font-bold">{selectedItem.year}</span>
              </div>
              <div className="flex gap-2">
                <div className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full bg-light-surface-a10 dark:bg-dark-surface-a20">
                  Páginas
                </div>
                <span className=" font-bold">{selectedItem.pages}</span>
              </div>
              <div className="flex gap-2">
                <div className="w-fit text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full bg-light-surface-a10 dark:bg-dark-surface-a20">
                  Valoración
                </div>
                <span className=" font-bold">{selectedItem.rating}</span>
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
        {selectedItem.sinopsis && (
          <div className="border-t border-light-surface-a30 dark:border-dark-surface-a60 pt-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Descripción
              </h3>

              <button
                type="button"
                onClick={handleTranslate}
                disabled={isTranslating}
                className="text-xs px-3 py-1 rounded-md border border-light-surface-a40 dark:border-dark-surface-a60 text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a20 dark:hover:bg-dark-surface-a30 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                {isTranslating ? "Traduciendo..." : "Traducir al español"}
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
              {translatedSinopsis ?? selectedItem.sinopsis}
            </p>

            {translateError && (
              <p className="text-xs text-light-danger-a0">{translateError}</p>
            )}
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
  } else {
    return (
      <div className="w-full p-6 bg-white dark:bg-dark-surface-a10 rounded-lg shadow-sm border border-light-surface-a30 dark:border-dark-surface-a60">
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
}

export default BookInfo;
