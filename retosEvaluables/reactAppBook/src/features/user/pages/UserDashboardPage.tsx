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

  const notifications = [
    {
      id: 1,
      title: "Nuevo comentario",
      body: "María comentó tu reseña.",
      when: "hace 1h",
    },
    {
      id: 2,
      title: "Oferta",
      body: "Descuento 20% en la tienda de libros.",
      when: "ayer",
    },
  ];

  const recommendations = [
    { id: 1, title: "Aprendiendo React", author: "A. Dev" },
    { id: 2, title: "CSS moderno", author: "B. Styles" },
  ];

  const events = [
    { id: 1, title: "Club de lectura - Julio", date: "2025-07-12" },
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

          <div className="mt-6">
            <h3 className="font-medium mb-2">Recomendaciones para ti</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendations.map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded border bg-white dark:bg-gray-800">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-sm text-gray-500">{r.author}</div>
                </div>
              ))}
            </div>
          </div>
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

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-lg p-4 border border-light-surface-a30 dark:border-dark-surface-a70 lg:col-span-2">
          <h3 className="font-semibold mb-3 text-dark-a0 dark:text-light-a0">
            Notificaciones
          </h3>
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="p-3 rounded hover:bg-light-surface-a10 dark:hover:bg-dark-surface-a10">
                <div className="font-medium">
                  {n.title}{" "}
                  <span className="text-xs text-gray-400">· {n.when}</span>
                </div>
                <div className="text-sm text-gray-600">{n.body}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-lg p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h4 className="font-medium mb-2">Perfil</h4>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div>
                <div className="font-medium">Usuario Ejemplo</div>
                <div className="text-sm text-gray-500">Miembro desde 2023</div>
              </div>
            </div>
          </div>

          <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-lg p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h4 className="font-medium mb-2">Uso de almacenamiento</h4>
            <div className="h-3 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-3 bg-indigo-600 rounded"
                style={{ width: "42%" }}
              />
            </div>
            <div className="text-sm text-gray-500 mt-2">
              42% usado (4.2 GB de 10 GB)
            </div>
          </div>

          <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-lg p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h4 className="font-medium mb-2">Próximos eventos</h4>
            <ul className="text-sm text-gray-600">
              {events.map((ev) => (
                <li key={ev.id} className="mb-2">
                  <div className="font-medium">{ev.title}</div>
                  <div className="text-gray-500">{ev.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDashboardPage;
