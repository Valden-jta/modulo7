import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-light-surface-a10 dark:bg-dark-surface-a10">
      <div className="max-w-2xl text-center p-6">
        <h2 className="text-6xl font-extrabold mb-4 text-dark-a0 dark:text-light-a0">
          404
        </h2>
        <p className="text-lg mb-6 text-dark-a30 dark:text-light-a30">
          Lo sentimos, la página que buscas no existe o no está disponible.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-md bg-light-primary-a20 text-white font-semibold hover:brightness-95 transition">
            Ir al inicio
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70 text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 transition">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
