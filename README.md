# modulo7

## - reto día 1 completo
## - reto día 2 completo
## - reto día 3 completo
## - reto día 4 completo
## - reto dia 5 completo
## - reto dia 6 completo
## - reto dia 7 completo


TODO:
- actualizar bbdd (actualizar tabla books, crear tablas colecciones...):

user: perfil de usuario y metadatos.

id, email (único), name, avatarUrl, created_at, bio opcional.
author: catálogo único de autores (para búsquedas y normalización).

id, openLibraryId (único), name, birth_year, death_year, bio breve, aliases (JSON).
book: catálogo único de libros (evita duplicados por usuario).

id, openLibraryId (único), isbn (único opcional), title, subtitle, publish_year, pages, cover_url, language, created_at.
Relación N:M con author vía book_author.
book_author: relación N:M entre libros y autores.

id, book_id FK, author_id FK.
Índice único (book_id, author_id).
user_book: relación del usuario con un libro (su “biblioteca”).

id, user_id FK, book_id FK, status ENUM('reading','finished','wishlist'), rating TINYINT, started_at, finished_at, note TEXT, tags JSON.
Único (user_id, book_id).
collection: colección creada por un usuario.

id, user_id FK (owner), name, description, is_public BOOL, created_at.
collection_book: relación N:M entre colección y libro.

id, collection_id FK, book_id FK.
Único (collection_id, book_id).
comment: comentarios sobre libros (con respuestas opcionales).

id, user_id FK, book_id FK, content TEXT, created_at, parent_comment_id FK NULL.
Índices por book_id, created_at.
group: grupos sociales para conversación/temas.

id, name, description, owner_user_id FK, is_private BOOL, created_at.
group_member: pertenencia de usuarios a grupos.

id, group_id FK, user_id FK, role ENUM('owner','admin','member'), joined_at.
Único (group_id, user_id).
thread: hilos de mensajes (por grupo o por libro).

id, group_id FK NULL, book_id FK NULL, title, created_by_user_id FK, created_at.
Regla: al menos uno de (group_id, book_id) no nulo.
message: mensajes en un hilo.

id, thread_id FK, user_id FK, content TEXT, created_at, parent_message_id FK NULL.
Índices por thread_id, created_at.
activity_log (opcional): registro de acciones (guardar libro, comentar, unir a grupo).

id, user_id, type, entity_id, created_at, metadata JSON.
tag (opcional, si quieres normalizar etiquetas):

id, name único.
Relaciones: book_tag (book_id, tag_id), user_book_tag (user_book_id, tag_id).


- actualizar funcionalidad ratings en [BookInfo]("retosEvaluables\reactAppBook\src\components\bookComponents\BookInfo.tsx") cuando pueda acceder a base de datos

