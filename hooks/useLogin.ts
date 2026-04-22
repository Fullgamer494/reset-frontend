"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, getProfile, verify2FA } from "@/lib/api/auth";
import { useAuth } from "@/context/AuthContext";
import { validateLoginForm, validateMFACode } from "@/lib/validation";

export function useLogin() {
  const router = useRouter();
  const { saveAuth, clearAuth } = useAuth();
  const [form, setForm] = useState({ 
    email: "", 
    password: "",
    rememberMe: false 
  });
  const [mfaToken, setMfaToken] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLoginForm(form.email, form.password);
    if (!validation.valid) {
      setError(validation.errors.email || validation.errors.password || "Datos inválidos.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // 1. Login básico (obtenemos accessToken)
      const loginResult = await login({
        email: form.email,
        password: form.password,
      });

      if (loginResult.code === '2FA_REQUIRED') {
        setMfaToken(loginResult.mfaToken || null);
        setIsLoading(false);
        return; // Detener flujo para mostrar OTP
      }

      // 2. Obtener perfil completo inmediatamente
      const profileResult = await getProfile();

      // 3. Guardar en el contexto (TOKEN primero, luego USER)
      saveAuth(loginResult.accessToken, profileResult);
      
      router.push(profileResult.role === "PADRINO" ? "/acompanante" : "/dashboard");
    } catch (err: unknown) {
      const errorCode =
        typeof err === 'object' && err !== null && 'code' in err
          ? (err as { code?: string }).code
          : undefined;
      const errorMessage =
        err instanceof Error
          ? err.message
          : (typeof err === 'object' && err !== null && 'message' in err
              ? String((err as { message?: string }).message)
              : undefined);

      if (errorCode === 'EMAIL_NOT_VERIFIED') {
        setError("Tu cuenta aún no ha sido verificada. Revisa tu correo electrónico para activarla.");
      } else {
        setError(errorMessage || "Credenciales incorrectas o problema de conexión.");
      }
      clearAuth(); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    const codeValidation = validateMFACode(otpCode);
    if (!codeValidation.valid) {
      setError(codeValidation.error || "Ingresa un código válido.");
      return;
    }
    if (!mfaToken) {
      setError("Sesión de verificación expirada. Intenta login de nuevo.");
      setMfaToken(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const verifyResult = await verify2FA({ 
        mfaToken, 
        code: otpCode,
        rememberMe: form.rememberMe
      });
      const profileResult = await getProfile();
      saveAuth(verifyResult.accessToken, profileResult);
      router.push(profileResult.role === "PADRINO" ? "/acompanante" : "/dashboard");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : (typeof err === 'object' && err !== null && 'message' in err
              ? String((err as { message?: string }).message)
              : undefined);
      setError(errorMessage || "Código incorrecto o expirado.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    otpCode,
    setOtpCode,
    mfaToken,
    showPassword,
    isLoading,
    error,
    setShowPassword,
    handleChange,
    handleSubmit,
    handleVerify2FA,
  };
}
