import { useState } from "react";
import type { Book } from "../../config/types";
import { books } from "../../config/data";
import BookList from "../../components/bookComponents/BookList";
import OffCanvasMobile from "../../components/ui/OffCanvasMobile";
import BookInfo from "../../components/bookComponents/BookInfo";

export default function UserMainPage() {
  // Mock de libros en lectura
  const reading: Book[] = [books[4], books[58], books[105]];
  const view = true;
  // Selección de un libro
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  // Control del off-canvas en móvil (separamos la visibilidad del selectedBook)
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  const OFFCANVAS_ANIMATION_MS = 500; // debe coincidir con OffCanvasMobile.animationDuration

  const onBookClick = (newBook: Book) => {
    setSelectedBook(newBook);
    setOffcanvasOpen(true);
  };

  // Cerrar con animación en móvil: ocultar offcanvas y limpiar selectedBook tras la animación
  // Cerrar inmediatamente (uso en desktop)
  const handleCloseImmediate = () => {
    setSelectedBook(null);
    setOffcanvasOpen(false);
  };

  // Mostrar BookInfo en movil
  const handleCloseAnimated = () => {
    setOffcanvasOpen(false);
    setTimeout(() => setSelectedBook(null), OFFCANVAS_ANIMATION_MS);
  };

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

      
        <h2 className="text-lg font-semibold my-4 text-dark-a0 dark:text-light-a0">
          Actividad
        </h2>
      <section>
        <div className="space-y-2 text-dark-a30 dark:text-light-a30">
          <div className="p-3 bg-light-surface-a5 dark:bg-dark-surface-a20 rounded">
            Has añadido 3 libros esta semana.
          </div>
          <div className="p-3 bg-light-surface-a5 dark:bg-dark-surface-a20 rounded">
            Tu colección "Verano" creció 4 elementos.
          </div>
        </div>
      </section>

        <h2 className="text-lg font-semibold my-4 text-dark-a0 dark:text-light-a0">
          Leyendo ahora
        </h2>
      <section className="mb-6 flex">
        <BookList BookList={reading} view={view} onBookClick={onBookClick} />
        {/* Info del 1 libro (desktop) */}
      <div className="hidden p-2 md:flex md:w-1/3 lg:w-1/4">
        <BookInfo
          selectedBook={selectedBook}
          onClose={handleCloseImmediate}></BookInfo>
      </div>
      {/* Off-canvas móvil: solo muestra/oculta el children */}
      <OffCanvasMobile
        isOpen={offcanvasOpen}
        onClose={handleCloseAnimated}
        position="right"
        animationDuration={OFFCANVAS_ANIMATION_MS}>
        <BookInfo
          selectedBook={selectedBook}
          onClose={handleCloseAnimated}></BookInfo>
      </OffCanvasMobile>
      </section>

    </div>
  );
}
