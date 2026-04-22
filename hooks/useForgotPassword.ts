"use client";

import { useState } from "react";
import { forgotPassword } from "@/lib/api/auth";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Ingresa tu correo electrónico.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("El correo electrónico no tiene un formato válido.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || "No se pudo enviar el correo. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return { email, isLoading, error, sent, handleChange, handleSubmit };
}
