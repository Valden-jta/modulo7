# myBooks API: Documentación del back end

API REST en Node.js + Express que conecta la aplicación React `reactAppBook` con la base de datos MySQL `my_books_db`. En esta primera versión expone autenticación de usuarios y gestión de la biblioteca personal de libros; a futuro se ampliará con colecciones y funcionalidad social.

---

## 1. Arquitectura y estructura del proyecto

- **Runtime**: Node.js + Express 5, CORS, `mysql2` (pool de conexiones).
- **BBDD**: MySQL (`my_books_db`), ver modelo detallado en `../docs/README.md`.
- **Patrón**: Rutas → Controladores → Modelos → BBDD.

Estructura relevante:

```text
backEnd/
  myBooks_API/
    package.json
    src/
      index.js          # Arranque del servidor (app.listen)
      app.js            # Configuración de Express y middlewares
      databaseSQL.js    # Pool de conexión MySQL
      error/
        errorHandling.js
      models/
        user.js         # Modelo de usuario y helpers (bcrypt)
        book.js         # Modelo de libro y comparador
      controller/
        user.controller.js   # Register, login, actualización de perfil
        book.controller.js   # CRUD de libros del usuario
        template.controller.js (plantilla, sin uso real)
      routers/
        user.routers.js      # /login, /register, /usuarios
        book.routers.js      # /books
        template.routers.js  # plantilla, sin uso real
```

> Nota: los ficheros `template.*` son solo guía y no forman parte de la API final.

---

## 2. Puesta en marcha

### 2.1. Requisitos

- Node.js 18+ (recomendado).
- Servidor MySQL accesible con la base de datos `my_books_db` (o la que configures).

### 2.2. Instalación de dependencias

Desde la carpeta `backEnd/myBooks_API`:

```bash
npm install
```

### 2.3. Configuración de base de datos

El pool está definido en `src/databaseSQL.js` usando `mysql2`:

```js
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "<TU_PASSWORD>",
  database: "my_books_db",
  ...
}).promise();
```

Para un entorno real se recomienda mover estas credenciales a variables de entorno (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, etc.).

### 2.4. Arrancar el servidor

En `src/app.js` se fija el puerto:

```js
app.set("port", process.env.PORT || 3000);
```

Arranque recomendado (añadir en `package.json` de `myBooks_API`):

```json
"scripts": {
  "start": "node src/index.js"
}
```

Y ejecutar:

```bash
npm start
```

Por defecto la API quedará disponible en:

- `http://localhost:3000`

> Recuerda registrar los routers en `src/app.js`, por ejemplo:
>
> ```js
> const userRouters = require("./routers/user.routers");
> const bookRouters = require("./routers/book.routers");
> app.use(userRouters);
> app.use(bookRouters);
> ```

---

## 3. Middlewares y manejo de errores

En `src/app.js` se configuran los middlewares globales:

- `cors()` – habilita CORS para que el front en Vite pueda consumir la API.
- `express.urlencoded({ extended: false })` y `express.json()` – parseo de `application/x-www-form-urlencoded` y `application/json`.
- Middleware 404: responde con `{ error: true, codigo: 404, message: "Endpoint no encontrado" }` para rutas desconocidas.
- `errorHandling` – middleware de errores centralizado en `src/error/errorHandling.js`.

---

## 4. Módulo de usuarios y autenticación

Implementado en:

- Router: `src/routers/user.routers.js`
- Controlador: `src/controller/user.controller.js`
- Modelo / helpers: `src/models/user.js`

### 4.1. Registrar usuario

- **Método**: `POST`
- **URL**: `/register`

**Body (JSON)**:

```json
{
  "name": "Ana",
  "last_name": "García",
  "email": "ana@example.com",
  "photo": "https://.../avatar.png",
  "password": "miPasswordSegura"
}
```

**Validaciones clave** (`postUser`):

- Todos los campos anteriores son obligatorios (`422` si falta alguno).
- Verifica que el email no exista ya en la tabla `user` (`409` si está duplicado).
- La contraseña se encripta con `bcrypt` antes de guardarse.

**Respuestas típicas**:

- `201 Created`

  ```json
  {
    "error": false,
    "code": 201,
    "message": "Usuario creado correctamente. Id de usuario: <id>"
  }
  ```

- `409 Conflict` – Email ya registrado.
- `500 Internal Server Error` – Error inesperado en BBDD o encriptación.

### 4.2. Login de usuario

- **Método**: `POST`
- **URL**: `/login`

**Body (JSON)**:

```json
{
  "email": "ana@example.com",
  "password": "miPasswordSegura"
}
```

**Lógica (`getUser`)**:

- Comprueba que llegan `email` y `password` (`422` si falta alguno).
- Busca el usuario por email.
- Si existe, compara la contraseña con `bcrypt.compare`.
- Devuelve los datos públicos del usuario (sin password) usando `userInfo`.

**Respuestas típicas**:

- `200 OK`

  ```json
  {
    "error": false,
    "code": 200,
    "message": "Login correcto",
    "data": {
      "id_user": 1,
      "name": "Ana",
      "last_name": "García",
      "email": "ana@example.com",
      "photo": "https://.../avatar.png"
    }
  }
  ```

- `404 Not Found` – Usuario no encontrado o contraseña incorrecta.

> Nota: actualmente no se genera JWT; el front debería almacenar los datos básicos del usuario y, en su caso, un token que se añada en el futuro.

### 4.3. Actualizar perfil de usuario

- **Método**: `PUT`
- **URL**: `/usuarios`

**Body (JSON)** esperado (`putUser`):

```json
{
  "id_user": 1,
  "name": "Ana",
  "last_name": "García",
  "email": "ana@example.com",
  "photo": "https://.../nuevo-avatar.png",
  "password": "nuevaPasswordOpcional",
  "confirmPassword": "passwordActualObligatoria"
}
```

**Lógica principal**:

- Recupera el hash de la contraseña actual por `id_user`.
- Comprueba que `confirmPassword` coincide con la contraseña guardada (`401` si no coincide).
- Si se envía `password` nueva no vacía, la encripta y la sustituye; si no, mantiene la anterior.
- Actualiza `name`, `last_name`, `email`, `photo` y `password`.
- Devuelve el usuario actualizado sin contraseña.

**Respuestas típicas**:

- `200 OK` – Datos de usuario modificados correctamente.
- `401 Unauthorized` – Contraseña actual incorrecta.
- `404 Not Found` – Usuario no encontrado.

---

## 5. Módulo de libros del usuario

Implementado en:

- Router: `src/routers/book.routers.js`
- Controlador: `src/controller/book.controller.js`
- Modelo: `src/models/book.js`

En todos los casos los libros están asociados a un usuario mediante `id_user`.

### 5.1. Listar libros de un usuario / obtener un libro

- **Método**: `GET`
- **URL**: `/books`

**Query params**:

- `id_user` (obligatorio) – usuario dueño de los libros.
- `id_book` (opcional) – si se indica, filtra por un único libro de ese usuario.

**Comportamiento (`getBook`)**:

1. Valida que `id_user` venga informado (`400` si falta).
2. Comprueba que el usuario existe en `user`.
3. Si **no** se pasa `id_book` → devuelve todos los libros del usuario.
4. Si se pasa `id_book` → devuelve sólo ese libro (si existe para ese usuario).

**Respuestas típicas**:

- `200 OK`

  ```json
  {
    "error": false,
    "code": 200,
    "message": "<texto descriptivo>",
    "data": [
      /* array de libros o libro único */
    ]
  }
  ```

- `400 Bad Request` – Falta `id_user`.
- `404 Not Found` – Usuario inexistente.

### 5.2. Añadir un libro a la biblioteca de un usuario

- **Método**: `POST`
- **URL**: `/books`

**Body (JSON)** esperado (`postBook`):

```json
{
  "id_user": 1,
  "title": "Dune",
  "type": "hardcover",
  "author": "Frank Herbert",
  "price": 19.99,
  "photo": "https://.../dune.jpg"
}
```

**Validaciones**:

- Todos los campos excepto `id_book` son obligatorios (`400` si falta alguno).
- Comprueba que el usuario existe.
- Comprueba que el usuario no tenga ya un libro idéntico (compara todos los campos menos `id_book` de forma case-insensitive, usando `compareBooks`). Si existe, devuelve `409`.

**Respuesta de éxito**:

- `200 OK`

  ```json
  {
    "error": false,
    "code": 200,
    "message": "Libro añadido con éxito",
    "data": {
      "result": { "affectedRows": 1, ... },
      "newBook": { /* datos del libro insertado */ }
    }
  }
  ```

### 5.3. Actualizar un libro

- **Método**: `PUT`
- **URL**: `/books`

**Body (JSON)** esperado (`putBook`):

```json
{
  "id_book": 10,
  "id_user": 1,
  "title": "Dune",
  "type": "paperback",
  "author": "Frank Herbert",
  "price": 14.99,
  "photo": "https://.../dune-paperback.jpg"
}
```

**Lógica**:

- Valida que **todos** los campos vengan informados (`400` si falta alguno).
- Comprueba que el libro existe para ese `id_user` (`404` si no existe).
- Actualiza `title`, `type`, `author`, `price`, `photo` en la tabla `book`.

**Respuesta de éxito**:

- `200 OK` – Libro actualizado con éxito.

### 5.4. Eliminar un libro

- **Método**: `DELETE`
- **URL**: `/books`

**Body (JSON)** esperado (`deleteBook`):

```json
{
  "id_user": 1,
  "id_book": 10
}
```

**Lógica**:

- Valida que llegue `id_user` (`400` si falta).
- Comprueba que el usuario existe (`404` si no existe).
- Comprueba que el libro existe para ese usuario (`404` si no existe).
- Ejecuta `DELETE` sobre la tabla `book` filtrando por `id_book` e `id_user`.

**Respuesta de éxito**:

- `200 OK` – "Libro eliminado correctamente".

---

## 6. Manejo de errores y códigos de estado

Los controladores siguen un patrón común:

- `400 Bad Request` – Petición mal formada (faltan campos obligatorios).
- `401 Unauthorized` – Credenciales actuales incorrectas (actualización de perfil).
- `404 Not Found` – Recurso inexistente (usuario/libro/email incorrectos).
- `409 Conflict` – Conflictos de unicidad (email repetido, libro duplicado).
- `500 Internal Server Error` – Errores inesperados (BBDD, bcrypt, etc.).

Siempre que es posible se devuelve un objeto con:

```json
{
  "error": true | false,
  "code": <status HTTP>,
  "message": "Mensaje legible",
  "data": <opcional>
}
```

---

## 7. Extensiones previstas: colecciones y parte social

La base de datos ya contempla entidades para colecciones y funcionalidad social (ver `../docs/README.md`). La API se extenderá con nuevos controladores y routers siguiendo el mismo patrón:

### 7.1. Colecciones

Ficheros previstos:

- `src/models/collection.js`
- `src/controller/collection.controller.js`
- `src/routers/collection.routers.js`

Rutas sugeridas (a concretar en la implementación):

- `GET /collections?user_id=:id` – listar colecciones de un usuario.
- `GET /collections/:collection_id` – detalle de una colección.
- `POST /collections` – crear colección.
- `PUT /collections/:collection_id` – actualizar colección.
- `DELETE /collections/:collection_id` – eliminar colección.
- `POST /collections/:collection_id/books` – añadir libro a colección.
- `DELETE /collections/:collection_id/books/:book_id` – quitar libro de colección.

### 7.2. Social (comentarios, follows, mensajería)

Ficheros previstos (orientativo):

- `src/models/comment.js`, `follow.js`, `thread.js`, `message.js`, etc.
- `src/controller/comment.controller.js`, `follow.controller.js`, `thread.controller.js`...
- `src/routers/comment.routers.js`, `social.routers.js`...

Posibles endpoints:

- Comentarios sobre libros/colecciones:
  - `GET /books/:book_id/comments`
  - `POST /books/:book_id/comments`
  - `GET /collections/:collection_id/comments`
  - `POST /collections/:collection_id/comments`
- Seguimiento de usuarios:
  - `POST /follows` (seguir)
  - `DELETE /follows` (dejar de seguir)
  - `GET /users/:id/followers`
  - `GET /users/:id/following`
- Mensajería/threads:
  - `GET /threads`
  - `POST /threads`
  - `GET /threads/:thread_id/messages`
  - `POST /threads/:thread_id/messages`

Estas rutas se integrarán en `src/app.js` igual que las actuales, mediante `app.use(...)`.

---

## 8. Relación con el front `reactAppBook`

En el front existe un cliente de API en `frontend/reactAppBook/src/features/books/api/myBooks.ts`. A medida que se vayan implementando los métodos (`getBooks`, `postBook`, `putBook`, `deleteBook`), deberían alinearse con los endpoints documentados aquí (URLs, métodos HTTP y estructura de payloads/respuestas).

Para futuras funcionalidades (colecciones, social), se recomienda mantener la misma convención de nombres y agrupar las llamadas en módulos por dominio (`features/collections/api/...`, `features/social/api/...`).

---

## 9. Roadmap de API por feature

Esta sección resume, por área funcional, los endpoints existentes y los que se prevén a corto/medio plazo. Sirve como guía de diseño; los nombres exactos pueden ajustarse en la implementación.

### 9.1. Usuarios y autenticación

- **Ya implementado**
  - `POST /register` – alta de usuario.
  - `POST /login` – login por email + password.
  - `PUT /usuarios` – actualización de perfil y password.
- **Próximos pasos**
  - Autenticación basada en **JWT** y middleware de protección de rutas.
  - `GET /me` – devolver el perfil del usuario autenticado.
  - `DELETE /me` – baja de cuenta (soft delete en la tabla `user`).
  - `PUT /me/password` – cambio de contraseña con verificación de la actual.

### 9.2. Biblioteca personal (obra + edición)

- **Estado actual**
  - Endpoints `/books` (GET/POST/PUT/DELETE) centrados en la tabla `book` original del reto.
- **Objetivo de evolución (alineado con `edition` y `user_book`)**
  - `GET /user/books` – listar la biblioteca del usuario (paginable, filtrable por `reading_status`).
  - `GET /user/books/:edition_id` – detalle de una edición de la biblioteca.
  - `POST /user/books` – añadir una edición a la biblioteca (flujos de importación desde Open Library).
  - `PATCH /user/books/:edition_id` – actualizar `reading_status`, `rating` y `notes`.
  - `DELETE /user/books/:edition_id` – eliminar una edición de la biblioteca.

### 9.3. Colecciones

- **Base prevista** (ver 7.1):
  - `GET /users/:user_id/collections` – listar colecciones del usuario.
  - `GET /collections/:collection_id` – detalle de una colección (incluye libros).
  - `POST /collections` – crear colección (nombre, descripción, visibilidad).
  - `PUT /collections/:collection_id` – renombrar/modificar descripción o visibilidad.
  - `DELETE /collections/:collection_id` – eliminar colección.
  - `POST /collections/:collection_id/books` – añadir edición a colección.
  - `DELETE /collections/:collection_id/books/:edition_id` – quitar edición de colección.
- **Posibles extensiones**
  - `PATCH /collections/:collection_id/books/:edition_id` – cambiar `position` dentro de la colección.
  - `GET /collections/public` – explorar colecciones públicas destacadas o recientes.

### 9.4. Comentarios y reseñas

- **Endpoints objetivo**
  - `GET /books/:book_id/comments` – listar comentarios de una obra.
  - `POST /books/:book_id/comments` – crear comentario asociado a una obra.
  - `GET /collections/:collection_id/comments` – listar comentarios de una colección.
  - `POST /collections/:collection_id/comments` – crear comentario sobre una colección.
  - `PUT /comments/:comment_id` – editar comentario propio.
  - `DELETE /comments/:comment_id` – borrar comentario (dureza a definir: borrado físico o lógico).

### 9.5. Follows y social

- **Seguimiento de usuarios**
  - `POST /follows` – seguir a otro usuario.
  - `DELETE /follows` – dejar de seguir (por par `follower_user_id` / `target_user_id`).
  - `GET /users/:user_id/followers` – listar seguidores.
  - `GET /users/:user_id/following` – listar a quién sigue.
- **Feeds simples (opcional)**
  - `GET /feed` – actividad básica de usuarios seguidos (añadir libro, crear colección, nuevo comentario, etc.).

### 9.6. Mensajería y notificaciones

- **Threads y mensajes**
  - `GET /threads` – hilos del usuario autenticado.
  - `POST /threads` – crear hilo (1:1 o grupal).
  - `GET /threads/:thread_id/messages` – mensajes de un hilo (paginables).
  - `POST /threads/:thread_id/messages` – enviar mensaje.
- **Notificaciones**
  - `GET /notifications` – notificaciones del usuario autenticado (no leídas y/o históricas).
  - `PATCH /notifications/:notification_id` – marcar como leída.
  - Opcional: `PATCH /notifications` – marcar todas como leídas.

### 9.7. Géneros y preferencias de lectura

- **Sobre el catálogo de géneros**
  - `GET /genres` – devolver la lista completa de géneros (`genre`).
- **Preferencias del usuario** (a implementar sobre tablas auxiliares o campos extra en `user`):
  - `GET /me/genres` – géneros preferidos del usuario autenticado.
  - `PUT /me/genres` – actualizar selección de géneros preferidos.
- **Descubrimiento y filtros**
  - Extender `GET /user/books` y/o futuros `GET /books` para aceptar filtros por `genre_id`, rating mínimo, estado de lectura, etc.

Este roadmap no obliga a implementar todo de golpe, pero sirve como mapa para ir construyendo la API de forma coherente con el modelo de datos definido en `my_books_db`.
