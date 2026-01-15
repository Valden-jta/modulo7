type Book = {
  id_user:number;
  id_book: number  
  title: string;
  author: string;
  type: "tapa dura" | "tapa blanda" | "epub";
  price: number;
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