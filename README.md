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

## Estructura de carpetas (reactAppBook)

Ruta base: `retosEvaluables/reactAppBook/src`

- `config/`
  - `data.ts`: datos estáticos y configuración base del cliente.
  - `SQL/`: scripts SQL de referencia (`books.sql`, `users.sql`).
- `features/books/`
  - `api/`: clientes para API propia (`myBooks.ts`) e integración con Open Library (`openLibrary.ts`).
  - `components/`: componentes de UI de libros (`BookCard`, `BookList`, `BookInfo`, filtros, formularios...).
  - `hooks/`: hooks específicos de libros (`useBookListFilter`, etc.).
  - `pages/`: páginas de alto nivel relacionadas con libros (listado, búsqueda, edición, importación, libros del usuario...).
  - `types/`: tipos y modelos relacionados con libros.
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

## TODO y trabajo pendiente

- Implementar/actualizar la base de datos siguiendo el modelo anterior (tabla `books` actualizada, tablas de colecciones, social, etc.).
- Conectar el front **reactAppBook** con la API y la BBDD para persistir biblioteca, colecciones, comentarios y grupos.
- Actualizar la funcionalidad de **ratings** en el componente `BookInfo` del proyecto final cuando la base de datos esté disponible (archivo `src/features/books/components/BookInfo.tsx` dentro de `retosEvaluables/reactAppBook`).

## Licencia

Proyecto de aprendizaje para uso educativo dentro del curso de Desarrollo Web.
