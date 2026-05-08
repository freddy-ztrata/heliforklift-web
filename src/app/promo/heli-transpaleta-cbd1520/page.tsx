import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Transpaleta Eléctrica HELI 2 Toneladas — Oferta Limitada $950.000 + IVA",
  description:
    "Transpaleta Eléctrica HELI CBD15/20 de 2 toneladas con batería de litio 48V/20Ah, controlador Smart y horquillas de 1150 x 685 mm. La más potente del mercado. Oferta especial $950.000 + IVA. Stock disponible para entrega inmediata en Chile.",
  alternates: { canonical: "/promo/heli-transpaleta-cbd1520" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Transpaleta HELI 2 Tons · $950.000 + IVA — Oferta Limitada",
    description:
      "Batería de litio 48V/20Ah, controlador Smart, horquillas 1150 x 685 mm. La más potente del mercado.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-transpaleta-cbd1520",
    images: [
      {
        url: "/assets/promo/heli-transpaleta-cbd1520-hero.png",
        width: 1200,
        height: 630,
        alt: "Transpaleta Eléctrica HELI CBD15/20 — 2 toneladas",
      },
    ],
  },
};

export default function PromoHeliTranspaletaCBD1520Page() {
  return <PromoLanding />;
}
