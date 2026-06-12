import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Grúa Eléctrica HELI Serie H4 2.5T — 30% de Descuento | CPD25-A3LiH4-M",
  description:
    "Grúa Horquilla Eléctrica HELI Serie H4 de 2.5 toneladas (CPD25-A3LiH4-M). Batería Litio-ion 80V / 302 Ah, elevación 4.700 mm, cero emisiones y carga rápida. Oferta -30% de descuento hasta el 15 de julio o agotar stock. Solo 15 unidades en Chile.",
  alternates: { canonical: "/promo/heli-h4-electrica-25t" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "HELI Eléctrica H4 2.5T · Litio-ion 80V — 30% de Descuento",
    description:
      "Batería Litio-ion 80V / 302 Ah, cero emisiones, carga rápida. -30% de descuento hasta el 15 de julio. Solo 15 unidades en Chile.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-h4-electrica-25t",
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
