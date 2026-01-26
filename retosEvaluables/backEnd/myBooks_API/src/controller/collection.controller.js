// *---------------------- collection.controller ---------------------- *\\

//?_________  Imports _________\\

//?_________ Datos _________\\
// Ej: objetos Collection, etc.

//?_________ Funciones _________\\
/*

API VERBS   =   CRUD
------------------------
GET         =   SELECT
POST        =   INSERT
PUT         =   UPDATE
DELETE      =   DELETE

Colecciones previstas:
- Listar colecciones de un usuario
- Obtener detalle de una colección
- Crear, actualizar y eliminar colecciones
- Añadir / eliminar libros de una colección
*/

// Listar todas las colecciones de un usuario
function getUserCollections(req, res) {}

// Obtener detalle de una colección concreta
function getCollectionById(req, res) {}

// Crear una nueva colección
function createCollection(req, res) {}

// Actualizar una colección existente
function updateCollection(req, res) {}

// Eliminar una colección
function deleteCollection(req, res) {}

// Añadir un libro a una colección
function addBookToCollection(req, res) {}

// Eliminar un libro de una colección
function removeBookFromCollection(req, res) {}

//?_________ Exports _________\\

module.exports = {
  getUserCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  addBookToCollection,
  removeBookFromCollection,
};
