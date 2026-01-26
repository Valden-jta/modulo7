/**
 * Utilidad de traducción sencilla usando LibreTranslate.
 *
 * NOTA: es un servicio público gratuito pensado para pruebas/entornos educativos.
 * Para producción se recomienda usar un backend propio o un proveedor con SLA.
 */

export type SupportedLang = "auto" | "en" | "es" | "fr" | "de" | "pt";

// En desarrollo usamos el proxy de Vite (/api/translate -> libretranslate.de)
const LIBRE_TRANSLATE_ENDPOINT = "/api/translate";

export async function translateText(
  text: string,
  target: SupportedLang = "en",
  source: SupportedLang = "auto",
): Promise<string> {
  if (!text.trim()) return "";

  const res = await fetch(LIBRE_TRANSLATE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      q: text,
      source,
      target,
      format: "text",
      alternatives: 1,
      // api_key opcional si más adelante usas una instancia propia
    }),
  });

  if (!res.ok) {
    throw new Error(`Error al traducir (HTTP ${res.status})`);
  }

  let data: { translatedText?: string };
  try {
    data = (await res.json()) as { translatedText?: string };
  } catch {
    // El servicio ha devuelto HTML u otro formato no JSON
    throw new Error(
      "La respuesta del servicio de traducción no es válida (no es JSON)",
    );
  }

  if (!data.translatedText) {
    throw new Error("No se pudo obtener la traducción");
  }

  return data.translatedText;
}
