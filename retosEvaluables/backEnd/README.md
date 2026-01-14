# my_books_db: Documentación del Modelo

## Visión General

El modelo soporta usuarios, autores, libros, biblioteca personal, colecciones y funcionalidades sociales (comentarios, follows y mensajería). Todas las relaciones usan InnoDB, claves foráneas y timestamps para trazabilidad.

## Flujo de Datos (Introducción)

El recorrido típico comienza con el alta de un usuario (`user`), que aporta identidad y credenciales. A partir de ahí, el usuario construye su biblioteca personal (`user_book`) añadiendo libros (`book`) que están normalizados y vinculados a sus autores (`author`) mediante la tabla puente `book_author`. Los libros pueden traer identificadores externos (ISBN, `openlibrary_id`) para integraciones.

Para organizar la lectura, el usuario crea colecciones (`collection`) donde agrega libros a través de `collection_book`, pudiendo establecer orden y visibilidad (pública/privada). Este eje permite vistas temáticas y curadas sin duplicar datos.

La interacción social se materializa con `comment` (opiniones en libros o colecciones) y `follow` (seguimientos entre usuarios), mientras que la mensajería se canaliza por `thread` (hilos de conversación) con sus `thread_member` (participantes) y `message` (mensajes). Las claves foráneas garantizan integridad referencial, y los `created_at`/`updated_at` aportan trazabilidad y facilitan la paginación y ordenaciones.

En conjunto, el modelo separa claramente catálogo (autores/libros), preferencias personales (biblioteca y colecciones) e interacción social, permitiendo escalar consultas y funcionalidades sin comprometer la consistencia.

![modelo](./my_books_db_model.png)

## Convenciones

- Claves primarias: `[tabla]_id` (excepto `user` que usa `id_user`).
- Charset: `utf8mb4` y collation `utf8mb4_unicode_ci`.
- Timestamps: `created_at` y `updated_at` con `DEFAULT CURRENT_TIMESTAMP` y `ON UPDATE CURRENT_TIMESTAMP` cuando aplica.

## Entidades Principales

Esta sección explica cada entidad del dominio, su propósito y cómo se relaciona con el resto del modelo.

### `user`

- PK: `id_user`.
- Campos: `firstName`, `lastName`, `nickName` (UNIQUE), `userRole` (ENUM), `email` (UNIQUE), `password`, `bio` (NULL), `thumb` (NULL), `signInDate`, `updated_at`.
- Uso: Perfil del usuario y metadatos.
- Descripción: Entidad base del sistema que agrupa identidad, credenciales y preferencias del usuario. Desde aquí se derivan sus relaciones con libros (`user_book`), colecciones (`collection`) y actividad social (comentarios, follows, mensajes). `bio` y `thumb` permiten enriquecer el perfil sin obligar datos al inicio.

Detalles:

- Sirve de raíz para datos personales, biblioteca (`user_book`), colecciones (`collection`) y actividad social (comentarios, follows, mensajes).
- Los campos `bio` y `thumb` son opcionales para evolucionar el perfil sin fricción.

### `author`

- PK: `author_id`.
- Campos: `name`, `bio` (NULL), `born_date`, `external_id` (UNIQUE opcional), `created_at`, `updated_at`.
- Uso: Metadatos del autor y posible mapeo a servicios externos.
- Descripción: Catálogo de autores con información biográfica y un identificador externo opcional para integrar datos de terceros (p.ej. OpenLibrary). Se relaciona con libros a través de `book_author` para permitir múltiples autores por obra.

Detalles:

- `external_id` facilita el enlace con APIs como OpenLibrary u otras fuentes.
- Se relaciona con `book` vía la tabla puente `book_author`.

### `book`

- PK: `book_id`.
- Campos: `title`, `isbn_10` (UNIQUE), `isbn_13` (UNIQUE), `openlibrary_id` (UNIQUE), `published_date`, `cover` (NULL), `description` (NULL), `created_at`, `updated_at`.
- Uso: Metadatos del libro e identificadores externos.
- Descripción: Catálogo de obras con títulos, identificadores estandarizados (ISBN-10/13) e ID de OpenLibrary, además de metadatos como fecha de publicación, portada (`cover`) y descripción. Es el eje de la biblioteca del usuario y de las colecciones.

Detalles:

- Identificadores (`isbn_10`, `isbn_13`, `openlibrary_id`) se marcan como únicos si están presentes.
- `cover` almacena URL/ubicación de portada; el archivo real debería gestionarse por el backend/objeto de almacenamiento.

### `book_author` (N:M)

- PK compuesta: (`book_id`, `author_id`).
- FKs: `book(book_id)`, `author(author_id)` con `ON DELETE/UPDATE CASCADE`.
- Uso: Relación de muchos-a-muchos entre libros y autores.
- Descripción: Tabla puente que normaliza la asociación entre libros y autores evitando duplicidades y permitiendo múltiples autores por libro. Las FKs con `CASCADE` mantienen integridad al eliminar elementos relacionados.

Detalles:

- Claves foráneas con `CASCADE` aseguran limpieza al eliminar libros/autores.

### `user_book`

- PK compuesta: (`user_id`, `book_id`).
- Campos: `status` (ENUM: `owned`,`wishlist`,`reading`,`read`,`abandoned`), `rating` (opc.), `notes` (opc.), `added_at`.
- FKs: `user(id_user)`, `book(book_id)` con `CASCADE`.
- Índices: `idx_ub_status` para filtros por estado.
- Uso: Biblioteca personal del usuario.
- Descripción: Asociación entre usuarios y libros con estado de lectura, valoración y notas, registrando cuándo se añadió. Sirve para construir vistas de progreso (p.ej. "leyendo") y reseñas personales. El `status` puede evolucionar a una tabla propia si se necesitan estados personalizados.

Detalles:

- `status` refleja el flujo de lectura. Si necesitas estados personalizados, usa una tabla `reading_status` y referencia por FK.
- `rating` puede limitarse a 0–10 por negocio (aunque en DB es `TINYINT UNSIGNED`).

### `collection`

- PK: `collection_id`.
- Campos: `user_id` (FK), `name`, `description` (opc.), `is_public` (bool), `created_at`, `updated_at`.
- Uso: Listas/colecciones del usuario, públicas o privadas.
- Descripción: Contenedor lógico creado por el usuario para agrupar libros por temas o propósitos (pendientes, favoritos, etc.). Incluye visibilidad (`is_public`) y timestamps para auditoría, y se vincula al propietario por `user_id`.

Detalles:

- Propiedad establecida por `user_id`. `is_public` permite compartir.
- Útil para playlists temáticas, series, "pendientes", etc.

### `collection_book` (N:M)

- PK compuesta: (`collection_id`, `book_id`).
- Campos: `position` (opc.), `added_at`.
- FKs: `collection(collection_id)`, `book(book_id)` con `CASCADE`.
- Uso: Asociación de libros a colecciones con orden opcional.
- Descripción: Puente N:M entre colecciones y libros que permite gestionar pertenencia y orden (`position`). La PK compuesta evita duplicados de un mismo libro dentro de una colección.

Detalles:

- `position` sirve para ordenar manualmente; si no lo usas, puedes omitirlo.
- La PK compuesta evita duplicados de libro dentro de una misma colección.

## Parte Social

### `comment`

- PK: `comment_id`.
- FKs: `user(id_user)`, `book(book_id)` (NULL opcional), `collection(collection_id)` (NULL opcional).
- Campos: `content`, `created_at`, `updated_at`.
- Uso: Comentarios en libros o colecciones.
- Descripción: Registro de contenido generado por usuarios asociado a libros o colecciones. Soporta edición (via `updated_at`) y facilita construir hilos de discusión en el contexto de lectura u organización.

Detalles:

- Se permite comentar tanto en `book` como en `collection` (columnas NULLables). Usa una sola o ambas según el contexto.
- Considera índice por `book_id` y `collection_id` para listados rápidos.

### `follow`

- PK: `follow_id`.
- Unicidad: par (`follower_user_id`, `target_user_id`).
- FKs: `user(id_user)` para ambos campos.
- Campos: `created_at`.
- Uso: Seguimiento entre usuarios.
- Descripción: Modela la relación de seguimiento (quién sigue a quién) para crear feeds sociales. La unicidad por par garantiza que no existan duplicados y simplifica consultas de "ya sigo".

Detalles:

- Unicidad por par (`follower_user_id`, `target_user_id`) evita duplicados.

### `thread`

- PK: `thread_id`.
- Campos: `is_group` (bool), `name` (opc.), `created_at`, `updated_at`.
- Uso: Hilos de conversación (DMs o grupos).
- Descripción: Canal de mensajería que puede ser 1:1 o grupal (`is_group`), con nombre opcional. Agrupa mensajes y miembros, y mantiene trazabilidad mediante timestamps.

Detalles:

- `is_group` permite distinguir grupos de chats 1:1.

### `thread_member`

- PK compuesta: (`thread_id`, `user_id`).
- FKs: `thread(thread_id)`, `user(id_user)`.
- Campos: `joined_at`.
- Uso: Participantes de un hilo.
- Descripción: Define la pertenencia de usuarios a un hilo de conversación. La PK compuesta evita entradas repetidas y sirve de base para permisos y notificaciones.

Detalles:

- PK compuesta evita duplicidades de miembros.

### `message`

- PK: `message_id`.
- FKs: `thread(thread_id)`, `user(id_user)`.
- Campos: `content`, `created_at`.
- Uso: Mensajes dentro de un hilo.
- Descripción: Contenido textual enviado por usuarios dentro de un `thread`, con sello temporal para ordenación y paginación. Índices por `thread_id` mejoran el rendimiento en listados.

Detalles:

- Índice por `thread_id` recomendado para paginación y listados.

### `notification`

- PK: `notification_id`.
- FK: `user(id_user)`.
- Campos: `type`, `payload` (JSON opc.), `is_read`, `created_at`.
- Uso: Notificaciones de eventos (comentario, follow, mensaje, etc.).
- Descripción: Avisos dirigidos a usuarios ante eventos relevantes, con `payload` JSON para almacenar metadatos específicos del tipo de notificación (IDs relacionados, textos, etc.).

Detalles:

- `payload` JSON permite flexibilidad para distintos tipos de notificación.

## Relaciones Clave

- `author` ↔ `book`: N:M vía `book_author`.
- `user` ↔ `book`: N:M vía `user_book` (con estado/nota).
- `user` ↔ `collection` ↔ `book`: `collection` (1:N desde `user`), `collection_book` (N:M con `book`).
- Social: `user` ↔ `comment` (1:N), `user` ↔ `follow` (auto-relación), `thread` ↔ `thread_member` (N:M con `user`), `thread` ↔ `message` (1:N).

## Diagrama (Workbench)

1. Database → Reverse Engineer → selecciona `my_books_db`.
2. Organiza las tablas por dominios (libros, colecciones, social).
3. Guarda como `.mwb`. Usa Forward Engineer para aplicar cambios.

## Consultas útiles

- Libros por autor:
  ```sql
  SELECT b.*
  FROM book_author ba
  JOIN book b ON b.book_id = ba.book_id
  WHERE ba.author_id = ?;
  ```
- Biblioteca del usuario (leyendo):
  ```sql
  SELECT b.*
  FROM user_book ub
  JOIN book b ON b.book_id = ub.book_id
  WHERE ub.user_id = ? AND ub.status = 'reading';
  ```
- Libros en colección (ordenados):
  ```sql
  SELECT b.*
  FROM collection_book cb
  JOIN book b ON b.book_id = cb.book_id
  WHERE cb.collection_id = ?
  ORDER BY cb.position;
  ```
- Comentarios de un libro:

  ```sql
  SELECT c.*, u.nickName
  FROM comment c
  JOIN user u ON u.id_user = c.user_id
  WHERE c.book_id = ?
  ORDER BY c.created_at DESC;
  ```

  ## Seeds mínimos (datos de prueba)

  Para validar el modelo rápidamente, puedes insertar datos básicos:

  ```sql
  -- Usuarios
  INSERT INTO `user` (firstName, lastName, nickName, userRole, email, password)
  VALUES ('Ana','García','ana_g','reader','ana@example.com','hash1'),
       ('Luis','Pérez','lperez','reader','luis@example.com','hash2');

  -- Autores
  INSERT INTO `author` (name) VALUES ('Isaac Asimov'), ('Ursula K. Le Guin');

  -- Libros
  INSERT INTO `book` (title, isbn_13) VALUES ('Foundation','9780553293357'), ('A Wizard of Earthsea','9780547773742');

  -- Relación libro-autor
  INSERT INTO `book_author` (book_id, author_id)
  SELECT b.book_id, a.author_id FROM book b, author a
  WHERE (b.title='Foundation' AND a.name='Isaac Asimov')
    OR (b.title='A Wizard of Earthsea' AND a.name='Ursula K. Le Guin');

  -- Biblioteca del usuario
  INSERT INTO `user_book` (user_id, book_id, status)
  SELECT u.id_user, b.book_id, 'reading' FROM `user` u, book b WHERE u.nickName='ana_g' AND b.title='Foundation';

  -- Colección y sus libros
  INSERT INTO `collection` (user_id, name, is_public)
  SELECT u.id_user, 'Sci-Fi Favorites', 1 FROM `user` u WHERE u.nickName='ana_g';

  INSERT INTO `collection_book` (collection_id, book_id, position)
  SELECT c.collection_id, b.book_id, 1 FROM collection c, book b
  WHERE c.name='Sci-Fi Favorites' AND b.title='Foundation';

  -- Comentario
  INSERT INTO `comment` (user_id, book_id, content)
  SELECT u.id_user, b.book_id, 'Clásico imprescindible' FROM `user` u, book b
  WHERE u.nickName='ana_g' AND b.title='Foundation';
  ```

  Sugerencia: añade más índices según tus consultas más frecuentes (por ejemplo, índices por `created_at` para feeds recientes).

## Evolución y extensiones

- Estados personalizables: reemplazar `status ENUM` por tabla `reading_status` y FK en `user_book`.
- Etiquetas (tags): añadir `tag` y `book_tag` (N:M) o `user_tag` para tags personales.
- Índices adicionales: según uso, p.ej. `idx_comment_book_id`, `idx_message_thread_id`.
