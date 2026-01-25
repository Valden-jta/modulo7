/**
 * Utilidad de traducción sencilla usando LibreTranslate.
 *
 * NOTA: es un servicio público gratuito pensado para pruebas/entornos educativos.
 * Para producción se recomienda usar un backend propio o un proveedor con SLA.
 */

export type SupportedLang = "auto" | "en" | "es" | "fr" | "de" | "pt";

const LIBRE_TRANSLATE_ENDPOINT = "https://libretranslate.de/translate";

export async function translateText(
  text: string,
  target: SupportedLang = "es",
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
    }),
  });

  if (!res.ok) {
    throw new Error(`Error al traducir (HTTP ${res.status})`);
  }

  const data = (await res.json()) as { translatedText?: string };

  if (!data.translatedText) {
    throw new Error("No se pudo obtener la traducción");
  }

  return data.translatedText;
}
