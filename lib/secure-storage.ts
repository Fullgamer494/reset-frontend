/**
 * lib/secure-storage.ts
 * Cifrado ligero para datos sensibles en storage del cliente.
 *
 * Nota: en frontend no existe secreto perfecto; esto mejora la proteccion
 * contra lectura casual del storage.
 */

const SECURE_PREFIX = "enc:v1:";
const FALLBACK_SEED = "reset-secure-storage-v1";

function canUseWebCrypto(): boolean {
  return typeof crypto !== "undefined" && !!crypto.subtle;
}

function toBase64(data: Uint8Array): string {
  if (typeof window === "undefined") {
    return Buffer.from(data).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < data.length; i += 1) binary += String.fromCharCode(data[i]);
  return btoa(binary);
}

function fromBase64(base64: string): Uint8Array {
  if (typeof window === "undefined") {
    return new Uint8Array(Buffer.from(base64, "base64"));
  }
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}
function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

function getSecretSeed(): string {
  const envSeed = process.env.NEXT_PUBLIC_STORAGE_SECRET;
  if (envSeed && envSeed.trim().length > 0) return envSeed.trim();

  const host = typeof window !== "undefined" ? window.location.host : "server";
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "ua";
  return `${FALLBACK_SEED}:${host}:${ua.slice(0, 32)}`;
}

async function deriveKey(): Promise<CryptoKey> {
  const seed = getSecretSeed();
  const encoder = new TextEncoder();
  const seedBytes = encoder.encode(seed);

  const baseKey = await crypto.subtle.importKey(
    "raw",
    seedBytes,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("reset-storage-salt-v1"),
      iterations: 120_000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/** Cifra texto para persistencia en storage. */
export async function encryptForStorage(value: string): Promise<string> {
  if (!canUseWebCrypto()) return value;

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey();
  const encoded = new TextEncoder().encode(value);
  const cipherBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
  const cipher = new Uint8Array(cipherBuffer);

  return `${SECURE_PREFIX}${toBase64(iv)}.${toBase64(cipher)}`;
}

/** Descifra texto previamente cifrado para storage. */
export async function decryptFromStorage(value: string): Promise<string> {
  if (!value.startsWith(SECURE_PREFIX)) return value;
  if (!canUseWebCrypto()) return "";

  const raw = value.slice(SECURE_PREFIX.length);
  const parts = raw.split(".");
  if (parts.length !== 2) return "";

  const iv = fromBase64(parts[0]);
  const cipher = fromBase64(parts[1]);
  const key = await deriveKey();

  try {
      const plainBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: toArrayBuffer(iv) },
        key,
        toArrayBuffer(cipher)
      );
    return new TextDecoder().decode(plainBuffer);
  } catch {
    return "";
  }
}

export function isEncryptedStorageValue(value: string | null): boolean {
  return !!value && value.startsWith(SECURE_PREFIX);
}
