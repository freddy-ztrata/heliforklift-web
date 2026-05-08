import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Grúa Horquilla HELI CPCD25-Q13K2 — Diesel 2.5 Tons · Stock Limitado",
  description:
    "Grúa Horquilla HELI CPCD25-Q13K2 Diesel 2.5 toneladas con motor Yanmar/Kubota, mástil triple 4.7 mts, neumáticos macizos, desplazador lateral y asiento con suspensión. Desde $10.800.000 + IVA. Solo 10 unidades disponibles. Stock inmediato en Chile.",
  alternates: { canonical: "/promo/heli-diesel-k2-25t" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "HELI CPCD25-Q13K2 Diesel 2.5T · Desde $10.800.000 — Solo 10 Unidades",
    description:
      "Motor Diesel, mástil triple 4.7 mts, neumáticos macizos, desplazador lateral. Stock inmediato en Chile.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-diesel-k2-25t",
    images: [
      {
        url: "/assets/promo/heli-diesel-k2-25t-hero.png",
        width: 1200,
        height: 630,
        alt: "Grúa Horquilla HELI CPCD25-Q13K2 Diesel 2.5 toneladas",
      },
    ],
  },
};

export default function PromoHeliDieselK225tPage() {
  return <PromoLanding />;
}
