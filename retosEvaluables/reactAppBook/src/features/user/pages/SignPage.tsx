/**
 * SignPage
 *
 * Página de autenticación que combina login y registro en un mismo layout.
 *
 * Responsabilidades:
 * - Mostrar dos formularios principales:
 *   - `RegisterForm` para crear una cuenta nueva.
 *   - `LoginForm` para acceder con una cuenta existente.
 * - Gestionar el estado de modo (`type: "Login" | "Regístrate"`) para
 *   decidir qué panel está activo en cada momento.
 * - Aplicar las transiciones y efectos visuales del panel overlay:
 *   - Desplazamiento horizontal de paneles.
 *   - Animación "heartbeat" en los iconos de flecha al cambiar de modo.
 * - Mostrar botones de acceso rápido vía redes sociales (Facebook, Google, LinkedIn)
 *   como elementos visuales/placeholder para futuras integraciones OAuth.
 *
 * Notas:
 * - La lógica real de envío y validación está encapsulada en `LoginForm` y `RegisterForm`.
 * - La integración con un proveedor OAuth todavía no está implementada; los botones
 *   son puramente decorativos en esta versión.
 */
import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

export default function SignPage() {
  const [type, setType] = useState<"Login" | "Regístrate">("Login");
  const [beatRight, setBeatRight] = useState(false);
  const handleOnClick = (text: "Login" | "Regístrate") => {
    if (text !== type) setType(text);
  };

  return (
    <section className="h-full flex flex-col items-center justify-center p-6">
      <div
        className="mb-10 p-0
      3 text-center">
        <h2 className="text-5xl font-semibold uppercase">
          Date de alta / entra a tu cuenta
        </h2>
      </div>
      <div
        className="relative  overflow-hidden scroll-auto w-1/2 max-w-full min-h-[550px] rounded-md shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] bg-white"
        id="container">
        {/* sign-in panel */}
        <div
          className={`overflow-y-scroll custom-scrollbar p-10 absolute top-0 h-full left-0 w-1/2 transition-transform duration-600 ease-in-out ${
            type === "Login"
              ? "translate-x-0 opacity-100 z-[2]"
              : "translate-x-full opacity-0 z-[1] pointer-events-none"
          }`}>
          <div className="text-center flex flex-col gap-10 mb-3">
            <h2 className="text-center text-4xl font-bold uppercase">
              Crear cuenta
            </h2>
            <div className="flex items-center justify-center gap-5">
              <div className="p-3 border-1 border-light-surface-a70 rounded-full hover:text-dark-surface-a20 hover:bg-light-primary-a0 shadow hover:shadow-dark-surface-a10 transition-all duration-150 ease-in">
                <FaFacebookF />
              </div>
              <div className="p-3 border-1 border-light-surface-a70 rounded-full hover:text-dark-surface-a20 hover:bg-light-primary-a0 shadow hover:shadow-dark-surface-a10 transition-all duration-150 ease-in">
                <FaGoogle />
              </div>
              <div className="p-3 border-1 border-light-surface-a70 rounded-full hover:text-dark-surface-a20 hover:bg-light-primary-a0 shadow hover:shadow-dark-surface-a10 transition-all duration-150 ease-in">
                <FaLinkedinIn />
              </div>
            </div>
            <span className="text-center ">
              O crea una nueva cuenta en <strong>MyBooks</strong>.
            </span>
          </div>
          <RegisterForm />
        </div>

        {/* sign-up panel */}
        <div
          className={`absolute p-10 top-0 h-full left-0 w-1/2 transition-all duration-600 ease-in-out  ${
            type === "Regístrate"
              ? "translate-x-full opacity-100 z-[5]"
              : "translate-x-0 opacity-0 z-[1] pointer-events-none"
          }`}>
          <div className="text-center flex flex-col gap-10 mb-3">
            <h2 className="text-center text-4xl font-bold uppercase">Log in</h2>
            <div className="flex items-center justify-center gap-5">
              <div className="p-3 border-1 border-light-surface-a70 rounded-full hover:text-dark-surface-a20 hover:bg-light-primary-a0 shadow hover:shadow-dark-surface-a10 transition-all duration-150 ease-in">
                <FaFacebookF />
              </div>
              <div className="p-3 border-1 border-light-surface-a70 rounded-full hover:text-dark-surface-a20 hover:bg-light-primary-a0 shadow hover:shadow-dark-surface-a10 transition-all duration-150 ease-in">
                <FaGoogle />
              </div>
              <div className="p-3 border-1 border-light-surface-a70 rounded-full hover:text-dark-surface-a20 hover:bg-light-primary-a0 shadow hover:shadow-dark-surface-a10 transition-all duration-150 ease-in">
                <FaLinkedinIn />
              </div>
            </div>
            <span className="text-center ">
              O utiliza tu cuenta de <strong>MyBooks</strong> para entrar.
            </span>
          </div>
          <LoginForm />
        </div>

        {/* overlay */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-[100] transition-transform duration-600 ease-in-out ${
            type === "Regístrate" ? "-translate-x-full" : "translate-x-0"
          }`}>
          <div
            className={`relative left-[-100%] h-full w-[200%] bg-no-repeat bg-cover bg-left-top transition-transform duration-600 ease-in-out bg-gradient-to-r from-light-primary-a0 to-light-primary-a20 ${
              type === "Regístrate" ? "translate-x-[50%]" : "translate-x-0"
            }`}>
            <div
              className={`space-y-4 absolute flex flex-col px-10 top-0 left-[60%] h-full w-1/2 items-center justify-center text-center transition-transform duration-600 ease-in-out ${
                type === "Regístrate" ? "translate-x-0" : "-translate-x-[20%]"
              }`}>
              <h3 className="text-6xl text-dark-surface-a20">
                ¡Hola de nuevo!{" "}
                <span className="text-3xl">¿Ya tienes cuenta?</span>
              </h3>
              <p className="text-dark-surface-a20 mb-4">
                Introduce tus claves para acceder a tu área personal
              </p>
              <div className="group" data-beat={beatRight ? "true" : undefined}>
                <button
                  className="my-5 px-10 py-3 border border-dark-surface-a20  text-dark-surface-a20  bg-transparent rounded-md shadow hover:shadow-dark-surface-a10  hover:bg-dark-surface-a10 hover:text-light-a0 hover:border-light-a0 focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-150 transition-all duration-150 ease-in"
                  id="Login"
                  onClick={() => {
                    setBeatRight(true);
                    setTimeout(() => setBeatRight(false), 400);
                    handleOnClick("Regístrate");
                  }}>
                  Log in
                </button>
                <FaArrowRight className="text-3xl m-auto text-dark-surface-a20 group-data-[beat=true]:animate-heartbeat" />
              </div>
            </div>

            <div
              className={`space-y-4 absolute flex flex-col px-10 top-0 right-[60%] h-full w-1/2 items-center justify-center text-center transition-transform duration-600 ease-in-out ${
                type === "Regístrate" ? "translate-x-[20%]" : "translate-x-0"
              }`}>
              <h3 className="text-6xl text-dark-surface-a20">
                ¡Bienvenido!
                <br />
                <span className="text-3xl">¿Primera vez?</span>
              </h3>
              <p className="text-dark-surface-a20 mb-4">
                Crea una cuenta para empezar
              </p>
              <div className="group" data-beat={beatRight ? "true" : undefined}>
                <button
                  className="my-5 px-10 py-3 border border-dark-surface-a20  text-dark-surface-a20  bg-transparent rounded-md shadow hover:shadow-dark-surface-a10 hover:bg-dark-surface-a10 hover:text-light-a0 hover:border-light-a0 focus:outline-none focus:ring-2 focus:ring-light-a0/30 active:scale-150 transition-all duration-150 ease-in"
                  id="Regístrate"
                  onClick={() => {
                    setBeatRight(true);
                    setTimeout(() => setBeatRight(false), 400);
                    handleOnClick("Login");
                  }}>
                  Regístrate
                </button>
                <FaArrowLeft className="text-3xl m-auto text-dark-surface-a20 group-data-[beat=true]:animate-heartbeat" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
