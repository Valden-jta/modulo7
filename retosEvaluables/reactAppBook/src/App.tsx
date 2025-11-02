import { useState, useEffect } from 'react';

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Aside from "./components/sidebar/Aside";
import BookPage from "./pages/BookPage";
import "./App.css";

function App() {
 const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Colapsar en pantallas menores a 1024px (tablets y móviles)
    return window.innerWidth < 1024;
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

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

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed]);

  return (
    <>
      <div className="min-h-screen flex dark:bg-surface-a0 dark:text-light-a0">
          <Aside CollapsedDefault={!sidebarCollapsed}/>
        
        {/* Contenido principal */}
        <div className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-10 md:ml-13 lg:ml-15' : 'ml-64'}`}>
          <Header 
           onToggleSidebar={toggleSidebar}
           sidebarCollapsed={sidebarCollapsed}/>
          <main className="flex-1 p-5 md:p-5 lg:p-5 dark:bg-dark-surface-a0">
            <BookPage />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
