import type { Metadata } from "next";
import PromoLanding from "./PromoLanding";

export const metadata: Metadata = {
  title: "Apilador Eléctrico HELI CDD15J-LI — $1.990.000 + IVA",
  description:
    "Apilador eléctrico HELI CDD15J-LI. Capacidad 1.500 kg, altura 3.500 mm y motor eléctrico 24V. Mástil de alta elevación, horquillas ajustables y pantalla de diagnóstico. $1.990.000 + IVA. Precio especial durante noviembre. El precio aplica con entrega en la sucursal HELI Santiago. El envío a regiones tiene otro valor.",
  alternates: { canonical: "/promo/heli-apilador-cdd15j" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Apilador HELI CDD15J-LI · $1.990.000 + IVA",
    description:
      "1.500 kg, altura 3.500 mm, motor eléctrico 24V. Precio especial durante noviembre.",
    type: "website",
    url: "https://heliforklift.cl/promo/heli-apilador-cdd15j",
    images: [
      {
        url: "/assets/legacy/products/cdd15j-apilador.webp",
        width: 1200,
        height: 630,
        alt: "Apilador eléctrico HELI CDD15J-LI",
      },
    ],
  },
};

export default function PromoHeliApiladorCdd15jPage() {
  return <PromoLanding />;
}
