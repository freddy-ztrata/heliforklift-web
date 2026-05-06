import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Grúa Horquilla HELI Gasolina 3.5 Ton — Oferta Limitada",
  description:
    "Grúa Horquilla HELI Serie G3 Gas-Gasolina 3.5 toneladas con motor K25, mástil triple 4.7 mts y desplazador lateral. Oferta limitada a 10 unidades. Stock disponible para entrega inmediata en Chile.",
  alternates: { canonical: "/promo/heli-gasolina-35" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "HELI Gasolina 3.5 Ton — Oferta limitada · Solo 10 unidades",
    description:
      "Motor K25, mástil triple 4.7 mts, desplazador lateral, neumáticos macizos. Stock limitado para entrega inmediata.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-gasolina-35",
    images: [
      {
        url: "/assets/promo/heli-gasolina-35-front.png",
        width: 1200,
        height: 630,
        alt: "Grúa Horquilla HELI Gasolina 3.5 toneladas",
      },
    ],
  },
};

export default function PromoHeliGasolina35Page() {
  return <PromoLanding />;
}
