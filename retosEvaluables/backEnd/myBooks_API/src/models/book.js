class Book {
  constructor(id_book, id_user, title, type, author, price, photo) {
    this.id_book = id_book;
    this.id_user = id_user;
    this.title = title;
    this.type = type;
    this.author = author;
    this.price = price;
    this.photo = photo;
  }
}

function toLowerCase(object) {
  for (let field in object) {
    if (typeof object[field] === "string") {
      object[field] = object[field].toLowerCase();
    }
  }
  return object;
}

function compareBooks(book1, book2) {
  let lowerBook1 = toLowerCase({ ...book1 });
  let lowerBook2 = toLowerCase({ ...book2 });
  for (let field in lowerBook1) {
    if (field !== "id_book") {
      if (field === "price") {
        if (Number(lowerBook1[field]) !== Number(lowerBook2[field])) {
          return false;
        }
      } else {
        if (lowerBook1[field] !== lowerBook2[field]) {
          return false;
        }
      }
    }
  }
  return true;
}

module.exports = { Book, compareBooks };