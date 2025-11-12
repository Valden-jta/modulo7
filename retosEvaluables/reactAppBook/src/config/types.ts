type Book = {
  id_user:number;
  id_book: number  
  title: string;
  author: string;
  type: 'Tapa Dura' | 'Tapa Blanda' |'Epub';
  price: number;
  image: string;
  genre: string;
  pages: string;
  year: string;
  rating: number;
  sinopsis: string;
};

type FilterOption = {
  value: string;
  label: string;
};


export type { Book, FilterOption }