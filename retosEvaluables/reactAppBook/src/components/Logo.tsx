import React from "react";

function Logo() {
  const styles: React.CSSProperties = {
    height: "40%",
    width: "40%",
    objectFit: "cover",
    backgroundColor: "var(--white)",
  };

  return (
    <>
    <div>
      <a href="#">
        <img style={styles} src="/img/myBooks_logo.png" alt="" />
      </a>
    </div>
    </>
  );
}

export default Logo;
