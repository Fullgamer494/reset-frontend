/**
 * lib/sanitize.ts
 * Sanitizacion basica para texto libre enviado al backend.
 */

const TAGS_REGEX = /<[^>]*>/g;
const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g;

/** Remueve etiquetas HTML y caracteres de control de un texto. */
export function sanitizePlainText(value: string): string {
  return value
    .replace(CONTROL_CHARS_REGEX, "")
    .replace(TAGS_REGEX, "")
    .trim();
}

/** Sanitiza contenido de post para evitar payloads HTML accidentales. */
export function sanitizeForumContent(value: string): string {
  return sanitizePlainText(value).replace(/\s{3,}/g, "  ");
}

/** Sanitiza titulos de post para mantenerlos compactos. */
export function sanitizeForumTitle(value: string): string {
  return sanitizePlainText(value).replace(/\s+/g, " ");
}
