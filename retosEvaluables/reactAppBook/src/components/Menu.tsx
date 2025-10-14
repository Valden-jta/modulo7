import React from "react";

function Menu() {
  const ulStyles: React.CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-evenly',
  };

  const liStyles: React.CSSProperties = {
    width: "100%",
    padding: "5% 10%",
  };

  return (
    <>
    
        <ul style={ulStyles}>
          <li>
            <a style={liStyles} href="">Home</a>
          </li>
          <li>
            <a style={liStyles} href="">Libros</a>
          </li>
          <li>
            <a style={liStyles} href="">Log in</a>
          </li>
        </ul>

    </>
  );
}

export default Menu;
