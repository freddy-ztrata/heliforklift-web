import type { Metadata } from "next";
import CotizaLanding from "./CotizaLanding";

export const metadata: Metadata = {
  title: "Cotiza tu Grúa Horquilla HELI en Chile — Eléctrica, Diésel, Gas e Hidrógeno",
  description:
    "Distribuidor oficial HELI en Chile. Cotiza grúas horquilla eléctricas, diésel, gas e hidrógeno verde, transpaletas, reach truck y más. Líder mundial en montacargas, +1.100 equipos vendidos, servicio técnico y repuestos en todo Chile. Respuesta en menos de 2 horas hábiles.",
  alternates: { canonical: "/cotiza" },
  // LP de campañas pagadas (Google Ads always-on): noindex + fuera del sitemap.
  // Google Ads igual la rastrea para quality score; follow queda activo.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Cotiza tu Grúa Horquilla HELI — Líder Mundial en Montacargas",
    description:
      "Eléctricas, diésel, gas e hidrógeno verde. +1.100 equipos en Chile, servicio técnico y repuestos a nivel nacional. Cotiza en menos de 2 horas hábiles.",
    type: "website",
    url: "https://heliforklift.cl/cotiza",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grúas Horquilla HELI en Chile",
      },
    ],
  },
};

export default function CotizaPage() {
  return <CotizaLanding />;
}
