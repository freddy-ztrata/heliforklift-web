# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build (~115 static pages, Turbopack, output: "standalone")
npm run start        # Serve production build on port 3000
npm run lint         # ESLint
npx tsc --noEmit     # Type check without emitting
```

**Known build issue:** `output: "standalone"` fails on the final copy step on Windows+OneDrive due to Sharp's `.node` binary file locking. Compilation and static page generation succeed — only the standalone bundling step errors. Does not affect `npm run dev` or Linux/Docker deployment. Note: the Turbopack build does **not** print per-route bundle sizes (no "First Load JS" column).

**Git on Windows + OneDrive:** `git status`/`commit` via git-bash intermittently fail with `fatal: mmap failed: Invalid argument` (mmap over the OneDrive-synced index). Use **PowerShell** for git index ops (`git status`, `git commit`, `git push`); native Windows git is stable. In PowerShell, here-string commit messages (`@'...'@`) break if the text contains double-quotes — write messages without `"`. A push "RemoteException" in PowerShell is just git's stderr progress — check `$LASTEXITCODE` (0 = OK).

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

### Brand Landing — Google Ads always-on (`/cotiza`)

LP de marca completa para campañas **always-on de Google Ads** (NO Meta). `robots: { index: false }`, fuera del sitemap, sin navbar/footer del sitio. Representa toda la marca y todos los tipos de equipo. Archivos: [src/app/cotiza/](heliforklift-web/src/app/cotiza/) — `CotizaLanding.tsx` (client, todas las secciones), `page.tsx` (metadata), `gracias/` (`CotizaGracias.tsx` + `page.tsx`).

- **Secciones (cada una con layout DISTINTO para no repetir el patrón de "tarjetas/calugas"):** StickyHeader → Hero (top bar con logo HELI siempre visible + chips de energía + 1 máquina) → **FleetMarquee** (marquee infinito a todo el ancho, 8 máquinas) → TrustStrip (stats animadas `CountUp` + chips de certificación) → **EnergyBento** (bento asimétrico: hidrógeno destacado grande + 3 filas compactas) → **FeaturedOffers** (3 filas showcase alternadas que destacan 3 productos: transpaleta CBD15/20, combustión G3, H4 eléctrica; los CTA **NO** navegan a las promo landings — preseleccionan el equipo en el cotizador y hacen scroll a `#cotiza` vía `pickAndScroll`) → **WhyHeli** (split editorial: heading sticky izq + filas con divisores, sin tarjetas) → **CTABanner** (franja roja full-width que rompe el ritmo) → **Categories** (nube de chips/pills, no tarjetas) → **Services** (3 columnas editoriales con números 01/02/03 + divisores verticales) → **Process** (línea de tiempo horizontal con nodos conectados) → **Quoter** (form) → Coverage (split + tiles de sucursales) → FAQ (acordeón) → FinalCTA → Footer → FloatingBar (móvil). Fondos alternados (steel-950 / gradiente / radial / rojo) para variar el ritmo.
- **Datos reales:** importa `company`, `contact`, `certifications` de `company.ts` y `fuelTypeCategories` de `products.ts`. Mensajería de marca: "líder mundial" (frase aprobada por el cliente) + stats concretas (67+ años, 1.100+ equipos, 150+ países, 1.700+ modelos). **NO** usar "#1 mundial" (company.ts dice `globalRanking: 7` y la misión es entrar al Top 5).
- **Form = embed de HubSpot** (formato "developer"). El cotizador (`Quoter`) inyecta `https://js.hsforms.net/forms/embed/developer/50182752.js` (defer, una vez) y renderiza `<div class="hs-form-html" data-region="na1" data-form-id="d9974614-f923-4712-b337-79132d6705e5" data-portal-id="50182752">` — el script auto-renderiza ese div. **Distinto del v2.js** que usa `CTASection`. El estilo del form y el redirect post-submit (a `/cotiza/thanks-page` para disparar la conversión) se configuran en HubSpot. Todos los CTA/cards de la LP solo hacen scroll a `#cotiza` (vía `goQuote`); ya **no** hay selector de chips ni preselección.
- **Tracking:** la thank-you (`CotizaGracias`) dispara `fbq('track','Lead', {content_name:'cotiza_brand'})` y `dataLayer.push({event:'generate_lead'})` para Google Ads/GTM. La conversión de Google Ads se configura sobre `/cotiza/thanks-page` o el evento `generate_lead`.
- **Imágenes del fleet:** `public/assets/cotiza/fleet-{electrica,hidrogeno,reach,telescopico,todoterreno}.webp` — recortadas (flood-fill lossless) desde renders oficiales en `legacy/products/`. El marquee combina estas + las promo transparentes (`heli-diesel-k2-hero`, `heli-combustion-g3-hero`, `heli-h4-electrica-hero`).

### Promo Landings (Meta Ads)

**7 landing pages independientes** sin navbar/footer principal (cero distracciones), `robots: { index: false }`, NO incluidas en sitemap, NO linkeadas desde el sitio. Diseñadas para campañas pagadas en Meta Ads.

| Ruta | Producto | Stock | Form ID HubSpot | Thank-you |
|---|---|---|---|---|
| `/promo/heli-gasolina-25` | HELI G3 Gasolina 2.5T | 10 unidades | `66a0f2cc-6e53-4755-ac9a-f07ba6732e2a` | `/promo/heli-gasolina-25/gracias` |
| `/promo/heli-gasolina-35` | HELI G3 Gas-Gasolina 3.5T | 10 unidades | `2db82f7c-34a1-47f1-bc3f-fc91eec69fdd` | `/promo/heli-gasolina-35/gracias` |
| `/promo/heli-diesel-k2` | HELI Diesel K2 (multi-tonelaje 2.5/3.0/3.5T) | 15 unidades | `8ae22a71-ea73-4cf7-8c57-634e768c0104` | `/promo/heli-diesel-k2/gracias` |
| `/promo/heli-diesel-k2-25t` | HELI CPCD25-Q13K2 Diesel 2.5T | 10 unidades | `cc1dd61c-972a-4ea8-aaac-d02b857a04d5` | `/promo/heli-diesel-k2-25t/gracias` |
| `/promo/heli-transpaleta-cbd1520` | Transpaleta Eléctrica HELI CBD15/20 (2T) | — | `ba4815b5-e77a-4cc5-88be-bef4a91ecefd` | `/promo/heli-transpaleta-cbd1520/gracias` |
| `/promo/heli-combustion-g3` | HELI Combustión G3 (5 TON + 7&10 TON Diesel) | 12 unidades | ⚠️ `8ae22a71-...` (K2, **provisional** — falta Form ID nuevo) | `/promo/heli-combustion-g3/gracias` |
| `/promo/heli-h4-electrica` | HELI Eléctrica H4 (Litio-ion 80V, 2.5-3.5T) | 12 unidades | ⚠️ `8ae22a71-...` (K2, **provisional** — falta Form ID nuevo) | `/promo/heli-h4-electrica/gracias` |

**Estructura común** (cada `PromoLanding.tsx`):
1. **Hero** — logo HELI blanco clickeable (link a `/`) + countdown 48hrs + título + specs grid + CTA "Cotizar ahora" + stock counter
2. **FeaturesGrid** — 6 spec cards con animación scroll (motor, capacidad, neumáticos, mástil, desplazador, asiento)
3. **Showcase** — imagen central grande (max-w-3xl, scale-110) + 2 cards laterales izquierda + 1 card destacada derecha (ANTES tenía hotspots con coords X/Y que nunca quedaban sobre la pieza real, fueron reemplazados por cards laterales). **Excepción:** `heli-combustion-g3` reemplaza Showcase por **`TwoModels`** (2 cards lado a lado, una por modelo: "G3 Serie 5 TON" y "G3 Serie 7 & 10 TON", cada una con imagen + specs grid + features + footnote) porque la campaña promociona dos equipos a la vez.
4. **Benefits** — 3 cards (4 en K2 que incluye garantía 1 año)
5. **UseCases** — 6 industrias aplicables
6. **ConversionForm** — copy de conversión + form HubSpot embebido (color wrapper `#0d0d18` para matchear con iframe)
7. **FooterMini** — logo HELI blanco clickeable + email/teléfono
8. **FloatingCTA** — botón "Cotizar ahora" que aparece tras scroll > 600px (mobile: full-width sticky bottom; desktop: pill flotante esquina inferior derecha con `animate-ping` rojo)

**Shared component:** `src/app/promo/_shared/PromoThankYou.tsx` (carpeta privada con `_` que NO genera ruta) — recibe props `productName`, `productImage`, `productTagline`, `productSlug`. Usado en las 7 thank-you pages para tracking diferenciado por campaña (atributo `data-promo-thank-you={slug}` para Meta Pixel/GA4). El mapa `PROMO_TRACKING` dentro del componente tiene un entry (`contentName` + `value`) por slug — agregar uno nuevo al crear otra landing. **`value: 0` en TODAS las landings** dispara el evento `Lead` SIN `value`/`currency` (Meta optimiza por volumen de leads, no por valor monetario — los leads son cotizaciones, no compras). La detección de `content_category` mapea slugs: `diesel`/`combustion` → `"diesel"`, `transpaleta` → `"transpaleta_electrica"`, `electrica` → `"electrica"`, resto → `"gasolina"`.

**Imágenes en `public/assets/promo/`** (no en `legacy/products/`), todas `.webp`:
- `heli-gasolina-35-front.webp` + `heli-gasolina-35-side.webp`
- `heli-diesel-k2-front.webp` + `heli-diesel-k2-side.webp` + `heli-diesel-k2-hero.webp`
- `heli-diesel-k2-25t-hero.webp` + `-side.webp`; `heli-transpaleta-cbd1520-hero.webp` + `-side.webp`
- `heli-combustion-g3-hero.webp` (modelo 70 / 7&10 TON, fondo recortado vía flood-fill sharp **lossless** desde `legacy/products/g3-series-5-10t-combustion.webp` que venía con fondo blanco) + `heli-combustion-g3-side.webp` (modelo 55 / 5 TON, re-encode lossless de `g3-series-4-5.5t-combustion.webp`)
- `heli-h4-electrica-hero.webp` + `heli-h4-electrica-side.webp` (re-encode **lossless** de `legacy/products/h4-series-1-5-3-8-ton-gallery-{1,2}.webp` que ya eran transparentes; el side es la vista con el cargador de litio)
- 2.5T (gasolina) usa imágenes existentes en `legacy/products/g3-series-2-3.5t-gas-nobg.webp`
- **Nota cutout:** exportar siempre los recortes con `webp({ lossless: true, alphaQuality: 100 })`. El WebP lossy con alpha hace que el optimizador de Next (al re-encodear a AVIF) "filtre" de vuelta el fondo blanco → halo/recuadro visible. Lossless lo evita.

**URLs originales del cliente** (no usadas, archivadas) en `public/assets/Campañas/{1,2,3}/`.

### Quote Form (CTASection.tsx) — HubSpot Embed

El form custom React fue **reemplazado por embed de HubSpot** (portal `50182752`, form `15b3dd6b-0095-4c03-a306-3dde97e81456` — form **principal del sitio**, distinto de los forms de las 5 promo landings).

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

All product/category images use `next/image` `<Image>` with `fill` + `sizes` for responsive srcset. `next.config.ts`: served formats AVIF + WebP, `minimumCacheTTL: 30 days`.

**All source images are WebP** (`public/assets/**/*.webp`). The original jpg/png were converted with `sharp` (quality 85, dimensions preserved) and removed — there are **no jpg/png originals in the repo** anymore. To add a new image: convert it to `.webp` first (e.g. a one-off sharp script) and reference the `.webp` path. **Exception:** `public/og-image.jpg` stays JPG for social-card compatibility (some scrapers like LinkedIn don't render WebP OG images); regenerate it as a 1200×630 landscape card (see SEO below). The `Campañas/` folder under `public/assets/` holds untracked client source archives — leave it alone.

Product images in `public/assets/legacy/products/` have white/light backgrounds. Use `product-img-container` CSS class on container divs to provide matching light gradient bg. `FuelTypeLanding` and `ProductCategoriesGrid` use them as `object-cover`/`object-contain` con dark/light gradient overlay. The hero background video (`public/assets/hero-video.mp4`, Git LFS) is recompressed H.264 720p ~7MB — keep it small if re-exported.

News images in `public/assets/legacy/news/` (8 files) — descargadas directamente de `heliforklift.cl/wp-content/uploads/`.

### Git LFS Assets

Both `*.mp4` and `*.pdf` are tracked via Git LFS (see `.gitattributes`):
- `public/assets/hero-video.mp4` (~7MB, recompressed H.264 720p) — Hero background, `preload="metadata"` + `poster`. (Was 103MB 1080p; the uncompressed original is kept outside the repo at `../hero heli.mp4`.)
- `public/assets/legacy/datasheets/*.pdf` (46 files, ~490MB) — Datasheets scraped from heliforklift.cl + `manipuladores-telescopicos-serie-h.pdf` (folleto Serie H)

After `git clone`, run `git lfs pull` to download. Linux build context for Docker copies all LFS-resolved files (~600MB transfer).

### Footer Links

Footer columns:
- **EQUIPOS:** 4 fuel types + Todos los equipos + Catálogo PDF
- **SERVICIOS:** Venta, Servicio Técnico, Repuestos (sin Arriendo ni Usados)
- **EMPRESA:** Nosotros, Equipo y Vendedores, Noticias, **Trabaja con nosotros**, **Información y denuncias (Ley Karin)**, Contacto
- **CONTACTO:** address + phone (`+56 9 9320 9186`) + email + horario

Bottom bar carries a credit "Desarrollado y diseñado por **Agencia Digitals** · Agencia y consultora digital" linking to `https://www.digitals.cl`. Same credit is repeated in the `FooterMini` of the 5 promo landings and in `PromoThankYou.tsx` — keep all in sync if the wording/link changes.

Navbar order (post-feedback): Inicio → **Nosotros (segundo)** → Equipos → Servicios → Noticias → Contacto.

### SEO

**Layout-level (`layout.tsx`):**
- Metadata global: `title.template: "%s | Helifork Lift"`, `metadataBase: https://heliforklift.cl`, robots `index: true, follow: true`
- **Organization schema** JSON-LD (foundingDate 1958, address, contactPoint, sameAs)
- **LocalBusiness schema** JSON-LD con `geo` (lat -33.3676, lng -70.7283 — Quilicura), `postalCode: "8710000"`, `openingHoursSpecification` estructurado (Lun-Vie 08:30-18:00), `priceRange: "$$$"`, `areaServed: Chile`
- Teléfono actual: `+56-9-9320-9186` (NO usar el viejo `+56-9-5818-7035` que era de Mauricio Glaser)
- Tracking inyectado en `<head>`: GTM (`GTM-M9FW8BM3`), GA4 (`G-3HLYKF62PW`), Meta Pixel (`1475698744101032`). Ver sección **Tracking & Analytics** abajo.
- `<html lang="es">` (sitio mono-idioma, sin hreflang)
- Title default keyword-first: "Grúas Horquillas HELI en Chile — Venta y Servicio Técnico"
- **Google Search Console verification:** NO está activa por meta-tag (se removió el placeholder inválido). Hay un comentario en `layout.tsx` para pegar el código real si se quiere. El sitio se verifica/indexa por otro medio (DNS/GA/GTM) y el sitemap se descubre por robots.txt — el envío explícito en GSC es manual.

**Page-level metadata:**
- Cada página define `alternates: { canonical: "/path" }` (relativo, resuelto contra metadataBase)
- `/productos` tiene `generateMetadata()` dinámico según `?tipo=` o `?categoria=`
- **`/productos/[slug]` title condicional:** `isForklift = categorySlug.startsWith("gruas-")` → forklifts usan `"{name} — Grúa Horquilla {capacityRange}"`; el resto (telehandlers, porta-contenedores, tractores, etc.) usa `"{name} — {capacityRange}"` (sin el prefijo "Grúa Horquilla" que sería incorrecto/redundante)
- Páginas con keywords arrays: `/contacto`, `/equipo`, `/catalogo`, `/noticias`, `/servicios`, `/productos/[slug]` — keywords B2B chilenos optimizados
- Open Graph: imagen global `/og-image.jpg` — **tarjeta de marca 1200×630 horizontal** (foto + headline en DM Sans bold, generada con sharp; **debe ser JPG**, no WebP, por compatibilidad social). Detail pages usan imágenes dinámicas WebP (`product.image`, `service.image`, `news.image`)
- H1 keyword-rich con patrón `sr-only` (texto SEO oculto) + `aria-hidden` (texto visual) en `/nosotros` (AboutHero), `/servicios`, `/contacto`, `/equipo`

**Schemas JSON-LD por página detail:**
- `/productos/[slug]`: **Product** (con `additionalProperty` para capacidad/motor/altura) + **BreadcrumbList** + **FAQPage** (5 preguntas dinámicas con respuestas adaptadas según `fuelType`)
- `/servicios/[slug]`: **Service** (con `provider` Helifork Lift) + **BreadcrumbList**
- `/noticias/[slug]`: **NewsArticle** (`datePublished`, `author`, `publisher`, `articleSection`) + **BreadcrumbList**

**Sitemap (`sitemap.ts`):**
- 109 URLs (10 estáticas + 3 servicios + 12 categorías + 76 productos + 8 noticias)
- **Image Sitemap activado**: cada `<url>` incluye `images: [absoluteImg(...)]` (homepage tiene 2: og-image + banner; productos/servicios/noticias/categorías tienen 1 cada uno)
- Helper `absoluteImg()` convierte paths relativos a URLs absolutas
- `lastModified` usa una **fecha constante estable** (`new Date("2026-06-01...")`), no `new Date()` de build — evita un lastmod que cambia en cada deploy. Bump manual cuando cambie el catálogo. (Las noticias sí usan su fecha real `item.date`.)
- **NO incluidas:** `/gracias`, `/promo/*`, `/promo/*/gracias` (todas con `robots: { index: false }`)

**Robots (`robots.ts`):** `Allow: /`, `Disallow: /api/`, sitemap apunta a `/sitemap.xml`. Las páginas con `noindex` se manejan por metadata individual, no por robots.txt.

**SEO Audit score:** ~97/100 (estimación basada en código). Fixes aplicados: teléfono/geo/postalCode/openingHours, h1 `sr-only` en nosotros/servicios/contacto/equipo, BreadcrumbList en pages detail, FAQ schema en productos, keywords arrays, Image Sitemap, OG card 1200×630 JPG, title de productos condicional, sitemap lastModified estable. Pendiente (manual): enviar sitemap en Search Console. La performance la arrastraba el video del hero (ya recomprimido 103→7MB); ver `next.config.ts` AVIF/WebP. Brotli es config de Traefik/Dokploy (no del repo).

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
| `/promo/heli-diesel-k2-25t` | `promo_diesel_25t` | `diesel` |
| `/promo/heli-transpaleta-cbd1520` | `promo_transpaleta_2t` | `transpaleta_electrica` |
| `/promo/heli-combustion-g3` | `promo_combustion_g3` | `diesel` |
| `/promo/heli-h4-electrica` | `promo_h4_electrica` | `electrica` |

`Lead` se dispara en cada thank-you page (conversión principal optimizada en Meta Ads). **Todas las landings disparan `Lead` SIN `value`/`currency`** (decisión intencional: los leads son cotizaciones, no compras, así que se optimiza por VOLUMEN de leads, no por valor monetario). En `PROMO_TRACKING` esto se controla con `value: 0` en cada entry; el `useEffect` omite `value`/`currency` cuando `value === 0`.

| Thank-you | content_name | value |
|---|---|---|
| `/promo/heli-gasolina-25/gracias` | `promo_25t` | (sin valor) |
| `/promo/heli-gasolina-35/gracias` | `promo_35t` | (sin valor) |
| `/promo/heli-diesel-k2/gracias` | `promo_k2` | (sin valor) |
| `/promo/heli-diesel-k2-25t/gracias` | `promo_diesel_25t` | (sin valor) |
| `/promo/heli-transpaleta-cbd1520/gracias` | `promo_transpaleta_2t` | (sin valor) |
| `/promo/heli-combustion-g3/gracias` | `promo_combustion_g3` | (sin valor) |
| `/promo/heli-h4-electrica/gracias` | `promo_h4_electrica` | (sin valor) |
| `/gracias` (form principal) | `form_principal` | (sin valor) |

Implementación:
- `PromoThankYou.tsx` (componente compartido) — tiene mapa `PROMO_TRACKING` con `contentName + value` por slug. Dispara `Lead` con `useEffect` basado en prop `productSlug`.
- `MetaPixelLead.tsx` ([src/components/shared/](heliforklift-web/src/components/shared/MetaPixelLead.tsx)) — wrapper cliente reutilizable para disparar `Lead` desde Server Components (como `/gracias/page.tsx`).
- Cada landing extiende `declare global { Window { fbq?: ... } }` para type safety sin `@ts-ignore`.

**Custom Conversions en Meta** (configurar manualmente en Events Manager), una por `content_name`: `promo_25t`, `promo_35t`, `promo_k2`, `promo_diesel_25t`, `promo_transpaleta_2t`, `promo_combustion_g3`, `promo_h4_electrica`, `form_principal`. Cada una con regla `Event=Lead AND content_name=<value>` o `URL contains <path>`.

**Conversions API (CAPI)**: pendiente de configurar en HubSpot → Settings → Integrations → Meta Ads para envío server-side de eventos `Lead` (recupera 25-40% de conversiones perdidas por iOS 14.5 ATT).

### Deployment (Dokploy)

Dokploy on AWS EC2 runs Docker. Multi-stage build with `node:20-alpine`. Requires `output: "standalone"`. Exposes port 3000. Server domain via `traefik.me` with self-signed SSL.

**Common deploy issues:**
- **Docker Hub rate limit (429)**: server pulls `node:20-alpine` from Docker Hub. If hit, login as root: `sudo cp ~/.docker/config.json /root/.docker/config.json` after `docker login`.
- **No space left**: build context with PDFs is ~700MB. Server needs adequate disk.

### Key Conventions

- All text in **Spanish (Chile)**, using "tú" (informal). Use proper accents (á, é, í, ó, ú, ñ).
- Brand color: `--heli-red: #CE142D`. Accent: `--heli-yellow: #F5A623`
- Font stack: DM Sans (body), Bebas Neue (headings via `.font-heading`), JetBrains Mono (data). **Self-hosted via `next/font/local`** — woff2 committed in `src/app/fonts/` (no build-time fetch to Google). DM Sans and JetBrains Mono are variable fonts (one woff2 each, `weight: "400 700"`); Bebas Neue is single-weight. CSS variables (`--font-dm-sans`, etc.) wired in `globals.css` are unchanged from the old `next/font/google` setup.
- Favicon/icons in `src/app/` (App Router convention): `favicon.ico` + `icon.png` + `apple-icon.png` are the HELI mark (dark rounded square + red "H"), generated from `public/favicon.svg`. Do **not** reintroduce the default Next.js `favicon.ico` (the Vercel triangle Google was showing).
- `cn()` utility from `@/lib/utils` for className merging (clsx + tailwind-merge)
- Touch targets: minimum 44px via `@media (pointer: coarse)` in globals.css
- `FuelTypeBadge` component for fuel type indicators: `sm` size (translucent, for cards), `md` size (solid bg, for detail pages)
- News content multi-párrafo: el campo `content` usa `\n\n` como separador y la página `[slug]` lo splittea con `.split("\n\n").map(...)`. **No inventar contenido de noticias** — todo viene scrapeado de heliforklift.cl.

@AGENTS.md
