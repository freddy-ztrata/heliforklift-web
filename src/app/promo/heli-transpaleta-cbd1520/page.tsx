import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Transpaleta Eléctrica HELI CBD20-BLIH — $990.000 + IVA",
  description:
    "Transpaleta eléctrica HELI CBD20-BLIH de 2 toneladas (2.000 kg) con batería Litio-ion 24V. $990.000 + IVA. El precio aplica con entrega en la sucursal HELI Santiago. El envío a regiones tiene otro valor.",
  alternates: { canonical: "/promo/heli-transpaleta-cbd1520" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Transpaleta HELI CBD20-BLIH · $990.000 + IVA",
    description:
      "Litio-ion 24V, 2 toneladas. El precio aplica con entrega en la sucursal HELI Santiago. El envío a regiones tiene otro valor.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-transpaleta-cbd1520",
    images: [
      {
        url: "/assets/promo/heli-transpaleta-cbd1520-hero.webp",
        width: 1200,
        height: 630,
        alt: "Transpaleta eléctrica HELI CBD20-BLIH — 2 toneladas",
      },
    ],
  },
};

export default function PromoHeliTranspaletaCBD1520Page() {
  return <PromoLanding />;
}
