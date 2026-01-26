import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  OpenLibraryAuthorDetail,
  OpenLibraryAuthorSearchDoc,
} from "../api/openLibrary";

/**
 * AuthorPage
 *
 * Página de detalle de autor basada en los datos de Open Library.
 *
 * Responsabilidades previstas:
 * - Obtener la información detallada de un autor a partir de su `author_id`.
 * - Mostrar datos básicos (nombre, fechas, bio) y enlaces relevantes.
 * - (Opcional) listar algunas de sus obras principales / temas destacados.
 *
 * NOTA: esta plantilla sólo define la estructura básica y estados. La
 * integración real con la API (fetch) y el routing se debe completar
 * en pasos posteriores.
 */
function AuthorPage() {
  // Se espera un parámetro de ruta tipo `/authors/:author_id`
  const { author_id } = useParams<{ author_id: string }>();

  const [author, setAuthor] = useState<OpenLibraryAuthorDetail | null>(null);
  const [relatedWorks, setRelatedWorks] = useState<
    OpenLibraryAuthorSearchDoc[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!author_id) return;

    // TODO: implementar llamadas reales a Open Library:
    // 1) fetch a `/authors/{author_id}.json` para `OpenLibraryAuthorDetail`.
    // 2) (Opcional) fetch a `/search/authors?q=...` o a works relacionados.

    setLoading(true);
    setError(null);

    // Ejemplo de estructura (elimina esto cuando añadas la integración real):
    Promise.resolve().finally(() => {
      setLoading(false);
    });
  }, [author_id]);

  if (!author_id) {
    return (
      <section className="p-6 lg:p-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-light-danger-a0">
            No se ha proporcionado ningún identificador de autor.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-dark-a0 dark:text-light-a0">
            Detalle de autor
          </h1>
          <p className="text-sm text-dark-surface-a40 dark:text-light-surface-a40 mt-1">
            Información obtenida desde Open Library para el autor seleccionado.
          </p>
        </header>

        {loading && (
          <p className="text-sm text-dark-surface-a60 dark:text-light-surface-a60">
            Cargando información del autor...
          </p>
        )}

        {error && !loading && (
          <p className="text-sm text-light-danger-a0">{error}</p>
        )}

        {!loading && !error && author && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-dark-a0 dark:text-light-a0">
              {author.name}
            </h2>

            {author.birth_date && (
              <p className="text-sm text-dark-surface-a60 dark:text-light-surface-a60">
                Fecha de nacimiento: {author.birth_date}
              </p>
            )}

            {author.death_date && (
              <p className="text-sm text-dark-surface-a60 dark:text-light-surface-a60">
                Fecha de fallecimiento: {author.death_date}
              </p>
            )}

            {author.bio && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Biografía</h3>
                <p className="text-sm text-dark-surface-a70 dark:text-light-surface-a70 leading-relaxed">
                  {typeof author.bio === "string"
                    ? author.bio
                    : author.bio.value}
                </p>
              </div>
            )}

            {/* TODO: mostrar enlaces externos (remote_ids / links) cuando estén disponibles */}
          </div>
        )}

        {/* TODO: sección para listar obras destacadas / subjects usando `relatedWorks` */}
      </div>
    </section>
  );
}

export default AuthorPage;
