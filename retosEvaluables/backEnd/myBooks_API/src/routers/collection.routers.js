// *---------------------- collection.routers ---------------------- *\\

//?_________  Imports _________\\
const { Router } = require("express");
const router = Router();

//?_________  rutas y metodos _________\\
const collectionCtrl = require("../controller/collection.controller");

// Colecciones de un usuario
// GET /collections?user_id=:id
router.get("/collections", collectionCtrl.getUserCollections);

// Detalle de una colección
// GET /collections/:collection_id
router.get("/collections/:collection_id", collectionCtrl.getCollectionById);

// Crear colección
// POST /collections
router.post("/collections", collectionCtrl.createCollection);

// Actualizar colección
// PUT /collections/:collection_id
router.put("/collections/:collection_id", collectionCtrl.updateCollection);

// Eliminar colección
// DELETE /collections/:collection_id
router.delete("/collections/:collection_id", collectionCtrl.deleteCollection);

// Añadir libro a colección
// POST /collections/:collection_id/books
router.post(
  "/collections/:collection_id/books",
  collectionCtrl.addBookToCollection,
);

// Eliminar libro de colección
// DELETE /collections/:collection_id/books/:book_id
router.delete(
  "/collections/:collection_id/books/:book_id",
  collectionCtrl.removeBookFromCollection,
);

//?_________  Exports _________\\
module.exports = router;
