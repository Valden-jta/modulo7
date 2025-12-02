import { useState } from "react";
import { validateLoginRegister } from "./FormValidators";
import { useNavigate } from "react-router-dom";
import Input from "../ui/forms/Input";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { AiTwotoneEye } from "react-icons/ai";
import Button from "../ui/forms/button";

type FormState = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  // Estado Formulario
  const [formValues, setFormValues] = useState<FormState>({
    email: "",
    password: "",
  });
  // Estado errores
  const [errors, setErrors] = useState<FormErrors>({});
  // Estado onBlur (mostrar el error solo al dejar el foco del input la primera vez)
  const [touchedInput, setTouchedInput] = useState({
    email: false,
    password: false,
  });
  // Mostrar/ocultar contraseña
  const [visible, setVisible] = useState(false);
  // Habilitar/deshabilitar boton formulario
    const disabled = Object.values(errors).some(Boolean) || Object.values(formValues).some(v => String(v).trim() === '');
  // redireccion
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // cambios de valores
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // cambios de errores de validación cuando el usuario introduce datos
    const error = validateLoginRegister(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validacion antes de enviar datos. Se crea un objeto nuevo para no interferir con el del estado
    const newErrors: FormErrors = {};

    // Recorremos las claves de formValues (tipadas) y validamos cada campo
    (Object.keys(formValues) as Array<keyof FormState>).forEach((name) => {
      const value = formValues[name];
      const error = validateLoginRegister(name as string, value);
      if (error) {
        newErrors[name] = error;
      }
 
    });
    // Actualizamos el estado de errores una sola vez
    setErrors(newErrors);

    // Si no hay errores, procedemos
    if (Object.keys(newErrors).length === 0) {
      console.log("Login submit", {
        email: formValues.email,
        password: formValues.password,
      });
      navigate("/userPage");
    } else {
      console.log("error al enviar", newErrors);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5">
      <Input
        id="email"
        name="email"
        title="Email"
        type="email"
        label="Email"
        preIcon={<MdOutlineMailOutline />}
        value={formValues.email}
        onChange={handleChange}
        onBlur={() => setTouchedInput((prev) => ({ ...prev, email: true }))}
        autoComplete="email"
        error={errors.email}
        touched={touchedInput.email}
      />
      <Input
        id="password"
        name="password"
        title="Contraseña"
        type={visible ? "text" : "password"}
        label="Contraseña"
        postIcon={
          <button type="button" onClick={() => setVisible(!visible)}>
            {!visible ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />}
          </button>
        }
        value={formValues.password}
        onChange={handleChange}
        onBlur={() => setTouchedInput((prev) => ({ ...prev, password: true }))}
        autoComplete="current-password"
        minLength={8}
        error={errors.password}
        touched={touchedInput.password}
      />
      <div>
        <div className="flex justify-center items-center mt-10">
        <Button
          type="submit"
          text="Log in"
          size="lg"
          disabled={disabled}
          aria-disabled={disabled}
        />
        </div>
      </div>
    </form>
  );
}
