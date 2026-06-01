import type { Metadata } from "next";
import PromoThankYou from "../../_shared/PromoThankYou";

export const metadata: Metadata = {
  title: "¡Gracias! — Cotización HELI Gasolina 2.5T recibida",
  description:
    "Recibimos tu solicitud de cotización por la HELI Gasolina 2.5T. Un ejecutivo te contactará en menos de 2 horas hábiles.",
  alternates: { canonical: "/promo/heli-gasolina-25/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasGasolina25Page() {
  return (
    <PromoThankYou
      productSlug="heli-gasolina-25"
      productName="Grúa Horquilla HELI Gasolina 2.5 Tons"
      productImage="/assets/legacy/products/g3-series-2-3.5t-gas-nobg.webp"
      productTagline="HELI G3 · Gasolina 2.5T"
    />
  );
}
