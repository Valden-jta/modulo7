//?_________  Imports _________\\
const { Router } = require("express");
const router = Router();

//?_________  rutas y metodos _________\\
const bookCtrl = require("../controller/book.controller");

router.get("/books", bookCtrl.getBook);
router.post("/books", bookCtrl.postBook);
router.put("/books", bookCtrl.putBook);
router.delete("/books", bookCtrl.deleteBook);

//?_________  Exports _________\\
module.exports = router;
