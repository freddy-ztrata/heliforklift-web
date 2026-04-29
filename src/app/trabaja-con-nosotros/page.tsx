import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import {
  Briefcase,
  GraduationCap,
  Heart,
  TrendingUp,
  Mail,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Trabaja con Nosotros — Únete a Helifork Lift",
  description:
    "Forma parte del equipo de Helifork Lift, líder mundial en grúas horquillas. Oportunidades de carrera, capacitación HELI y desarrollo profesional en Chile.",
  alternates: { canonical: "/trabaja-con-nosotros" },
  openGraph: {
    title: "Trabaja con Nosotros — Helifork Lift",
    description:
      "Únete a un equipo apasionado por la innovación y la excelencia en el sector de grúas horquillas.",
  },
};

const benefits = [
  {
    icon: GraduationCap,
    title: "Capacitación HELI",
    description:
      "Entrenamiento certificado por el fabricante, con acceso a tecnología de punta y los últimos modelos.",
  },
  {
    icon: TrendingUp,
    title: "Desarrollo profesional",
    description:
      "Plan de carrera con oportunidades de crecimiento en una empresa con presencia en +150 países.",
  },
  {
    icon: Heart,
    title: "Cultura de equipo",
    description:
      "Ambiente laboral colaborativo, reconocimiento al desempeño y enfoque en el bienestar de nuestros colaboradores.",
  },
  {
    icon: Briefcase,
    title: "Estabilidad laboral",
    description:
      "Empresa con +67 años de trayectoria mundial y 12 años consolidada en Chile, con flota propia y crecimiento sostenido.",
  },
];

export default function TrabajaConNosotrosPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-steel-950 py-16 sm:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
          <div className="absolute -top-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(206,20,45,0.08),transparent_70%)]" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Únete a nuestro equipo
            </p>
            <h1 className="font-heading mt-3 text-[clamp(2.5rem,7vw,5.5rem)] leading-none text-white">
              TRABAJA CON NOSOTROS
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-steel-300">
              Heliforklift Chile, líder mundial en la fabricación de grúas
              horquillas, te invita a formar parte de nuestro equipo.
            </p>
          </div>
        </section>

        {/* Beneficios */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Por qué Helifork Lift
            </p>
            <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
              LO QUE OFRECEMOS
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-steel-700/50 bg-steel-900/50 p-6 transition-all hover:border-heli-red/40 hover:bg-steel-900"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/10">
                    <Icon className="h-6 w-6 text-heli-red" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-400">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA aplicar */}
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-steel-700/50 bg-gradient-to-br from-heli-red/10 via-steel-900 to-steel-900 p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-heli-red/15">
                <Mail className="h-8 w-8 text-heli-red" />
              </div>
              <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-white">
                ¿INTERESADO EN POSTULAR?
              </h2>
              <p className="mt-4 max-w-xl text-base sm:text-lg text-steel-300">
                Envíanos tu currículum a nuestro correo de contacto e indícanos
                el área en la que te gustaría trabajar. Revisamos cada
                postulación con atención.
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href="mailto:contacto@heliforklift.cl?subject=Postulación%20-%20Trabaja%20con%20nosotros"
                  className="glow-red inline-flex items-center justify-center gap-2 rounded-xl bg-heli-red px-6 sm:px-8 py-3.5 sm:py-4 text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-heli-red-dark hover:scale-[1.02]"
                >
                  ENVIAR CV
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="tel:+56993209186"
                  className="inline-flex items-center justify-center rounded-xl border border-steel-600 px-6 sm:px-8 py-3.5 sm:py-4 text-base font-medium text-white transition-all hover:border-white hover:bg-white/5"
                >
                  +56 9 9320 9186
                </a>
              </div>

              <p className="mt-6 text-xs text-steel-500">
                Email:{" "}
                <a
                  href="mailto:contacto@heliforklift.cl"
                  className="text-heli-red-light hover:underline"
                >
                  contacto@heliforklift.cl
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
