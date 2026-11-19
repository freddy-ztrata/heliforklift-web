import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización HELI CPCD25-Q13K2 recibida",
  description:
    "Recibimos tu solicitud de cotización por la Grúa Horquilla HELI Diesel Serie K2 CPCD25-Q13K2 · 3,5 t. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-diesel-k2/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasDieselK2Page() {
  return (
    <PromoThankYou
      productSlug="heli-diesel-k2"
      productName="Grúa Horquilla HELI Diesel Serie K2 CPCD25-Q13K2 · 3,5 t"
      productImage="/assets/promo/heli-diesel-k2-hero.webp"
      productTagline="CPCD25-Q13K2 · 3,5 t"
    />
  );
}
