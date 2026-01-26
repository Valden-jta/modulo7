//?_________  Imports _________\\
const { pool } = require("../database.js");
const { Book, compareBooks } = require("../models/book.js");

//?_________ Datos _________\\
let book;
let books = [];

//Ej: let user = {
// id_book: Number
// id_user: Number
// title: String,
// type: String,
// author: String,
// price: Number,
// photo: String
// }

//?_________ Funciones _________\\
/*

API VERBS   =   CRUD
------------------------
GET         =   SELECT
POST        =   INSERT
PUT         =   UPDATE
DELETE      =   DELETE
*/

// * ------------ GETBOOKS ->

const getBook = async (req, res) => {
  try {
    let id_user = req.query.id_user;
    let id_book = req.query.id_book;
    let sql;
    let param = [];

    //Comprobar si se recibe id_user
    if (!id_user) {
      return res.status(400).json({
        error: true,
        code: 400,
        message: "Petición mal formulada. Se debe incluir el ID de usuario",
      });
    }

    // Comprobar si el usuario existe
    sql = "SELECT COUNT(*) AS total FROM user WHERE id_user = ?";
    let [userSearch] = await pool.query(sql, [id_user]);
    if (userSearch[0].total === 0) {
      // No existe el usuario
      return res.status(404).json({
        error: true,
        code: 404,
        message: "No existe ningún usuario con ese id",
      });
    }
    // * 1. Devolver todos los libros almacenados en la DB de un usario
    if (!id_book) {
      sql = "SELECT * FROM book WHERE id_user = ?";
      let [getAll] = await pool.query(sql, [id_user]);
      return res.status(200).json({
        error: false,
        code: 200,
        message:
          getAll.length === 0
            ? "El usuario no tiene libros"
            : `${getAll.length} Libros recuperados para el usuario`,
        data: getAll,
      });
    }

    // * 2. Devolver datos del libro que coincida con el id_book y elid_user especificados
    sql = "SELECT * FROM book WHERE id_user = ? AND id_book = ?";
    param = [id_user, id_book];
    let [getOne] = await pool.query(sql, param);
    return res.status(200).json({
      error: false,
      code: 200,
      message:
        getOne.length === 0
          ? "El usuario no tiene ese libro"
          : "Libro recuperado con exito",
      data: getOne,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      code: 500,
      message: error.message,
    });
  }
};

// * ------------ POSTBOOK -> añadir un nuevo libro asociado a un usuario a la DB
const postBook = async (req, res) => {
  try {
    let newBook = new Book(
      null,
      req.body.id_user,
      req.body.title,
      req.body.type,
      req.body.author,
      req.body.price,
      req.body.photo
    );
    let sql;
    let param = [];

    //Comporbar que todos los campos(menos id_book) llegan con datos
    for (let field in newBook) {
      if (
        field !== "id_book" &&
        (newBook[field] == null || newBook[field] === "")
      ) {
        return res.status(400).json({
          error: true,
          code: 400,
          message: "Petición mal formulada. Se deben incluir todos los campos",
        });
      }
    }
    // Comporbar si existe el usuario
    sql = "SELECT COUNT(*) AS total FROM user WHERE id_user = ?";
    let [userSearch] = await pool.query(sql, [newBook.id_user]);
    if (userSearch[0].total === 0) {
      // No existe el usuario
      return res.status(404).json({
        error: true,
        code: 404,
        message: "No existe ningún usuario con ese id",
      });
    }

    // Comprobar si el usuario ya tiene el libro (permite diferenciar entre tapa blanda/tapa dura, precio e imagen)
    sql = `SELECT * FROM book where id_user = ?`;
    let [userBooks] = await pool.query(sql, newBook.id_user);
    if (userBooks.length) {
      for (let book of userBooks) {
        let checkBook = new Book(
          book.id_book,
          book.id_user,
          book.title,
          book.type,
          book.author,
          book.price,
          book.photo
        );
        if (compareBooks(newBook, checkBook)) {
          return res.status(409).json({
            error: true,
            message: "El libro ya existe para este usuario",
          });
        }
      }
    }

    sql =
      "INSERT INTO book (id_user, title, type, author, price, photo) VALUES (?,?,?,?,?,?)";
    param = [
      newBook.id_user,
      newBook.title,
      newBook.type,
      newBook.author,
      newBook.price,
      newBook.photo,
    ];
    let [result] = await pool.query(sql, param);
    if (result.affectedRows === 0) {
      return res.status(400).json({
        error: true,
        code: 400,
        message: "No se pudo añadir el libro",
        data: result,
      });
    } else {
      return res.status(200).json({
        error: false,
        code: 200,
        message: "Libro añadido con éxito",
        data: {result, newBook}
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      code: 500,
      message: error.message,
    });
  }
};

// * ------------PUTBOOK -> modificar un libro de la DB
const putBook = async (req, res) => {
  try {
    let updatedBook = new Book(
      req.body.id_book,
      req.body.id_user,
      req.body.title,
      req.body.type,
      req.body.author,
      req.body.price,
      req.body.photo
    );
    let sql;
    let param = [];
    //Comporbar que todos los campos llegan con datos
    for (let field in updatedBook) {
      if (updatedBook[field] == null || updatedBook[field] === "") {
        return res.status(400).json({
          error: true,
          code: 400,
          message: "Petición mal formulada. Se deben incluir todos los campos",
        });
      }
    }

    // Comporbar si existe el libro
    sql = `SELECT * FROM book WHERE id_book = ? AND id_user = ?`;
    param = [updatedBook.id_book, updatedBook.id_user];
    let [getOne] = await pool.query(sql, param);
    if (getOne.length === 0) {
      return res.status(404).json({
        error: true,
        code: 404,
        message: "El usuario no tiene ese libro",
        data: [],
      });
    }

    // Actualizar el libro
    sql = `UPDATE book SET title = ?, type = ?, author = ?, price = ?, photo = ? WHERE id_book = ? AND id_user = ?`;
    param = [
      updatedBook.title,
      updatedBook.type,
      updatedBook.author,
      updatedBook.price,
      updatedBook.photo,
      updatedBook.id_book,
      updatedBook.id_user,
    ];
    let [result] = await pool.query(sql, param);

    if (result.affectedRows === 0) {
      return res.status(400).json({
        error: true,
        code: 400,
        message: "No se pudo actualizar el libro",
      });
    } else {
      return res.status(200).json({
        error: false,
        code: 200,
        message: "Libro actualizado con éxito",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      code: 500,
      message: error.message,
    });
  }
};

// * ------------ DELETEBOOK -> eliminar un libro de la DB
const deleteBook = async (req, res) => {
  try {
    let id_user = req.body.id_user;
    let id_book = req.body.id_book;
    let sql;
    let param = [];

    //Comprobar si se recibe id_user
    if (!id_user) {
      return res.status(400).json({
        error: true,
        code: 400,
        message: "Petición mal formulada. Se debe incluir el ID de usuario",
      });
    }
    // Comporbar si existe el usuario
    sql = "SELECT COUNT(*) AS total FROM user WHERE id_user = ?";
    let [userSearch] = await pool.query(sql, [id_user]);
    if (userSearch[0].total === 0) {
      // No existe el usuario
      return res.status(404).json({
        error: true,
        code: 404,
        message: "No existe ningún usuario con ese id",
      });
    }

    // Comporbar si existe el libro
    sql = `SELECT * FROM book WHERE id_book = ? AND id_user = ?`;
    param = [id_book, id_user];
    let [getOne] = await pool.query(sql, param);
    if (getOne.length === 0) {
      return res.status(404).json({
        error: true,
        code: 404,
        message: "El usuario no tiene ese libro",
        data: [],
      });
    } else {
      sql = "DELETE FROM book WHERE id_book = ? AND id_user = ?";
      let [result] = await pool.query(sql, param);
      if (result.affectedRows > 0) {
        res.status(200).json({
          error: false,
          code: 200,
          message: "Libro eliminado correctamente",
          data: result,
        });
      } else {
        res.status(400).json({
          error: true,
          code: 400,
          message: "No se pudo eliminar el libro",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      code: 500,
      message: error.message,
    });
  }
};

//?_________ Exports _________\\

module.exports = {
  getBook,
  postBook,
  putBook,
  deleteBook,
};
