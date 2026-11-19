import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización Apilador HELI CDD15J-LI recibida",
  description:
    "Recibimos tu solicitud de cotización por el apilador eléctrico HELI CDD15J-LI. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-apilador-cdd15j/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasApiladorCdd15jPage() {
  return (
    <PromoThankYou
      productSlug="heli-apilador-cdd15j"
      productName="Apilador eléctrico HELI CDD15J-LI"
      productImage="/assets/promo/heli-apilador-cdd15j-hero.webp"
      productTagline="CDD15J-LI · 1.500 kg · $1.990.000 + IVA"
    />
  );
}
