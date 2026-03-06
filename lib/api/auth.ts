// lib/api/auth.ts
// Autenticación — POST /auth/register  y  POST /auth/login
// El token se almacena en memoria a través del cliente HTTP centralizado.

import { apiRequest, setToken } from './client';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  // El backend acepta 'patient' | 'sponsor' (campo opcional con forbidNonWhitelisted)
  role?: 'patient' | 'sponsor';
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convierte el rol devuelto por el backend al rol interno del front. */
function mapRole(apiRole: string | undefined): 'ADICTO' | 'PADRINO' {
  return apiRole === 'sponsor' ? 'PADRINO' : 'ADICTO';
}

// ─── Funciones ───────────────────────────────────────────────────────────────

export async function register(payload: RegisterPayload): Promise<void> {
  await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      ...(payload.role ? { role: payload.role } : {}),
    }),
  });
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

  // El TransformInterceptor del backend envuelve la respuesta en { success, data }
  const data = res?.data ?? res;
  const token: string = data?.access_token ?? data?.accessToken ?? data?.token ?? '';

  if (token) setToken(token);

  return {
    accessToken: token,
    user: {
      id: data?.user?.id ?? '',
      name: data?.user?.name ?? '',
      email: data?.user?.email ?? '',
      role: mapRole(data?.user?.role),
    },
  };
}
