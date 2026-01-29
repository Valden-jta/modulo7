import { useState } from "react";
import type { Book } from "../types/types";
import BookInfo from "../components/BookInfo";
import BookForm from "../components/forms/BookForm";

function AddBookPage() {
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = async (
    data: Partial<Omit<Book, "id_user" | "id_book" | "rating">>,
  ) => {
    // Crear objeto temporal para previsualizar
    const newBook: Book = {
      // campos mínimos usados por BookInfo y la UI
      id_book: Date.now(),
      id_user: 0,
      title: data.title ?? "Título sin definir",
      author: data.author ?? "Autor desconocido",
      type: data.type ?? "",
      price: Number(data.price) || 0,
      image: data.image ?? "/images/placeholder-book.jpg",
      genre: data.genre ?? "",
      pages: Number(data.pages) || 0,
      year: Number(data.year) || new Date().getFullYear(),
      sinopsis: data.sinopsis ?? "",
      rating: 0,
    } as unknown as Book;

    setPreviewBook(newBook);
    setSaved(true);
    // feedback temporal
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <section className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-dark-a0 dark:text-light-a0">
            Añadir libro
          </h1>
          <p className="text-sm text-dark-surface-a40 dark:text-light-surface-a40 mt-1">
            Rellena los datos del libro y comprueba la previsualización a la
            izquierda antes de guardar.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda: previsualización / tarjeta del libro */}
          <aside className="lg:col-span-1 bg-light-surface-a5 dark:bg-dark-surface-a20 p-4 rounded-md shadow-sm">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-full">
                <BookInfo selectedBook={previewBook} />
              </div>
              {saved && (
                <div className="mt-3 text-sm text-success-600">
                  Libro guardado (vista local)
                </div>
              )}
            </div>
          </aside>

          {/* Columna principal: formulario de libro */}
          <main className="lg:col-span-2 bg-white dark:bg-dark-surface-a0 p-6 rounded-md shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-dark-a0 dark:text-light-a0">
                Datos del libro
              </h2>
              <p className="text-sm text-dark-surface-a40 dark:text-light-surface-a40">
                Rellena los campos para añadir un nuevo libro.
              </p>
            </div>

            <BookForm onSave={handleSave} />
          </main>
        </div>
      </div>
    </section>
  );
}

export default AddBookPage;
