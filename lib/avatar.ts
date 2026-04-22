// lib/avatar.ts
// Generación determinista de avatares DiceBear a partir del ID de usuario.
// Funciona para todos los usuarios (nuevos y ya registrados) sin depender de
// que el backend devuelva un campo "avatarUrl".

/**
 * Devuelve la URL del avatar. Prioriza la URL proporcionada por el backend.
 * Si no hay URL, puede devolver un placeholder o null.
 */
export function getAvatarUrl(avatarUrl?: string | null, seed?: string): string {
  if (avatarUrl) return avatarUrl;
  
  // Si no hay avatarUrl, como último recurso podemos usar DiceBear 
  // pero ya no está hardcodeado como única opción.
  if (seed) {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=solid`;
  }

  return '/images/default-avatar.png'; // Asegúrate de que este archivo exista o usa una constante
}
