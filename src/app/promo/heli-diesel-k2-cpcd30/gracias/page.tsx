import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

const PRODUCT_LABEL =
  "Serie K2 CPCD30-Q13K2 · capacidad 3 toneladas";

export const metadata: Metadata = {
  title: `¡Gracias! — ${PRODUCT_LABEL}`,
  description: `Recibimos tu solicitud de cotización por la ${PRODUCT_LABEL}. Un ejecutivo te contactará en menos de 2 horas hábiles.`,
  alternates: { canonical: "/promo/heli-diesel-k2-cpcd30/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasDieselK2Cpcd30Page() {
  return (
    <PromoThankYou
      productSlug="heli-diesel-k2-cpcd30"
      productName={PRODUCT_LABEL}
      productImage="/assets/promo/heli-diesel-k2-hero.webp"
      productTagline={PRODUCT_LABEL}
    />
  );
}
