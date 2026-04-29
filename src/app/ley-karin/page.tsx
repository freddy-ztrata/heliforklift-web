import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import {
  Shield,
  Lock,
  AlertCircle,
  Mail,
  FileText,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Información y Denuncias — Ley Karin",
  description:
    "Canal de información y denuncias en cumplimiento de la Ley Karin (Ley 21.643). Helifork Lift mantiene un entorno laboral seguro, libre de acoso y violencia.",
  alternates: { canonical: "/ley-karin" },
  robots: { index: true, follow: true },
};

const principles = [
  {
    icon: Lock,
    title: "Confidencialidad",
    description:
      "Toda denuncia es tratada con estricta reserva. La identidad del denunciante y los testigos será protegida durante todo el proceso.",
  },
  {
    icon: Shield,
    title: "Sin represalias",
    description:
      "Garantizamos que no habrá represalias contra quienes presenten denuncias de buena fe ni contra los testigos involucrados.",
  },
  {
    icon: AlertCircle,
    title: "Investigación imparcial",
    description:
      "Todo reclamo será investigado de forma seria, imparcial y oportuna conforme a los plazos establecidos por la ley.",
  },
];

export default function LeyKarinPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-steel-950 py-16 sm:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-heli-red/10">
              <Shield className="h-8 w-8 text-heli-red" />
            </div>
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Cumplimiento legal
            </p>
            <h1 className="font-heading mt-2 text-[clamp(2rem,6vw,4.5rem)] leading-none text-white">
              INFORMACIÓN Y DENUNCIAS
            </h1>
            <p className="mt-3 text-lg text-heli-yellow uppercase tracking-wider font-semibold">
              Ley Karin · Ley 21.643
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-steel-300">
              En Helifork Lift estamos comprometidos con un entorno laboral
              seguro, respetuoso y libre de acoso laboral, sexual y violencia
              en el trabajo.
            </p>
          </div>
        </section>

        {/* Qué es la Ley Karin */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-white">
            ¿QUÉ ES LA LEY KARIN?
          </h2>
          <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-steel-300">
            <p>
              La <strong className="text-white">Ley N° 21.643</strong>,
              conocida como{" "}
              <strong className="text-white">"Ley Karin"</strong>, modificó el
              Código del Trabajo y otros cuerpos legales en materia de
              prevención, investigación y sanción del acoso laboral, sexual o
              violencia en el trabajo.
            </p>
            <p>
              Esta ley obliga a los empleadores a contar con un{" "}
              <strong className="text-white">protocolo de prevención</strong>{" "}
              y un{" "}
              <strong className="text-white">canal de denuncias</strong>{" "}
              accesible para todos los trabajadores y trabajadoras.
            </p>
            <p>
              En Helifork Lift cumplimos con esta normativa y ponemos a
              disposición de nuestro equipo y de cualquier persona vinculada a
              la empresa los medios para reportar situaciones que afecten la
              dignidad e integridad en el trabajo.
            </p>
          </div>
        </section>

        {/* Principios */}
        <section className="bg-steel-900/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-center text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-white">
              NUESTROS PRINCIPIOS
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-steel-400">
              Todo proceso de denuncia se gestiona bajo estos compromisos
              fundamentales:
            </p>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
              {principles.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-steel-700/50 bg-steel-900 p-6 sm:p-8"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/10">
                      <Icon className="h-6 w-6 text-heli-red" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-steel-400">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Canal de denuncias */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-heli-red/30 bg-gradient-to-br from-heli-red/10 via-steel-900 to-steel-900 p-6 sm:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-heli-red/20">
                <FileText className="h-6 w-6 text-heli-red" />
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-2xl sm:text-3xl text-white">
                  CANAL DE DENUNCIAS
                </h2>
                <p className="mt-3 text-base leading-relaxed text-steel-300">
                  Si has sido víctima o testigo de acoso laboral, sexual o
                  violencia en el trabajo, puedes presentar tu denuncia a
                  través del siguiente canal confidencial. Tu denuncia será
                  recibida y procesada por el área de cumplimiento de la
                  empresa.
                </p>

                <div className="mt-6 space-y-3 rounded-xl bg-steel-950/60 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-steel-500">
                    Email para denuncias
                  </p>
                  <a
                    href="mailto:denuncias@heliforklift.cl?subject=Denuncia%20Ley%20Karin"
                    className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-heli-red-light hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    denuncias@heliforklift.cl
                  </a>
                  <p className="text-xs text-steel-500">
                    Si este correo no se encuentra disponible, también puedes
                    escribir a{" "}
                    <a
                      href="mailto:contacto@heliforklift.cl"
                      className="text-heli-red-light hover:underline"
                    >
                      contacto@heliforklift.cl
                    </a>
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-steel-200">
                    Información que debes incluir:
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-steel-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-heli-red" />
                      Identificación del denunciante (puede ser anónima si así
                      lo prefieres)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-heli-red" />
                      Descripción detallada de los hechos: qué, cuándo, dónde
                      y cómo ocurrieron
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-heli-red" />
                      Identificación de las personas involucradas
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-heli-red" />
                      Identificación de testigos si los hubiera
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-heli-red" />
                      Cualquier antecedente o medio de prueba que respalde la
                      denuncia
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Otros canales */}
          <div className="mt-8 rounded-2xl border border-steel-700/50 bg-steel-900/50 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white">
              Canales externos oficiales
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-steel-400">
              También puedes presentar tu denuncia directamente ante la{" "}
              <strong className="text-white">Dirección del Trabajo</strong> a
              través de su sitio web oficial:
            </p>
            <a
              href="https://www.dt.gob.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-heli-red-light hover:text-white transition-colors"
            >
              www.dt.gob.cl
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
