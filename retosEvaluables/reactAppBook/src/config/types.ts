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

type User = {
  id_user: number;
  firstName: string;
  lastName: string;
  nickName: string;
  userRole: string;
  email: string;
  password: string
  thumb: string;
  signInDate: Date;
}
type PublicUser = Omit<User, 'id_user' | 'password'>;

export type { Book, FilterOption, User, PublicUser };