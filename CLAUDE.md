# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build (86+ static pages)
npm run start        # Serve production build on port 3000
npm run lint         # ESLint
npx tsc --noEmit     # Type check without emitting
```

**Known build issue:** `output: "standalone"` fails on the final copy step on Windows+OneDrive due to Sharp's `.node` binary file locking. The compilation and static page generation succeed — only the standalone bundling step errors. This does not affect `npm run dev` or deployment via Docker on Linux.

## Architecture

**Helifork Lift** — commercial website for HELI Chile (forklift distributor). Next.js 16 App Router with `output: "standalone"` for Docker deployment.

### Next.js 16 — Read the Docs First

This uses Next.js 16 which has breaking changes from earlier versions. Before writing any code, check `node_modules/next/dist/docs/01-app/` for current API docs. Key differences: `params` and `searchParams` are `Promise`-based (must `await`), `dynamic` import from `next/dynamic` is the lazy-loading API.

### Tailwind CSS v4

Uses `@import "tailwindcss"` syntax with `@theme inline` in `globals.css`. All theme colors are CSS variables (`--heli-red: #CE142D`, `--steel-900: #111118`, etc.) mapped via `--color-*` tokens. There is **no `tailwind.config.ts`** — everything is in CSS. Custom utility classes: `.bg-dot-pattern`, `.bg-grid-pattern`, `.glow-red`, `.font-heading`, `.product-img-container`.

### Component Pattern

- **Server Components** by default (pages, Footer)
- **Client Components** (`"use client"`) for hooks, framer-motion, browser APIs
- `ClientOnly.tsx` wraps `ssr: false` components
- Animated sections use framer-motion with `useInView` (scroll-triggered, `once: true`) or `useScroll`/`useTransform` (scroll-driven continuous)
- Homepage uses `dynamic()` imports for below-fold sections (Services, WhyChooseUs, HowItWorks, CTASection)

### Data Layer

`src/lib/data/` is the single source of truth for all content:

- `all-products.ts` — **76 products** across 12 categories. Defines `RawProduct` (without fuelType) and `FullProduct` (with fuelType). Individual category arrays (`electricForklifts`, `combustionForklifts`, etc.) are `RawProduct[]`. The exported `allProducts` array maps all products to `FullProduct[]` by deriving `fuelType` from the `power` field via `deriveFuelType()`.
- `products.ts` — re-exports from all-products, adds `ProductCategory[]`, `featuredProducts`, `fuelTypeCategories` (4 fuel types with counts), `getProductsByFuelType()`, `getFuelTypeName()`, `getCategoryProducts()`
- `product-galleries.ts` — maps product slugs to gallery image path arrays
- `company.ts` — company info, contact details, stats, certifications
- `services.ts` — 5 service definitions with icon names, features, CTA text

### Fuel Type System

Every product has a `fuelType: FuelType` field derived from `power`:
- `"Electrica"` — power starts with "Electrica"
- `"Diesel"` — power starts with "Diesel" (without GLP)
- `"Diesel / GLP"` — power contains both "Diesel" and "GLP"
- `"GLP"` — power is "GLP (Gas Licuado)"
- `"Hidrogeno"` — power is "Celda de Combustible H2"
- `"N/A"` — accessories (Hidraulico, Mecanico)

Products with `"Diesel / GLP"` appear in both Diesel and GLP filtered views. Accessories (`"N/A"`) only appear in "Todos" view with no badge.

### Page Structure

- `/` — Homepage: Hero (video bg) → TrustBar (marquee) → ProductShowcase (bento) → Services → WhyChooseUs → HowItWorks → CTASection (form)
- `/productos` — **Landing page**: FuelTypeLanding bento grid showing 4 energy types (Electrica, Diesel, GLP, Hidrogeno). Each links to filtered catalog.
- `/productos?tipo=electrica|diesel|glp|hidrogeno|todos` — **Filtered catalog**: ProductCatalog with dual-level filters (fuel type pills + category tabs). URL sync via `router.replace`.
- `/productos/[slug]` — Product detail with ProductGallery, specs grid, FuelTypeBadge, related products, Product schema JSON-LD. Uses `generateStaticParams()` for SSG.
- `/servicios` — 5 service cards with background images
- `/nosotros` — AboutHero, mission/vision, AnimatedTimeline, certifications, values
- `/contacto` — Quick-action cards (phone/email/WhatsApp), map + locations grid

### Images

All product/category images use `next/image` `<Image>` component with:
- `fill` + `sizes` for responsive srcset
- `quality={75}` for product images, `quality={80}` for hero/landing
- Formats: AVIF and WebP (configured in `next.config.ts`)
- `minimumCacheTTL: 30 days` for optimized image cache
- Static assets have `Cache-Control: immutable` headers (1 year)

Product images in `public/assets/legacy/products/` (200+ files) have white/light backgrounds. Use `product-img-container` CSS class on container divs for matching light gradient bg on dark theme. The `FuelTypeLanding` component uses these as `object-cover` background images with dark gradient overlay.

Gallery images follow the pattern: `{slug}-gallery-{n}.{ext}` in `product-galleries.ts`.

### Hero Video

`public/assets/hero-video.mp4` (99MB) tracked via **Git LFS**. Uses `preload="metadata"` (not "auto") with a poster image for fast initial display. After `git clone`, run `git lfs pull` if the video isn't downloaded.

### SEO

- `layout.tsx`: Organization + LocalBusiness schema, `title.template: "%s | Helifork Lift"`, metadataBase
- `/productos` page has dynamic metadata via `generateMetadata()` based on `?tipo=` param
- Product detail pages inject Product schema JSON-LD with specs including fuel type
- `sitemap.ts` generates URLs dynamically (5 static + 76 products)

### Deployment

Dockerfile uses multi-stage build with `node:20-alpine`. Requires `output: "standalone"` in `next.config.ts`. Exposes port 3000.

### Key Conventions

- All text in **Spanish (Chile)**, using "tú" (informal). Use proper accents (á, é, í, ó, ú, ñ).
- Brand color: `--heli-red: #CE142D`. Accent: `--heli-yellow: #F5A623`
- Font stack: DM Sans (body), Bebas Neue (headings via `.font-heading`), JetBrains Mono (data)
- `cn()` utility from `@/lib/utils` for className merging (clsx + tailwind-merge)
- Touch targets: minimum 44px via `@media (pointer: coarse)` in globals.css
- `FuelTypeBadge` component for fuel type indicators: `sm` size (translucent, for cards), `md` size (solid bg, for detail pages)

@AGENTS.md
