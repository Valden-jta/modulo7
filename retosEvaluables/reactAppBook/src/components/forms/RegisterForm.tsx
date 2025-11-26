import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import Input from "../ui/forms/Input";
import Select from "../ui/forms/Select";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { AiTwotoneEye } from "react-icons/ai";

type FormState = {
  userFullName: string;
  userNickName: string;
  userRole: string;
  regEmail: string;
  regPassword: string;
  repeatPassword: string;
};

export default function RegisterForm() {
  const [formValues, setFormValues] = useState<FormState>({
    userFullName: "",
    userNickName: "",
    userRole: "",
    regEmail: "",
    regPassword: "",
    repeatPassword: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isFormValid, setIsFormValid] = useState(false);

  const [visible, setVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
    return;
  }
    console.log("Register submit", {
      formValues
    });
    <Navigate to="/user" />;
  };

  return (
    <form 
    className="space-y-4 p-5"
    ref={formRef} 
    onInput={() => setIsFormValid(formRef.current?.checkValidity() ?? false)}
    onSubmit={handleSubmit}
    >
      <Input
        id="userFullName"
        name="userFullName"
        title="Nombre completo"
        type="text"
        label="Nombre completo"
        value={formValues.userFullName}
        onChange={handleChange}
        autoComplete="email"
        required
      />
      <Input
        id="userNickName"
        name="userNickName"
        title="Nombre de usuario"
        type="text"
        label="Nombre de usuario"
        value={formValues.userNickName}
        onChange={handleChange}
        autoComplete="email"
        required
      />
      <Select 
        name="userRole" 
        id="userRole"
        title="Elige el tipo de cuenta (lector, escritor, distribuidor)"
        label="Perfil de cuenta"
        value={formValues.userRole}
        onChange={handleChange} 
        required>
          <option value="">Selecciona un valor</option>
          <option value="lector">Lector</option>
          <option value="escritor">Escritor</option>
          <option value="editor">Editor</option>
          <option value="distribuidor">Distribuidor</option>
        </Select>
      <Input
        id="regEmail"
        name="regEmail"
        title="Email"
        type="email"
        label="Email"
        preIcon={<MdOutlineMailOutline />}
        value={formValues.regEmail}
        onChange={handleChange}
        autoComplete="email"
        required
      />
      <Input
        id="regPassword"
        name="regPassword"
        title="Contraseña"
        type={visible ? "text" : "password"}
        label="Contraseña"
        postIcon={
          <button type="button" onClick={() => setVisible(!visible)}>
            {!visible ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />}
          </button>
        }
        value={formValues.regPassword}
        onChange={handleChange}
        required
      />
      <Input
        id="repeatPassword"
        name="repeatPassword"
        title="Repite la contraseña"
        type={visible ? "text" : "password"}
        label="Repite la contraseña"
        postIcon={
          <button type="button" onClick={() => setVisible(!visible)}>
            {!visible ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />}
          </button>
        }
        value={formValues.repeatPassword}
        onChange={handleChange}
      />
      <div>
        <button
          type="submit"
          disabled={!isFormValid}
          aria-disabled={!isFormValid}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">
          Registrarse
        </button>
      </div>
    </form>
  );
}
