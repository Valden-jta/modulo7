# FrontEnd – reactAppBook

SPA desarrollada en **React 19 + Vite + TypeScript** para la gestión de biblioteca personal, colecciones y funcionalidades sociales, integrando datos propios y de Open Library.

## Tabla de contenidos

- [FrontEnd – reactAppBook](#frontend--reactappbook)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción general](#descripción-general)
  - [Estructura de carpetas y organización](#estructura-de-carpetas-y-organización)
  - [Principales features y páginas](#principales-features-y-páginas)
    - [Libros (`features/books/pages`)](#libros-featuresbookspages)
    - [Colecciones (`features/collections/pages`)](#colecciones-featurescollectionspages)
    - [Social (`features/social/pages`)](#social-featuressocialpages)
    - [Usuario (`features/user/pages`)](#usuario-featuresuserpages)
    - [Páginas compartidas (`shared/pages`)](#páginas-compartidas-sharedpages)
  - [Tecnologías y scripts](#tecnologías-y-scripts)
    - [Scripts disponibles](#scripts-disponibles)
  - [Integración con la API](#integración-con-la-api)
  - [Funcionalidades actuales relevantes (reactAppBook)](#funcionalidades-actuales-relevantes-reactappbook)
  - [Roadmap (reactAppBook + API)](#roadmap-reactappbook--api)
    - [1. Biblioteca personal](#1-biblioteca-personal)
    - [2. Colecciones](#2-colecciones)
    - [3. Comentarios, social y feed](#3-comentarios-social-y-feed)
    - [4. Géneros y mapeo con Open Library](#4-géneros-y-mapeo-con-open-library)
    - [5. Ratings y UX de lectura](#5-ratings-y-ux-de-lectura)
  - [TODO – Integración completa con API my\_books](#todo--integración-completa-con-api-my_books)

---

## Descripción general

Esta SPA permite:

- Buscar y explorar libros (Open Library y propios)
- Añadir libros a la biblioteca personal y gestionar su estado de lectura
- Crear colecciones personalizadas y marcar favoritos
- Valorar libros y sincronizar ratings con la base de datos
- Interactuar socialmente (grupos, amigos, foros, hilos de conversación)

---

## Estructura de carpetas y organización

Ruta base: `frontEnd/reactAppBook/src`

- `config/` – Configuración y datos estáticos (ejemplo: datos de prueba, scripts SQL)
- `features/` – Dominio funcional principal:
  - `books/` – Gestión de libros: API, componentes, hooks, páginas (búsqueda, listado, detalle, edición, importación, añadir libro, autor)
  - `collections/` – Colecciones: crear, listar, favoritos, administrar, añadir/quitar libros
  - `social/` – Social: amigos, grupos, foros, feed de actividad
  - `user/` – Usuario: dashboard, perfil, configuración, autenticación
- `layout/` – Componentes de layout global (Header, Footer, Aside, Menu)
- `shared/` – Hooks, páginas genéricas (Landing, NotFound), rutas públicas/privadas, UI reutilizable, utilidades

---

## Principales features y páginas

### Libros (`features/books/pages`)

- **BooksPage**: Listado principal de libros del usuario, con filtros, paginación, vistas (grid/lista), edición y borrado
- **AddBookPage**: Formulario para añadir un libro manualmente, con previsualización
- **EditBook**: Edición de libro existente (en desarrollo)
- **ImportBook**: Importar libros desde Open Library u otras fuentes (en desarrollo)
- **SearchBook**: Búsqueda avanzada en Open Library, integración con BookInfo y BookList, paginación, filtros de idioma
- **AuthorPage**: Detalle de autor (Open Library), muestra bio, fechas, obras destacadas
- **UserBookPage**: Vista personalizada de la biblioteca del usuario, con filtros avanzados, edición y borrado

### Colecciones (`features/collections/pages`)

- **AddCollection**: Crear nueva colección (nombre, descripción, visibilidad, selección de libros)
- **CollectionPage**: Listar todas las colecciones del usuario, acceso a detalles y edición
- **FavoritesCollection**: Colección especial de favoritos, permite reordenar y filtrar
- **ManageCollection**: Administración de colecciones (renombrar, eliminar, editar libros, portada)

### Social (`features/social/pages`)

- **Social**: Contenedor raíz, muestra subrutas de amigos, grupos y foro
- **SocialFriends**: Listado de amigos, solicitudes, búsqueda y acciones de seguir/dejar de seguir
- **SocialGroups**: Gestión de grupos de lectura, miembros, hilos
- **SocialForum**: Foro de discusión, hilos, mensajes, creación y respuesta

### Usuario (`features/user/pages`)

- **UserDashboardPage**: Panel de control con métricas, actividad reciente, accesos rápidos
- **UserProfile**: Perfil de usuario, edición de datos, solicitud de cambio de rol
- **UserConfigPage**: Ajustes avanzados (idioma, privacidad, seguridad, integraciones, notificaciones)

### Páginas compartidas (`shared/pages`)

- **LandingPage**: Portada con libros destacados y acceso rápido a funcionalidades
- **NotFound**: Página 404 personalizada

---

## Tecnologías y scripts

- **React 19** + **TypeScript**
- **Vite** (dev server y bundler)
- **React Router** (rutas públicas y privadas)
- **React Hook Form** + **Zod** (formularios y validación)
- **Tailwind CSS 4** (diseño)
- **React Icons / Spinners / Paginate / Rating Stars** (UI avanzada)

### Scripts disponibles

- `npm run dev` – Arranca el servidor de desarrollo Vite
- `npm run build` – Compila TypeScript y genera el build de producción
- `npm run preview` – Sirve el build generado para comprobar producción
- `npm run lint` – Lanza ESLint sobre el proyecto

---

## Integración con la API

La comunicación con el backend se realiza mediante clientes API en `features/books/api/myBooksApi.ts` y módulos equivalentes para colecciones y social.

- Los endpoints y payloads deben alinearse con la [documentación del backend](../backEnd/README%20-%20backEnd.md)
- Para futuras funcionalidades, agrupar las llamadas en módulos por dominio (`features/collections/api/...`, `features/social/api/...`)

---
## Funcionalidades actuales relevantes (reactAppBook)

- **Detalle enriquecido desde Open Library**
  - La página `SearchBook` usa `GetOLBookList` para buscar obras y, al hacer clic en un resultado, llama a `GetOLBookDetail` para obtener el `work` y una edición en el idioma preferido.
  - Los datos se normalizan a `BookViewModel` mediante `mapOpenLibraryDocToViewModel` y `mapOpenLibraryWorkToViewModel` (`features/books/utils/typeMappingTools.ts`) y se muestran en `BookInfo`.
- **Modelo de vista unificado (`BookViewModel`)**
  - Los componentes de lista (`BookList`, `BookCard`, `BookRows`) trabajan con `BookViewModel`, independizándose del origen del dato (libros de usuario vs Open Library).
  - `BookInfo` acepta tanto `Book` de dominio como `BookViewModel` y muestra sinopsis/descripción cuando está disponible.

---

## Roadmap (reactAppBook + API)

Esta sección se alinea con los roadmaps de [retosEvaluables/backEnd/README.md](retosEvaluables/backEnd/README.md) y [retosEvaluables/docs/README.md](retosEvaluables/docs/README.md).

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

Este roadmap se apoya en el modelo `my_books_db` y en la API prevista, de forma que las evoluciones del front y del back se mantengan sincronizadas.
