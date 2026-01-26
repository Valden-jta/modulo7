// *---------------------- comment.routers ---------------------- *\\

//?_________  Imports _________\\
const { Router } = require("express");
const router = Router();

//?_________  rutas y metodos _________\\
const commentCtrl = require("../controller/comment.controller");

// Comentarios sobre libros
// GET /books/:book_id/comments
router.get("/books/:book_id/comments", commentCtrl.getBookComments);

// POST /books/:book_id/comments
router.post("/books/:book_id/comments", commentCtrl.createBookComment);

// Comentarios sobre colecciones
// GET /collections/:collection_id/comments
router.get(
  "/collections/:collection_id/comments",
  commentCtrl.getCollectionComments,
);

// POST /collections/:collection_id/comments
router.post(
  "/collections/:collection_id/comments",
  commentCtrl.createCollectionComment,
);

//?_________  Exports _________\\
module.exports = router;
