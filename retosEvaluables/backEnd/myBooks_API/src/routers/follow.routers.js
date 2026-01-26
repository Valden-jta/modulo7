// *---------------------- follow.routers ---------------------- *\\

//?_________  Imports _________\\
const { Router } = require("express");
const router = Router();

//?_________  rutas y metodos _________\\
const followCtrl = require("../controller/follow.controller");

// Seguir a un usuario
// POST /follows
router.post("/follows", followCtrl.createFollow);

// Dejar de seguir a un usuario
// DELETE /follows
router.delete("/follows", followCtrl.deleteFollow);

// Listar seguidores de un usuario
// GET /users/:user_id/followers
router.get("/users/:user_id/followers", followCtrl.getUserFollowers);

// Listar usuarios a los que sigue un usuario
// GET /users/:user_id/following
router.get("/users/:user_id/following", followCtrl.getUserFollowing);

//?_________  Exports _________\\
module.exports = router;
