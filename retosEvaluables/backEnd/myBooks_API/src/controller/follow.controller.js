// *---------------------- follow.controller ---------------------- *\\

//?_________  Imports _________\\

//?_________ Datos _________\\
// Ej: objetos Follow, etc.

//?_________ Funciones _________\\
/*
Follows previstos:
- Seguir / dejar de seguir a un usuario
- Listar seguidores y seguidos de un usuario
*/

// Crear relación de follow (seguir a un usuario)
function createFollow(req, res) {}

// Eliminar relación de follow (dejar de seguir)
function deleteFollow(req, res) {}

// Listar seguidores de un usuario
function getUserFollowers(req, res) {}

// Listar usuarios a los que sigue un usuario
function getUserFollowing(req, res) {}

//?_________ Exports _________\\

module.exports = {
  createFollow,
  deleteFollow,
  getUserFollowers,
  getUserFollowing,
};
