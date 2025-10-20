import Logo from "./Logo";
import Menu from "./Menu";

function Header() {

  return (
    <>
    <header className="sticky flex justify-between items-center">
            <Logo/>
            <Menu/> 
    </header>
    </>
  );
}

export default Header;
