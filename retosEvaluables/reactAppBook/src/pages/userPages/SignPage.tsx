import { useState } from "react";
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";

export default function SignPage() {
  const [type, setType] = useState<"Login" | "Regístrate">("Login");
  const handleOnClick = (text: "Login" | "Regístrate") => {
    if (text !== type) setType(text);
  };


  return (
    <section className="h-full flex flex-col items-center justify-center p-6">
      <div className="mb-6 text-center">
        <h2 className="text-5xl font-semibold uppercase">
          Date de alta / entra a tu cuenta
        </h2>
      </div>

      <div className="relative overflow-hidden w-1/2 max-w-full min-h-[550px] rounded-md shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] bg-white" id="container">
        {/* sign-in panel */}
        <div
          className={`absolute top-0 h-full left-0 w-1/2 transition-transform duration-600 ease-in-out ${
            type === "Login"
              ? "translate-x-0 opacity-100 z-[2]"
              : "translate-x-full opacity-0 z-[1] pointer-events-none"
          }`}>
          <LoginForm />
        </div>

        {/* sign-up panel */}
        <div
          className={`absolute top-0 h-full left-0 w-1/2 transition-all duration-600 ease-in-out ${
            type === "Regístrate"
              ? "translate-x-full opacity-100 z-[5]"
              : "translate-x-0 opacity-0 z-[1] pointer-events-none"
          }`}>
          <RegisterForm />
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
              <h2 className="text-5xl text-white">¡Bienvenido!</h2>
              <p className="text-white/90 mb-4">Crea una cuenta para empezar</p>

              <button
                className=" px-6 py-2 border border-white text-white bg-transparent rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                id="Login"
                onClick={() => handleOnClick("Regístrate")}>
                Log in
              </button>
            </div>

            <div
              className={`space-y-4 absolute flex flex-col px-10 top-0 right-[60%] h-full w-1/2 items-center justify-center text-center transition-transform duration-600 ease-in-out ${
                type === "Regístrate" ? "translate-x-[20%]" : "translate-x-0"
              }`}>
              <h2 className="text-5xl text-white">¡Hola de nuevo!</h2>
              <p className="text-white/90 mb-4">
                Introduce tus claves para acceder a tu área personal
              </p>
              <button
                className="px-6 py-2 border border-white text-white bg-transparent rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                id="Regístrate"
                onClick={() => handleOnClick("Login")}>
                Regístrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
