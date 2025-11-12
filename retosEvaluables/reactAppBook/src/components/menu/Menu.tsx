import MenuItem from "./MenuItem";

type MenuProps = {
  user: boolean;
};

function Menu(props: MenuProps) {
  const { user } = props;
  return (
    <nav
      className={` ${
        user ? "hidden" : "hidden md:hidden lg:flex justify-evenly w-100"
      }`}>
      <MenuItem title="Home"></MenuItem>
      <MenuItem title="Libros"></MenuItem>
      <MenuItem title="Login"></MenuItem>
    </nav>
  );
}

export default Menu;
