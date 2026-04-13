# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build (86 static pages)
npm run start        # Serve production build on port 3000
npm run lint         # ESLint
npx tsc --noEmit     # Type check without emitting
```

## Architecture

**Helifork Lift** — commercial website for HELI Chile (forklift distributor). Next.js 16 App Router with `output: "standalone"` for Docker deployment.

### Tailwind CSS v4

Uses `@import "tailwindcss"` syntax with `@theme inline` in `globals.css`. All theme colors are CSS variables (`--heli-red: #CE142D`, `--steel-900: #111118`, etc.) mapped via `--color-*` tokens. There is **no `tailwind.config.ts`** — everything is in CSS. Custom utility classes: `.bg-dot-pattern`, `.bg-grid-pattern`, `.glow-red`, `.font-heading`, `.product-img-container`.

### Component Pattern

- **Server Components** by default (pages, Footer)
- **Client Components** (`"use client"`) for hooks, framer-motion, browser APIs
- `ClientOnly.tsx` wraps `ssr: false` components — Next.js 16 forbids `ssr: false` in Server Components
- All animated sections use framer-motion with `useInView` (scroll-triggered, `once: true`) or `useScroll`/`useTransform` (scroll-driven continuous)

### Data Layer

`src/lib/data/` is the single source of truth for all content:
- `all-products.ts` — **76 products** across 12 categories with full specs, images, slugs. Exports category arrays (`electricForklifts`, `combustionForklifts`, etc.) and combined `allProducts`
- `products.ts` — re-exports from all-products, adds `ProductCategory[]`, `featuredProducts`, `getCategoryProducts()`
- `product-galleries.ts` — maps product slugs to gallery image path arrays
- `company.ts` — company info, contact details, stats, certifications
- `services.ts` — 5 service definitions with icon names, features, CTA text

### Page Structure

- `/` — Homepage: Hero (video bg) → TrustBar (marquee) → ProductShowcase (bento) → Services → WhyChooseUs → HowItWorks (scroll-driven timeline) → CTASection (form)
- `/productos` — Client-side filterable catalog (`ProductCatalog.tsx`), shows all 76 products, filter by category
- `/productos/[slug]` — Product detail with `ProductGallery`, specs grid, related products, Product schema JSON-LD. Uses `generateStaticParams()` for SSG
- `/servicios` — 5 service cards with background images, 6-col grid centering last 2
- `/nosotros` — `AboutHero` (animated counters), mission/vision, `AnimatedTimeline` (scroll-driven), certifications, values
- `/contacto` — Quick-action cards (phone/email/WhatsApp), map + locations grid

### SEO

- `layout.tsx`: Organization + LocalBusiness schema, `title.template: "%s | Helifork Lift"`, metadataBase
- Each page has unique `metadata` with `alternates.canonical`
- `sitemap.ts` generates 81 URLs dynamically (5 static + 76 products)
- Product detail pages inject Product schema JSON-LD with specs
- All pages verified: single H1, proper heading hierarchy, OG + Twitter Cards

### Images

Product images in `public/assets/legacy/products/` (200+ files). They have white/light backgrounds — use the CSS class `product-img-container` on the container div to provide a matching light gradient background on the dark theme.

Gallery images follow the pattern: `{wc-slug}-gallery-{n}.{ext}`. The mapping is in `product-galleries.ts`.

### Hero Video

`public/assets/hero-video.mp4` (99MB) tracked via **Git LFS**. Used as background in the homepage Hero only. After `git clone`, run `git lfs pull` if the video isn't downloaded.

### Deployment

Dockerfile uses multi-stage build with `node:20-alpine`. Requires `output: "standalone"` in `next.config.ts`. Exposes port 3000.

### Key Conventions

- All text in **Spanish (Chile)**, using "tú" (informal)
- Brand color: `--heli-red: #CE142D`. Accent: `--heli-yellow: #F5A623`
- Font stack: DM Sans (body), Bebas Neue (headings via `.font-heading`), JetBrains Mono (data)
- Scroll-driven animations use `useScroll` + `useTransform` (HowItWorks, AnimatedTimeline)
- One-shot animations use `useInView` with `once: true`
- Touch targets: minimum 44px enforced via `@media (pointer: coarse)` in globals.css
- `cn()` utility from `@/lib/utils` for className merging (clsx + tailwind-merge)

@AGENTS.md
