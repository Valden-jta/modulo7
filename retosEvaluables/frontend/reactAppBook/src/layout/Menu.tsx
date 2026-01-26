import type { PublicUser } from "../config/types";
import MenuItem from "../shared/ui/navigation/MenuItem";

type MenuProps = {
  user: PublicUser | null;
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
