import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización HELI Diesel K2 recibida",
  description:
    "Recibimos tu solicitud de cotización por la HELI Serie K2 Diesel. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-diesel-k2/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasDieselK2Page() {
  return (
    <PromoThankYou
      productSlug="heli-diesel-k2"
      productName="Grúa Horquilla HELI Diesel Serie K2 (2.5/3.0/3.5T)"
      productImage="/assets/promo/heli-diesel-k2-hero.webp"
      productTagline="HELI K2 · Diesel multi-tonelaje"
    />
  );
}
