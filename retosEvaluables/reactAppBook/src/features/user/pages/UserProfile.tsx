/**
 * UserProfile
 *
 * Página de perfil de usuario.
 *
 * Responsabilidades:
 * - Mostrar un resumen del usuario (avatar, nombre, nick, email, rol, fecha de alta).
 * - Renderizar el formulario `ProfileForm` para editar datos básicos (nombre, email, avatar...).
 * - Ofrecer un formulario adicional para **solicitar cambio de rol** al administrador
 *   (selector de nuevo rol + texto de justificación).
 *
 * Notas:
 * - Toda la lógica de validación/guardado del formulario principal está en `ProfileForm`.
 * - La solicitud de cambio de rol es, por ahora, una simulación con `console.log`.
 */
import { useState } from "react";
import type { PublicUser } from "../types/types";
import ProfileForm from "../components/forms/profileForm";
import Select from "../../../shared/ui/Select";

type ProfileProps = {
  user: PublicUser | null;
};
function UserProfile(props: ProfileProps) {
  const { user } = props;
  const [renderUser, setRenderUser] = useState(user);

  const date = (date: Date) => {
    const month = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return `${date.getDate()} de ${
      month[date.getMonth()]
    } de ${date.getFullYear()}`;
  };

  // Cambio de perfil de cuenta
  const [newRole, setNewRole] = useState<string>("");
  const [requestText, setRequestText] = useState("");
  const [sent, setSent] = useState(false);

  const roleList = ["lector", "escritor", "editor", "distribuidor"];
  // Excluir el rol actual del usuario para que no pueda seleccionarlo
  const roleOptions = roleList
    .filter((r) => r !== user?.userRole)
    .map((r) => ({ value: r, label: r[0].toUpperCase() + r.slice(1) }));

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Solicitud enviada a admin:", requestText);
    setSent(true);
    setNewRole(newRole);
    setRequestText("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-dark-a0 dark:text-light-a0">
            Mi perfil
          </h1>
          <p className="text-sm text-dark-surface-a40 dark:text-light-surface-a40 mt-1">
            Actualiza tus datos personales y solicita cambios de rol al
            administrador si lo necesitas.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda: resumen / tarjeta de usuario */}
          <aside className="lg:col-span-1 bg-light-surface-a5 dark:bg-dark-surface-a20 p-4 rounded-md shadow-sm">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-24 w-24 rounded-full bg-light-surface-a30 dark:bg-dark-surface-a40 flex items-center justify-center overflow-hidden">
                {/* placeholder imagen */}
                <span className="text-xl text-dark-surface-a30 dark:text-light-surface-a30">
                  <img src={renderUser?.thumb} alt="Imagen de usuario" />
                </span>
              </div>
              <div>
                <h2 className="font-medium text-lg text-dark-a0 dark:text-light-a0">
                  {renderUser?.firstName} {renderUser?.lastName}
                </h2>
                <p className="text-sm text-dark-surface-a40 dark:text-light-surface-a40">
                  @{renderUser?.nickName}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-medium mb-2 text-dark-a0 dark:text-light-a0">
                Resumen
              </h3>
              <ul className="text-sm text-dark-surface-a40 dark:text-light-surface-a40 space-y-2">
                <li>
                  Tipo de cuenta:{" "}
                  <strong className="capitalize">{renderUser?.userRole}</strong>
                </li>
                <li>Email: {renderUser?.email}</li>
                <li>
                  Miembro desde:{" "}
                  {renderUser ? date(renderUser.signInDate) : "-"}
                </li>
              </ul>
            </div>
          </aside>

          {/* Columna principal: formulario de perfil */}
          <main className="lg:col-span-2 bg-white dark:bg-dark-surface-a0 p-6 rounded-md shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-dark-a0 dark:text-light-a0">
                Editar información
              </h2>
              <p className="text-sm text-dark-surface-a40 dark:text-light-surface-a40">
                Modifica tus datos personales aquí.
              </p>
            </div>

            <ProfileForm
              user={user}
              onSave={(data) => {
                // Actualizar la vista con los nuevos valores del formulario
                setRenderUser(
                  (prev) =>
                    ({
                      ...(prev ?? {}),
                      ...data,
                    }) as PublicUser,
                );
              }}
            />

            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold text-dark-a0 dark:text-light-a0">
                Solicitar cambio de perfil al administrador
              </h3>
              <p className="text-sm text-dark-surface-a40 dark:text-light-surface-a40 mt-1">
                Si necesitas que tu rol sea revisado (ej. actualizar a editor),
                escribe una breve justificación y enviaremos la solicitud al
                administrador.
              </p>

              <form
                className="mt-4 flex flex-col gap-2"
                onSubmit={handleRequestSubmit}>
                <label htmlFor="newRole" className="sr-only">
                  Nuevo rol
                </label>
                <Select
                  value={newRole}
                  onChange={(v) => setNewRole(v)}
                  options={roleOptions}
                  placeholder="Selecciona un rol"
                />
                <label htmlFor="adminRequest" className="sr-only">
                  Motivo de la solicitud
                </label>
                <textarea
                  id="adminRequest"
                  className="w-full min-h-[100px] p-3 border border-light-surface-a30 dark:border-dark-surface-a70 rounded-md bg-light-surface-a0 dark:bg-dark-surface-a20 text-dark-a0 dark:text-light-a0 focus:outline-none focus:ring-2 focus:ring-light-primary-a10"
                  placeholder="Explica brevemente por qué solicitas el cambio de perfil..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                />
                <div className="flex items-center gap-3 mt-3">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-light-primary-a20 text-white hover:bg-light-primary-a30 disabled:opacity-50"
                    disabled={!requestText.trim()}>
                    Enviar solicitud
                  </button>
                  {sent && (
                    <span className="text-sm text-success-600">
                      Solicitud enviada
                    </span>
                  )}
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
