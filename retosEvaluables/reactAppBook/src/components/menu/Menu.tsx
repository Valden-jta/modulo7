import MenuItem from "../sidebar/MenuItem";

function Menu() {
  return (
    <nav className="hidden md:hidden lg:flex justify-evenly w-100">
      <MenuItem title="Home"></MenuItem>
      <MenuItem title="Libros"></MenuItem>
      <MenuItem title="Login"></MenuItem>
    </nav>
  );
}

export default Menu;
