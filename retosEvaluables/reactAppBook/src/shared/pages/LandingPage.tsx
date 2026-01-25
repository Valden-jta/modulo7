import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { OpenLibraryDoc } from "../../features/books/api/openLibrary";
import { GetOLBookList } from "../../features/books/api/openLibrary";
import BookCard from "../../features/books/components/BookCard";

function LandingPage() {
  const [randomBooks, setRandomBooks] = useState<OpenLibraryDoc[]>([]);
  const [loadingRandom, setLoadingRandom] = useState(true);
  const [errorRandom, setErrorRandom] = useState<string | null>(null);

  useEffect(() => {
    setErrorRandom(null);

    GetOLBookList(
      {
        // q: "*:*",
        // page: 1,
        // limit: 10,
        // language: "spa",
      },
      "https://openlibrary.org/trending/daily.json",
      navigator.language || "es"
  )
      .then((data) => {
        setRandomBooks(data.docs ?? []);
      })
      .catch(() => {
        setRandomBooks([]);
        setErrorRandom(
          "No se han podido cargar libros en este momento. Inténtalo de nuevo más tarde.",
        );
      })
      .finally(() => {
        setLoadingRandom(false);
      });
  }, []);

  return (
    <div className="bg-light-surface-a10 dark:bg-dark-surface-a10">
      {/* Local animation styles */}
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-up { opacity: 0; animation: fadeInUp 600ms ease forwards; }
        .stagger-1 { animation-delay: 80ms; }
        .stagger-2 { animation-delay: 160ms; }
        .stagger-3 { animation-delay: 240ms; }
      `}</style>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-light-surface-a0 dark:bg-dark-surface-a0">
        <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30">
          <div className="absolute -left-32 -top-24 h-64 w-64 rounded-full bg-light-primary-a20/30 blur-3xl dark:bg-dark-primary-a20/40" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-light-surface-tonal-a20/60 blur-3xl dark:bg-dark-surface-tonal-a20/60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16 grid gap-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
          <div className="text-left space-y-6 fade-in-up stagger-1">
            <p className="text-sm uppercase tracking-[0.25em] text-light-primary-a20 dark:text-dark-primary-a20">
              Tu refugio lector
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-dark-a0 dark:text-light-a0 leading-tight">
              Tu biblioteca personal,
              <span className="block text-3xl md:text-4xl text-light-primary-a20 dark:text-dark-primary-a10 mt-2">
                siempre a una página de distancia
              </span>
            </h1>
            <p className="text-base md:text-lg text-dark-a30 dark:text-light-a30 max-w-xl">
              Guarda tus lecturas, organiza colecciones y descubre nuevos libros
              en un espacio diseñado para lectores empedernidos.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-light-primary-a20 text-dark-a0 font-semibold shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:brightness-105 active:translate-y-[1px] active:brightness-95 transition-all duration-150">
                Entrar / Iniciar sesión
              </Link>
            </div>
          </div>

          <div className="fade-in-up stagger-2">
            <div className="relative rounded-2xl border border-light-surface-a30/80 dark:border-dark-surface-a60 bg-light-surface-tonal-a0/90 dark:bg-dark-surface-tonal-a0/90 shadow-md px-6 py-5 overflow-hidden">
              <div className="absolute -top-8 -right-10 h-24 w-24 rounded-full bg-light-primary-a10/60 blur-2xl dark:bg-dark-primary-a10/50" />
              <p className="text-xs uppercase tracking-[0.25em] text-dark-surface-a60 dark:text-light-surface-a60 mb-3">
                Hoy en tu estantería
              </p>
              <p className="text-sm text-dark-a0 dark:text-light-a0 leading-relaxed mb-4">
                Ve de un vistazo los libros que has guardado y tus colecciones
                favoritas, para retomar siempre donde lo dejaste.
              </p>
              <div className="flex gap-2 mt-2">
                <span className="inline-flex items-center rounded-full bg-light-primary-a20/15 px-3 py-1 text-xs text-dark-a0 dark:text-light-a0">
                  Listas personalizadas
                </span>
                <span className="inline-flex items-center rounded-full bg-light-surface-a30/70 dark:bg-dark-surface-a40 px-3 py-1 text-xs text-dark-a0 dark:text-light-a0">
                  Historial de lecturas
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 border-t border-light-surface-a20 dark:border-dark-surface-a30 bg-light-surface-tonal-a0 dark:bg-dark-surface-tonal-a0">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <div className="space-y-3 md:pr-6">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-a0 dark:text-light-a0">
              Empieza a explorar libros
            </h2>
            <p className="text-sm text-dark-a30 dark:text-light-a30 max-w-xl">
              Una primera selección de títulos obtenidos de Open Library para
              que puedas hacerte una idea de lo que puedes descubrir.
            </p>
            <p className="text-xs text-dark-surface-a60 dark:text-light-surface-a60">
              Las portadas y datos mostrados proceden de la API pública de Open
              Library.
            </p>
          </div>

          <div className="mt-2">
            {loadingRandom && (
              <p className="text-sm text-dark-surface-a60 dark:text-light-surface-a60">
                Cargando libros...
              </p>
            )}

            {!loadingRandom && errorRandom && (
              <p className="text-sm text-light-danger-a0">{errorRandom}</p>
            )}

            {!loadingRandom && !errorRandom && randomBooks.length === 0 && (
              <p className="text-sm text-dark-surface-a60 dark:text-light-surface-a60">
                No se han encontrado libros en este momento.
              </p>
            )}

            {!loadingRandom && !errorRandom && randomBooks.length > 0 && (
              <div className="mt-6 rounded-2xl bg-light-surface-a0 dark:bg-dark-surface-a10 border border-light-surface-a30/70 dark:border-dark-surface-a60 shadow-inner px-3 py-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {randomBooks.slice(0, 10).map((doc) => (
                    <BookCard key={doc.key} doc={doc} />
                  ))}
                </div>
                <div className="mt-3 h-1 w-full rounded-full bg-light-surface-a30/80 dark:bg-dark-surface-a60" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features / Características */}
      <section className="py-16 bg-light-surface-a10 dark:bg-dark-surface-a10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-dark-a0 dark:text-light-a0">
            ¿Qué puedes hacer con la app?
          </h2>

          <p className="text-center text-dark-a30 dark:text-light-a30 max-w-2xl mx-auto mb-8">
            Una herramienta pensada para lectores: descubre, organiza y comparte
            tus lecturas con funcionalidades que facilitan tu día a día.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <article className="p-6 rounded-xl shadow-sm bg-white dark:bg-dark-surface-a5 border border-light-surface-a20/70 dark:border-dark-surface-a70">
              <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-light-primary-a10 text-light-primary-a60">
                {/* Icon: search */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-lg text-dark-a0 dark:text-light-a0">
                Explorar y descubrir
              </h3>
              <p className="text-sm text-dark-a30 dark:text-light-a30 hidden md:block fade-in-up stagger-1">
                Busca por título, autor o género y encuentra nuevas lecturas
                recomendadas según tus intereses.
              </p>
            </article>

            <article className="p-6 rounded-xl shadow-sm bg-white dark:bg-dark-surface-a5 border border-light-surface-a20/70 dark:border-dark-surface-a70">
              <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-light-primary-a10 text-light-primary-a60">
                {/* Icon: collection */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-lg text-dark-a0 dark:text-light-a0">
                Organizar tu biblioteca
              </h3>
              <p className="text-sm text-dark-a30 dark:text-light-a30 hidden md:block fade-in-up stagger-2">
                Crea colecciones, listas y marca tu progreso de lectura para
                mantener todo organizado.
              </p>
            </article>

            <article className="p-6 rounded-xl shadow-sm bg-white dark:bg-dark-surface-a5 border border-light-surface-a20/70 dark:border-dark-surface-a70">
              <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-light-primary-a10 text-light-primary-a60">
                {/* Icon: share */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 12v.01M12 12v.01M20 12v.01M4 12a8 8 0 0116 0M4 12h16"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-lg text-dark-a0 dark:text-light-a0">
                Compartir y colaborar
              </h3>
              <p className="text-sm text-dark-a30 dark:text-light-a30 hidden md:block fade-in-up stagger-3">
                Comparte listas, reseñas y recomendaciones con amigos o la
                comunidad de lectores.
              </p>
            </article>
          </div>

          {/* Social / Comunidad */}
          <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <h3 className="text-xl font-semibold text-dark-a0 dark:text-light-a0">
                Una comunidad de lectores
              </h3>
              <p className="text-sm text-dark-a30 dark:text-light-a30">
                Conecta con amistades lectoras, comparte tus listas favoritas y
                descubre qué están leyendo otras personas en tu círculo.
              </p>
              <p className="text-sm text-dark-a30 dark:text-light-a30">
                Crea grupos, participa en foros y guarda recomendaciones para tu
                próximo libro. La app no es solo una biblioteca: también es un
                club de lectura.
              </p>
            </div>
            <div className="order-1 md:order-2 p-6 rounded-2xl bg-light-surface-tonal-a0 dark:bg-dark-surface-tonal-a0 border border-light-surface-a30/60 dark:border-dark-surface-a60 shadow-sm">
              <ul className="space-y-2 text-sm text-dark-a30 dark:text-light-a30">
                <li className="flex items-start gap-2">
                  <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-light-primary-a20" />
                  <span>Zona social con amigos, grupos y foro de lectura.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-light-primary-a20" />
                  <span>
                    Comparte listas temáticas y descubre recomendaciones de
                    otros lectores.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-light-primary-a20" />
                  <span>
                    Sigue conversaciones y debates alrededor de tus géneros
                    favoritos.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="mb-4 text-dark-a30 dark:text-light-a30">
              ¿Listo para empezar?
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/registro"
                className="px-5 py-3 rounded-md bg-light-primary-a20 text-dark-a0 font-semibold shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:brightness-105 active:translate-y-[1px] active:brightness-95 transition-all duration-150">
                Crear cuenta
              </Link>
              <Link
                to="/login"
                className="px-4 py-3 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70 text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a20 dark:hover:bg-dark-surface-a20 hover:-translate-y-[1px] active:translate-y-[1px] transition-all duration-150">
                Ya tengo cuenta
              </Link>
            </div>
          </div>
          {/* Testimonios y logos */}
          <div className="mt-12 max-w-4xl mx-auto px-6">
            <h3 className="text-xl font-bold text-center mb-6 text-dark-a0 dark:text-light-a0">
              Lo que dicen los lectores
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <blockquote className="p-6 bg-white dark:bg-dark-surface-a5 rounded-lg shadow-sm">
                <p className="text-dark-a30 dark:text-light-a30 italic">
                  “Una app sencilla y potente — me ayudó a organizar mis
                  lecturas y descubrir nuevos títulos cada semana. La interfaz
                  es rápida y cómoda.”
                </p>
                <footer className="mt-4 text-sm text-dark-a30 dark:text-light-a30">
                  — María, lectora ávida
                </footer>
              </blockquote>

              <div className="p-6 bg-white dark:bg-dark-surface-a5 rounded-lg shadow-sm">
                <p className="mb-4 text-sm text-dark-a30 dark:text-light-a30">
                  Integraciones y comunidades
                </p>
                <div className="flex items-center justify-start gap-4 flex-wrap">
                  <div className="w-20 h-10 flex items-center justify-center bg-light-surface-a30 dark:bg-dark-surface-a70 rounded">
                    Logo A
                  </div>
                  <div className="w-20 h-10 flex items-center justify-center bg-light-surface-a30 dark:bg-dark-surface-a70 rounded">
                    Logo B
                  </div>
                  <div className="w-20 h-10 flex items-center justify-center bg-light-surface-a30 dark:bg-dark-surface-a70 rounded">
                    Logo C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
