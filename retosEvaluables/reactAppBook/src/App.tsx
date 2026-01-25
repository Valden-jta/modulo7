/**
 * Componente raíz de la SPA.
 *
 * Responsabilidades principales:
 * - Gestionar el **usuario actual** (de momento un usuario falso para pruebas).
 * - Controlar el **estado del sidebar** (colapsado/expandido) en función del tamaño de pantalla.
 * - Coordinar el **layout global**: `Aside` (navegación lateral), `Header`, contenido principal y `Footer`.
 * - Proveer el usuario a las rutas públicas/privadas para que decidan redirecciones.
 * - Resetear el tema a `light` cuando el usuario cierra sesión.
 */

import { useState, useEffect } from "react";
import { useTheme } from "./shared/hooks/useTheme";
import type { PublicUser } from "./features/user/types/types";
import "./App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Aside from "./layout/Aside";
import PublicRoutes from "./shared/routes/PublicRoutes";

function App() {
  // PARA PRUEBAS, USUARIO FALSO (inicializado una sola vez)
  const [fakeUser, setFakeUser] = useState<PublicUser | null>({
    firstName: "Olga",
    lastName: "Serrano",
    nickName: "Lectora Empedernida",
    userRole: "lector",
    email: "olga.serrano@gmail.com",
    thumb: "https://randomuser.me/api/portraits/women/50.jpg",
    signInDate: new Date(2025, 2, 4),
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Inicialmente colapsa el sidebar en pantallas menores a 1024px
    return window.innerWidth < 1024;
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Tema de la aplicación (no llamar hooks en handlers)
  const { setTheme } = useTheme();

  // Listener para cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      // Auto-colapsar en tablets y móviles
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
      // Auto-expandir en desktop (solo si estaba colapsado)
      else if (window.innerWidth >= 1024 && sidebarCollapsed) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarCollapsed]);

  return (
    <>
      <div className="min-h-screen flex dark:bg-surface-a0 dark:text-light-a0">
        {fakeUser && <Aside user={fakeUser} isCollapsed={sidebarCollapsed} />}
        {/* Contenido principal */}
        <div
          className={`flex flex-1 flex-col  ${fakeUser ? "w-100" : ""} ${
            fakeUser
              ? sidebarCollapsed
                ? "ml-10 md:ml-13 lg:ml-15"
                : "ml-64"
              : "ml-0"
          }`}>
          <Header
            onToggleSidebar={toggleSidebar}
            isCollapsed={sidebarCollapsed}
            user={fakeUser}
            onLogOut={() => {
              setFakeUser(null);
              setTheme("light");
            }}
          />
          <main className="flex-1 p-0 dark:bg-dark-surface-a0">
            <PublicRoutes user={fakeUser}></PublicRoutes>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
