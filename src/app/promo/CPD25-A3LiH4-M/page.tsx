import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Grúa Eléctrica HELI Serie H4 2.5T — $17.990.000 + IVA | CPD25-A3LiH4-M",
  description:
    "Grúa Horquilla Eléctrica HELI Serie H4 de 2.5 toneladas (CPD25-A3LiH4-M) a $17.990.000 + IVA. Batería Litio-ion 80V / 302 Ah, elevación 4.700 mm, cero emisiones y carga rápida. 10 unidades o hasta agotar stock. Válido del 01 al 30 de noviembre.",
  alternates: { canonical: "/promo/CPD25-A3LiH4-M" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "HELI Eléctrica H4 2.5T · $17.990.000 + IVA",
    description:
      "Batería Litio-ion 80V / 302 Ah, cero emisiones y carga rápida. $17.990.000 + IVA. 10 unidades o hasta agotar stock. Válido del 01 al 30 de noviembre.",
    type: "website",
    url: "https://heliforklift.cl/promo/CPD25-A3LiH4-M",
    images: [
      {
        url: "/assets/promo/heli-h4-electrica-hero.webp",
        width: 1200,
        height: 630,
        alt: "Grúa Horquilla Eléctrica HELI Serie H4 2.5 toneladas — CPD25-A3LiH4-M",
      },
    ],
  },
};

export default function PromoHeliH4Electrica25tPage() {
  return <PromoLanding />;
}
