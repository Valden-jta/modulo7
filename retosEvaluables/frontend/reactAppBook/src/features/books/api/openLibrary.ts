// https://openlibrary.org/developers
import URLBuilder from "../../../shared/utils/urlBuilder";
// import type { Book } from "../types/types";

/****  tipado respuestas ****/

type OpenLibraryDoc = {
  title?: string;
  author_name?: string[];
  author_key?: string[];
  first_publish_year?: number;
  number_of_pages_median?: number;
  cover_i?: number;
  key?: string; // normalmente "/works/OL...W"
  language?: string[];
  subtitle?: string;
};

// Tipos para búsqueda de autores: /search/authors?q=
type OpenLibraryAuthorSearchDoc = {
  key: string; // p.ej. "/authors/OL12345A"
  name: string;
  birth_date?: string;
  top_work?: string;
  top_subjects?: string[];
  work_count?: number;
};

type OpenLibraryAuthorSearchResponse = {
  numFound: number;
  start: number;
  docs: OpenLibraryAuthorSearchDoc[];
};

// Tipo para detalle de autor: /authors/{id}.json
type OpenLibraryAuthorDetail = {
  key: string;
  name: string;
  personal_name?: string;
  bio?: string | { type?: string; value?: string };
  birth_date?: string;
  death_date?: string;
  remote_ids?: Record<string, string>;
  links?: { url: string; title?: string }[];
};

type OpenLibrarySearchResponse = {
  numFound: number;
  docs: OpenLibraryDoc[];
};

// Tipos para la llamada de ediciones de un work

type OpenLibraryLanguageRef = {
  key: string; // p.ej. "/languages/spa"
};

type OpenLibraryEdition = {
  key: string; // p.ej. "/books/OL123M"
  title?: string;
  subtitle?: string;
  number_of_pages?: number;
  publish_date?: string;
  publishers?: string[];
  languages?: OpenLibraryLanguageRef[];
  covers?: number[];
  isbn_10?: string[];
  isbn_13?: string[];
};

type OpenLibraryEditionsResponse = {
  entries?: OpenLibraryEdition[];
  size?: number;
};

// Tipo de un work concreto: /works/{id}.json
type OpenLibraryWork = {
  key: string; // p.ej. "/books/OL12345W"
  title: string;
  description?:
    | string
    | {
        type?: string;
        value?: string;
      };
  covers?: number[];
  subjects?: string[];
  authors?: {
    author: { key: string };
    type?: { key: string };
    role?: string;
  }[];
  first_publish_date?: string;
  latest_revision?: number;
  revision?: number;
  created?: { type?: string; value?: string };
  last_modified?: { type?: string; value?: string };
};

/****  Busqueda de libros ****/

/**
 * Llama al endpoint de búsqueda de OpenLibrary (o a otro endpoint compatible)
 * construyendo la URL con URLBuilder.
 *
 * Admite tanto respuestas con "docs" (search.json) como con "works"
 * (endpoints de trending), normalizándolas al formato OpenLibrarySearchResponse.
 *
 * Opcionalmente, si se indica un idioma preferido, realiza una segunda capa de
 * enriquecimiento por cada work, usando GetOLBookInfo para obtener la edición
 * en ese idioma y actualizar título/portada.
 *
 * @param params             Parámetros de query (q, page, limit, etc.)
 * @param baseUrl            URL base opcional; por defecto usa /search.json
 * @param preferredLanguage  Código de idioma preferido (spa, eng, fre, ...)
 */

async function GetOLBookList(
  params: Record<string, string | number | undefined>,
  baseUrl = "https://openlibrary.org/search.json",
  preferredLanguage?: string,
): Promise<OpenLibrarySearchResponse> {
  const url = URLBuilder(baseUrl, params);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

  const raw = (await res.json()) as {
    numFound?: number;
    docs?: OpenLibraryDoc[];
    works?: OpenLibraryDoc[];
  };

  const baseDocs = (raw.docs ?? raw.works ?? []) as OpenLibraryDoc[];
  const numFound =
    typeof raw.numFound === "number" ? raw.numFound : baseDocs.length;

  // Si no se pide idioma preferido, devolvemos los docs tal cual.
  if (!preferredLanguage) {
    return { numFound, docs: baseDocs };
  }

  // Enriquecer cada work con la edición en el idioma preferido
  const enrichedDocs = await Promise.all(
    baseDocs.map(async (doc) => {
      if (!doc.key) return doc;

      try {
        const edition = await GetOLBookEdition(doc.key, preferredLanguage);
        if (!edition) return doc;

        const next: OpenLibraryDoc = { ...doc };

        if (edition.title) next.title = edition.title;
        if (edition.subtitle) next.subtitle = edition.subtitle;
        if (edition.covers && edition.covers.length > 0) {
          next.cover_i = edition.covers[0];
        }

        return next;
      } catch {
        return doc;
      }
    }),
  );

  return { numFound, docs: enrichedDocs };
}

/****  Información sobre un libro (edición en idioma preferido) ****/

function editionMatchesLanguage(
  edition: OpenLibraryEdition,
  preferredLanguage: string,
) {
  if (!edition.languages || !preferredLanguage) return false;
  const langCode = preferredLanguage.toLowerCase();
  const suffix = `/languages/${langCode}`;
  return edition.languages.some((lang) =>
    lang.key?.toLowerCase().endsWith(suffix),
  );
}

/**
 * Obtiene las ediciones de un work y devuelve la que mejor encaja
 * con el idioma preferido. Si no hay ninguna en ese idioma, devuelve
 * la primera edición disponible.
 *
 * @param workKey  Clave del work, p.ej. "/works/OL21745884W" o "OL21745884W"
 * @param preferredLanguage  Código de idioma OpenLibrary (spa, eng, fre, por...)
 */
function GetOLBookEdition(
  workKey: string,
  preferredLanguage: string,
): Promise<OpenLibraryEdition | null> {
  if (!workKey) {
    return Promise.reject(new Error("workKey es obligatorio"));
  }

  const normalizedKey = workKey.startsWith("/works/")
    ? workKey
    : `/works/${workKey}`;

  const url = URLBuilder(
    `https://openlibrary.org${normalizedKey}/editions.json`,
    { limit: 50 },
  );

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      return res.json() as Promise<OpenLibraryEditionsResponse>;
    })
    .then((data) => {
      const editions = data.entries ?? [];
      if (!editions.length) return null;

      const preferred = editions.find((edition) =>
        editionMatchesLanguage(edition, preferredLanguage),
      );

      return preferred ?? editions[0];
    })
    .catch((error) => {
      console.error(`Error al obtener ediciones de OpenLibrary: ${error}`);
      throw error;
    });
}

/**
 * Obtiene el detalle de una obra (work) y una edición que encaje con el
 * idioma preferido, reutilizando GetOLBookEdition.
 *
 * Devuelve ambos objetos para que la UI pueda construir tanto un
 * BookViewModel enriquecido como, en el futuro, un Book de dominio.
 */
async function GetOLBookDetail(
  workKey: string,
  preferredLanguage: string,
): Promise<{ work: OpenLibraryWork; edition: OpenLibraryEdition | null }> {
  if (!workKey) {
    throw new Error("workKey es obligatorio");
  }

  const normalizedKey = workKey.startsWith("/works/")
    ? workKey
    : `/works/${workKey}`;

  const workRes = await fetch(`https://openlibrary.org${normalizedKey}.json`);
  if (!workRes.ok) {
    throw new Error(`Error HTTP ${workRes.status} al obtener work`);
  }

  const work = (await workRes.json()) as OpenLibraryWork;
  const edition = await GetOLBookEdition(normalizedKey, preferredLanguage);

  return { work, edition };
}

// function GetOLAuthor() {
//     https://openlibrary.org/dev/docs/api/authors
// }

export type {
  OpenLibraryDoc,
  OpenLibraryEdition,
  OpenLibraryAuthorSearchDoc,
  OpenLibraryAuthorSearchResponse,
  OpenLibraryAuthorDetail,
  OpenLibraryWork,
};
export { GetOLBookList, GetOLBookEdition, GetOLBookDetail };
