/**
 * Hook `useTheme`
*
* Gestiona el tema visual de la aplicación (`light` | `dark`).
*
* Comportamiento:
* - Al inicializarse, intenta leer el valor guardado en `localStorage` bajo la clave `theme`.
* - Si no hay valor guardado, utiliza la preferencia del sistema operativo (`prefers-color-scheme`).
* - Cada vez que cambia el tema:
*   - Actualiza la clase del elemento raíz del documento (`<html>`) con el nombre del tema.
*   - Persiste el valor en `localStorage` para que se recuerde entre sesiones.
*
* Devuelve:
* - `theme`: tema actual.
* - `setTheme`: setter para cambiar el tema desde los componentes.
*/

import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Leer tema guardado o usar preferencia del sistema
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    // Aplicar tema al documento
    document.documentElement.className = theme;

    // Guardar en localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
