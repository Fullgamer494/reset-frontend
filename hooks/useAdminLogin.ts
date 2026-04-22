"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/api/admin";
import { getProfile } from "@/lib/api/auth";
import { useAuth } from "@/context/AuthContext";

export function useAdminLogin() {
  const router = useRouter();
  const { saveAuth, clearAuth } = useAuth();
  const [form, setForm] = useState({ 
    email: "", 
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setError('Ingresa tus credenciales de administrador.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const loginResult = await adminLogin({
        email: form.email,
        password: form.password,
      });

      // Validar que el usuario sea realmente ADMIN
      const profileResult = await getProfile();
      
      if (profileResult.role !== 'ADMIN') {
        throw new Error('No tienes permisos de administrador.');
      }

      saveAuth(loginResult.accessToken, profileResult);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión como administrador.");
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
