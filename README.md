# Baraa — Portfolio

A premium, monochromatic dark-themed developer portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion. Fully bilingual (English / Arabic) with automatic RTL layout mirroring.

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS (CSS-variable based monochrome theme)
- **Animation:** Framer Motion
- **Localization:** i18next / react-i18next (English + Arabic, RTL-aware)
- **Icons:** lucide-react (UI) + react-icons/si (tech-stack brand marks)
- **UI patterns:** Custom, from-scratch implementations in the spirit of Aceternity UI (Text Hover Effect, Flip Words, Card Spotlight, Sticky Scroll Reveal, Text Reveal Card, Resizable Navbar) and shadcn/ui (Button, Input, Textarea, Label — CVA + `cn()` conventions)

## Getting Started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run preview   # preview the production build locally
npm run lint       # eslint
```

## Folder Structure

```
├── public/
│   └── images/
│       ├── headshot.jpeg       # hero portrait
│       ├── logo.svg            # BARAA wordmark (currentColor-ready source)
│       └── og-cover.jpeg       # social share preview image
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
│   │   │   ├── input.tsx / textarea.tsx / label.tsx
│   │   │   ├── logo.tsx
│   │   │   ├── magnetic-button.tsx
│   │   │   ├── project-visual.tsx
│   │   │   ├── resizable-navbar.tsx
│   │   │   ├── section-heading.tsx
│   │   │   ├── sticky-scroll-reveal.tsx
│   │   │   └── text-hover-effect.tsx / text-reveal-card.tsx
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
│   │   ├── use-direction.ts    # syncs <html dir/lang> with i18next
│   │   └── use-media-query.ts
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
├── index.html
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

## Content

- Translatable copy (headings, descriptions, project case studies, form labels) → `src/i18n/locales/*.json`.
- Non-translated structural data (tech icons, project tech stacks, links, site socials/email) → `src/data/*.ts`.
- Project visuals are generated abstract "device mockups" (`components/ui/project-visual.tsx`) rather than static screenshots, so the section works out of the box — swap in real product screenshots/videos per project whenever they're ready.
- The contact form currently simulates a network request (see the `NOTE` in `contact-section.tsx`) — wire it up to a real endpoint (Formspree, EmailJS, your own API route, etc.) before going live.
