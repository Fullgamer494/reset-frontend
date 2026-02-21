"use client";

import { useState, useEffect } from "react";
import { getMessages, sendMessage, getMessageLibrary } from "@/lib/api/companion";
import type { Message, MessageLibraryItem } from "@/types";

export function useMensajes() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [library, setLibrary] = useState<MessageLibraryItem[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getMessages(), getMessageLibrary()])
      .then(([msgs, lib]) => {
        setMessages(msgs);
        setLibrary(lib);
      })
      .catch(() => setError("Error al cargar los mensajes"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;
    const optimistic: Message = { id: `opt_${Date.now()}`, text, time: "Enviando...", fromMe: true };
    setMessages((prev) => [...prev, optimistic]);
    setText("");
    setIsSending(true);
    try {
      const sent = await sendMessage(optimistic.text);
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? sent : m))
      );
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setError("No se pudo enviar el mensaje");
    } finally {
      setIsSending(false);
    }
  };

  return {
    messages,
    library,
    text,
    isLoading,
    isSending,
    error,
    setText,
    handleSend,
  };
}
