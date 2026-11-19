import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Grúa Horquilla HELI Serie H3 Gas/Bencina 2,5 t — CPQYD25-RC6RG3",
  description:
    "Grúa horquilla HELI Serie H3 Gas/Bencina de 2,5 toneladas, modelo CPQYD25-RC6RG3. Motor Nissan GK25, mástil triple 4.700 mm, containera, 4ª función, desplazador lateral, neumático macizo y asiento con suspensión y apoyabrazos. Primera cuota a 90 días. $14.000.000 + IVA.",
  alternates: { canonical: "/promo/heli-combustion-g3" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "HELI Serie H3 Gas/Bencina 2,5 t · CPQYD25-RC6RG3 — $14.000.000 + IVA",
    description:
      "Motor Nissan GK25, mástil 4.700 mm y primera cuota a 90 días. $14.000.000 + IVA.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-combustion-g3",
    images: [
      {
        url: "/assets/promo/heli-gasolina-25-hero.webp",
        width: 1200,
        height: 630,
        alt: "Grúa horquilla HELI Serie H3 Gas/Bencina CPQYD25-RC6RG3 de 2,5 toneladas",
      },
    ],
  },
};

export default function PromoHeliCombustionG3Page() {
  return <PromoLanding />;
}
