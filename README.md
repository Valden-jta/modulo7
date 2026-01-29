# Módulo 7 – Front-End III (React)

Repositorio del módulo 7 del curso de Desarrollo Web, que incluye los retos diarios y el proyecto final **reactAppBook**, una SPA de gestión de libros construida con **React + Vite + TypeScript**.

## Quick Start

### Requisitos

- Node.js 20+ y npm 10+ (recomendado)

### Arrancar el proyecto final `reactAppBook`

```bash
cd 03_Repositorios\ Git/modulo7/modulo7/retosEvaluables/reactAppBook
npm install
npm run dev
```

- La app se sirve por defecto en `http://localhost:5173/` (puerto por defecto de Vite).
- Para generar build de producción:

```bash
npm run build
npm run preview
```

## Ramas incluidas en este repositorio

- Reto día 1 – completado
- Reto día 2 – completado
- Reto día 3 – completado
- Reto día 4 – completado
- Reto día 5 – completado
- Reto día 6 – completado
- Reto día 7 – completado
- Proyecto final: **reactAppBook** en `retosEvaluables/reactAppBook`

## Proyecto final: reactAppBook

Aplicación de biblioteca personal y red social lectora donde el usuario puede:

- Buscar libros (incluyendo integración con Open Library).
- Añadir libros a su biblioteca personal y gestionar su estado de lectura.
- Crear colecciones personalizadas y marcar favoritos.
- Valorar libros y (pendiente) sincronizar ratings con la base de datos.
- Interactuar a nivel social mediante grupos, amigos, foros e hilos de conversación.

### Tecnologías principales

- **React 19** con **TypeScript**.
- **Vite** como bundler y dev server.
- **React Router** para rutas públicas y privadas.
- **React Hook Form** + **Zod** para formularios y validación.
- **Tailwind CSS 4** para el diseño.
- **React Icons / React Spinners / React Paginate / React Rating Stars** para UI avanzada.

### Scripts disponibles (reactAppBook)

- `npm run dev` – Arranca el servidor de desarrollo Vite.
- `npm run build` – Compila TypeScript y genera el build de producción.
- `npm run preview` – Sirve el build generado para comprobar producción.
- `npm run lint` – Lanza ESLint sobre el proyecto.

## ROADMAP

Línea general de mejoras previstas para el proyecto **reactAppBook**:

- **Backend propio para reactAppBook**
  - Crear una API REST en Node/Express (carpeta `retosEvaluables/backEnd`) que centralice la lógica de negocio y la persistencia en BBDD.
  - Añadir endpoints para gestión de usuarios, libros, colecciones, grupos y actividad social.

- **Integración de servicio de traducción (LibreTranslate)**
  - Desplegar una instancia propia de **LibreTranslate** (preferiblemente con Docker) en el entorno de backend.
    - Ejemplo de arranque local: `docker run -d -p 5000:5000 libretranslate/libretranslate`.
  - Exponer en el backend un endpoint como `POST /api/translate` que actúe de puente hacia LibreTranslate.
    - El frontend solo llamará a `/api/translate`, evitando problemas de CORS y ocultando la configuración del servicio externo.
  - Sustituir el uso directo del endpoint público desde el cliente por llamadas al backend.

- **Persistencia de valoraciones y biblioteca del usuario**
  - Conectar la lógica de rating y estados de lectura del cliente con la tabla `user_book` descrita más abajo.
  - Guardar y recuperar la valoración de cada libro por usuario desde la BBDD.

### Funcionalidades actuales relevantes (reactAppBook)

- **Detalle enriquecido desde Open Library**
  - La página `SearchBook` usa `GetOLBookList` para buscar obras y, al hacer clic en un resultado, llama a `GetOLBookDetail` para obtener el `work` y una edición en el idioma preferido.
  - Los datos se normalizan a `BookViewModel` mediante `mapOpenLibraryDocToViewModel` y `mapOpenLibraryWorkToViewModel` (`features/books/utils/typeMappingTools.ts`) y se muestran en `BookInfo`.
- **Modelo de vista unificado (`BookViewModel`)**
  - Los componentes de lista (`BookList`, `BookCard`, `BookRows`) trabajan con `BookViewModel`, independizándose del origen del dato (libros de usuario vs Open Library).
  - `BookInfo` acepta tanto `Book` de dominio como `BookViewModel` y muestra sinopsis/descripción cuando está disponible.

## TODO – Integración completa con API my_books

Pendientes de implementar cuando el backend esté listo y exponga los endpoints correspondientes:

- **Alta de libros desde SearchBook (Open Library → my_books)**
  - En `SearchBook`, a partir de `{ work, edition }` devueltos por `GetOLBookDetail`, construir un `Book` de dominio (obra + edición) y llamar a un endpoint `POST /my_books` en el backend.
  - Implementar en `features/books/api/myBooksApi.ts` una función `createMyBookFromOpenLibrary(book: Book)` que haga el `POST` (ya hay un esbozo comentado).

- **Alta de libros desde AddBookPage**
  - Desde `AddBookPage`, tomar los datos del formulario (`BookForm`) y mandar un `POST` al mismo endpoint `POST /my_books` para crear libros manuales del usuario.
  - Reutilizar el tipo `Book` de `features/books/types/types.ts` para construir el payload.

- **DELETE real de libros de la biblioteca**
  - Completar la integración de `deleteMyBook(bookId)` en `features/books/api/myBooksApi.ts` para que `UserBookPage` deje de borrar solo en el estado local y pase a llamar al endpoint `DELETE /my_books/{bookId}`.
  - Sincronizar la UI con la respuesta del backend (refrescar lista de libros o filtrar en memoria tras un DELETE exitoso).

- **Persistencia de rating y estado de lectura**
  - Conectar el componente `BookInfo` y los controles de rating/estado de lectura con la tabla `user_book` del modelo relacional.
  - Añadir llamadas a la API para actualizar `rating` y `reading_status` cuando el usuario valore un libro o cambie su estado.

## Estructura de carpetas (reactAppBook)

Ruta base: `retosEvaluables/reactAppBook/src`

- `config/`
  - `data.ts`: datos estáticos y configuración base del cliente.
  - `SQL/`: scripts SQL de referencia (`books.sql`, `users.sql`).
- `features/books/`
  - `api/`: clientes para API propia (`myBooksApi.ts`) e integración con Open Library (`openLibrary.ts`).
  - `components/`: componentes de UI de libros (`BookCard`, `BookList`, `BookInfo`, filtros, formularios...).
  - `hooks/`: hooks específicos de libros (`useBookListFilter`, etc.).
  - `pages/`: páginas de alto nivel relacionadas con libros (listado, búsqueda, edición, importación, libros del usuario...).
  - `types/`: tipos y modelos relacionados con libros (`Book`, `BookViewModel`, tipos Open Library...).
  - `utils/`: utilidades de mapeo (`typeMappingTools.ts`) que convierten `Book` y tipos de Open Library en `BookViewModel` para la UI.
- `features/collections/`
  - `pages/`: gestión de colecciones (crear, listar, favoritos, administrar).
- `features/social/`
  - `pages/`: funcionalidad social (foro, amigos, grupos, etc.).
- `features/user/`
  - `components/`: componentes de usuario (menú, logout, formularios de login/registro/perfil).
  - `pages/`: dashboard, configuración, perfil y páginas de flujo de usuario.
  - `types/`: modelos de usuario.
- `layout/`
  - `Header`, `Footer`, `Aside`, `Menu`: layout principal de la aplicación.
- `shared/`
  - `hooks/`: hooks compartidos (por ejemplo `useTheme`).
  - `pages/`: páginas genéricas como `LandingPage` y `NotFound`.
  - `routes/`: rutas públicas/privadas (`PublicRoutes`, `PrivateRoutes`).
  - `ui/`: componentes de UI reutilizables (badges, selects, toggles, formularios, navegación, etc.).
  - `utils/`: utilidades como validadores de formularios y generadores de URLs.

## Modelo de datos propuesto (BBDD relacional)

> Nota: este diseño está pensado para una base de datos SQL (por ejemplo MySQL) que dará soporte al proyecto **reactAppBook** y a sus funcionalidades de colecciones y red social.

### Tabla `user`

Perfil de usuario y metadatos.

- `id`
- `email` (único)
- `name`
- `avatarUrl`
- `created_at`
- `bio` (opcional)

### Tabla `author`

Catálogo único de autores, para búsquedas y normalización.

- `id`
- `openLibraryId` (único)
- `name`
- `birth_year`
- `death_year`
- `bio` (breve)
- `aliases` (JSON)

### Tabla `book`

Catálogo único de libros para evitar duplicados entre usuarios.

- `id`
- `openLibraryId` (único)
- `isbn` (único opcional)
- `title`
- `subtitle`
- `publish_year`
- `pages`
- `cover_url`
- `language`
- `created_at`

Relación N:M con `author` vía `book_author`.

### Tabla `book_author`

Relación N:M entre libros y autores.

- `id`
- `book_id` FK
- `author_id` FK
- Índice único (`book_id`, `author_id`)

### Tabla `user_book`

Relación entre usuario y libro (su "biblioteca").

- `id`
- `user_id` FK
- `book_id` FK
- `status` ENUM('reading','finished','wishlist')
- `rating` TINYINT
- `started_at`
- `finished_at`
- `note` TEXT
- `tags` JSON

Restricción de unicidad: (`user_id`, `book_id`).

### Tabla `collection`

Colecciones creadas por un usuario.

- `id`
- `user_id` FK (owner)
- `name`
- `description`
- `is_public` BOOL
- `created_at`

### Tabla `collection_book`

Relación N:M entre colección y libro.

- `id`
- `collection_id` FK
- `book_id` FK
- Índice único (`collection_id`, `book_id`)

### Tabla `comment`

Comentarios sobre libros (con posibles respuestas en árbol).

- `id`
- `user_id` FK
- `book_id` FK
- `content` TEXT
- `created_at`
- `parent_comment_id` FK NULL

Índices por `book_id`, `created_at`.

### Tablas de grupos sociales

**Tabla `group`** – grupos sociales para conversación/temas.

- `id`
- `name`
- `description`
- `owner_user_id` FK
- `is_private` BOOL
- `created_at`

**Tabla `group_member`** – pertenencia de usuarios a grupos.

- `id`
- `group_id` FK
- `user_id` FK
- `role` ENUM('owner','admin','member')
- `joined_at`

Índice único (`group_id`, `user_id`).

### Tablas de hilos y mensajes

**Tabla `thread`** – hilos de mensajes (por grupo o por libro).

- `id`
- `group_id` FK NULL
- `book_id` FK NULL
- `title`
- `created_by_user_id` FK
- `created_at`

Regla: al menos uno de (`group_id`, `book_id`) no nulo.

**Tabla `message`** – mensajes dentro de un hilo.

- `id`
- `thread_id` FK
- `user_id` FK
- `content` TEXT
- `created_at`
- `parent_message_id` FK NULL

Índices por `thread_id`, `created_at`.

### Tablas opcionales

**Tabla `activity_log`** – registro de acciones (guardar libro, comentar, unirse a grupo, etc.).

- `id`
- `user_id`
- `type`
- `entity_id`
- `created_at`
- `metadata` JSON

**Tabla `tag`** – normalización de etiquetas (opcional).

- `id`
- `name` (único)

Relaciones derivadas:

- `book_tag` (`book_id`, `tag_id`)
- `user_book_tag` (`user_book_id`, `tag_id`)

## Roadmap (reactAppBook + API)

Esta sección sustituye al antiguo "TODO y trabajo pendiente" y se alinea con los roadmaps de [retosEvaluables/backEnd/README.md](retosEvaluables/backEnd/README.md) y [retosEvaluables/docs/README.md](retosEvaluables/docs/README.md).

### 1. Biblioteca personal

- **Front (reactAppBook)**
  - Completar la vista de "Mi biblioteca" (listado, paginación, filtros por estado de lectura y ordenaciones básicas).
  - Añadir/ajustar la edición de `reading_status`, `rating` y notas desde los componentes de libro.
  - Integrar el flujo de alta de libro desde Open Library (búsqueda → selección de edición → alta en biblioteca).
- **Back/API**
  - Implementar los endpoints `/user/books` del roadmap de API (GET/POST/PATCH/DELETE) apoyándose en `user_book` y `edition`.

### 2. Colecciones

- **Front**
  - Pantallas y componentes para crear, renombrar y borrar colecciones, y cambiar su visibilidad (pública/privada).
  - UI para añadir/quitar libros de una colección desde la biblioteca y desde el detalle de obra.
  - Reordenación de libros dentro de una colección (drag & drop sobre `position`).
- **Back/API**
  - Endpoints CRUD de `collection` y `collection_book` descritos en el roadmap del backend (listar por usuario, detalle de colección, gestión de libros dentro de la colección).

### 3. Comentarios, social y feed

- **Front**
  - Componentes de comentarios en la página de obra y de colección.
  - Vistas de perfil público con seguidores/seguidos y actividad reciente.
  - Un feed sencillo de actividad de usuarios seguidos (nuevos comentarios, nuevas colecciones públicas, etc.).
- **Back/API**
  - Endpoints de `comment` y `follow` para soportar comentarios y relaciones de seguimiento.
  - Consultas sobre `comment`, `follow` y fechas `created_at` para alimentar el feed.

### 4. Géneros y mapeo con Open Library

- **Front**
  - Selector de géneros preferidos en el perfil de usuario y filtros por género en la biblioteca y en las pantallas de exploración.
  - Mostrar los géneros de una obra en el detalle, basados en los datos internos (`genre`/`book_genre`).
- **Back/API**
  - Endpoint `GET /genres` para obtener la lista controlada de géneros.
  - Endpoints futuros para guardar las preferencias de géneros del usuario (p.ej. `/me/genres`).
  - Lógica de **mapeo entre subjects de Open Library y géneros internos**:
    - Leer los `subjects` devueltos por Open Library en el backend o en el front.
    - Mantener una tabla de correspondencias (por ejemplo en memoria o en tabla auxiliar) que asocie grupos de `subjects` a uno o varios `genre.code`.
    - Durante el flujo de alta de obra/edición, seleccionar géneros sugeridos a partir de los `subjects` y guardarlos en `book_genre`.
    - Opcional: permitir que el usuario ajuste manualmente los géneros sugeridos desde la UI antes de guardar.

### 5. Ratings y UX de lectura

- **Front**
  - Ajustar la funcionalidad de **ratings** y estados de lectura en el componente `BookInfo` y demás componentes relacionados (por ejemplo, en `src/features/books/components/BookInfo.tsx` dentro de `retosEvaluables/frontend/reactAppBook`).
  - Mejorar la UX de cambio de estado (propagación inmediata en UI, feedback visual, etc.).
- **Back/API**
  - Asegurar que el modelo (`user_book.rating`, `user_book.reading_status`) y los endpoints `/user/books` soportan estos campos de forma consistente.

Este roadmap se apoya en el modelo `my_books_db` y en la API prevista, de forma que las evoluciones del front y del back se mantengan sincronizadas.

## Licencia

Proyecto de aprendizaje para uso educativo dentro del curso de Desarrollo Web.
