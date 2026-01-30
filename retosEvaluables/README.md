# Módulo 7 – Front-End III (React)

## Índice

1. Descripción general del proyecto
2. Estructura del repositorio
3. Guía rápida de uso
4. Enlaces a documentación específica
   - [Backend: API REST (Node/Express)](backEnd/README%20-%20backEnd.md)
   - [Frontend: SPA React (Vite + TS)](frontEnd/README%20-%20frontEnd.md)
   - [Modelo de base de datos (MySQL)](docs/README%20-%20docs.md)
5. Roadmap y próximos pasos

## 1. Descripción general

Este repositorio contiene el proyecto completo de la aplicación **myBooks**, que incluye:

- Una API REST en Node.js/Express para la gestión de usuarios, biblioteca personal, colecciones y funcionalidades sociales.
- Un frontend SPA desarrollado en React + Vite + TypeScript.
- El modelo relacional de la base de datos MySQL, con scripts y documentación detallada.

El objetivo es ofrecer una plataforma donde los usuarios puedan gestionar su biblioteca, crear colecciones, interactuar socialmente y explorar libros, integrando datos propios y de Open Library.

### Ramas incluidas en este repositorio

- Reto día 1 – completado
- Reto día 2 – completado
- Reto día 3 – completado
- Reto día 4 – completado
- Reto día 5 – completado
- Reto día 6 – completado
- Reto día 7 – completado
- Reto dia 8 - en progreso

---

## 2. Estructura del repositorio

- `backEnd/` – API REST (Node.js + Express). [Ver documentación](backEnd/README%20-%20backEnd.md)
- `frontEnd/` – Aplicación React (Vite + TypeScript). [Ver documentación](frontEnd/README%20-%20frontEnd.md)
- `docs/` – Modelo de base de datos, scripts SQL y documentación técnica. [Ver documentación](docs/README%20-%20docs.md)


## 3. Guía rápida de uso

### Requisitos

- Node.js 20+ y npm 10+ (recomendado)

### Arrancar el proyecto `reactAppBook`

```bash
cd /modulo7/retosEvaluables/reactAppBook
npm install
npm run dev
```

- La app se sirve por defecto en `http://localhost:5173/` (puerto por defecto de Vite).
- Para generar build de producción:

```bash
npm run build
npm run preview
```

#### Arrancar el API `myBooks_API`

```bash
cd /modulo7/retosEvaluables/backEnd/myBooks_API/
npm install
node src/index.js
```
--- 

## 4. Documentación específica

- **Backend**: endpoints, estructura, middlewares, ejemplos de uso y manejo de errores.  
  [Ver README de backEnd](backEnd/README%20-%20backEnd.md)

- **Frontend**: estructura de carpetas, tecnologías, scripts, integración con la API y detalles de componentes.  
  [Ver README de frontEnd](frontEnd/README%20-%20frontEnd.md)

- **Base de datos**: modelo relacional, entidades, relaciones, convenciones y ejemplos de consultas SQL.  
  [Ver README de docs](docs/README%20-%20docs.md)


--- 


## 5. ROADMAPRoadmap y próximos pasos

Línea general de mejoras previstas para el proyecto **reactAppBook**:

- **Ampliacion Backend propio para reactAppBook**
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

---

## Licencia

Proyecto de aprendizaje para uso educativo dentro del curso de Desarrollo Web.
