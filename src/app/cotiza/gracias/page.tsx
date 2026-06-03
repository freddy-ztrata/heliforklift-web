import type { Metadata } from "next";
import CotizaGracias from "./CotizaGracias";

export const metadata: Metadata = {
  title: "¡Gracias! — Recibimos tu solicitud de cotización HELI",
  description:
    "Recibimos tu solicitud de cotización. Un ejecutivo HELI te contactará en menos de 2 horas hábiles con tu propuesta a medida.",
  alternates: { canonical: "/cotiza/gracias" },
  robots: { index: false, follow: false },
};

export default function CotizaGraciasPage() {
  return <CotizaGracias />;
}
