// lib/api/auth.ts
// Autenticación — POST /auth/register  y  POST /auth/login
// El token se almacena en memoria a través del cliente HTTP centralizado.

import { apiRequest, setToken } from './client';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'ADICTO' | 'PADRINO';
  addictionName?: string;
  classification?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ─── Respuestas normalizadas (usadas por los hooks) ──────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'ADICTO' | 'PADRINO';
}

export interface AuthResult {
  accessToken: string;
  user: AuthUser;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

export async function register(payload: RegisterPayload): Promise<void> {
  await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      addictionName: payload.addictionName,
      classification: payload.classification,
    }),
  });
}

/**
 * Actualiza los datos del perfil del usuario autenticado.
 * Llama a PATCH /auth/me — falla silenciosamente si el endpoint no existe aún.
 */
export async function updateMe(data: { name?: string; email?: string }): Promise<void> {
  await apiRequest('/auth/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * Obtiene los datos frescos del usuario autenticado desde el servidor.
 * Útil tras el login para obtener el nombre/email actualizado si el backend
 * ya soporta actualizaciones de perfil.
 */
export async function getMe(): Promise<AuthUser | null> {
  try {
    const res: any = await apiRequest('/auth/me');
    const data = res?.data ?? res;
    if (!data?.id) return null;
    return {
      id: data.id,
      name: data.name ?? '',
      email: data.email ?? '',
      role: data.role ?? 'ADICTO',
    };
  } catch {
    return null;
  }
}

/**
 * Autentica al usuario, almacena el token en memoria y devuelve
 * los datos normalizados.
 */
export async function login(payload: LoginPayload): Promise<AuthResult> {
  const res: any = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // El backend envuelve la respuesta en data: { accessToken, user }
  const data = res?.data ?? res;
  const token: string = data?.access_token ?? data?.accessToken ?? data?.token ?? '';

  if (token) setToken(token);

  return {
    accessToken: token,
    user: {
      id: data?.user?.id ?? '',
      name: data?.user?.name ?? '',
      email: data?.user?.email ?? '',
      role: data?.user?.role ?? 'ADICTO',
    },
  };
}
