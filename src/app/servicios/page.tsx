import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { services } from "@/lib/data/services";
import {
  ShoppingCart,
  Clock,
  Wrench,
  Cog,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios — Venta, Servicio Técnico y Repuestos",
  description:
    "Servicios completos para grúas horquillas: venta de equipos nuevos, servicio técnico, repuestos originales HELI. Cobertura en todo Chile.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios — Venta, Servicio Técnico y Repuestos",
    description:
      "Servicios completos para grúas horquillas: venta, servicio técnico y repuestos originales HELI en Chile.",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Clock,
  Wrench,
  Cog,
  RefreshCw,
};

const serviceImages = [
  "/assets/legacy/products/g-series-1-3.5t-electric.jpg",
  "/assets/legacy/products/k2-series-2-3.5t-combustion.jpg",
  "/assets/legacy/products/h3-series-1-3.5t-combustion.jpg",
  "/assets/legacy/products/g3-series-4-5.5t-combustion.png",
  "/assets/legacy/products/g2-series-6-10t-electric.png",
];

export default function ServiciosPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 sm:mb-16 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Nuestros servicios
            </p>
            <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
              ¿QUÉ HACEMOS POR TI?
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-steel-400">
              Soluciones integrales en grúas horquillas para que tu operación
              nunca se detenga.
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Cog;
              const bgImage = serviceImages[index] || serviceImages[0];
              return (
                <div
                  key={service.id}
                  className={`group relative overflow-hidden rounded-2xl border border-steel-700/50 transition-all duration-300 hover:-translate-y-1 hover:border-heli-red/30 hover:shadow-xl hover:shadow-heli-red/10 ${index < 2 ? "lg:col-span-1 md:col-span-1" : ""} ${index === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-1" : ""}`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src={bgImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-30"
                      loading="lazy"
                      quality={60}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/95 to-steel-950/80" />
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-col p-5 sm:p-8">
                    {/* Number + Icon row */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-heli-red/10 border border-heli-red/20 transition-colors group-hover:bg-heli-red/20">
                        <Icon className="h-7 w-7 text-heli-red" />
                      </div>
                      <span className="font-heading text-5xl text-steel-800 transition-colors group-hover:text-steel-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-steel-400">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-5 space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-steel-300"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-heli-red" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTAs: ver detalle + cotizar */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Link
                        href={`/servicios/${service.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-heli-red px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-heli-red-dark hover:gap-3"
                      >
                        Ver más
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/contacto?servicio=${encodeURIComponent(service.name)}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-steel-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/5"
                      >
                        {service.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom highlight */}
          <div className="mt-12 sm:mt-16 rounded-2xl border border-steel-700/50 bg-gradient-to-r from-heli-red/10 via-steel-900 to-steel-900 p-5 sm:p-8 md:p-12">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  ¿No encuentras lo que buscas?
                </h3>
                <p className="mt-2 text-steel-400">
                  Cuéntanos tu necesidad y te ofrecemos una solución a medida.
                  Respondemos en menos de 2 horas.
                </p>
              </div>
              <Link
                href="/contacto"
                className="shrink-0 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-xl bg-heli-red px-6 sm:px-8 py-3.5 sm:py-4 font-bold text-white transition-all hover:bg-heli-red-dark glow-red"
              >
                COTIZAR AHORA
                <ArrowRight className="h-5 w-5" />
              </Link>
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
