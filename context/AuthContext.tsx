'use client';
// context/AuthContext.tsx
// Contexto global para compartir el token JWT y los datos del usuario
// entre todos los hooks y componentes de la aplicación.
//
// ESTRATEGIA DE PERSISTENCIA:
//   • En web:     localStorage  (comportamiento anterior, sin cambios visibles)
//   • En nativo:  @capacitor/preferences → UserDefaults (iOS) / SharedPreferences (Android)
//
// Esto resuelve el problema crítico en móvil: al cerrar la app y volver a abrirla,
// el token se restaura de almacenamiento y el usuario no tiene que hacer login de nuevo.
//
// El token sigue guardándose en memoria (authToken en client.ts) para acceso síncrono.
// El almacenamiento persistente se usa solo al arrancar o al cerrar sesión.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { User } from '@/types';
import { getProfile } from '@/lib/api/auth';
import { setToken } from '@/lib/api/client';
import { storageSave, storageGet, storageRemove, STORAGE_KEYS } from '@/lib/storage';
import { decryptFromStorage, encryptForStorage } from '@/lib/secure-storage';
import { log } from '@/lib/logger';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type AuthUser = User;

interface AuthCtx {
  user: AuthUser | null;
  saveAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
  /** Actualiza campos del usuario en memoria (ej: tras editar nombre). */
  updateUser: (partial: Partial<AuthUser>) => void;
  /**
   * true mientras se intenta restaurar la sesión guardada al arrancar la app.
   * Úsalo en el layout raíz para mostrar una pantalla de carga inicial y evitar
   * un flash de "no autenticado" en móvil cuando el token sí existe en storage.
   */
  isRestoring: boolean;
  /** Forza la recarga del perfil desde el servidor */
  refreshProfile: () => Promise<void>;
}

// ─── Contexto ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  // ── Limpiar ───────────────────────────────────────────────────────────────
  const clearAuth = useCallback(() => {
    setToken(null);
    setUser(null);
    storageRemove(STORAGE_KEYS.TOKEN).catch((error: unknown) => {
      log.warn('No se pudo eliminar token de storage', { error: String(error) });
    });
    storageRemove(STORAGE_KEYS.USER).catch((error: unknown) => {
      log.warn('No se pudo eliminar usuario de storage', { error: String(error) });
    });
  }, []);

  // ── Restaurar sesión al arrancar ──────────────────────────────────────────
  // Se ejecuta una sola vez al montar el Provider (début de la app).
  // Si existe un token guardado, lo restaura en memoria y recupera los datos
  // del usuario para que la app no pida login de nuevo tras reiniciarse.
  useEffect(() => {
    async function restoreSession() {
      try {
        const tokenRaw = await storageGet(STORAGE_KEYS.TOKEN);
        const token = tokenRaw ? await decryptFromStorage(tokenRaw) : null;
        if (token) {
          setToken(token);   // pone el token en memoria para las llamadas HTTP
          
          // Intentar obtener el perfil fresco del servidor
          try {
            const profile = await getProfile();
            setUser(profile);
            // Sincronizar storage con los datos frescos
            const encryptedProfile = await encryptForStorage(JSON.stringify(profile));
            storageSave(STORAGE_KEYS.USER, encryptedProfile).catch((error: unknown) => {
              log.warn('No se pudo persistir el perfil restaurado', { error: String(error) });
            });
          } catch (error: unknown) {
            log.error('Error al restaurar sesión desde el servidor', { phase: 'restore-profile' }, error instanceof Error ? error : undefined);
            const status = typeof error === 'object' && error !== null && 'status' in error
              ? (error as { status?: number }).status
              : undefined;
            
            // Si el error es 401 (Unauthorized), significa que el token no es válido.
            // Debemos limpiar la sesión por completo para evitar bucles de redirección.
            if (status === 401) {
              clearAuth();
            } else {
              // Si el servidor falla por otros motivos (ej: Red), intentar usar los datos locales como fallback
              const raw = await storageGet(STORAGE_KEYS.USER);
              if (raw) {
                const decrypted = await decryptFromStorage(raw);
                if (decrypted) {
                  setUser(JSON.parse(decrypted) as AuthUser);
                } else {
                  clearAuth();
                }
              } else {
                clearAuth();
              }
            }
          }
        }
      } catch (error: unknown) {
        // Al error de storage, seguimos sin sesión
        log.warn('No se pudo restaurar sesión desde storage', { error: String(error) });
      } finally {
        setIsRestoring(false);
      }
    }
    restoreSession();
  }, [clearAuth]);

  // ── Guardar ───────────────────────────────────────────────────────────────
  const saveAuth = useCallback((token: string, u: AuthUser) => {
    setToken(token);
    setUser(u);
    // Persistir de forma asíncrona (fire-and-forget).
    // Si falla (p.ej. almacenamiento lleno), la sesión en memoria sigue activa.
    encryptForStorage(token)
      .then((encrypted) => storageSave(STORAGE_KEYS.TOKEN, encrypted))
      .catch((error: unknown) => {
        log.warn('No se pudo persistir el token en storage', { error: String(error) });
      });

    encryptForStorage(JSON.stringify(u))
      .then((encrypted) => storageSave(STORAGE_KEYS.USER, encrypted))
      .catch((error: unknown) => {
        log.warn('No se pudo persistir el usuario en storage', { error: String(error) });
      });
  }, []);

  // ── Actualización parcial del usuario ────────────────────────────────────
  const updateUser = useCallback((partial: Partial<AuthUser>) => {
    setUser((prev: AuthUser | null) => {
      if (!prev) return prev;
      const updated = { ...prev, ...partial };
      // Mantener storage sincronizado
      encryptForStorage(JSON.stringify(updated))
        .then((encrypted) => storageSave(STORAGE_KEYS.USER, encrypted))
        .catch((error: unknown) => {
          log.warn('No se pudo sincronizar usuario actualizado en storage', { error: String(error) });
        });
      return updated;
    });
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
      const encrypted = await encryptForStorage(JSON.stringify(profile));
      storageSave(STORAGE_KEYS.USER, encrypted).catch((error: unknown) => {
        log.warn('No se pudo persistir perfil refrescado', { error: String(error) });
      });
    } catch (err) {
      log.error('Error al refrescar perfil', { phase: 'refresh-profile' }, err instanceof Error ? err : undefined);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, saveAuth, clearAuth, updateUser, isRestoring, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
