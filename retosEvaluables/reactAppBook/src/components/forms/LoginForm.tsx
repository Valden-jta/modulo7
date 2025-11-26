import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Input from "../ui/forms/Input";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { AiTwotoneEye } from "react-icons/ai";

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
          />
          <div>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              aria-disabled={isSubmitDisabled}
              className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">
              Entrar
            </button>
          </div>
        </form>
  );
}
