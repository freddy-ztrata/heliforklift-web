import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización HELI Eléctrica Serie H4 recibida",
  description:
    "Recibimos tu solicitud de cotización por la HELI Eléctrica Serie H4. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-h4-electrica/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasH4ElectricaPage() {
  return (
    <PromoThankYou
      productSlug="heli-h4-electrica"
      productName="Grúa Horquilla Eléctrica HELI Serie H4 (2.5/3.5T)"
      productImage="/assets/promo/heli-h4-electrica-hero.webp"
      productTagline="HELI H4 · Eléctrica · 12 cuotas precio contado"
    />
  );
}
