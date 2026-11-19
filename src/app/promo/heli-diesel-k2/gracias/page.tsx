import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

const PRODUCT_LABEL =
  "Serie K2 CPCD25-Q13K2 · capacidad 2,5 toneladas";

export const metadata: Metadata = {
  title: `¡Gracias! — ${PRODUCT_LABEL}`,
  description: `Recibimos tu solicitud de cotización por la ${PRODUCT_LABEL}. Un ejecutivo te contactará en menos de 2 horas hábiles.`,
  alternates: { canonical: "/promo/heli-diesel-k2/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasDieselK2Page() {
  return (
    <PromoThankYou
      productSlug="heli-diesel-k2"
      productName={PRODUCT_LABEL}
      productImage="/assets/promo/heli-diesel-k2-hero.webp"
      productTagline={PRODUCT_LABEL}
    />
  );
}
