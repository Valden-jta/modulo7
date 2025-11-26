import { Link } from "react-router-dom";

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="p-4 bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-lg shadow-sm border border-light-surface-a30 dark:border-dark-surface-a70">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-dark-a30 dark:text-light-a30">
            {title}
          </div>
          <div className="text-2xl font-bold text-dark-a0 dark:text-light-a0">
            {value}
          </div>
        </div>
        {icon && (
          <div className="text-3xl text-light-primary-a20 dark:text-dark-primary-a20">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

function UserDashboardPage() {
  // datos ficticios para la plantilla
  const stats = {
    totalBooks: 128,
    collections: 6,
    favorites: 24,
    readingNow: 3,
  };

  const recent = [
    "Añadiste 'El metricor' a Mis libros",
    "Creaste la colección 'Verano 2025'",
    "Marcaste 'Node.js Avanzado' como favorito",
  ];

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-dark-a0 dark:text-light-a0">
          Dashboard
        </h1>
        <p className="text-sm text-dark-a30 dark:text-light-a30">
          Vista rápida de tu actividad y accesos rápidos.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Libros totales" value={stats.totalBooks} />
        <StatCard title="Colecciones" value={stats.collections} />
        <StatCard title="Favoritos" value={stats.favorites} />
        <StatCard title="Leyendo ahora" value={stats.readingNow} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-lg p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
          <h2 className="font-semibold text-lg mb-3 text-dark-a0 dark:text-light-a0">
            Actividad reciente
          </h2>
          <ul className="space-y-2 text-dark-a30 dark:text-light-a30">
            {recent.map((item, i) => (
              <li
                key={i}
                className="p-2 rounded hover:bg-light-surface-a10 dark:hover:bg-dark-surface-a10 transition">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-lg p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
          <h3 className="font-semibold mb-3 text-dark-a0 dark:text-light-a0">
            Accesos rápidos
          </h3>
          <div className="flex flex-col gap-2">
            <Link
              className="px-3 py-2 rounded-md bg-light-primary-a20 text-white text-sm text-center"
              to="/libros/mis_libros">
              Mis libros
            </Link>
            <Link
              className="px-3 py-2 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70 text-sm text-center"
              to="/libros/añadir">
              Añadir libro
            </Link>
            <Link
              className="px-3 py-2 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70 text-sm text-center"
              to="/libros/listas">
              Mis listas
            </Link>
            <Link
              className="px-3 py-2 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70 text-sm text-center"
              to="/configuracion">
              Configuración
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default UserDashboardPage;
