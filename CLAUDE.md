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
- `/gracias` — Landing post-submit del form HubSpot **principal** (CTASection). `robots: { index: false }`, excluida del sitemap. Hero con check + 3 cards "Próximos pasos" + 3 links exploración + CTA WhatsApp urgente.

### Promo Landings (Meta Ads)

**3 landing pages independientes** sin navbar/footer principal (cero distracciones), `robots: { index: false }`, NO incluidas en sitemap, NO linkeadas desde el sitio. Diseñadas para campañas pagadas en Meta Ads.

| Ruta | Producto | Stock | Form ID HubSpot | Thank-you |
|---|---|---|---|---|
| `/promo/heli-gasolina-25` | HELI G3 Gasolina 2.5T | 10 unidades | `66a0f2cc-6e53-4755-ac9a-f07ba6732e2a` | `/promo/heli-gasolina-25/gracias` |
| `/promo/heli-gasolina-35` | HELI G3 Gas-Gasolina 3.5T | 10 unidades | `2db82f7c-34a1-47f1-bc3f-fc91eec69fdd` | `/promo/heli-gasolina-35/gracias` |
| `/promo/heli-diesel-k2` | HELI Diesel K2 (multi-tonelaje 2.5/3.0/3.5T) | 15 unidades | `8ae22a71-ea73-4cf7-8c57-634e768c0104` | `/promo/heli-diesel-k2/gracias` |

**Estructura común** (cada `PromoLanding.tsx`):
1. **Hero** — logo HELI blanco clickeable (link a `/`) + countdown 48hrs + título + specs grid + CTA "Cotizar ahora" + stock counter
2. **FeaturesGrid** — 6 spec cards con animación scroll (motor, capacidad, neumáticos, mástil, desplazador, asiento)
3. **Showcase** — imagen central grande (max-w-3xl, scale-110) + 2 cards laterales izquierda + 1 card destacada derecha (ANTES tenía hotspots con coords X/Y que nunca quedaban sobre la pieza real, fueron reemplazados por cards laterales)
4. **Benefits** — 3 cards (4 en K2 que incluye garantía 1 año)
5. **UseCases** — 6 industrias aplicables
6. **ConversionForm** — copy de conversión + form HubSpot embebido (color wrapper `#0d0d18` para matchear con iframe)
7. **FooterMini** — logo HELI blanco clickeable + email/teléfono
8. **FloatingCTA** — botón "Cotizar ahora" que aparece tras scroll > 600px (mobile: full-width sticky bottom; desktop: pill flotante esquina inferior derecha con `animate-ping` rojo)

**Shared component:** `src/app/promo/_shared/PromoThankYou.tsx` (carpeta privada con `_` que NO genera ruta) — recibe props `productName`, `productImage`, `productTagline`, `productSlug`. Usado en las 3 thank-you pages para tracking diferenciado por campaña (atributo `data-promo-thank-you={slug}` para Meta Pixel/GA4).

**Imágenes en `public/assets/promo/`** (no en `legacy/products/`):
- `heli-gasolina-35-front.png` + `heli-gasolina-35-side.png`
- `heli-diesel-k2-front.png` + `heli-diesel-k2-side.png` + `heli-diesel-k2-hero.png`
- 2.5T usa imágenes existentes en `legacy/products/g3-series-2-3.5t-gas-nobg.png`

**URLs originales del cliente** (no usadas, archivadas) en `public/assets/Campañas/{1,2,3}/`.

### Quote Form (CTASection.tsx) — HubSpot Embed

El form custom React fue **reemplazado por embed de HubSpot** (portal `50182752`, form `15b3dd6b-0095-4c03-a306-3dde97e81456` — form **principal del sitio**, distinto de los forms de las 3 promo landings).

**Implementación:**
- `useEffect` inyecta `https://js.hsforms.net/forms/embed/v2.js` una sola vez globalmente
- Cada instancia llama `window.hbspt.forms.create({ region, portalId, formId, target })` con un ID único en runtime (`hs-form-{random}`) — soporta múltiples renders por página y SPA navigation
- Wrapper visual exterior: `motion.div` con borde + bg + padding (NO en `.hubspot-form-container` para evitar doble borde con el container interno de HubSpot)

**⚠️ HubSpot renderiza dentro de un `<iframe>`** — el CSS de la página NO entra al iframe. Todos los estilos del form (inputs, botones, colores, radio cards) se configuran en **HubSpot > Marketing > Forms > tu form > Style and preview**. Aquí solo controlamos el wrapper exterior.

**Post-submit redirect:** configurado en HubSpot a `https://heliforklift.cl/gracias` (form principal) o `https://heliforklift.cl/promo/{slug}/gracias` (forms de promo landings).

**CustomCursor.tsx:** detecta cuando el mouse entra a `.hubspot-form-container` y oculta el cursor custom (scale 0, opacity 0) + restaura cursor nativo del browser dentro del form. Detección via `target.closest(".hubspot-form-container")` en `mouseover` handler.

**Páginas que renderizan `<CTASection />`:** homepage, contacto, nosotros, productos (landing y filtered), productos/[slug], servicios (landing y [slug]), noticias (landing y [slug]), equipo. Las **promo landings tienen su propio `ConversionForm` interno**, no usan CTASection.

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

**Layout-level (`layout.tsx`):**
- Metadata global: `title.template: "%s | Helifork Lift"`, `metadataBase: https://heliforklift.cl`, robots `index: true, follow: true`
- **Organization schema** JSON-LD (foundingDate 1958, address, contactPoint, sameAs)
- **LocalBusiness schema** JSON-LD con `geo` (lat -33.3676, lng -70.7283 — Quilicura), `postalCode: "8710000"`, `openingHoursSpecification` estructurado (Lun-Vie 08:30-18:00), `priceRange: "$$$"`, `areaServed: Chile`
- Teléfono actual: `+56-9-9320-9186` (NO usar el viejo `+56-9-5818-7035` que era de Mauricio Glaser)
- Tracking inyectado en `<head>`: GTM (`GTM-M9FW8BM3`), GA4 (`G-3HLYKF62PW`), Meta Pixel (`1475698744101032`). Ver sección **Tracking & Analytics** abajo.
- `<html lang="es">` (sitio mono-idioma, sin hreflang)

**Page-level metadata:**
- Cada página define `alternates: { canonical: "/path" }` (relativo, resuelto contra metadataBase)
- `/productos` tiene `generateMetadata()` dinámico según `?tipo=` o `?categoria=`
- Páginas con keywords arrays: `/contacto`, `/equipo`, `/catalogo`, `/noticias`, `/servicios`, `/productos/[slug]` — keywords B2B chilenos optimizados
- Open Graph: imagen global `/og-image.jpg` (1200x630) + dinámicas en pages detail (`product.image`, `service.image`, `news.image`)

**Schemas JSON-LD por página detail:**
- `/productos/[slug]`: **Product** (con `additionalProperty` para capacidad/motor/altura) + **BreadcrumbList** + **FAQPage** (5 preguntas dinámicas con respuestas adaptadas según `fuelType`)
- `/servicios/[slug]`: **Service** (con `provider` Helifork Lift) + **BreadcrumbList**
- `/noticias/[slug]`: **NewsArticle** (`datePublished`, `author`, `publisher`, `articleSection`) + **BreadcrumbList**

**Sitemap (`sitemap.ts`):**
- 109 URLs (10 estáticas + 3 servicios + 12 categorías + 76 productos + 8 noticias)
- **Image Sitemap activado**: cada `<url>` incluye `images: [absoluteImg(...)]` (homepage tiene 2: og-image + banner; productos/servicios/noticias/categorías tienen 1 cada uno)
- Helper `absoluteImg()` convierte paths relativos a URLs absolutas
- **NO incluidas:** `/gracias`, `/promo/*`, `/promo/*/gracias` (todas con `robots: { index: false }`)

**Robots (`robots.ts`):** `Allow: /`, `Disallow: /api/`, sitemap apunta a `/sitemap.xml`. Las páginas con `noindex` se manejan por metadata individual, no por robots.txt.

**SEO Audit score:** ~95/100 después de aplicar fixes de teléfono/geo/postalCode/openingHours, h1 SEO en `/nosotros` (con `sr-only`), BreadcrumbList en pages detail, FAQ schema en productos, keywords arrays expandidos, e Image Sitemap.

### Tracking & Analytics

3 sistemas de tracking inyectados en `<head>` de `layout.tsx`:

| Sistema | ID | Cobertura |
|---|---|---|
| Google Tag Manager | `GTM-M9FW8BM3` | Toda la web |
| Google Analytics 4 | `G-3HLYKF62PW` | Toda la web (vía gtag) |
| Meta Pixel | `1475698744101032` | Toda la web (PageView automático) |

**Eventos custom de Meta Pixel** (diferenciar campañas Meta Ads por landing):

`ViewContent` se dispara en cada PromoLanding con `useEffect` al montarse:

| Landing | content_name | content_category |
|---|---|---|
| `/promo/heli-gasolina-25` | `promo_25t` | `gasolina` |
| `/promo/heli-gasolina-35` | `promo_35t` | `gasolina` |
| `/promo/heli-diesel-k2` | `promo_k2` | `diesel` |

`Lead` se dispara en cada thank-you page (conversión principal optimizada en Meta Ads):

| Thank-you | content_name | value (CLP) |
|---|---|---|
| `/promo/heli-gasolina-25/gracias` | `promo_25t` | 14.000.000 |
| `/promo/heli-gasolina-35/gracias` | `promo_35t` | 18.000.000 |
| `/promo/heli-diesel-k2/gracias` | `promo_k2` | 16.000.000 |
| `/gracias` (form principal) | `form_principal` | (sin valor) |

Implementación:
- `PromoThankYou.tsx` (componente compartido) — tiene mapa `PROMO_TRACKING` con `contentName + value` por slug. Dispara `Lead` con `useEffect` basado en prop `productSlug`.
- `MetaPixelLead.tsx` ([src/components/shared/](heliforklift-web/src/components/shared/MetaPixelLead.tsx)) — wrapper cliente reutilizable para disparar `Lead` desde Server Components (como `/gracias/page.tsx`).
- Cada landing extiende `declare global { Window { fbq?: ... } }` para type safety sin `@ts-ignore`.

**Custom Conversions en Meta** (configurar manualmente en Events Manager): "Lead - HELI 2.5T", "Lead - HELI 3.5T", "Lead - HELI K2", "Lead - Form Principal". Cada una con regla `Event=Lead AND content_name=<value>` o `URL contains <path>`.

**Conversions API (CAPI)**: pendiente de configurar en HubSpot → Settings → Integrations → Meta Ads para envío server-side de eventos `Lead` (recupera 25-40% de conversiones perdidas por iOS 14.5 ATT).

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
