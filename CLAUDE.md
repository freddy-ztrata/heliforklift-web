# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build (86 static pages)
npm run start        # Serve production build
npm run lint         # ESLint
npx tsc --noEmit     # Type check without emitting
```

## Architecture

**Helifork Lift** — commercial website for HELI Chile (forklift distributor). Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion.

### Tailwind CSS v4
Uses the new `@import "tailwindcss"` syntax with `@theme inline` blocks in `globals.css`. Theme colors are CSS variables (`--heli-red`, `--steel-900`, etc.) mapped to Tailwind via `--color-*` tokens. There is **no `tailwind.config.ts`** — all config lives in CSS.

### Component Pattern
- **Server Components** by default (pages, Footer)
- **Client Components** (`"use client"`) for anything with hooks, framer-motion, or browser APIs
- `ClientOnly.tsx` wraps components that need `ssr: false` (e.g., CustomCursor) — Next.js 16 forbids `ssr: false` in Server Components

### Data Layer
All product/company data is in `src/lib/data/`:
- `all-products.ts` — 76 products with full specs, images, slugs. Exports category arrays (`electricForklifts`, `combustionForklifts`, etc.) and `allProducts` combined array
- `products.ts` — re-exports from all-products, adds `ProductCategory[]` and `featuredProducts` for homepage
- `product-galleries.ts` — maps product slugs to gallery image arrays
- `company.ts` — company info, contact details, stats, certifications
- `services.ts` — 5 service definitions

### Page Structure
- `/` — Homepage: Hero → TrustBar → ProductShowcase → Services → WhyChooseUs → HowItWorks → CTASection
- `/productos` — Filterable catalog (client-side filter, all products shown by default)
- `/productos/[slug]` — Product detail with gallery, specs, related products, Product schema JSON-LD
- `/servicios`, `/nosotros`, `/contacto` — Static pages with CTASection

### SEO
- `layout.tsx` has Organization + LocalBusiness schema, global metadata with `title.template`
- Each page defines its own `metadata` with unique canonical via `alternates.canonical`
- `sitemap.ts` dynamically generates 81 URLs from `allProducts`
- Product detail pages inject Product schema JSON-LD

### Image Assets
Product images are in `public/assets/legacy/products/` (200+ files scraped from heliforklift.cl). Referenced via `/assets/legacy/products/filename.ext`. Product images have white backgrounds — the CSS class `product-img-container` provides a light gradient background that blends with them on the dark theme.

### Hero Video
`public/assets/hero-video.mp4` (99MB) is gitignored. Must be manually placed for the Hero background video to work. The Hero gracefully degrades without it.

### Deployment
Dockerfile configured for standalone Next.js output. Port 3000.

@AGENTS.md
