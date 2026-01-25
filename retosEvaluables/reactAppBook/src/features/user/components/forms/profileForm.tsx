/**
 * ProfileForm
 *
 * Formulario de edición de perfil del usuario.
 *
 * Responsabilidades:
 * - Mostrar y validar campos básicos del `PublicUser` (nombre, nick, email, avatar).
 * - Permitir cambiar la contraseña mediante los campos `password`, `newPassword`
 *   y `repeatPassword` (validación regex local por ahora).
 * - Exponer un callback `onSave` para que el padre (UserProfile) pueda
 *   actualizar su estado/UI con los nuevos datos.
 *
 * Notas:
 * - No realiza aún llamadas a backend; se apoya en `emailRegex` y `passwordRegex`
 *   como validación de frontend mientras se maqueta la vista.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { PublicUser } from "../../types/types";
import {
  emailRegex,
  passwordRegex,
} from "../../../../shared/utils/formValidators";
import Input from "../../../../shared/ui/forms/Input";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import Button from "../../../../shared/ui/forms/button";

type ProfileProps = {
  user: PublicUser | null;
  /** callback opcional que recibe los datos validados al guardar */
  onSave?: (data: Partial<Omit<PublicUser, "id_user">>) => void | Promise<void>;
};

type FormData = Omit<PublicUser, "id_user"> & {
  password: string;
  newPassword: string;
  repeatPassword: string;
};
export default function ProfileForm(props: ProfileProps) {
  const { user, onSave } = props;
  // Mostrar/ocultar contraseña
  const [visible, setVisible] = useState(false);
  const [visibleNP, setVisibleNP] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      touchedFields,
      isSubmitted,
      isSubmitting,
      isValidating,
      isValid,
      isDirty,
    },
  } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      nickName: user?.nickName ?? "",
      email: user?.email ?? "",
      thumb: user?.thumb ?? "",
      userRole: user?.userRole ?? "",
    },
  });
  // habilitar/deshabilitar botón
  const submitDisabled = isSubmitting || isValidating || !isValid || !isDirty;

  const onSubmit = async (data: FormData) => {
    console.log("ProfileForm submit:", data);
    // Llamada al callback del padre para que pueda actualizar la UI (tarjeta de resumen)
    if (onSave) {
      // Convertir a Partial<PublicUser> omitiendo id_user
      const payload: Partial<Omit<PublicUser, "id_user">> = {
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName,
        email: data.email,
        thumb: data.thumb,
      };
      await onSave(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("firstName")}
        ref={register("firstName").ref}
        placeholder={user?.firstName}
        error={errors?.firstName}
        touched={!!touchedFields?.firstName || isSubmitted}
      />
      <Input
        {...register("lastName")}
        ref={register("lastName").ref}
        placeholder={user?.lastName}
        error={errors?.lastName}
        touched={!!touchedFields?.lastName || isSubmitted}
      />
      {/* Implementar comprobación de nick con backend mas adelante */}
      <Input
        {...register("nickName")}
        ref={register("nickName").ref}
        placeholder={user?.nickName}
        error={errors?.nickName}
        touched={!!touchedFields?.nickName || isSubmitted}
      />
      <Input
        type="email"
        {...register("email", {
          pattern: {
            value: emailRegex,
            message: "El formato de email no es correcto",
          },
        })}
        ref={register("email").ref}
        placeholder={user?.email}
        error={errors?.email}
        touched={!!touchedFields?.email || isSubmitted}
      />
      <Input
        {...register("thumb")}
        placeholder="Ruta de la nueva imagen"
        error={errors?.thumb}
        touched={!!touchedFields?.thumb || isSubmitted}
      />
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-dark-a0 dark:text-light-a0">
          Cambiar la contraseña
        </h3>
        <p className="text-sm text-dark-surface-a40 dark:text-light-surface-a40">
          Modifica tu contraseña.
        </p>
      </div>
      {/* Implementar comprobación de contraseña con backend mas adelante */}
      <Input
        type={visible ? "text" : "password"}
        postIcon={
          <button type="button" onClick={() => setVisible(!visible)}>
            {!visible ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />}
          </button>
        }
        {...register("password", {
          pattern: {
            value: passwordRegex,
            message: "La contraseña es incorrecta",
          },
        })}
        ref={register("password").ref}
        placeholder="Introduce la contraseña antigua contraseña"
        error={errors?.password}
        touched={!!touchedFields?.password || isSubmitted}
      />
      <Input
        type={visibleNP ? "text" : "password"}
        postIcon={
          <button type="button" onClick={() => setVisibleNP(!visibleNP)}>
            {!visibleNP ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />}
          </button>
        }
        {...register("newPassword", {
          pattern: { value: passwordRegex, message: "" },
        })}
        ref={register("newPassword").ref}
        placeholder="Introduce una nueva contraseña"
        error={errors?.newPassword}
        touched={!!touchedFields?.newPassword || isSubmitted}
      />
      <Input
        type={visibleNP ? "text" : "password"}
        postIcon={
          <button type="button" onClick={() => setVisibleNP(!visibleNP)}>
            {!visibleNP ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />}
          </button>
        }
        {...register("repeatPassword", {
          pattern: { value: passwordRegex, message: "" },
        })}
        ref={register("repeatPassword").ref}
        placeholder="Repite la nueva contraseña"
        error={errors?.repeatPassword}
        touched={!!touchedFields?.repeatPassword || isSubmitted}
      />
      <div className="mb-6 flex justify-end">
        <Button
          text="Guardar Cambios"
          type="submit"
          size="lg"
          disabled={submitDisabled}
          aria-disabled={submitDisabled}
        />
      </div>
    </form>
  );
}
