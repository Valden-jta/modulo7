// hooks/useBookFilters.ts
import { useState } from "react";

function useBookListFilters() {
  const [view, setView] = useState(true);
  const [elementsInPage, setElementsInPage] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

    const toggleView = () => {
    setView(!view);
    console.log(`Vista cambiada a: ${!view ? 'Grid' : 'Lista'}`);
  };

  const toggleGenre = (genre:string) => {
    setGenres(prevGenre => {
      if(prevGenre.includes(genre)) {
        return prevGenre.filter(g => g !== genre)
      } else {
        return [...prevGenre, genre]
      }
    });
  };

  const toggleAuthor = (author:string) => {
    setAuthors(prevAuthor => {
      if(prevAuthor.includes(author)) {
        return prevAuthor.filter(a => a !== author)
      } else {
        return [...prevAuthor, author]
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
    resetFilters
  };
}

export default useBookListFilters;
