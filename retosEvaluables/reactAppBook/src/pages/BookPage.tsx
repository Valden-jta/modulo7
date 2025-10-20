import BookItem from "../components/BookItem";

/*
  title: string;
  author: string;
  type: string;
  price: number;
  image: string;
  genre: string;
*/

function BookPage() {
  return (
    <>
      <div className="m-5 w-[85%]">
        <div className="p-5">Filtros y cosas</div>
        <div className="grid grid-cols-4 gap-4">
          <BookItem
            id_user={1}
            id_book={1}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={2}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={3}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={4}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={5}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={6}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={7}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={8}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={9}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={10}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={11}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={12}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={13}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
          <BookItem
            id_user={1}
            id_book={14}
            title="Roma soy yo"
            author="Santiago Posteguillo"
            type="Tapa dura"
            price={29.9}
            image="https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg"
            genre="novela histórica"
          />
        </div>
        <div className="p-5">Paginación</div>
      </div>
    </>
  );
}

export default BookPage;
