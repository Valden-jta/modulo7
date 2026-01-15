// https://openlibrary.org/developers
import URLBuilder from "../../../shared/utils/urlbuilder";
import type { Book } from "../types/types";

function GetOLBook(params: Record<string, string | number | undefined>) {
  // https://openlibrary.org/dev/docs/api/search

  let books: Book[] = [];
  const url = URLBuilder("https://openlibrary.org/search.json", params);

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(`Error al llamar a OpenLibrary: ${error}`);
      throw error;
    });
}

function GetOLAuthor() {}

export default { GetOLBook, GetOLAuthor };
