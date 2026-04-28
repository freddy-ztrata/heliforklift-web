# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build (86+ static pages, output: "standalone")
npm run start        # Serve production build on port 3000
npm run lint         # ESLint
npx tsc --noEmit     # Type check without emitting
```

**Known build issue:** `output: "standalone"` fails on the final copy step on Windows+OneDrive due to Sharp's `.node` binary file locking. Compilation and static page generation succeed — only the standalone bundling step errors. Does not affect `npm run dev` or Linux/Docker deployment.

## Architecture

**Helifork Lift** — commercial website for HELI Chile (forklift distributor). Next.js 16 App Router with `output: "standalone"` for Docker deployment.

### Next.js 16 — Read the Docs First

This uses Next.js 16 which has breaking changes from earlier versions. Before writing API code, check `node_modules/next/dist/docs/01-app/`. Key differences: `params` and `searchParams` are `Promise`-based (must `await`), and `dynamic` import from `next/dynamic` requires `"use client"` to use `ssr: false`.

### Tailwind CSS v4

Uses `@import "tailwindcss"` syntax with `@theme inline` in `globals.css`. Theme colors are CSS variables (`--heli-red: #CE142D`, `--steel-900: #111118`, etc.) mapped via `--color-*` tokens. **No `tailwind.config.ts`** — everything is in CSS. Custom utility classes: `.bg-dot-pattern`, `.bg-grid-pattern`, `.glow-red`, `.font-heading`, `.product-img-container`.

### Component Pattern

- **Server Components** by default (pages, Footer)
- **Client Components** (`"use client"`) for hooks, framer-motion, browser APIs
- `ClientOnly.tsx` wraps `ssr: false` components (Server Components forbid `ssr: false` in Next.js 16)
- Animated sections use framer-motion with `useInView` (scroll-triggered, `once: true`) OR `useScroll`/`useTransform` (scroll-driven continuous, e.g. `HowItWorks`, `AnimatedTimeline`)
- Homepage uses `dynamic()` imports for below-fold sections

### Data Layer

`src/lib/data/` is the single source of truth for all content:

- **`all-products.ts`** — 76 products across 12 categories. Defines `RawProduct` (without fuelType) and `FullProduct` (with fuelType). Individual category arrays (`electricForklifts`, `combustionForklifts`, etc.) are `RawProduct[]`. Exported `allProducts` is `FullProduct[]` mapped via `deriveFuelType()` from each product's `power` field.
- **`products.ts`** — re-exports from all-products, adds `ProductCategory[]`, `featuredProducts`, `fuelTypeCategories` (4 fuel types with counts), `getProductsByFuelType()`, `getFuelTypeName()`, `getCategoryProducts()`
- **`product-galleries.ts`** — maps product slugs to gallery image path arrays. Pattern: `{slug}-gallery-{n}.{ext}`
- **`product-datasheets.ts`** — maps product slugs to PDF datasheet paths. 42 of 76 products have a datasheet. Use `getDatasheet(slug)` which returns `null` if not available; product detail page falls back to "Solicitar ficha técnica" link.
- **`company.ts`** — company info, contact details (3 locations: Santiago, Antofagasta, Copiapó — Miami removed per client request), stats, certifications
- **`services.ts`** — 5 services with `slug`, `heroSubtitle`, `sections[]`, `benefits[]` for individual `/servicios/[slug]` pages

### Fuel Type System

Every product has a `fuelType: FuelType` field derived from `power`:
- `"Electrica"` — power starts with "Electrica"
- `"Diesel"` — power starts with "Diesel" (without GLP)
- `"Diesel / GLP"` — power contains both
- `"GLP"` — power is "GLP (Gas Licuado)"
- `"Hidrogeno"` — power is "Celda de Combustible H2"
- `"N/A"` — accessories (Hidraulico, Mecanico)

Products with `"Diesel / GLP"` appear in both Diesel and GLP filtered views. Accessories (`"N/A"`) only show in "Todos" with no badge.

### Page Structure

- `/` — Homepage: Hero (video bg) → TrustBar (marquee) → ProductShowcase (bento, links to filtered catalog by fuel type) → Services → WhyChooseUs → HowItWorks → CTASection
- `/productos` — **Landing**: `FuelTypeLanding` bento (4 energy types). No `?tipo=` param shows landing.
- `/productos?tipo=electrica|diesel|glp|hidrogeno|todos` — **Filtered catalog**: `ProductCatalog` with dual filters (fuel type pills + category tabs). URL sync via `router.replace` and `useEffect` syncs state when URL changes externally.
- `/productos/[slug]` — Product detail with `ProductGallery`, specs, `FuelTypeBadge`, datasheet download (when available), related products, Product schema JSON-LD. SSG via `generateStaticParams()`.
- `/servicios` — Service cards (6-col grid centers last 2 cards on desktop)
- `/servicios/[slug]` — Service detail with hero, benefits stats, long-form sections, other services. SSG. 5 routes: venta, arriendo, servicio-tecnico, repuestos, usados.
- `/nosotros` — `AboutHero`, mission/vision, `AnimatedTimeline` (scroll-driven), certifications, values
- `/contacto` — Quick-action cards (phone/email/WhatsApp), Google Maps + locations grid

### Quote Form (CTASection.tsx)

The main conversion form. Fields ordered for B2B conversion optimization:
1. Nombre + Teléfono (hook fields)
2. **Plazo de inversión** — radio cards (NOT dropdown) with 4 options that segment leads visually: Próximos 30 días (urgent, red), 30-60 días (yellow), 60-90 días (sky), Sólo precios (gray). Each has icon + label + description.
3. Tipo de servicio (CustomSelect dropdown)
4. Empresa + RUT (auto-formatted Chilean RUT validation via `validateRut()` and `formatRut()`)
5. Email personal + Email empresa (separate fields)
6. Mensaje opcional

Validation: name + phone required, RUT/email validated only if present.

### Images

All product/category images use `next/image` `<Image>` with `fill` + `sizes` for responsive srcset. Quality 75 for products, 80 for hero/landing. Formats: AVIF + WebP. `minimumCacheTTL: 30 days`.

Product images in `public/assets/legacy/products/` (200+ files) have white/light backgrounds. Use `product-img-container` CSS class on container divs to provide matching light gradient bg. `FuelTypeLanding` uses them as `object-cover` background with dark gradient overlay.

### Git LFS Assets

Both `*.mp4` and `*.pdf` are tracked via Git LFS (see `.gitattributes`):
- `public/assets/hero-video.mp4` (99MB) — Hero background, uses `preload="metadata"` for fast load
- `public/assets/legacy/datasheets/*.pdf` (45 files, ~480MB) — Real datasheets scraped from heliforklift.cl

After `git clone`, run `git lfs pull` to download. Linux build context for Docker copies all LFS-resolved files (~600MB transfer).

### SEO

- `layout.tsx`: Organization + LocalBusiness schema, `title.template: "%s | Helifork Lift"`, metadataBase
- Each page defines `alternates: { canonical: "/path" }` (relative, resolved against metadataBase)
- `/productos` has dynamic metadata via `generateMetadata()` based on `?tipo=` param (e.g., "Grúas Eléctricas — Catálogo de Equipos")
- Product detail pages inject Product schema JSON-LD with specs and fuel type
- Service detail pages have unique title without duplicating "| Helifork Lift" suffix (template adds it)
- `sitemap.ts` generates 86 URLs (5 static + 5 services + 76 products)

### Deployment (Dokploy)

Dokploy on AWS EC2 runs Docker. Multi-stage build with `node:20-alpine`. Requires `output: "standalone"`. Exposes port 3000. Server domain via `traefik.me` with self-signed SSL.

**Common deploy issues:**
- **Docker Hub rate limit (429)**: server pulls `node:20-alpine` from Docker Hub. If hit, login as root: `sudo cp ~/.docker/config.json /root/.docker/config.json` after `docker login`.
- **No space left**: build context with PDFs is ~700MB. Server needs adequate disk.

### Key Conventions

- All text in **Spanish (Chile)**, "tú" (informal). Use proper accents (á, é, í, ó, ú, ñ).
- Brand color: `--heli-red: #CE142D`. Accent: `--heli-yellow: #F5A623`
- Font stack: DM Sans (body), Bebas Neue (`.font-heading`), JetBrains Mono (data)
- `cn()` from `@/lib/utils` for className merging (clsx + tailwind-merge)
- Touch targets: minimum 44px via `@media (pointer: coarse)` in globals.css
- `FuelTypeBadge` component: `sm` size (translucent, cards), `md` size (solid bg, detail pages)

@AGENTS.md
