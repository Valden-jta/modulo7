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

type User = {
  id_user: number;
  firstName: string;
  lastName: string;
  nickName: string;
  userRole: string;
  email: string;
  password: string
  thumb: string;
}
type PublicUser = Omit<User, 'id_user' | 'password'>;

export type { Book, FilterOption, User, PublicUser };