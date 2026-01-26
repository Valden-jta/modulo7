// *---------------------- thread.routers ---------------------- *\\

//?_________  Imports _________\\
const { Router } = require("express");
const router = Router();

//?_________  rutas y metodos _________\\
const threadCtrl = require("../controller/thread.controller");

// Hilos de conversación
// GET /threads
router.get("/threads", threadCtrl.getThreads);

// POST /threads
router.post("/threads", threadCtrl.createThread);

// Mensajes de un hilo
// GET /threads/:thread_id/messages
router.get("/threads/:thread_id/messages", threadCtrl.getThreadMessages);

// POST /threads/:thread_id/messages
router.post("/threads/:thread_id/messages", threadCtrl.createThreadMessage);

//?_________  Exports _________\\
module.exports = router;
