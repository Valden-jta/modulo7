import { Routes, Route, Navigate } from "react-router-dom";
import type { PublicUser } from "../../config/types";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import SignPage from "../../features/user/pages/SignPage";
import PrivateRoutes from "./PrivateRoutes";
// paginas privadas
import AddBook from "../../features/books/pages/AddBookPage";
import EditBook from "../../features/books/pages/EditBook";
import UserHome from "../../features/user/pages/UserHomePage";
import UserDashboard from "../../features/user/pages/UserDashboardPage";
import UserProfile from "../../features/user/pages/UserProfile";
import BooksPage from "../../features/books/pages/BooksPage";
import UserBook from "../../features/books/pages/UserBookPage";
import SearchBook from "../../features/books/pages/SearchBook";
import ImportBook from "../../features/books/pages/ImportBook";
import CollectionPage from "../../features/collections/pages/CollectionPage";
import AddCollection from "../../features/collections/pages/AddCollection";
import ManageCollection from "../../features/collections/pages/ManageCollection";
import FavoritesCollection from "../../features/collections/pages/FavoritesCollection";
import UserConfig from "../../features/user/pages/UserConfigPage";
import SocialFriends from "../../features/social/pages/SocialFriends";
import SocialGroups from "../../features/social/pages/SocialGroups";
import SocialForum from "../../features/social/pages/SocialForum";
import Social from "../../features/social/pages/Social";
import UserMainPage from "../../features/user/pages/UserMainPage";

type PublicRoutesProps = {
  user: PublicUser | null;
};

function PublicRoutes({ user }: PublicRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/user" replace /> : <LandingPage />}
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/user" replace /> : <SignPage />}
      />

      {/* Rutas privadas con redireccion */}
      <Route element={<PrivateRoutes user={user} />}>
        {/* Usuario */}
        <Route path="/user" element={<UserHome user={user} />} />
        <Route path="/userPage" element={<UserMainPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/perfil" element={<UserProfile user={user} />} />
        <Route path="/configuracion" element={<UserConfig />} />
        {/* Social  */}
        <Route path="/social" element={<Social />} />
        <Route path="/social/amigos" element={<SocialFriends />} />
        <Route path="/social/grupos" element={<SocialGroups />} />
        <Route path="/social/foro" element={<SocialForum />} />
        {/* Libros */}
        <Route path="/libros" element={<BooksPage />} />
        <Route path="/libros/mis_libros" element={<UserBook />} />
        <Route path="/libros/añadir" element={<AddBook />} />
        <Route path="/libros/editar" element={<EditBook />} />
        <Route path="/libros/importar" element={<ImportBook />} />
        <Route path="/libros/buscar" element={<SearchBook />} />
        <Route path="/libros/listas" element={<CollectionPage />} />
        <Route
          path="/libros/listas/favoritos"
          element={<FavoritesCollection />}
        />
        <Route path="/libros/listas/añadir" element={<AddCollection />} />
        <Route path="/libros/listas/gestion" element={<ManageCollection />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default PublicRoutes;
