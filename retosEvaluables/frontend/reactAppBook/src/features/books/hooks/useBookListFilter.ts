/**
 * Hook `useBookListFilters`
 *
 * Encapsula todo el estado y la lógica necesaria para filtrar y
 * paginar la lista de libros en la sección de biblioteca.
 *
 * Estado interno que gestiona:
 * - `view`: modo de visualización (grid vs tabla).
 * - `elementsInPage`: número de elementos por página (como string para enlazar con selects).
 * - `authors`: array de autores seleccionados como filtro.
 * - `genres`: array de géneros seleccionados como filtro.
 * - `currentPage`: página actual en la paginación.
 *
 * Funciones que expone:
 * - `toggleView()`: alterna entre vista de tarjetas y vista de tabla.
 * - `toggleGenre(genre)`: añade o quita un género de la lista de filtros.
 * - `toggleAuthor(author)`: añade o quita un autor de la lista de filtros.
 * - `resetFilters()`: limpia todos los filtros y reinicia la paginación.
 *
 * Este hook no aplica los filtros directamente sobre los datos; se
 * limita a gestionar el estado de filtros para que el componente de
 * lista aplique la lógica de filtrado/paginado según convenga.
 */

import { useState } from "react";

function useBookListFilters() {
  const [view, setView] = useState(true);
  const [elementsInPage, setElementsInPage] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const toggleView = () => {
    setView(!view);
    console.log(`Vista cambiada a: ${!view ? "Grid" : "Lista"}`);
  };

  const toggleGenre = (genre: string) => {
    setGenres((prevGenre) => {
      if (prevGenre.includes(genre)) {
        return prevGenre.filter((g) => g !== genre);
      } else {
        return [...prevGenre, genre];
      }
    });
  };

  const toggleAuthor = (author: string) => {
    setAuthors((prevAuthor) => {
      if (prevAuthor.includes(author)) {
        return prevAuthor.filter((a) => a !== author);
      } else {
        return [...prevAuthor, author];
      }
    });
  };

  const resetFilters = () => {
    setAuthors([]);
    setGenres([]);
    setElementsInPage("");
    setCurrentPage(0);
    console.log("Filtros reseteados");
  };

  return {
    // Estados
    view,
    elementsInPage,
    authors,
    genres,
    currentPage,
    // Setters
    setView,
    setElementsInPage,
    setAuthors,
    setGenres,
    setCurrentPage,
    // Funciones
    toggleView,
    toggleGenre,
    toggleAuthor,
    resetFilters,
  };
}

export default useBookListFilters;
