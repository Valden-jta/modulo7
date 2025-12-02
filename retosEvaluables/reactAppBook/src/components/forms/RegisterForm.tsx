import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../config/types";
import { validateLoginRegister } from "./FormValidators";
import Input from "../ui/forms/Input";
import Select from "../ui/forms/Select";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { AiTwotoneEye } from "react-icons/ai";
import Button from "../ui/forms/button";
import Checkbox from "../ui/forms/CheckBox";

type FormState = Omit<User, "id_user"> & {
  repeatPassword: string;
  termsAccepted: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function RegisterForm() {
  // Estado Formulario
  const [formValues, setFormValues] = useState<FormState>({
    firstName: "",
    lastName: "",
    nickName: "",
    userRole: "",
    email: "",
    password: "",
    thumb: "",
    repeatPassword: "",
    termsAccepted: false,
  });
  // Estado errores
  const [errors, setErrors] = useState<FormErrors>({});

  // Estado onBlur (mostrar el error solo al dejar el foco del input la primera vez)
  const [touchedInput, setTouchedInput] = useState({
    firstName: false,
    lastName: false,
    nickName: false,
    userRole: false,
    email: false,
    password: false,
    thumb: false,
    repeatPassword: false,
    termsAccepted: false,
  });
  // Mostrar/ocultar contraseña
  const [visible, setVisible] = useState(false);
  // Habilitar/deshabilitar boton formulario
  // Solo consideramos campos requeridos para decidir si el formulario está completo
  const requiredFields: Array<keyof FormState> = [
    "firstName",
    "lastName",
    "nickName",
    "userRole",
    "email",
    "password",
    "repeatPassword",
  ];

  const hasEmptyRequired = requiredFields.some((k) => {
    const v = formValues[k];
    if (typeof v === "string") return v.trim() === "";
    // booleans (termsAccepted) are handled por separado
    return false;
  });

  const hasErrors = Object.values(errors).some(Boolean);

  const disabled =
    hasErrors || hasEmptyRequired || formValues.termsAccepted !== true;
  // redireccion
  const navigate = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type } = target;
    const isCheckbox = type === "checkbox";
    const actualValue: string | boolean = isCheckbox
      ? (target.checked as boolean)
      : target.value;
    const fieldName = name as keyof FormState;
    const nextValues = { ...formValues, [fieldName]: actualValue } as FormState;
    setFormValues(nextValues);
    const error = validateLoginRegister(name, actualValue, nextValues);
    const errKey = name as keyof FormErrors;
    setErrors((prev) => ({ ...prev, [errKey]: error ?? undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validacion antes de enviar datos. Se crea un objeto nuevo para no interferir con el del estado
    const newErrors: FormErrors = {};

    // Recorremos las claves de formValues (tipadas) y validamos cada campo
    (Object.keys(formValues) as Array<keyof FormState>).forEach((name) => {
      const value = formValues[name];
      const error = validateLoginRegister(name as string, value, formValues);
      if (error) {
        const key = name as keyof FormErrors;
        newErrors[key] = error;
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

      navigate("/perfil");
    } else {
      console.log("error al enviar", newErrors);
    }
  };

  return (
    <form className="space-y-6 p-5" onSubmit={handleSubmit}>
      <Input
        id="firstName"
        name="firstName"
        title="Nombre"
        type="text"
        label="Nombre*"
        value={formValues.firstName}
        onChange={handleChange}
        onBlur={() => setTouchedInput((prev) => ({ ...prev, firstName: true }))}
        autoComplete="email"
        error={errors.firstName}
        touched={touchedInput.firstName}
      />
      <Input
        id="lastName"
        name="lastName"
        title="Apellido"
        type="text"
        label="Apellido*"
        value={formValues.lastName}
        onChange={handleChange}
        onBlur={() => setTouchedInput((prev) => ({ ...prev, lastName: true }))}
        error={errors.lastName}
        touched={touchedInput.lastName}
      />
      <Input
        id="nickName"
        name="nickName"
        title="Nombre de ususario"
        type="text"
        label="Nombre de ususario*"
        value={formValues.nickName}
        onChange={handleChange}
        onBlur={() => setTouchedInput((prev) => ({ ...prev, nickName: true }))}
        error={errors.nickName}
        touched={touchedInput.nickName}
      />
      <Input
        id="thumb"
        name="thumb"
        title="Imagen de perfil"
        type="url"
        label="Imagen de perfil"
        value={formValues.thumb}
        onChange={handleChange}
        onBlur={() => setTouchedInput((prev) => ({ ...prev, thumb: true }))}
        error={errors.nickName}
        touched={touchedInput.nickName}
      />
      <Select
        name="userRole"
        id="userRole"
        title="Elige el tipo de cuenta (lector, escritor, distribuidor)"
        label="Perfil de cuenta*"
        value={formValues.userRole}
        onChange={handleChange}
        onBlur={() => setTouchedInput((prev) => ({ ...prev, userRole: true }))}
        error={errors.userRole}
        touched={touchedInput.userRole}>
        <option className="hover:bg-light-primary-a0" value="">
          Selecciona un valor
        </option>
        <option value="lector">Lector</option>
        <option value="escritor">Escritor</option>
        <option value="editor">Editor</option>
        <option value="distribuidor">Distribuidor</option>
      </Select>
      <hr />
      <Input
        id="emailRegister"
        name="email"
        title="Email"
        type="email"
        label="Email*"
        preIcon={<MdOutlineMailOutline />}
        value={formValues.email}
        onChange={handleChange}
        onBlur={() => setTouchedInput((prev) => ({ ...prev, email: true }))}
        autoComplete="email"
        error={errors.email}
        touched={touchedInput.email}
      />

      <Input
        className={errors.password && touchedInput.password ? "mb-10" : ""}
        id="passwordRegister"
        name="password"
        title="Contraseña"
        type={visible ? "text" : "password"}
        label="Contraseña*"
        postIcon={
          <button type="button" onClick={() => setVisible(!visible)}>
            {!visible ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />}
          </button>
        }
        value={formValues.password}
        onChange={handleChange}
        onBlur={() => setTouchedInput((prev) => ({ ...prev, password: true }))}
        error={errors.password}
        touched={touchedInput.password}
      />
      <Input
        id="repeatPassword"
        name="repeatPassword"
        title="Repite la contraseña"
        type={visible ? "text" : "password"}
        label="Repite la contraseña*"
        postIcon={
          <button type="button" onClick={() => setVisible(!visible)}>
            {!visible ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />}
          </button>
        }
        value={formValues.repeatPassword}
        onChange={handleChange}
        onBlur={() =>
          setTouchedInput((prev) => ({ ...prev, repeatPassword: true }))
        }
        error={errors.repeatPassword}
        touched={touchedInput.repeatPassword}
      />
      <Checkbox
        id="termsAccepted"
        name="termsAccepted"
        title="Términos y condiciones"
        description="Acepto los Términos y Condiciones"
        checked={formValues.termsAccepted}
        onChange={handleChange}
        onBlur={() =>
          setTouchedInput((prev) => ({ ...prev, termsAccepted: true }))
        }
        error={errors.termsAccepted}
        touched={touchedInput.termsAccepted}
      />
      <div className="flex justify-center items-center mt-10">
        <Button
          type="submit"
          text="Registrate"
          size="lg"
          disabled={disabled}
          aria-disabled={disabled}
        />
      </div>
    </form>
  );
}
