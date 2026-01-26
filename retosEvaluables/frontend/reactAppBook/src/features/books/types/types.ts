type Book = {
  book_id: number  
  title: string;
  isbn_10: string;
  isbn_13?: string
  openLibrary_id: string;
  author?: string;                               // eliminar al crear BD, autor va en tabla aparte
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

export type { Book, FilterOption };