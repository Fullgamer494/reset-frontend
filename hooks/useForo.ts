"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  getForoPosts,
  createForoPost,
  toggleLikePost,
  getForoCategories,
} from "@/lib/api/forum";
import type { ForoPost, ForoCategory } from "@/types";

export function useForo() {
  const router = useRouter();

  // Rastreo de posts que el usuario likeó en esta sesión
  // (la API no devuelve estado per-usuario, por eso se mantiene en memoria)
  const likedByMe = useRef<Set<string>>(new Set());

  const [posts, setPosts] = useState<ForoPost[]>([]);
  const [categories, setCategories] = useState<ForoCategory[]>([]);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Aplica el estado de liked de la sesión actual a una lista de posts frescos. */
  const applyLikedState = (freshPosts: ForoPost[]): ForoPost[] =>
    freshPosts.map((p) => ({ ...p, liked: likedByMe.current.has(p.id) }));

  const loadPosts = () => {
    setIsLoading(true);
    setError(null);
    Promise.all([getForoPosts(1, 10), getForoCategories()])
      .then(([p, c]) => {
        setPosts(applyLikedState(p));
        setCategories(c);
      })
      .catch((err: any) => {
        const msg: string = err?.message ?? "";
        if (msg.toLowerCase().includes("token") || msg.includes("401") || msg.includes("nicia sesión")) {
          router.push("/login");
        } else {
          setError("No se pudieron cargar las publicaciones. Verifica tu conexión.");
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { loadPosts(); }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePublish = async () => {
    if (!postText.trim()) return;
    setIsSubmitting(true);
    try {
      await createForoPost({
        title: postTitle,
        content: postText,
        isAnonymous,
        tags: selectedTags,
      });
      // Recargar lista desde la API
      const refreshed = await getForoPosts(1, 10);
      setPosts(refreshed);
      setPostText("");
      setPostTitle("");
      setSelectedTags([]);
      setIsModalOpen(false);
    } catch {
      setError("No se pudo publicar. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleLike = async (id: string) => {
    const wasLiked = likedByMe.current.has(id);

    // Actualizar el Set de likes de sesión
    wasLiked ? likedByMe.current.delete(id) : likedByMe.current.add(id);

    // Optimistic update inmediato en la UI
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !wasLiked, likes: wasLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );

    try {
      await toggleLikePost(id);
      // Refrescar contadores reales desde la API y re-aplicar estado de sesión
      const refreshed = await getForoPosts(1, 10);
      setPosts(applyLikedState(refreshed));
    } catch {
      // Revertir el Set y la UI si falla
      wasLiked ? likedByMe.current.add(id) : likedByMe.current.delete(id);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, liked: wasLiked, likes: wasLiked ? p.likes + 1 : p.likes - 1 }
            : p
        )
      );
    }
  };

  const handleToggleBookmark = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  return {
    posts,
    categories,
    postText,
    postTitle,
    selectedTags,
    isModalOpen,
    isAnonymous,
    isLoading,
    isSubmitting,
    error,
    setPostText,
    setPostTitle,
    setSelectedTags,
    setIsModalOpen,
    setIsAnonymous,
    toggleTag,
    handlePublish,
    handleToggleLike,
    handleToggleBookmark,
    loadPosts,
  };
}
