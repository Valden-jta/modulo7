import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

/**
 * Footer
 *
 * Pie de página simple que muestra iconos de redes sociales.
 * Actualmente los enlaces son de demostración (`href="#"`),
 * pero se podrían sustituir por URLs reales del proyecto o del autor.
 */
function Footer() {
  const iconStyle = "w-8 h-8 transition duration-300 hover:scale-110";

  return (
    <>
      <footer className="flex min-h-25 justify-center items-center z-30  bg-stone-800 text-gray-200">
        <span className="p-5">
          <a href="#">
            <FaInstagramSquare className={iconStyle} />
          </a>
        </span>
        <span className="p-5">
          <a href="#">
            <FaFacebook className={iconStyle} />
          </a>
        </span>
        <span className="p-5">
          <a href="#">
            <FaGithub className={iconStyle} />
          </a>
        </span>
        <span className="p-5">
          <a href="#">
            <FaXTwitter className={iconStyle} />
          </a>
        </span>
      </footer>
    </>
  );
}

export default Footer;
