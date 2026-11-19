import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización HELI Serie H3 Gas/Bencina recibida",
  description:
    "Recibimos tu solicitud de cotización por la Grúa Horquilla HELI Serie H3 Gas/Bencina 2,5 t (CPQYD25-RC6RG3). Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-combustion-g3/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasCombustionG3Page() {
  return (
    <PromoThankYou
      productSlug="heli-combustion-g3"
      productName="Grúa Horquilla HELI Serie H3 Gas/Bencina 2,5 t (CPQYD25-RC6RG3)"
      productImage="/assets/promo/heli-gasolina-25-hero.webp"
      productTagline="Gas/Bencina · 2,5 t · CPQYD25-RC6RG3"
    />
  );
}
