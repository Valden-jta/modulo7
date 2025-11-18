import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import Login from "../pages/userPages/Login";
import PrivateRoutes from "./PrivateRoutes";
import type { User } from "../config/types";

// paginas privadas
import AddBook from "../pages/books/AddBook";
import EditBook from "../pages/books/EditBook";
import UserHome from "../pages/userPages/UserHome";
import UserDashboard from "../pages/userPages/UserDashboard";
import UserProfile from "../pages/userPages/UserProfile";
import BooksPage from "../pages/books/BooksPage";
import UserBook from "../pages/books/UserBook";
import SearchBook from "../pages/books/SearchBook";
import ImportBook from "../pages/books/ImportBook";
import CollectionPage from "../pages/collections/CollectionPage";
import AddCollection from "../pages/collections/AddCollection";
import ManageCollection from "../pages/collections/ManageCollection";
import FavoritesCollection from "../pages/collections/FavoritesCollection";
import UserConfig from "../pages/userPages/UserConfig";
import SocialFriends from "../pages/social/SocialFriends";
import SocialGroups from "../pages/social/SocialGroups";
import SocialForum from "../pages/social/SocialForum";
import Social from "../pages/social/Social";

type PublicRoutesProps = {
  user: User | null;
};

function PublicRoutes({ user }: PublicRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas privadas con redireccion */}
      <Route element={<PrivateRoutes user={user} />}>
        {/* Usuario */}
        <Route path="/user" element={<UserHome user={user} />} />
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
