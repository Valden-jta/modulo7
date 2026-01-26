// *---------------------- template ---------------------- *\\

//?_________ Importacion de módulos  _________\\

const express = require("express");
const cors = require("cors");

// Endpoints routers  Ej: const userRouters = require("./routers/user.routers");

// Errores
const errorHandling = require("./error/errorHandling");


//?_________ Creación y configuración del servidor _________\\ 
const app = express();
// process.env.PORT es una variable de entorno por si esto está en un servidor de aplicaciones
app.set("port", process.env.PORT || 3000);


//?_________  Middleware _________\\ 
// Módulos globales
app.use(cors());
app.use(express.urlencoded({ extended: false })); // esta y la siguiente encapsulan en objetos el envío y la recepción de datos.
app.use(express.json());
// Routing
// EJ: app.use(userRouters);
app.use((req, res, next) => {
  res
  .status(404)
  .json({ error: true, codigo: 404, message: "Endpoint no encontrado" });
});
// Errores
app.use(errorHandling);


//?_________  Exports _________\\ 
module.exports = app;
