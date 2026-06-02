# Todo App — Mobile (React Native + Expo)

Aplicación móvil de gestión de tareas. Proyecto principal del Mini Proyecto Final.

## Descripción

App de listas de tareas con autenticación Firebase, JWT propio, CRUD completo de listas y tareas, búsqueda y perfil. Consume un backend propio deployado en Railway.

## Tecnologías

- **Expo** (SDK 54) + **expo-router** (navegación file-based)
- **NativeWind** (Tailwind CSS para React Native)
- **TanStack Query** (server state, loading/error automático)
- **Zustand** (estado de sesión)
- **Axios** (instancia + interceptors + JWT)
- **Firebase Auth** (REST API en mobile, SDK en web)
- **expo-secure-store** (persistencia segura del JWT)
- **TypeScript**

## Pantallas

- Login / Registro
- Home (listas de tareas)
- Detalle de lista + tareas
- Búsqueda (listas y tareas)
- Perfil / About + Logout

## Instalación

```bash
npm install --legacy-peer-deps
```

## Variables de entorno

Crea un archivo `.env` en la raíz (ver `.env.example`):

```
EXPO_PUBLIC_API_URL=https://todo-app-backend-production-d9c8.up.railway.app/api
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyA1mHNL26OJiBuR1OSoVZjXjOY_FhOOZ9Q
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=todo-app-final-b1517.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=todo-app-final-b1517
```

## Cómo ejecutar

```bash
npx expo start --clear
```

Escanea el QR con la app **Expo Go** (iOS/Android) o presiona `w` para abrir en navegador.

## Arquitectura

```
app/                      # Expo Router (rutas)
  (auth)/login.tsx        # autenticación
  (app)/                  # rutas protegidas (guard en _layout)
    index.tsx             # home / listas
    lists/[id]/index.tsx  # detalle lista + tareas
    search.tsx
    profile.tsx
src/
  components/             # componentes reutilizables
  services/               # llamadas axios (auth, lists, tasks, search)
  store/                  # zustand (sesión)
  lib/                    # axios instance, firebase, storage, polyfills
  types/                  # interfaces TypeScript
```

## Links deployados

- **Backend:** https://todo-app-backend-production-d9c8.up.railway.app
- **Web (puntos extra):** https://todo-app-web-eight.vercel.app

## Usuario de prueba

```
Email:      kp@gmail.com
Contraseña: 12345678
```

También puedes registrar uno nuevo desde la pantalla de login (mínimo 6 caracteres).
