import { useState, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import type { PublicUser } from "./config/types";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Aside from "./components/layout/Aside";
import PublicRoutes from "./components/routes/PublicRoutes";

// PARA PRUEBAS, USUARIO FALSO (inicializado una sola vez)

function App() {
  // PARA PRUEBAS, USUARIO FALSO (inicializado una sola vez)
  const [fakeUser, setFakeUser] = useState<PublicUser | null>({
    firstName: "Olga",
    lastName: "Serrano",
    nickName: "Lectora Empedernida",
    userRole: "Lectora",
    email: "olga.serrano@gmail.com",
    thumb: "https://randomuser.me/api/portraits/women/50.jpg",
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Colapsar en pantallas menores a 1024px (tablets y móviles)
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
      // Auto-expandir en desktop (opcional)
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
