import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Grúa Eléctrica HELI Serie H4 — 12 Cuotas al Precio de Contado",
  description:
    "Grúa Horquilla Eléctrica HELI Serie H4 de 2.5 a 3.5 toneladas. Batería Litio-ion 80V, cero emisiones y carga rápida oportunista. Oferta especial: 12 cuotas al precio de contado, sin interés. Stock disponible en Chile.",
  alternates: { canonical: "/promo/heli-h4-electrica" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "HELI Eléctrica Serie H4 · Litio-ion 80V — 12 Cuotas Precio Contado",
    description:
      "Batería Litio-ion 80V, cero emisiones, carga rápida oportunista. 12 cuotas al precio de contado sin interés. Stock inmediato en Chile.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-h4-electrica",
    images: [
      {
        url: "/assets/promo/heli-h4-electrica-hero.webp",
        width: 1200,
        height: 630,
        alt: "Grúa Horquilla Eléctrica HELI Serie H4 — Litio-ion 80V, 2.5 a 3.5 toneladas",
      },
    ],
  },
};

export default function PromoHeliH4ElectricaPage() {
  return <PromoLanding />;
}
