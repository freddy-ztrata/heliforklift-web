import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts self-hosted desde el repo (woff2 en ./fonts) — sin fetch a Google en build.
// DM Sans y JetBrains Mono son fuentes variables (un archivo cubre 400-700).
const dmSans = localFont({
  src: "./fonts/dm-sans.woff2",
  variable: "--font-dm-sans",
  weight: "400 700",
  display: "swap",
});

const bebasNeue = localFont({
  src: "./fonts/bebas-neue.woff2",
  variable: "--font-bebas-neue",
  weight: "400",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heliforklift.cl"),
  title: {
    default:
      "Grúas Horquillas HELI en Chile — Venta y Servicio Técnico",
    template: "%s | Helifork Lift",
  },
  description:
    "Venta de grúas horquillas en Santiago y todo Chile. Grúas eléctricas, diésel y GLP. Servicio técnico, repuestos originales HELI. +67 años de experiencia, +1100 equipos vendidos. Cotiza ahora.",
  keywords: [
    "grúas horquillas",
    "grúas horquillas Chile",
    "venta grúas horquillas Santiago",
    "grúa horquilla eléctrica",
    "grúa horquilla diésel",
    "montacargas Chile",
    "servicio técnico grúas horquillas",
    "repuestos grúas horquillas",
    "HELI Chile",
    "Helifork",
    "transpaletas Chile",
    "apiladores Chile",
    "grúa horquilla precio Chile",
    "equipos de bodega Chile",
  ],
  authors: [{ name: "Helifork Lift" }],
  creator: "Helifork Lift",
  publisher: "Helifork Lift",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://heliforklift.cl",
    siteName: "Helifork Lift",
    title:
      "Helifork Lift — Grúas Horquillas Chile | Venta y Servicio Técnico",
    description:
      "Especialistas en grúas horquillas en Chile. Venta, servicio técnico y repuestos originales HELI. +67 años de experiencia. Cotiza hoy.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Helifork Lift — Grúas Horquillas Chile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Helifork Lift — Grúas Horquillas Chile",
    description:
      "Venta de grúas horquillas. Servicio técnico. Repuestos originales. Cotiza ahora.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  // Para verificar en Google Search Console, agregar aqui el codigo real:
  // verification: { google: "tu-codigo-de-verificacion" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M9FW8BM3');` }} />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3HLYKF62PW" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-3HLYKF62PW');` }} />
        {/* Meta Pixel — base (PageView automatico en toda la web) */}
        <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1475698744101032');fbq('track','PageView');` }} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/legacy/banners/heli-fleet-delivery.webp"
          as="image"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M9FW8BM3" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        {/* Meta Pixel noscript fallback */}
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1475698744101032&ev=PageView&noscript=1" alt="" />` }} />
        {children}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Helifork Lift",
              alternateName: "HELI Chile",
              url: "https://heliforklift.cl",
              logo: "https://heliforklift.cl/assets/legacy/logos/heli-chile-logo.webp",
              description:
                "Especialistas en grúas horquillas en Chile. Venta, servicio técnico y repuestos originales.",
              foundingDate: "1958",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Américo Vespucio 1445",
                addressLocality: "Quilicura",
                addressRegion: "Santiago",
                addressCountry: "CL",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+56-9-9320-9186",
                  contactType: "sales",
                  areaServed: "CL",
                  availableLanguage: "Spanish",
                },
              ],
              sameAs: [
                "https://facebook.com/heliforkliftCL",
                "https://linkedin.com/company/heliforkliftcl/",
                "https://instagram.com/heliforkliftcl/",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Helifork Lift Santiago",
              image:
                "https://heliforklift.cl/assets/legacy/logos/heli-chile-logo.webp",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Américo Vespucio 1445",
                addressLocality: "Quilicura",
                addressRegion: "Región Metropolitana",
                postalCode: "8710000",
                addressCountry: "CL",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -33.3676,
                longitude: -70.7283,
              },
              telephone: "+56-9-9320-9186",
              email: "contacto@heliforklift.cl",
              url: "https://heliforklift.cl",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "08:30",
                  closes: "18:00",
                },
              ],
              priceRange: "$$$",
              areaServed: {
                "@type": "Country",
                name: "Chile",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
