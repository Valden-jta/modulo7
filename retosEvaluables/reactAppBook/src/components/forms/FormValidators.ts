import { z } from "zod";

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
  if (name === "termsAccepted" && value !== true) {
    return "debes aceptar los Términos y Condiciones";
  }
  return null;
};

// ZOD

const schema = z.object({
  title: z.string().min(1, "Campo obligatorio"),
  author: z.string().min(1, "Campo obligatorio"),
  // Permitimos que el select empiece con "" y lo preprocesamos a undefined,
  // luego forzamos que el resultado no sea undefined para que el usuario deba elegir.
  type: z
    .union([z.enum(["tapa dura", "tapa blanda", "epub"]), z.literal("")])
    .refine((val) => val !== "", { message: "Debes seleccionar un tipo" }),
  price: z.number().min(0.1, "Debes introducir un precio"),
  image: z.string().min(1, "Campo obligatorio"),
  genre: z.string().min(1, "Campo obligatorio"),
  pages: z.number().min(1, "Debes introducir el numero de páginas"),
  year: z.number().min(1, "Campo obligatorio"),
  sinopsis: z
    .string()
    .min(1, "Campo obligatorio")
    .max(500, "EL texto no puede tener más de 500 caracteres"),
});

export { emailRegex, passwordRegex, validateLoginRegister, schema };
