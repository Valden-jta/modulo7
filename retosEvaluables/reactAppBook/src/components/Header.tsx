import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";

function Header() {
  const styles: React.CSSProperties = {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: 'stretch',
    boxShadow: "0px 12px 20px 0px rgba(0, 0, 0, 0.1)"
  };

  return (
    <>
        <nav style={styles}>
            <Logo></Logo>
            <Menu></Menu> 
        </nav>

    </>
  );
}

export default Header;
