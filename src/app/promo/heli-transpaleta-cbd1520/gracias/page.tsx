import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización Transpaleta HELI CBD20-BLIH recibida",
  description:
    "Recibimos tu solicitud de cotización por la transpaleta eléctrica HELI CBD20-BLIH de 2 toneladas, Litio-ion 24V. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-transpaleta-cbd1520/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasTranspaletaCBD1520Page() {
  return (
    <PromoThankYou
      productSlug="heli-transpaleta-cbd1520"
      productName="Transpaleta eléctrica HELI CBD20-BLIH (2 toneladas)"
      productImage="/assets/promo/heli-transpaleta-cbd1520-hero.webp"
      productTagline="Transpaleta · Litio-ion 24V · 2 t"
    />
  );
}
