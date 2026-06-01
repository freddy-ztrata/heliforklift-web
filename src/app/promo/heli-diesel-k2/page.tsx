import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Grúas Horquilla HELI Diesel K2 — Últimas 15 Unidades",
  description:
    "Grúas Horquilla HELI Diesel K2 disponibles en 2.5, 3.0 y 3.5 toneladas. Motor Diesel, mástil triple 4.7 mts, desplazador lateral y asiento con suspensión. Stock inmediato en Chile. Solo 15 unidades disponibles.",
  alternates: { canonical: "/promo/heli-diesel-k2" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "HELI Diesel K2 · 2.5/3.0/3.5 Tons — Solo 15 Unidades",
    description:
      "Motor Diesel, mástil triple 4.7 mts, neumáticos macizos, desplazador lateral. Stock inmediato en Chile.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-diesel-k2",
    images: [
      {
        url: "/assets/promo/heli-diesel-k2-front.webp",
        width: 1200,
        height: 630,
        alt: "Grúa Horquilla HELI Diesel K2 — 2.5/3.0/3.5 toneladas",
      },
    ],
  },
};

export default function PromoHeliDieselK2Page() {
  return <PromoLanding />;
}
