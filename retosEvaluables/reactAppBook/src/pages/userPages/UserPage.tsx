import { Link } from "react-router-dom";

type Book = {
  id: number;
  title: string;
  author: string;
  cover?: string;
  progress: number; // 0-100
  pages?: number;
};

function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex gap-4 p-4 bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-lg border border-light-surface-a30 dark:border-dark-surface-a70">
      <div className="w-20 h-28 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-dark-a30 dark:text-light-a30">
            Cover
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-dark-a0 dark:text-light-a0">
              {book.title}
            </h3>
            <p className="text-sm text-dark-a30 dark:text-light-a30">
              {book.author}
            </p>
          </div>
          <div className="text-sm text-dark-a30 dark:text-light-a30">
            {book.progress}%
          </div>
        </div>

        <div className="mt-3">
          <div className="w-full bg-light-surface-a10 dark:bg-dark-surface-a10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-light-primary-a20 h-2 rounded-full"
              style={{ width: `${book.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Link
            to={`/libros/${book.id}`}
            className="text-sm px-3 py-1 rounded-md bg-light-surface-a30 dark:bg-dark-surface-a30">
            Ver
          </Link>
          <button className="text-sm px-3 py-1 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70">
            Seguir leyendo
          </button>
          <button className="text-sm px-3 py-1 rounded-md border border-light-surface-a30 dark:border-dark-surface-a70">
            Marcar como leído
          </button>
        </div>
      </div>
    </article>
  );
}

export default function UserPage() {
  // Mock de libros en lectura
  const reading: Book[] = [
    {
      id: 1,
      title: "El metricor",
      author: "A. Autor",
      progress: 42,
      pages: 320,
      cover: undefined,
    },
    {
      id: 2,
      title: "Aprende TypeScript",
      author: "J. Dev",
      progress: 18,
      pages: 220,
      cover: undefined,
    },
    {
      id: 3,
      title: "Patrones en JS",
      author: "M. Coder",
      progress: 73,
      pages: 410,
      cover: undefined,
    },
  ];

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-dark-a0 dark:text-light-a0">
          Tu muro
        </h1>
        <p className="text-sm text-dark-a30 dark:text-light-a30">
          Novedades y los libros que estás leyendo ahora mismo.
        </p>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-dark-a0 dark:text-light-a0">
          Leyendo ahora
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {reading.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4 text-dark-a0 dark:text-light-a0">
          Actividad
        </h2>
        <div className="space-y-2 text-dark-a30 dark:text-light-a30">
          <div className="p-3 bg-light-surface-a5 dark:bg-dark-surface-a20 rounded">
            Has añadido 3 libros esta semana.
          </div>
          <div className="p-3 bg-light-surface-a5 dark:bg-dark-surface-a20 rounded">
            Tu colección "Verano" creció 4 elementos.
          </div>
        </div>
      </section>
    </div>
  );
}
