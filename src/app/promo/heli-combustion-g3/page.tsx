import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Grúas Horquilla HELI Combustión Serie G3 — Kit de Mantención Incluido",
  description:
    "Grúas Horquilla HELI Combustión Serie G3 de 5, 7 y 10 toneladas. Motor diésel de alto rendimiento, estructura reforzada. Oferta especial: 1 kit de mantención por cada 1.000 horas incluido. Stock disponible en Chile.",
  alternates: { canonical: "/promo/heli-combustion-g3" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "HELI Combustión G3 · 5/7/10 Tons — Kit de Mantención Incluido",
    description:
      "Motor diésel de alto rendimiento, estructura reforzada. 1 kit de mantención por cada 1.000 horas incluido. Stock inmediato en Chile.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-combustion-g3",
    images: [
      {
        url: "/assets/promo/heli-combustion-g3-hero.webp",
        width: 1200,
        height: 630,
        alt: "Grúa Horquilla HELI Combustión Serie G3 — 5/7/10 toneladas Diesel",
      },
    ],
  },
};

export default function PromoHeliCombustionG3Page() {
  return <PromoLanding />;
}
