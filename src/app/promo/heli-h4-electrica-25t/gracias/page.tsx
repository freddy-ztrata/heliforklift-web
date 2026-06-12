import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización HELI Eléctrica H4 2.5T recibida",
  description:
    "Recibimos tu solicitud de cotización por la HELI Eléctrica Serie H4 2.5T (CPD25-A3LiH4-M). Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-h4-electrica-25t/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasH4Electrica25tPage() {
  return (
    <PromoThankYou
      productSlug="heli-h4-electrica-25t"
      productName="Grúa Horquilla Eléctrica HELI Serie H4 2.5T (CPD25-A3LiH4-M)"
      productImage="/assets/promo/heli-h4-electrica-hero.webp"
      productTagline="HELI H4 · Eléctrica 2.5T · -30% de descuento"
    />
  );
}
