"use client";

import { useState } from "react";
import { register } from "@/lib/api/auth";
import { ADDICTION_TYPES } from "@/lib/constants";
import { validateRegisterForm } from "@/lib/validation";
import type { AddictionTypeId } from "@/types";

interface RegisterFormStep1 {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<"user" | "companion">("user");
  const [form, setForm] = useState<RegisterFormStep1>({ name: "", email: "", password: "", confirmPassword: "" });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedAddiction, setSelectedAddiction] = useState<AddictionTypeId | "">("");
  const [otherDescription, setOtherDescription] = useState("");
  const [addictionClassification, setAddictionClassification] = useState<"conductual" | "sustancia" | "">("")
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleNextStep = () => {
    const validation = validateRegisterForm(form.name, form.email, form.password);
    if (!validation.valid) {
      setError(validation.errors.name || validation.errors.email || validation.errors.password?.[0] || 'Datos inválidos.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setStep(2);
    setError(null);
  };

  const handleSubmit = async () => {
    const validation = validateRegisterForm(form.name, form.email, form.password);
    if (!validation.valid) {
      setError(validation.errors.name || validation.errors.email || validation.errors.password?.[0] || "Completa todos los campos correctamente.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (role === "user") {
      if (!selectedAddiction) {
        setError("Selecciona un tipo de adicción.");
        return;
      }
      if (selectedAddiction === "otros" && !otherDescription.trim()) {
        setError("Describe tu situación en el campo de texto.");
        return;
      }
      if (selectedAddiction === "otros" && !addictionClassification) {
        setError("Indica si tu adicción es conductual o de sustancia.");
        return;
      }
    }
    setIsLoading(true);
    setError(null);
    try {
      // Determinar el nombre legible y la clasificación para el backend
      const selectedType = ADDICTION_TYPES.find((a) => a.id === selectedAddiction);
      
      const addictionLabel =
        selectedAddiction === "otros"
          ? otherDescription.trim()
          : selectedType?.label ?? selectedAddiction;

      // Si es "otros", usamos la clasificación elegida interactivamente.
      // Si es estándar, la tomamos de la constante ADDICTION_TYPES.
      let classificationLabel = selectedType?.classification;
      
      if (selectedAddiction === "otros") {
        classificationLabel =
          addictionClassification === "conductual"
            ? "Conductual"
            : addictionClassification === "sustancia"
            ? "Sustancias"
            : undefined;
      }

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: role === "companion" ? "PADRINO" : "ADICTO",
        ...(role === "user" && addictionLabel ? { addictionName: addictionLabel } : {}),
        ...(role === "user" && classificationLabel ? { classification: classificationLabel } : {}),
      });
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorCode =
        typeof err === 'object' && err !== null && 'code' in err
          ? (err as { code?: string }).code
          : undefined;

      if (errorCode === "ACCOUNT_DEACTIVATED") {
        setIsDeactivated(true);
      }
      setError(err instanceof Error ? err.message : "Error al crear la cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    role,
    form,
    selectedAddiction,
    otherDescription,
    addictionClassification,
    isLoading,
    error,
    setStep,
    setRole,
    setSelectedAddiction,
    setOtherDescription,
    setAddictionClassification,
    showConfirmPassword,
    setShowConfirmPassword,
    isDeactivated,
    isSuccess,
    handleChange,
    handleNextStep,
    handleSubmit,
  };
}

