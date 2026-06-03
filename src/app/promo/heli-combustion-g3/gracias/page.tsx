import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización HELI Combustión Serie G3 recibida",
  description:
    "Recibimos tu solicitud de cotización por la HELI Combustión Serie G3. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-combustion-g3/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasCombustionG3Page() {
  return (
    <PromoThankYou
      productSlug="heli-combustion-g3"
      productName="Grúa Horquilla HELI Combustión Serie G3 (5/7/10T)"
      productImage="/assets/promo/heli-combustion-g3-hero.webp"
      productTagline="HELI G3 · Diesel · Kit de mantención incluido"
    />
  );
}
