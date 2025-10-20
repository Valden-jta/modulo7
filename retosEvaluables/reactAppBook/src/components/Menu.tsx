function Menu() {
  const menuItemStyle = 
    "px-[5%] py-[2%] shadow-yellow-300/80 rounded-md transition duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-stone-900 hover:text-white hover:shadow-lg";

  return (
    <nav className="flex justify-evenly w-100">
      <a className={menuItemStyle} href="#">Home</a>
      <a className={menuItemStyle} href="#">Libros</a>
      <a className={menuItemStyle} href="#">Log in</a>
    </nav>
  );  
}

export default Menu;