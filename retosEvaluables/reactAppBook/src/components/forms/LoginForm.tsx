import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Input from "../ui/forms/Input";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { AiTwotoneEye } from "react-icons/ai";
import Button from "../ui/forms/button";

type FormState = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [formValues, setFormValues] = useState<FormState>({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const isSubmitDisabled =
    formValues.email === "" || formValues.password === "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // e.target.checkValidity();
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submit", {
      email: formValues.email,
      password: formValues.password,
    });
    <Navigate to="/user" />;
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
            autoComplete="email"
            error="Email incorrecto"
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
            autoComplete="current-password"
            minLength={8}
            error="contraseña incorrecta"
          />
          <div>
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              aria-disabled={isSubmitDisabled}
            >
              Entrar
            </Button>
          </div>
        </form>
  );
}
