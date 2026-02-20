"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import type { LoginCredentials } from "@/types";

export function useLogin() {
  const router = useRouter();
  const [form, setForm] = useState<LoginCredentials>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { token, user } = await login(form);
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      router.push(user.role === "companion" ? "/acompanante" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (role: "user" | "companion") => {
    setForm(
      role === "companion"
        ? { email: "padrino@correo.com", password: "demo1234" }
        : { email: "alex@correo.com", password: "demo1234" }
    );
    setError(null);
  };

  return {
    form,
    showPassword,
    isLoading,
    error,
    setShowPassword,
    handleChange,
    handleSubmit,
    fillDemo,
  };
}
