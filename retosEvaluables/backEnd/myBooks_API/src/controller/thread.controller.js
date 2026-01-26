// *---------------------- thread.controller ---------------------- *\\

//?_________  Imports _________\\

//?_________ Datos _________\\
// Ej: objetos Thread, Message, etc.

//?_________ Funciones _________\\
/*
Mensajería prevista (threads / messages):
- Listar y crear hilos de conversación
- Listar y crear mensajes dentro de un hilo
*/

// Listar hilos del usuario autenticado o por filtros
function getThreads(req, res) {}

// Crear un nuevo hilo de conversación
function createThread(req, res) {}

// Obtener mensajes de un hilo
function getThreadMessages(req, res) {}

// Crear mensaje dentro de un hilo
function createThreadMessage(req, res) {}

//?_________ Exports _________\\

module.exports = {
  getThreads,
  createThread,
  getThreadMessages,
  createThreadMessage,
};
