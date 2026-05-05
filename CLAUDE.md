# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build (102 static pages, output: "standalone")
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
- **`products.ts`** — re-exports from all-products. Adds:
  - `productCategories[]` — 12 categorías de tipo de equipo (Transpaletas, Apiladores, Reach Truck, Todo Terreno, Manipuladores Telescópicos, Porta Contenedores, Tractores de Tiro, Plataformas Elevadoras, Accesorios + 3 fuel-type-as-category entries)
  - `fuelTypeCategories` — 4 fuel types with counts
  - `featuredProducts`, `getProductsByFuelType()`, `getCategoryProducts()`, `getFuelTypeName()`
- **`product-galleries.ts`** — maps product slugs to gallery image path arrays. Pattern: `{slug}-gallery-{n}.{ext}`
- **`company.ts`** — Contact info, locations (Santiago/Antofagasta/Copiapó), stats, certifications. Plus:
  - `teamByBranch[]` — vendedores agrupados por sucursal (Antofagasta + Santiago) con cargo, email, teléfono, zona
  - `salesTeam[]` — flat list (compatibilidad)
  - `strategicPartners[]` — 4 socios estratégicos / puntos de venta (Copiapó, Taltal, Iquique, Puerto Varas)
  - `partsTeam`, `serviceTeam`
- **`services.ts`** — 3 servicios: Venta, Servicio Técnico, Repuestos (Arriendo y Usados fueron removidos por solicitud del cliente)
- **`news.ts`** — 8 noticias scrapeadas de heliforklift.cl/noticias/ con título, fecha ISO + label, summary, content multi-párrafo (separado por `\n\n`), imagen local, categoría

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
- `/productos` — **Landing**: `FuelTypeLanding` bento (4 energy types) **+ `ProductCategoriesGrid`** (12 cards de tipo de equipo). No `?tipo=` ni `?categoria=` muestra landing.
- `/productos?tipo=electrica|diesel|glp|hidrogeno|todos` — **Filtered catalog** por tipo de energía
- `/productos?categoria={categorySlug}` — **Filtered catalog** por categoría de equipo (transpaletas, apiladores, reach-truck, etc.)
- `ProductCatalog` con dual filters (fuel type pills + category tabs). URL sync via `router.replace` y `useEffect`. Acepta `defaultFuelType` y `defaultCategory` props.
- `/productos/[slug]` — Product detail con `ProductGallery`, specs, `FuelTypeBadge`, related products, Product schema JSON-LD. SSG via `generateStaticParams()`.
- `/servicios` — 3 service cards (3-col grid en desktop)
- `/servicios/[slug]` — Service detail con hero, benefits stats, long-form sections. SSG. 3 routes: venta, servicio-tecnico, repuestos.
- `/nosotros` — `AboutHero`, mission/vision, `AnimatedTimeline` (scroll-driven), certifications, values
- `/contacto` — Quick-action cards (phone/email/WhatsApp), Google Maps + locations grid + **vendedores agrupados por sucursal** + **socios estratégicos**
- `/equipo` — Vista completa de vendedores por sucursal + área repuestos + servicio técnico + sucursales + socios estratégicos
- `/noticias` — Listing con featured + grid del resto. Imágenes en `public/assets/legacy/news/`
- `/noticias/[slug]` — Detalle SSG con relacionadas por categoría
- `/catalogo` — Landing por tipo de energía + CTA solicitar PDF por email
- `/trabaja-con-nosotros` — Hero + 4 beneficios + CTA email a `contacto@heliforklift.cl`
- `/ley-karin` — Información Ley 21.643, principios (confidencialidad, sin represalias, imparcialidad), canal de denuncias, link a Dirección del Trabajo

### Quote Form (CTASection.tsx)

The main conversion form. Fields ordered for B2B conversion optimization:
1. Nombre + Teléfono (hook fields)
2. **Plazo de inversión** — radio cards (NOT dropdown) with 4 options that segment leads visually: Próximos 30 días (urgent, red), 30-60 días (yellow), 60-90 días (sky), Sólo precios (gray). Each has icon + label + description.
3. Tipo de servicio (CustomSelect dropdown) — opciones actualizadas sin "Arrendar"
4. Empresa + RUT (auto-formatted Chilean RUT validation via `validateRut()` and `formatRut()`)
5. Email personal + Email empresa (separate fields)
6. Mensaje opcional

Validation: name + phone required, RUT/email validated only if present.

### Contact Info (Updated)

- **Phone (main):** `+56 9 9320 9186` (was `+56 9 5818 7035` — that number remains as Mauricio Glaser's direct line)
- **Hours:** `Lun-Vie: 08:30 - 18:00 hrs`
- **Email:** `contacto@heliforklift.cl`
- **WhatsApp:** redirects to `wa.me/56993209186`
- **Locations:** Santiago (principal), Antofagasta, Copiapó (Miami removed per client request)

### Images

All product/category images use `next/image` `<Image>` with `fill` + `sizes` for responsive srcset. Quality 75 for products, 80 for hero/landing. Formats: AVIF + WebP. `minimumCacheTTL: 30 days`.

Product images in `public/assets/legacy/products/` (200+ files) have white/light backgrounds. Use `product-img-container` CSS class on container divs to provide matching light gradient bg. `FuelTypeLanding` and `ProductCategoriesGrid` use them as `object-cover`/`object-contain` con dark/light gradient overlay.

News images in `public/assets/legacy/news/` (8 files) — descargadas directamente de `heliforklift.cl/wp-content/uploads/`.

### Git LFS Assets

Both `*.mp4` and `*.pdf` are tracked via Git LFS (see `.gitattributes`):
- `public/assets/hero-video.mp4` (99MB) — Hero background, uses `preload="metadata"` for fast load
- `public/assets/legacy/datasheets/*.pdf` (45 files, ~480MB) — Datasheets scraped from heliforklift.cl

After `git clone`, run `git lfs pull` to download. Linux build context for Docker copies all LFS-resolved files (~600MB transfer).

### Footer Links

Footer columns:
- **EQUIPOS:** 4 fuel types + Todos los equipos + Catálogo PDF
- **SERVICIOS:** Venta, Servicio Técnico, Repuestos (sin Arriendo ni Usados)
- **EMPRESA:** Nosotros, Equipo y Vendedores, Noticias, **Trabaja con nosotros**, **Información y denuncias (Ley Karin)**, Contacto
- **CONTACTO:** address + phone (`+56 9 9320 9186`) + email + horario

Navbar order (post-feedback): Inicio → **Nosotros (segundo)** → Equipos → Servicios → Noticias → Contacto.

### SEO

- `layout.tsx`: Organization + LocalBusiness schema, `title.template: "%s | Helifork Lift"`, metadataBase
- Each page defines `alternates: { canonical: "/path" }` (relative, resolved against metadataBase)
- `/productos` has dynamic metadata via `generateMetadata()` based on `?tipo=` o `?categoria=` params
- Product detail pages inject Product schema JSON-LD with specs and fuel type
- Service detail pages have unique title without duplicating "| Helifork Lift" suffix (template adds it)
- `sitemap.ts` generates 102 URLs (10 estáticas + 3 servicios + 12 categorías + 76 productos + 8 noticias)

### Deployment (Dokploy)

Dokploy on AWS EC2 runs Docker. Multi-stage build with `node:20-alpine`. Requires `output: "standalone"`. Exposes port 3000. Server domain via `traefik.me` with self-signed SSL.

**Common deploy issues:**
- **Docker Hub rate limit (429)**: server pulls `node:20-alpine` from Docker Hub. If hit, login as root: `sudo cp ~/.docker/config.json /root/.docker/config.json` after `docker login`.
- **No space left**: build context with PDFs is ~700MB. Server needs adequate disk.

### Key Conventions

- All text in **Spanish (Chile)**, using "tú" (informal). Use proper accents (á, é, í, ó, ú, ñ).
- Brand color: `--heli-red: #CE142D`. Accent: `--heli-yellow: #F5A623`
- Font stack: DM Sans (body), Bebas Neue (headings via `.font-heading`), JetBrains Mono (data)
- `cn()` utility from `@/lib/utils` for className merging (clsx + tailwind-merge)
- Touch targets: minimum 44px via `@media (pointer: coarse)` in globals.css
- `FuelTypeBadge` component for fuel type indicators: `sm` size (translucent, for cards), `md` size (solid bg, for detail pages)
- News content multi-párrafo: el campo `content` usa `\n\n` como separador y la página `[slug]` lo splittea con `.split("\n\n").map(...)`. **No inventar contenido de noticias** — todo viene scrapeado de heliforklift.cl.

@AGENTS.md
