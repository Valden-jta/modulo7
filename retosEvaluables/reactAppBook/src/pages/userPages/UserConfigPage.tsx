import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "../../components/ui/forms/Select";
import Button from "../../components/ui/forms/button";

type AccountState = {
  fullName: string;
  userName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type AppSettings = {
  language: string;
  searchSuggestions: "on" | "off";
  showPreviews: boolean;
  emailNotifications: boolean;
};

export default function UserConfigPage() {
  const [account] = useState<AccountState>({
    fullName: "",
    userName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [appSettings, setAppSettings] = useState<AppSettings>({
    language: "es",
    searchSuggestions: "on",
    showPreviews: true,
    emailNotifications: true,
  });

  const [savingApp, setSavingApp] = useState(false);
  // Security
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [sessions] = useState([
    {
      id: "s1",
      device: "Chrome — Windows",
      ip: "192.0.2.1",
      when: "hace 2 horas",
    },
    { id: "s2", device: "Safari — iPhone", ip: "203.0.113.5", when: "ayer" },
  ]);

  // Integrations / Developer
  const [integrations, setIntegrations] = useState([
    { id: "g1", name: "Google", connected: false },
    { id: "gh", name: "GitHub", connected: true },
  ]);

  // Notifications & Preferences
  const [notifications, setNotifications] = useState({
    emailMessages: true,
    emailMentions: true,
    pushActivity: false,
  });

  const [preferences, setPreferences] = useState({
    theme: "system",
    timezone: "UTC",
  });

  const [featureFlags, setFeatureFlags] = useState({
    beta: false,
    newUI: false,
  });

  function handleAppChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setAppSettings((prev) => ({ ...prev, [name]: checked } as AppSettings));
    } else {
      // cast para las opciones
      setAppSettings((prev) => ({ ...prev, [name]: value } as AppSettings));
    }
  }

  function toggle2FA() {
    // placeholder: abrir modal QR, etc.
    setTwoFAEnabled((v) => !v);
  }

  function revokeSession(id: string) {
    // placeholder: llamada API para revocar
    console.log("Revocar sesión", id);
  }

  function handleNotificationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  }

  function handlePreferenceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  }

  function toggleIntegration(id: string) {
    setIntegrations((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, connected: !it.connected } : it
      )
    );
  }

  async function handleSaveApp(e?: React.FormEvent) {
    e?.preventDefault();
    setSavingApp(true);
    // placeholder: persistencia de preferencias
    await new Promise((r) => setTimeout(r, 500));
    console.log("Guardar app settings:", appSettings);
    setSavingApp(false);
  }

  return (
    <section className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Ajustes de usuario</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: summary + forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resumen rápido de la cuenta (UI-only) */}
          <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-6 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h2 className="text-xl font-medium mb-2">Resumen de cuenta</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Información general de tu cuenta (solo vista).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  Nombre
                </div>
                <div className="font-medium text-lg">
                  {account.fullName || "Usuario Ejemplo"}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  @{account.userName || "usuario_ej"}
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  Plan: <strong>Gratis</strong>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Última actividad: hace 3 días
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="text-sm text-gray-500">Rol</div>
                <div className="font-medium">Usuario</div>
                <div className="mt-4">
                  <Link
                    to="/perfil"
                    className="inline-block px-3 py-2 rounded bg-light-primary-a20 text-white text-sm dark:bg-dark-primary-a20 dark:text-dark-surface-a0">
                    Editar perfil
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSaveApp}
            className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-6 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h2 className="text-xl font-medium mb-4">
              Configuración de la aplicación
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Idioma</label>
                <Select
                  name="language"
                  value={appSettings.language}
                  onChange={handleAppChange}
                  id="language">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Sugerencias de búsqueda
                </label>
                <Select
                  name="searchSuggestions"
                  value={appSettings.searchSuggestions}
                  onChange={handleAppChange}
                  id="searchSuggestions">
                  <option value="on">Activadas</option>
                  <option value="off">Desactivadas</option>
                </Select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  id="showPreviews"
                  name="showPreviews"
                  type="checkbox"
                  checked={appSettings.showPreviews}
                  onChange={handleAppChange}
                  className="h-4 w-4"
                  style={{ accentColor: "var(--color-light-primary-a20)" }}
                />
                <label htmlFor="showPreviews" className="text-sm">
                  Mostrar vistas previas en listados
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  id="emailNotifications"
                  name="emailNotifications"
                  type="checkbox"
                  checked={appSettings.emailNotifications}
                  onChange={handleAppChange}
                  className="h-4 w-4"
                  style={{ accentColor: "var(--color-light-primary-a20)" }}
                />
                <label htmlFor="emailNotifications" className="text-sm">
                  Notificaciones por email
                </label>
              </div>
            </div>

            {/* Secciones adicionales dentro de Configuración de la aplicación */}
            <div className="mt-6 space-y-4">
              <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
                <h3 className="text-lg font-medium">Privacidad</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Opciones de visibilidad y datos personales.
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Visibilidad del perfil</p>
                      <p className="text-gray-500">
                        Controla quién puede ver tu perfil y actividad.
                      </p>
                    </div>
                    <Select
                      id="profileVisibility"
                      name="profileVisibility"
                      value={"public"}
                      onChange={() => {}}>
                      <option value="public">Público</option>
                      <option value="private">Privado</option>
                      <option value="friends">Solo contactos</option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
                <h3 className="text-lg font-medium">Notificaciones</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Elige cómo quieres recibir notificaciones.
                </p>
                <div className="mt-3 space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Mensajes (email)</span>
                    <input
                      name="emailMessages"
                      type="checkbox"
                      checked={notifications.emailMessages}
                      onChange={handleNotificationChange}
                      className="h-4 w-4"
                      style={{ accentColor: "var(--color-light-primary-a20)" }}
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Menciones (email)</span>
                    <input
                      name="emailMentions"
                      type="checkbox"
                      checked={notifications.emailMentions}
                      onChange={handleNotificationChange}
                      className="h-4 w-4"
                      style={{ accentColor: "var(--color-light-primary-a20)" }}
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Actividad (push)</span>
                    <input
                      name="pushActivity"
                      type="checkbox"
                      checked={notifications.pushActivity}
                      onChange={handleNotificationChange}
                      className="h-4 w-4"
                      style={{ accentColor: "var(--color-light-primary-a20)" }}
                    />
                  </label>
                </div>
              </div>

              <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
                <h3 className="text-lg font-medium">Preferencias</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Tema, zona horaria y formato.
                </p>
                <div className="mt-3 space-y-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Tema
                    </label>
                    <Select
                      id="themePref"
                      name="theme"
                      value={preferences.theme}
                      onChange={handlePreferenceChange}>
                      <option value="system">Sistema</option>
                      <option value="light">Claro</option>
                      <option value="dark">Oscuro</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Zona horaria
                    </label>
                    <Select
                      id="tzPref"
                      name="timezone"
                      value={preferences.timezone}
                      onChange={handlePreferenceChange}>
                      <option value="UTC">UTC</option>
                      <option value="Europe/Madrid">Europe/Madrid</option>
                      <option value="America/New_York">America/New_York</option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
                <h3 className="text-lg font-medium">Facturación</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Plan actual, métodos de pago y facturas (placeholder).
                </p>
                <div className="mt-3">
                  <div className="text-sm">
                    Plan: <strong>Gratis</strong>
                  </div>
                  <div className="mt-2">
                    <button className="px-3 py-1 rounded bg-gray-100 text-sm">
                      Ver facturas
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button
                type="submit"
                size="md"
                text={savingApp ? "Guardando..." : "Guardar preferencias"}
              />
              <Button type="button" text="Restablecer" size="sm" />
            </div>
          </form>

          {/* Soporte - al final del panel principal */}
          <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-6 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h3 className="text-lg font-medium mb-2">Soporte y ayuda</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Necesitas ayuda? Consulta la FAQ o envía un mensaje al equipo de
              soporte.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                to="/faq"
                className="px-3 py-2 rounded border border-light-surface-a30 dark:border-dark-surface-a70 text-sm">
                FAQ
              </Link>
              <Link
                to="/soporte"
                className="px-3 py-2 rounded bg-light-primary-a20 text-white text-sm dark:bg-dark-primary-a20 dark:text-dark-surface-a0">
                Contactar soporte
              </Link>
            </div>
          </div>
        </div>

        {/* Right column: settings overview (UI only) */}
        <aside className="space-y-6">
          <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h3 className="text-lg font-medium">Seguridad</h3>
            <p className="text-sm text-gray-600 mt-2">
              Autenticación y sesiones activas.
            </p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autenticación de dos factores</p>
                  <p className="text-sm text-gray-500">
                    Protege tu cuenta con 2FA (QR / app de autenticación).
                  </p>
                </div>
                <div>
                  <button
                    onClick={toggle2FA}
                    className="px-3 py-1 rounded bg-light-primary-a20 text-white text-sm dark:bg-dark-primary-a20 dark:text-dark-surface-a0">
                    {twoFAEnabled ? "Desactivar" : "Activar"}
                  </button>
                </div>
              </div>

              <div>
                <p className="mt-3 font-medium">Sesiones activas</p>
                <ul className="mt-2 space-y-2 text-sm">
                  {sessions.map((s) => (
                    <li
                      key={s.id}
                      className="flex justify-between items-center">
                      <div className="text-sm">
                        <div className="font-medium">{s.device}</div>
                        <div className="text-gray-500">
                          {s.ip} · {s.when}
                        </div>
                      </div>
                      <button
                        onClick={() => revokeSession(s.id)}
                        className="text-sm text-red-600">
                        Revocar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Privacidad, Notificaciones y Preferencias movidas al formulario central */}

          <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h3 className="text-lg font-medium">Integraciones</h3>
            <p className="text-sm text-gray-600 mt-2">
              Cuentas externas conectadas.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {integrations.map((it) => (
                <li key={it.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-gray-500">
                      {it.connected ? "Conectado" : "No conectado"}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleIntegration(it.id)}
                    className="px-2 py-1 rounded bg-gray-100 text-sm">
                    {it.connected ? "Desconectar" : "Conectar"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h3 className="text-lg font-medium">Datos y privacidad</h3>
            <p className="text-sm text-gray-600 mt-2">
              Exportar o eliminar datos (demo).
            </p>
            <div className="mt-3 flex gap-3">
              <button className="px-3 py-1 rounded bg-gray-100 text-sm">
                Exportar datos
              </button>
              <button className="px-3 py-1 rounded bg-red-50 text-red-700 text-sm">
                Solicitar eliminación
              </button>
            </div>
          </div>

          {/* Facturación moved to main panel */}

          <div className="bg-light-surface-a5 dark:bg-dark-surface-a20 rounded-md shadow p-4 border border-light-surface-a30 dark:border-dark-surface-a70">
            <h3 className="text-lg font-medium">Experimental</h3>
            <p className="text-sm text-gray-600 mt-2">
              Funciones en fase beta.
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <label className="flex items-center justify-between">
                <span>Participar en beta</span>
                <input
                  type="checkbox"
                  checked={featureFlags.beta}
                  onChange={() =>
                    setFeatureFlags((p) => ({ ...p, beta: !p.beta }))
                  }
                  className="h-4 w-4"
                  style={{ accentColor: "var(--color-light-primary-a20)" }}
                />
              </label>
              <label className="flex items-center justify-between">
                <span>Activar nueva UI</span>
                <input
                  type="checkbox"
                  checked={featureFlags.newUI}
                  onChange={() =>
                    setFeatureFlags((p) => ({ ...p, newUI: !p.newUI }))
                  }
                  className="h-4 w-4"
                  style={{ accentColor: "var(--color-light-primary-a20)" }}
                />
              </label>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
