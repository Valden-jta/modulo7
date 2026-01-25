import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

/**
 * Punto de entrada de la aplicación React.
 *
 * - Monta el árbol de React en el elemento raíz del `index.html`.
 * - Envuelve la aplicación con `BrowserRouter` para habilitar el enrutado
 *   basado en historial de HTML5.
 * - Carga los estilos globales desde `index.css`.
 */
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
