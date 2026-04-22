/**
 * lib/validation.ts
 * Validaciones centralizadas para usuario, credenciales y contenido
 */

// Email validation - Simple pero segura (validación real en backend)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password requirements
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  HAS_LETTER: /[a-zA-Z]/,
  HAS_NUMBER: /[0-9]/,
  HAS_SPECIAL: /[!@#$%^&*(),.?":{}|<>\-_]/,
} as const;

/**
 * Valida formato de email
 * @returns { valid, error? }
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email?.trim()) {
    return { valid: false, error: 'El email es requerido' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Formato de email inválido' };
  }
  return { valid: true };
}

/**
 * Valida contraseña con requisitos de seguridad
 * @returns { valid, errors: string[] }
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!password) {
    return { valid: false, errors: ['La contraseña es requerida'] };
  }

  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    errors.push(`Mínimo ${PASSWORD_REQUIREMENTS.MIN_LENGTH} caracteres`);
  }
  if (!PASSWORD_REQUIREMENTS.HAS_LETTER.test(password)) {
    errors.push('Debe contener al menos una letra');
  }
  if (!PASSWORD_REQUIREMENTS.HAS_NUMBER.test(password)) {
    errors.push('Debe contener al menos un número');
  }
  if (!PASSWORD_REQUIREMENTS.HAS_SPECIAL.test(password)) {
    errors.push('Debe contener un carácter especial (!@#$%^&*...)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Valida nombre de usuario
 * @returns { valid, error? }
 */
export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name?.trim()) {
    return { valid: false, error: 'El nombre es requerido' };
  }
  if (name.length < 2) {
    return { valid: false, error: 'El nombre debe tener al menos 2 caracteres' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'El nombre no puede exceder 100 caracteres' };
  }
  return { valid: true };
}

/**
 * Valida contenido de post en foro
 * @returns { valid, error? }
 */
export function validateForumPost(content: string): { valid: boolean; error?: string } {
  if (!content?.trim()) {
    return { valid: false, error: 'El contenido no puede estar vacío' };
  }
  if (content.length < 5) {
    return { valid: false, error: 'El post debe tener al menos 5 caracteres' };
  }
  if (content.length > 2000) {
    return { valid: false, error: 'El post no puede exceder 2000 caracteres' };
  }
  return { valid: true };
}

/**
 * Valida código MFA (6 dígitos)
 * @returns { valid, error? }
 */
export function validateMFACode(code: string): { valid: boolean; error?: string } {
  if (!code) {
    return { valid: false, error: 'El código es requerido' };
  }
  if (!/^\d{6}$/.test(code)) {
    return { valid: false, error: 'El código debe ser 6 dígitos' };
  }
  return { valid: true };
}

/**
 * Combina validaciones para login
 */
export function validateLoginForm(email: string, password: string): {
  valid: boolean;
  errors: { email?: string; password?: string };
} {
  const errors: { email?: string; password?: string } = {};

  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.error;
  }

  if (!password) {
    errors.password = 'La contraseña es requerida';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Combina validaciones para registro
 */
export function validateRegisterForm(name: string, email: string, password: string): {
  valid: boolean;
  errors: { name?: string; email?: string; password?: string[] };
} {
  const errors: { name?: string; email?: string; password?: string[] } = {};

  const nameValidation = validateName(name);
  if (!nameValidation.valid) {
    errors.name = nameValidation.error;
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.error;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.errors;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
