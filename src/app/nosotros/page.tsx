import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import AnimatedTimeline from "@/components/sections/AnimatedTimeline";
import AboutHero from "@/components/sections/AboutHero";
import { company, certifications } from "@/lib/data/company";
import { Shield, Award, Globe, Factory } from "lucide-react";

const WhatsAppButton = dynamic(
  () => import("@/components/shared/WhatsAppButton")
);
const ScrollProgress = dynamic(
  () => import("@/components/shared/ScrollProgress")
);
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export const metadata: Metadata = {
  title: "Nosotros — Historia y Trayectoria HELI",
  description:
    "Conoce la historia de HELI: +67 años fabricando grúas horquillas de clase mundial. Presentes en +150 países, Nº7 mundial, +1700 modelos. Distribuidor oficial en Chile.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Sobre Helifork Lift — Nuestra Historia",
    description:
      "+67 años de experiencia en grúas horquillas. Distribuidor oficial HELI en Chile.",
  },
};

export default function NosotrosPage() {
  const milestones = [
    { year: 1958, event: "Fundación de HELI en China" },
    { year: 1962, event: "Primera grúa horquilla de combustión" },
    { year: 1991, event: "Nº1 en ventas en China" },
    { year: 1996, event: "Cotización en Bolsa de Shanghái" },
    { year: 2014, event: "Establecimiento del Centro Europeo" },
    { year: 2019, event: "HELI America Inc. establecida" },
    { year: 2020, event: "Lanzamiento hidrógeno verde" },
    { year: 2021, event: "Expansión HELI Chile con accesorios propietarios" },
  ];

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Hero animado */}
        <AboutHero description={company.description} />

        {/* Misión y Visión */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2">
            <div className="rounded-2xl border border-steel-700 bg-steel-900/50 p-5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/10">
                <Globe className="h-6 w-6 text-heli-red" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Nuestra Misión</h2>
              <p className="mt-4 text-sm sm:text-base text-steel-300">{company.mission}</p>
            </div>
            <div className="rounded-2xl border border-steel-700 bg-steel-900/50 p-5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-heli-yellow/10">
                <Factory className="h-6 w-6 text-heli-yellow" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Nuestra Visión</h2>
              <p className="mt-4 text-sm sm:text-base text-steel-300">{company.vision}</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-steel-900/30 py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-12 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
                Hitos importantes
              </p>
              <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,4rem)] leading-none text-white">
                NUESTRA TRAYECTORIA
              </h2>
            </div>
            <AnimatedTimeline milestones={milestones} />
          </div>
        </section>

        {/* Certificaciones */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:py-20 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Calidad garantizada
            </p>
            <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,4rem)] leading-none text-white">
              CERTIFICACIONES
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col items-center rounded-xl border border-steel-700 bg-steel-900/50 p-4 sm:p-6 text-center transition-all hover:border-heli-red/50"
              >
                <Shield className="mb-3 h-8 w-8 text-heli-red" />
                <div className="font-bold text-white text-sm sm:text-base">{cert.name}</div>
                <div className="mt-1 text-xs text-steel-400">
                  {cert.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Valores */}
        <section className="bg-steel-900/30 py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-none text-white">
                NUESTROS VALORES
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {company.values.map((value, i) => (
                <div
                  key={value}
                  className="flex flex-col items-center rounded-xl border border-steel-700 bg-steel-900 p-4 sm:p-6 text-center"
                >
                  <Award className="mb-3 h-8 w-8 text-heli-yellow" />
                  <div className="font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
