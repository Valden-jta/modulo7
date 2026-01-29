import type { Book } from "../types/types";

// Esbozo de servicio para trabajar con la API my_books.
// Cuando tengas el backend listo, ajusta BASE_URL y las rutas.

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function fetchMyBooks(): Promise<Book[]> {
  const res = await fetch(`${BASE_URL}/my_books`);
  if (!res.ok) {
    throw new Error(`Error al cargar libros: ${res.status}`);
  }
  return res.json();
}

export async function deleteMyBook(bookId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/my_books/${bookId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Error al eliminar libro: ${res.status}`);
  }
}

// TODO: crear endpoint POST /my_books para añadir libros procedentes
// de Open Library. La idea sería construir un objeto Book a partir de
// (OpenLibraryDoc, OpenLibraryEdition, OpenLibraryWork) y enviarlo al
// backend:
//
// export async function createMyBookFromOpenLibrary(book: Book): Promise<void> {
//   const res = await fetch(`${BASE_URL}/my_books`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(book),
//   });
//
//   if (!res.ok) {
//     throw new Error(`Error al crear libro: ${res.status}`);
//   }
// }
