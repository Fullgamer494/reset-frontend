# Guía de Implementación Frontend - Módulo de Autenticación y Cuenta

Esta guía detalla cómo integrar las nuevas funcionalidades de **ReSet** en el frontend (Web/Mobile), incluyendo los endpoints, cuerpos de petición y códigos de error específicos.

---

## 1. Verificación de Correo Electrónico

Tras el registro exitoso, el usuario recibirá un correo con un enlace que contiene un token.

- **Endpoint**: `POST /api/v1/auth/verify-email`
- **Body**:
  ```json
  {
    "token": "token_recibido_por_email"
  }
  ```
- **Flujo Recomendado**: El link del correo redirigirá a `${FRONTEND_URL}/verify-email?token=...`. Crea una ruta en el frontend que capture el parámetro [token](file:///c:/Users/fullg/Documents/pi2/reset/resetBack-end/node_modules/.prisma/client/index.d.ts#3108-3109) y llame a este endpoint automáticamente para confirmar la cuenta.

---

## 2. Inicio de Sesión y Control de Errores

El endpoint de login ha sido actualizado para manejar estados de cuenta específicos.

- **Endpoint**: `POST /api/v1/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "rememberMe": true
  }
  ```

### Manejo de errores (Codes):
- `EMAIL_NOT_VERIFIED` (403): El usuario debe verificar su correo antes de entrar. **Acción**: Redirigir a una pantalla de "Revisa tu correo".
- `INVALID_CREDENTIALS` (401): Correo o contraseña incorrectos.

---

## 3. Recuperación de Contraseña

### Paso A: Solicitar enlace
- **Endpoint**: `POST /api/v1/auth/forgot-password`
- **Body**: `{ "email": "user@example.com" }`
- **Resultado**: Envía un correo con un enlace a `${FRONTEND_URL}/reset-password?token=...`.

### Paso B: Restablecer contraseña
- **Endpoint**: `POST /api/v1/auth/reset-password`
- **Body**:
  ```json
  {
    "token": "token_de_recuperacion",
    "newPassword": "nueva_password_segura"
  }
  ```

---

## 4. Borrado Lógico de Cuenta

Permite al usuario eliminar su cuenta sin perder físicamente el registro (marcado como `is_deleted`).

- **Endpoint**: `DELETE /api/v1/auth/account`
- **Seguridad**: Requiere `Authorization: Bearer <token>`.
- **Resultado**: El usuario ya no podrá iniciar sesión. **Importante**: El sistema enviará automáticamente un correo profesional de confirmación ("Despedida") al usuario tras el borrado.

---

## 5. Autenticación de Doble Factor (2FA) y Dispositivos de Confianza

El sistema ahora requiere un segundo factor si el dispositivo no es reconocido.

### Flujo de Login (2 Pasos)

1. **Intento Inicial**: Llama a `POST /auth/login`.
   - Si el dispositivo es conocido (tiene la cookie `device_id`), recibes `200 OK` y el token de acceso.
   - Si es un dispositivo nuevo, recibirás:
     ```json
     {
       "code": "2FA_REQUIRED",
       "message": "Se ha enviado un código de seguridad...",
       "mfaToken": "TOKEN_TEMPORAL_JWT"
     }
     ```
2. **Verificación**: Muestra una pantalla para ingresar el código de 6 dígitos enviado por email y llama al nuevo endpoint:
   - **Endpoint**: `POST /api/v1/auth/verify-2fa`
   - **Body**:
     ```json
     {
       "mfaToken": "TOKEN_TEMPORAL_JWT",
       "code": "123456"
     }
     ```
   - **Resultado**: Si el código es correcto, recibes el `accessToken` final.

### Dispositivos de Confianza
- El backend inyecta automáticamente la cookie `device_id` al completar exitosamente el login o la verificación de 2FA **siempre que el usuario haya marcado `rememberMe: true`**.
- **Acción requerida**: Todas las peticiones deben usar `withCredentials: true` (Fetch/Axios) para que el navegador guarde y envíe esta cookie. Sin esto, el 2FA aparecerá en cada inicio de sesión.

---

> [!TIP]
> Todos los endpoints de error devuelven un objeto con la estructura:
> `{ "code": "NOMBRE_ERROR", "message": "Descripción legible", "details": {} }`
