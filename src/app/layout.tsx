import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heliforklift.cl"),
  title: {
    default:
      "Helifork Lift — Grúas Horquillas Chile | Venta, Arriendo y Servicio Técnico",
    template: "%s | Helifork Lift",
  },
  description:
    "Venta y arriendo de grúas horquillas en Santiago y todo Chile. Grúas eléctricas, diésel y GLP. Servicio técnico 24/7, repuestos originales HELI. +67 años de experiencia, +1100 equipos vendidos. Cotiza ahora.",
  keywords: [
    "grúas horquillas",
    "grúas horquillas Chile",
    "arriendo grúas horquillas",
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
      "Helifork Lift — Grúas Horquillas Chile | Venta, Arriendo y Servicio Técnico",
    description:
      "Especialistas en grúas horquillas en Chile. Venta, arriendo, servicio técnico y repuestos originales HELI. +67 años de experiencia. Cotiza hoy.",
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
      "Venta y arriendo de grúas horquillas. Servicio técnico 24/7. Repuestos originales. Cotiza ahora.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
  },
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
          href="/assets/legacy/banners/heli-fleet-delivery.jpg"
          as="image"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
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
              logo: "https://heliforklift.cl/assets/legacy/logos/heli-chile-logo.png",
              description:
                "Especialistas en grúas horquillas en Chile. Venta, arriendo, servicio técnico y repuestos originales.",
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
                  telephone: "+56-9-5818-7035",
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
                "https://heliforklift.cl/assets/legacy/logos/heli-chile-logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Américo Vespucio 1445",
                addressLocality: "Quilicura",
                addressRegion: "Región Metropolitana",
                postalCode: "",
                addressCountry: "CL",
              },
              telephone: "+56-9-5818-7035",
              email: "contacto@heliforklift.cl",
              url: "https://heliforklift.cl",
              openingHours: "Mo-Fr 08:00-18:00",
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
