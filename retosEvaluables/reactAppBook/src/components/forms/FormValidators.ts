const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// Requiere: al menos 1 dígito, 1 minúscula, 1 mayúscula, 1 símbolo especial, longitud 4-8
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

const validateLoginRegister = (
  name: string,
  value?: string | boolean,
  allValues?: Record<string, string | boolean>
): string | null => {
  // Si `value` es string lo usamos; si no, `value` es boolean y lo trataremos según el caso
  const valStr = typeof value === "string" ? value : "";
  if (name === "email") {
    if (!valStr) return "El email es obligatorio";
    if (!emailRegex.test(valStr)) return "Formato de email inválido";
  }
  if (name === "password") {
    if (!valStr) return "La contraseña es obligatoria";
    if (!passwordRegex.test(valStr))
      return "La contraseña debe tener entre 8 y 16 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales (!&_?-...";
  }
  if (name === "firstName") {
    if (!valStr) return "Debes introducir tu nombre";
  }
  if (name === "lastName") {
    if (!valStr) return "Debes introducir tu apellido";
  }
  if (name === "nickName") {
    if (!valStr) return "Debes introducir un nombre de usuario";
  }
  if (name === "userRole") {
    if (!valStr) return "Debes seleccionar un perfil de cuenta";
  }
  if (name === "repeatPassword") {
    if (!valStr) return "Debes escribir la misma contraseña";
    const passwordValue = (allValues?.password ?? "") as string;
    if (valStr !== String(passwordValue)) return "Las contraseñas no coinciden";
  }
  // checkbox de términos puede venir con distintos nombres; comprobamos booleano explícitamente
  // Aceptamos 'terms' o 'termsAccepted' y simplemente verificamos que el valor sea `true`.
  if ((name === "termsAccepted") && value !== true) {
    return "debes aceptar los Términos y Condiciones";
  }
  return null;
};

export { emailRegex, passwordRegex, validateLoginRegister };
