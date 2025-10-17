# 🚀 Front-End Application Template

A modern, scalable **React + TypeScript + Vite** template for building robust and maintainable front-end applications.

This project is structured around **modular architecture**, leveraging **TanStack Router**, **Tanstack Query**, **Zod**, and **TailwindCSS** to ensure type safety, performance, and clean development experience.

🔗 **Live demo:** [template.leosarmento.com](https://template.leosarmento.com)

---

## ✨ Features

- 🧭 **Sidebar navigation** and responsive layout
- 📊 **Dynamic DataTable** with sorting, pagination & filtering
- 📅 **Calendar components** (multiple implementations)
- 🔍 **URL-based filters** with TanStack Router
- ⚡ **Asynchronous state management** with Tanstack Query
- ✅ **Form validation** with React Hook Form + Zod
- 📈 **Charts and analytics** with Recharts
- 🌗 **Dark/Light theme support** Shadcn/ui theme
- 💾 **Fake API layer** for testing and prototyping
- 🧱 **Type-safe service architecture** with modular folders
- 🎨 **UI built on Radix UI + TailwindCSS + Motion**
- 🔥 **Vite + SWC** for ultra-fast development builds

---

## 🧠 Tech Stack

| Category                 | Technology                                                                  |
| ------------------------ | --------------------------------------------------------------------------- |
| **Language**             | [TypeScript](https://www.typescriptlang.org/) (~5.9)                        |
| **Build Tool**           | [Vite](https://vitejs.dev/) (^7.1)                                          |
| **UI Library**           | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Router**               | [@tanstack/react-router](https://tanstack.com/router)                       |
| **State & Async Data**   | [@tanstack/react-query](https://tanstack.com/query)                         |
| **Forms**                | [React Hook Form](https://react-hook-form.com/)                             |
| **Validation**           | [Zod](https://zod.dev/)                                                     |
| **Styling**              | [Tailwind CSS](https://tailwindcss.com/)                                    |
| **Charts**               | [Recharts](https://recharts.org/)                                           |
| **Animations**           | [Motion](https://motion.dev/)                                               |
| **Icons**                | [Lucide React](https://lucide.dev/)                                         |
| **Linting & Formatting** | ESLint + Prettier + TypeScript ESLint                                       |

---

## ⚙️ Installation

```bash
git clone https://github.com/LeonardoSarmento/template-project.git
cd template-project
pnpm install
```
````

> 💡 You can also use `npm` or `yarn` if preferred.

---

## 🧩 Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm dev`     | Run the development server        |
| `pnpm build`   | Build the project for production  |
| `pnpm preview` | Preview the built project locally |
| `pnpm lint`    | Run ESLint for static analysis    |

---

## 🧱 Folder Structure

```
src/
├── assets/                # Static assets (images, icons, etc.)
├── components/            # Reusable UI components
│   ├── calendar/          # Calendar components (v1)
│   ├── calendar-v2/       # Alternative calendar version
│   ├── charts/            # Chart components
│   ├── common/            # Generic building blocks
│   ├── DevTools/          # Debug and developer tools
│   ├── header/            # Header and navigation elements
│   ├── icons/             # Custom icon components
│   ├── providers/         # React context and providers
│   ├── pwa/               # PWA support components
│   ├── sidebar/           # Sidebar layout
│   ├── tables/            # Data table components
│   └── ui/                # Shared UI primitives
│       ├── BreadcrumbsTSR.tsx
│       ├── ErrorComponent.tsx
│       ├── LayoutPages.tsx
│       ├── NotFoundComponent.tsx
│       └── UserMenu.tsx
│
├── fake-api/              # Mock data and fake endpoints
│   ├── calendar.ts
│   └── users.ts
│
├── lib/                   # Utilities, helpers, and pure functions
│   └── utils.ts
│
├── routes/                # Application routes (TanStack Router)
│   └── routeTree.gen.ts   # Auto-generated route tree
│
├── services/              # Business logic and domain-specific layers
│   ├── api/               # API configuration (axios, interceptors)
│   ├── constants/         # App constants and enums
│   ├── hooks/             # Reusable logic hooks
│   ├── query/             # React Query definitions
│   ├── state/             # Redux or Zustand slices
│   ├── types/             # Shared TypeScript types
│   └── utils/             # Internal service utilities
│
├── main.tsx               # Application entry point
├── index.css              # Global styles
└── routeTree.gen.ts       # Auto-generated TanStack Router tree
```

---

## 🧩 Architecture Overview

This template follows a **feature-first modular architecture**, separating UI, data, and business logic layers:

- **components/** → Reusable presentation and layout components
- **routes/** → Page-level routing structure
- **services/** → Domain logic, API access, and React Query setup
- **lib/** → Utility functions and shared helpers
- **fake-api/** → Local mock data for offline prototyping

---

## 🧪 Code Quality

- Strict TypeScript mode
- ESLint configured for React, Hooks, and TypeScript
- Prettier with TailwindCSS class sorting
- Compatible with [VSCode](https://code.visualstudio.com/) and popular extensions

Run lint checks:

```bash
pnpm lint
```

---

## 🧰 Recommended VSCode Extensions

- 🟦 **ESLint**
- 🎨 **Prettier - Code Formatter**
- 🌈 **Tailwind CSS IntelliSense**
- ⚡ **React Developer Tools**
- 🧭 **TypeScript Hero**

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ by [Leonardo Sarmento](https://leosarmento.com)

```
