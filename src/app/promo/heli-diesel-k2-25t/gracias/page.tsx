import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización HELI CPCD25-Q13K2 Diesel recibida",
  description:
    "Recibimos tu solicitud de cotización por la HELI CPCD25-Q13K2 Diesel 2.5 toneladas. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-diesel-k2-25t/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasDieselK225tPage() {
  return (
    <PromoThankYou
      productSlug="heli-diesel-k2-25t"
      productName="Grúa Horquilla HELI CPCD25-Q13K2 Diesel (2.5 toneladas)"
      productImage="/assets/promo/heli-diesel-k2-25t-hero.webp"
      productTagline="HELI CPCD25 · Diesel · 2.5 Tons"
    />
  );
}
