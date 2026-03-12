"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, getProfile } from "@/lib/api/auth";
import { useAuth } from "@/context/AuthContext";

export function useLogin() {
  const router = useRouter();
  const { saveAuth, clearAuth } = useAuth();
  const [form, setForm] = useState({ 
    email: "", 
    password: "",
    rememberMe: false 
  });
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
    // Validaciones de cliente antes de llamar a la API
    if (!form.email.trim()) {
      setError('Ingresa tu correo electrónico.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('El correo electrónico no tiene un formato válido.');
      return;
    }
    if (!form.password) {
      setError('Ingresa tu contraseña.');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // 1. Login básico (obtenemos accessToken)
      const loginResult = await login({
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
      });

      // 2. Obtener perfil completo inmediatamente
      const profileResult = await getProfile();

      // 3. Guardar en el contexto (TOKEN primero, luego USER)
      saveAuth(loginResult.accessToken, profileResult);
      
      router.push(profileResult.role === "PADRINO" ? "/acompanante" : "/dashboard");
    } catch (err: any) {
      if (err.code === 'EMAIL_NOT_VERIFIED') {
        setError("Tu cuenta aún no ha sido verificada. Revisa tu correo electrónico para activarla.");
      } else {
        setError(err.message || "Credenciales incorrectas o problema de conexión.");
      }
      clearAuth(); 
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    showPassword,
    isLoading,
    error,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}
