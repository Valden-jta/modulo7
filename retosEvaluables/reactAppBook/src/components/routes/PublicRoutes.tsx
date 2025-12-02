import { Routes, Route, Navigate } from "react-router-dom";
import type { PublicUser } from "../../config/types";
import LandingPage from "../../pages/LandingPage";
import NotFound from "../../pages/NotFound";
import SignPage from "../../pages/userPages/SignPage";
import PrivateRoutes from "./PrivateRoutes";
// paginas privadas
import AddBook from "../../pages/books/AddBook";
import EditBook from "../../pages/books/EditBook";
import UserHome from "../../pages/userPages/UserHomePage";
import UserDashboard from "../../pages/userPages/UserDashboardPage";
import UserProfile from "../../pages/userPages/UserProfile";
import BooksPage from "../../pages/books/BooksPage";
import UserBook from "../../pages/books/UserBook";
import SearchBook from "../../pages/books/SearchBook";
import ImportBook from "../../pages/books/ImportBook";
import CollectionPage from "../../pages/collections/CollectionPage";
import AddCollection from "../../pages/collections/AddCollection";
import ManageCollection from "../../pages/collections/ManageCollection";
import FavoritesCollection from "../../pages/collections/FavoritesCollection";
import UserConfig from "../../pages/userPages/UserConfigPage";
import SocialFriends from "../../pages/social/SocialFriends";
import SocialGroups from "../../pages/social/SocialGroups";
import SocialForum from "../../pages/social/SocialForum";
import Social from "../../pages/social/Social";
import UserMainPage from "../../pages/userPages/UserMainPage";

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
        <Route path="/perfil" element={<UserProfile />} />
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
