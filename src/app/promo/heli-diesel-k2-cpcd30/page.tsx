import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title:
    "Grúa Horquilla HELI Diesel K2 CPCD30-Q13K2 — 3 toneladas (3.000 kg) · $12.490.000 + IVA",
  description:
    "Grúa horquilla HELI Serie K2 CPCD30-Q13K2 de 3 toneladas (3.000 kg). Motor Quanchai con transmisión powershift, altura 4.700 mm y bajo consumo de combustible. $12.490.000 + IVA. Alianza con Progreso: tasa especial y primera cuota en 2027.",
  alternates: { canonical: "/promo/heli-diesel-k2-cpcd30" },
  robots: { index: false, follow: true },
  openGraph: {
    title:
      "HELI Diesel K2 CPCD30-Q13K2 · 3 toneladas (3.000 kg) — $12.490.000 + IVA",
    description:
      "Capacidad 3 toneladas (3.000 kg). Motor Quanchai con transmisión powershift, altura 4.700 mm y bajo consumo. Alianza con Progreso: tasa especial y primera cuota en 2027.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-diesel-k2-cpcd30",
    images: [
      {
        url: "/assets/promo/heli-diesel-k2-front.webp",
        width: 1200,
        height: 630,
        alt: "Grúa Horquilla HELI Diesel K2 CPCD30-Q13K2 — 3 toneladas (3.000 kg)",
      },
    ],
  },
};

export default function PromoHeliDieselK2Cpcd30Page() {
  return <PromoLanding />;
}
