import type { User } from "../../config/types";
import { Link } from "react-router-dom";

type Props = {
  user: User | null;
};

function UserHomePage({ user }: Props) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-light-surface-a10 dark:bg-dark-surface-a10">
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-dark-a0 dark:text-light-a0">
          Hola{user ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="text-base md:text-lg text-dark-a30 dark:text-light-a30 mb-6">
          Este es tu espacio personal. Accede rápidamente a tu colección, tus
          libros y ajustes de usuario.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/libros/mis_libros"
            className="px-4 py-2 rounded-md bg-light-primary-a20 text-white font-semibold hover:brightness-95 transition">
            Mis libros
          </Link>

          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70 text-dark-a0 dark:text-light-a0 hover:bg-light-surface-a30 transition">
            Ir al dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;