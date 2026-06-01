import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Grúa Horquilla HELI Gasolina 2.5 Ton — Oferta Limitada",
  description:
    "Grúa Horquilla HELI Serie G3 Gas-Gasolina 2.5 toneladas con motor K25, mástil triple 4.7 mts y desplazador lateral. Oferta limitada a 10 unidades. $14.000.000 + IVA. Stock disponible para entrega inmediata en Chile.",
  alternates: { canonical: "/promo/heli-gasolina-25" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "HELI Gasolina 2.5 Ton — $14.000.000 + IVA · Solo 10 unidades",
    description:
      "Motor K25, mástil triple 4.7 mts, desplazador lateral, neumáticos macizos. Stock limitado.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-gasolina-25",
    images: [
      {
        url: "/assets/legacy/products/g3-series-2-3.5t-gas.webp",
        width: 1200,
        height: 630,
        alt: "Grúa Horquilla HELI Gasolina 2.5 toneladas",
      },
    ],
  },
};

export default function PromoHeliGasolina25Page() {
  return <PromoLanding />;
}
