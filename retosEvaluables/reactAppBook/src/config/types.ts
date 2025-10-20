type Book = {
  id_user:number;
  id_book: number  
  title: string;
  author: string;
  type: 'Tapa dura' | 'Tapa Blanda' |'Epub';
  price: number;
  image: string;
  genre: string;
};

export type { Book }