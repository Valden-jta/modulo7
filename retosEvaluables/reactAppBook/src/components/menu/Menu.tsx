import type { User } from "../../config/types";
import MenuItem from "./MenuItem";

type MenuProps = {
  user: User | null;
};

function Menu(props: MenuProps) {
  const { user } = props;
  return (
    <nav
    className={` ${
      user ? "hidden" : "hidden md:hidden lg:flex gap-5 ml-auto pr-10"
    }`}>
      <MenuItem title="Login" path="login"></MenuItem>
    </nav>
  );
}

export default Menu;
