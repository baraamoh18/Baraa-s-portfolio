# Baraa — Portfolio

A premium, monochromatic dark-themed developer portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion. Fully bilingual (English / Arabic) with automatic RTL layout mirroring and highly optimized for performance.

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS (CSS-variable based monochrome theme)
- **Animation:** Framer Motion
- **Localization:** i18next / react-i18next (English + Arabic, RTL-aware)
- **Icons:** lucide-react (UI) + react-icons/si (tech-stack brand marks)
- **UI patterns:** Custom, from-scratch implementations in the spirit of Aceternity UI (Flip Words, Card Spotlight, Sticky Scroll Reveal, Text Reveal Card, Resizable Navbar) and shadcn/ui (Button — CVA + `cn()` conventions)

## Getting Started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run preview   # preview the production build locally
npm run lint      # eslint
```

## Folder Structure

```text
├── public/
│   ├── loading-animation.json  # lottie preloader animation
│   └── images/
│       ├── headshot.webp       # hero portrait (optimized)
│       ├── favicon.ico
│       ├── footer-logo.png
│       └── projects/           # optimized webp project previews
├── src/
│   ├── components/
│   │   ├── ui/                 # Aceternity-style + shadcn-style primitives
│   │   │   ├── ambient-background.tsx
│   │   │   ├── bento-grid.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card-spotlight.tsx
│   │   │   ├── flip-words.tsx
│   │   │   ├── form-field.tsx
│   │   │   ├── glowing-avatar.tsx
│   │   │   ├── logo-mark.tsx / logo-paths.ts
│   │   │   ├── magnetic-button.tsx
│   │   │   ├── project-visual.tsx
│   │   │   ├── resizable-navbar.tsx
│   │   │   ├── section-heading.tsx
│   │   │   ├── sticky-scroll-reveal.tsx
│   │   │   └── text-reveal-card.tsx
│   │   ├── layout/
│   │   │   ├── preloader.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── language-switcher.tsx
│   │   │   └── footer.tsx
│   │   └── sections/
│   │       ├── hero-section.tsx
│   │       ├── skills-section.tsx
│   │       ├── projects-section.tsx
│   │       └── contact-section.tsx
│   ├── data/                   # non-translated content (site config, skills, projects metadata)
│   ├── hooks/
│   │   └── use-direction.ts    # syncs <html dir/lang> with i18next
│   ├── i18n/
│   │   ├── i18n.ts             # i18next configuration
│   │   └── locales/
│   │       ├── en.json
│   │       └── ar.json
│   ├── lib/utils.ts            # `cn()` class merge helper
│   ├── types/index.ts          # shared TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # design tokens (CSS vars), RTL rules, utilities
├── index.html                  # entry point (optimized fonts & meta tags)
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

## Localization & RTL

- All UI copy lives in `src/i18n/locales/en.json` and `ar.json` — no hardcoded strings in components.
- `useDirection()` (`src/hooks/use-direction.ts`) keeps `<html dir lang>` in sync with the active i18next language, so:
  - Tailwind logical-property utilities (`text-start`, `ps-*`, `ms-*`, etc.) flip automatically.
  - Native flexbox row-axis ordering mirrors automatically under `dir="rtl"` — no manual `flex-row-reverse` needed.
  - The Bento grid and Aceternity-style components keep working unmodified in RTL since they rely on CSS Grid/Flexbox logical flow rather than hardcoded left/right offsets.
- The language switcher lives in the navbar (desktop + mobile) and persists the chosen language to `localStorage`.

## Content & Performance

- **Translatable copy** (headings, descriptions, project case studies, form labels) lives in `src/i18n/locales/*.json`.
- **Non-translated structural data** (tech icons, project tech stacks, links, site socials/email) lives in `src/data/*.ts`.
- **Performance Optimized**: Images are served in modern `WebP` formats, fonts are loaded asynchronously to prevent render-blocking, and unused components/styles have been eliminated to ensure high Lighthouse scores.
- **Contact Form**: The contact section is wired up to a live endpoint using Web3Forms. Submissions will be sent directly to the configured email address.
