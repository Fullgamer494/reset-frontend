# ReSet - Plataforma de Recuperación y Acompañamiento

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Mobile](https://img.shields.io/badge/Mobile-Capacitor-2399E6?logo=capacitor)](https://capacitorjs.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Una plataforma fullstack para recuperación de adicciones con acompañamiento personalizado y comunidad**

[Demo](#demo) • [Documentación](#documentación) • [Arquitectura](#arquitectura) • [Seguridad](#seguridad)

</div>

---

## Descripción

**ReSet** es una aplicación web y móvil que facilita el proceso de recuperación de adicciones mediante:

- **Gamificación**: Sigue el crecimiento de tu planta virtual (Semilla -> Árbol -> Ciprés) según tu racha de sobriedad
- **Rastreo Emocional**: Registra tu estado de ánimo en 10 emociones diferentes (feliz, motivado, ansioso, etc.)
- **Sistema de Apadrinamiento**: PADRINOS que acompañan a ADICTOS en su recuperación 1:1
- **Comunidad Anónima**: Foro de posts anónimos con Tags y reacciones
- **Dashboard Personalizado**: Historial de progreso, bitácora y estadísticas
- **Multiplataforma**: Web + iOS/Android con Capacitor

---

## Integración Completa de la Plataforma

Para desplegar y utilizar la plataforma ReSet en su totalidad, es necesario clonar y configurar los siguientes repositorios:

1. **Frontend (este repositorio)**: App web y móvil (Next.js + Capacitor).
2. **Backend**: Servicio principal y base de datos.
   - Repositorio: [https://github.com/JILZXY/resetBack-end.git](https://github.com/JILZXY/resetBack-end.git)
3. **Infraestructura**: Configuración de contenedores, servidores y despliegue.
   - Repositorio: [https://github.com/Fullgamer494/reset-infra.git](https://github.com/Fullgamer494/reset-infra.git)

---

## Inicio Rápido

### Requisitos Previos

```bash
Node.js >= 20.x
npm >= 10.x
```

### Instalación del Frontend

```bash
# 1. Clonar y entrar al proyecto frontend
git clone https://github.com/tu-usuario/front-reset.git
cd front-reset

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local para que apunte al servicio backend local/remoto

# 4. Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Comandos Disponibles

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm start` | Ejecuta servidor de producción |
| `npm run lint` | Valida código con ESLint |
| `npm run build:mobile` | Compila para iOS/Android |
| `npm run cap:android` | Abre Android Studio |
| `npm run cap:ios` | Abre Xcode |
| `npm run cap:sync` | Sincroniza Capacitor |

---

## Arquitectura

```
front-reset/
├── app/                        # Next.js App Router
│   ├── login/                 # Autenticación
│   ├── dashboard/             # Dashboard principal
│   ├── acompanante/           # Panel de acompañante
│   ├── admin/                 # Panel administrativo
│   └── [rutas-dinámicas]
│
├── components/                # Componentes React
│   ├── ui/                   # Primitivos (Button, Input, Badge)
│   ├── admin/                # Componentes admin
│   └── features/             # Features complejas
│
├── hooks/                     # Custom hooks (lógica de negocio)
│   ├── useLogin.ts
│   ├── useDashboard.ts
│   ├── useForo.ts
│   └── [14+ hooks especializados]
│
├── context/                   # Estado global
│   ├── AuthContext.tsx       # Autenticación y sesión
│   └── ThemeContext.tsx      # Tema (luz/oscuro)
│
├── lib/
│   ├── api/                  # API clients (13 módulos)
│   │   ├── auth.ts           # Autenticación
│   │   ├── dashboard.ts      # Dashboard
│   │   ├── forum.ts          # Foro comunitario
│   │   └── [servicios...]
│   ├── constants.ts          # Constantes globales
│   ├── storage.ts            # Persistencia (Web + Mobile)
│   ├── platform.ts           # Detección de plataforma
│   └── helpers/              # Utilidades
│
├── types/                     # Tipado TypeScript (95+ tipos)
│   └── index.ts
│
└── config/                    # Configuración
    └── theme.ts
```

### Flujo de Datos

```
Usuario
  |
  v
+-------------------------------------+
| Component (UI)                      |
+-------------------------------------+
  | useState, useContext
  v
+-------------------------------------+
| Custom Hook (useDashboard, useForo) |  <- Lógica de negocio
+-------------------------------------+
  | async/await
  v
+-------------------------------------+
| API Client (lib/api/*)              |  <- HTTP requests
+-------------------------------------+
  |
  v
+-------------------------------------+
| Backend API (Node.js/Prisma)        |
+-------------------------------------+
```

---

## Seguridad

### Implementado

- [x] **JWT Tokens** en memoria (no localStorage)
- [x] **Cookies httpOnly** con `samesite=lax`
- [x] **Validación de Email** y contraseña en client
- [x] **Timeout de Requests** (15 segundos)
- [x] **Dispositivos de Confianza** (device_id en cookies)
- [x] **Autenticación de 2 Factores** (código MFA)
- [x] **Middleware JWT** con validación de expiración

### Por Implementar (Crítico)

- [ ] **Headers de Seguridad** (CSP, HSTS, X-Frame-Options)
- [ ] **Encriptación de Storage** (tweetnacl.js)
- [ ] **Rate Limiting** en client y servidor
- [ ] **Sanitización de Inputs** (especialmente forum)
- [ ] **Tests de Seguridad** (OWASP Top 10)

---

## Características Principales

### 1. Sistema de Gamificación
- Planta que crece en 5 etapas
- Racha de días de sobriedad
- Puntos de logro (achievements)
- Desafíos semanales

### 2. Rastreo Emocional
10 emociones registradas:
- Feliz, Motivado, Agradecido, Esperanzado, Calmado
- Ansioso, Confundido, Agotado, Triste, Enojado

### 3. Acompañamiento
- PADRINO: Profesional o persona en recuperación avanzada
- ADICTO: Persona en recuperación activa
- Seguimiento de sesiones
- Validaciones de hitos

### 4. Comunidad
- Posts anónimos con 6 Tags categorizados
- Sistema de reacciones (likes)
- Persistencia offline (local + sync)
- Moderación integrada

### 5. Multiplataforma
- **Web**: Responsive, Next.js
- **iOS/Android**: Capacitor con acceso a APIs nativas
- **Sincronización**: Estado consistente entre plataformas

---

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 16.1.6 (App Router)
- **Lenguaje**: TypeScript 5.0 (strict mode)
- **Estilos**: Tailwind CSS 4.0
- **UI**: React Icons, componentes custom
- **Estado**: React Context API + Custom Hooks
- **Gráficos**: Recharts 3.8.0

### Mobile
- **Framework**: Capacitor 8.1.0
- **Plataformas**: iOS + Android
- **Integración**: Native APIs (StatusBar, Preferences, Storage)

### Backend (Referencia)
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Nodemailer (Email)

---

## Documentación

### Guías Disponibles
- [Constantes y Configuración](lib/constants.ts) - Valores globales

### Endpoints API Principales

```typescript
// Autenticación
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/verify-2fa
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/logout

// Perfil
GET    /api/v1/auth/profile
PATCH  /api/v1/auth/profile
DELETE /api/v1/auth/account

// Dashboard
GET    /api/v1/dashboard/progress
GET    /api/v1/dashboard/logs
POST   /api/v1/dashboard/logs

// Foro
GET    /api/v1/forum/posts
POST   /api/v1/forum/posts
POST   /api/v1/forum/posts/:id/reactions

// Acompañamiento
GET    /api/v1/sponsorships
GET    /api/v1/sponsorships/:id/sessions
PATCH  /api/v1/sponsorships/:id/accept
```

---

## Testing (Por Implementar)

```bash
# Ejecutar tests
npm run test

# Tests con cobertura
npm run test:coverage

# Tests en watch mode
npm run test:watch
```

Objetivos de cobertura:
- [x] Autenticación: 80%
- [x] API Clients: 75%
- [x] Hooks: 70%
- [x] Utilities: 90%

---

## Métricas de Calidad

| Métrica | Valor | Estándar |
|---------|-------|----------|
| **TypeScript Coverage** | 100% | >= 95% |
| **ESLint Errors** | 0 | 0 |
| **Bundle Size** | ~45KB gzipped | < 100KB |
| **Lighthouse Score** | 85 | >= 80 |
| **Test Coverage** | 0% | >= 70% |

---

## Contribuir

```bash
# 1. Fork el repositorio
# 2. Crea una rama feature
git checkout -b feature/my-feature

# 3. Commit con mensaje claro
git commit -m "feat: agregar nueva funcionalidad"

# 4. Push a tu rama
git push origin feature/my-feature

# 5. Abre un Pull Request
```

### Normas de Código
- TypeScript strict mode
- ESLint + Prettier
- Componentes small + enfocados
- Nombre de functions descriptivos
- Tests para features críticas

---

## Licencia

Distribuido bajo licencia MIT. Ver [LICENSE](LICENSE) para detalles.

---

## Contacto y Soporte

- Email: support@reset-app.com
- Issues: [GitHub Issues](https://github.com/tu-usuario/front-reset/issues)
- Reportar bugs: Usa template de issue
- Feature requests: Abre una discussion

---

## Recursos Educativos

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Capacitor Docs](https://capacitorjs.com/docs)

---

<div align="center">

**Hecho con pasión para la recuperación y el bienestar**

Si este proyecto te ayuda, considera darle una star en GitHub

</div>
