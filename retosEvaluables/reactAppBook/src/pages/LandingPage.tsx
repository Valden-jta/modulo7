import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-light-surface-a10 dark:bg-dark-surface-a10">
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
    </div>
  );
}

export default LandingPage;
