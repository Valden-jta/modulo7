import { Link } from "react-router-dom";

function LandingPage() {
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
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-dark-a0 dark:text-light-a0">
            Bienvenido a tu Biblioteca
          </h1>
          <p className="text-lg md:text-xl text-dark-a30 dark:text-light-a30 mb-8">
            Gestiona tus libros, colecciones y listas favoritas. Navega, añade y
            comparte tus lecturas desde una interfaz sencilla y rápida.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/login"
              className="inline-block px-5 py-3 rounded-md bg-light-primary-a20 text-white font-semibold shadow hover:brightness-90 transition">
              Entrar / Iniciar sesión
            </Link>

            <Link
              to="/libros"
              className="inline-block px-4 py-3 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70 text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 transition">
              Explorar libros
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Características */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-dark-a0 dark:text-light-a0">
            ¿Qué puedes hacer con la app?
          </h2>

          <p className="text-center text-dark-a30 dark:text-light-a30 max-w-2xl mx-auto mb-8">
            Una herramienta pensada para lectores: descubre, organiza y comparte
            tus lecturas con funcionalidades que facilitan tu día a día.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 rounded-lg shadow-sm bg-white dark:bg-dark-surface-a5">
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

            <article className="p-6 rounded-lg shadow-sm bg-white dark:bg-dark-surface-a5">
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

            <article className="p-6 rounded-lg shadow-sm bg-white dark:bg-dark-surface-a5">
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

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="mb-4 text-dark-a30 dark:text-light-a30">
              ¿Listo para empezar?
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/registro"
                className="px-5 py-3 rounded-md bg-light-primary-a20 text-white font-semibold shadow hover:brightness-90 transition">
                Crear cuenta
              </Link>
              <Link
                to="/libros"
                className="px-4 py-3 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70 text-dark-a0 dark:text-light-a0">
                Explorar ahora
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
