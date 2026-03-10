// lib/avatar.ts
// Generación determinista de avatares DiceBear a partir del ID de usuario.
// Funciona para todos los usuarios (nuevos y ya registrados) sin depender de
// que el backend devuelva un campo "avatarUrl".

/**
 * Devuelve la URL del avatar DiceBear para el seed dado (normalmente user.id).
 * El resultado es idempotente: el mismo seed siempre produce el mismo avatar.
 */
export function getAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=solid`;
}
