# EyD Talent Manager

Sistema de Gestión de Talento Humano moderno y profesional para empresas.

## Descripción

EyD Talent Manager es una plataforma web completa para la gestión de recursos humanos que digitaliza y simplifica los procesos de contratación, onboarding, gestión documental y seguimiento de empleados.

## Características principales

- 🎨 Diseño moderno con tema oscuro y acentos verde/azul
- 📱 Completamente responsive (móvil, tablet y escritorio)
- ⚡ Animaciones suaves y profesionales
- 🔐 Sistema de autenticación
- 📊 Dashboard administrativo
- 🎯 Interfaz intuitiva y fácil de usar

## Tecnologías utilizadas

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: Shadcn/ui
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js)

Puedes verificar si los tienes instalados ejecutando:

```bash
node --version
npm --version
```

Si no tienes Node.js instalado, descárgalo desde [nodejs.org](https://nodejs.org/)

## Instalación y configuración

### 1. Clonar o descargar el repositorio

Si el proyecto está en un repositorio Git:

```bash
git clone <url-del-repositorio>
cd gestion-empleados
```

O simplemente copia la carpeta del proyecto a tu computadora.

### 2. Instalar dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Este comando instalará todas las dependencias necesarias del proyecto. Puede tardar algunos minutos.

### 3. Ejecutar el proyecto en modo desarrollo

Una vez instaladas las dependencias, ejecuta:

```bash
npm run dev
```

### 4. Abrir en el navegador

El proyecto estará disponible en:

```
http://localhost:3000
```

Abre tu navegador y visita esta URL para ver la aplicación en funcionamiento.

## Estructura del proyecto

```
gestion-empleados/
├── app/                      # Rutas y páginas de Next.js
│   ├── dashboard/           # Panel de administración
│   ├── login/              # Página de inicio de sesión
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio (landing)
├── components/              # Componentes reutilizables
│   ├── landing/            # Componentes de la landing page
│   │   ├── Features.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   └── Stats.tsx
│   ├── layout/             # Componentes de layout
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── ui/                 # Componentes UI de Shadcn
├── lib/                     # Utilidades y funciones
│   └── smoothScroll.ts     # Función de scroll suave
├── public/                  # Archivos estáticos
├── .gitignore              # Archivos ignorados por Git
├── package.json            # Dependencias y scripts
├── tsconfig.json           # Configuración de TypeScript
└── tailwind.config.ts      # Configuración de Tailwind
```

## Páginas disponibles

- **`/`** - Landing page principal con información del producto
- **`/login`** - Página de inicio de sesión
- **`/dashboard`** - Panel de administración (requiere login)

## Acceso al sistema

Actualmente, el sistema permite el acceso sin validación de credenciales. Cualquier usuario y contraseña que ingreses te permitirá acceder al dashboard.

## Scripts disponibles

```bash
# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión de producción
npm start

# Verificar errores de linting
npm run lint
```

## Solución de problemas

### El proyecto no inicia

1. Verifica que Node.js esté instalado correctamente
2. Elimina la carpeta `node_modules` y el archivo `package-lock.json`
3. Vuelve a ejecutar `npm install`
4. Intenta ejecutar `npm run dev` nuevamente

### Error de puerto en uso

Si el puerto 3000 está ocupado, puedes especificar otro puerto:

```bash
# Windows (CMD)
set PORT=3001 && npm run dev

# Windows (PowerShell)
$env:PORT=3001; npm run dev

# Linux/Mac
PORT=3001 npm run dev
```

### Problemas con dependencias

Si hay problemas con las dependencias, intenta:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Soporte

Para reportar problemas o solicitar ayuda, contacta a:
- Email: contacto@eydgroup.com
- Teléfono: +57 123 456 789

## Licencia

© 2025 EyD Group SAS. Todos los derechos reservados.
