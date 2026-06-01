import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización HELI Gas-Gasolina 3.5T recibida",
  description:
    "Recibimos tu solicitud de cotización por la HELI Serie G3 Gas-Gasolina 3.5T. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-gasolina-35/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasGasolina35Page() {
  return (
    <PromoThankYou
      productSlug="heli-gasolina-35"
      productName="Grúa Horquilla HELI Serie G3 Gas-Gasolina 3.5 Tons"
      productImage="/assets/promo/heli-gasolina-35-front.webp"
      productTagline="HELI G3 · Gas-Gasolina 3.5T"
    />
  );
}
