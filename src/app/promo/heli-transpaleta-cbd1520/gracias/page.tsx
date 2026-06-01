import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización Transpaleta Eléctrica HELI recibida",
  description:
    "Recibimos tu solicitud de cotización por la Transpaleta Eléctrica HELI CBD15/20 de 2 toneladas. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-transpaleta-cbd1520/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasTranspaletaCBD1520Page() {
  return (
    <PromoThankYou
      productSlug="heli-transpaleta-cbd1520"
      productName="Transpaleta Eléctrica HELI CBD15/20 (2 toneladas)"
      productImage="/assets/promo/heli-transpaleta-cbd1520-hero.webp"
      productTagline="Transpaleta · Litio 48V · 2 Tons"
    />
  );
}
