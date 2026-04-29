import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { fuelTypeCategories } from "@/lib/data/products";
import {
  FileText,
  Download,
  ArrowRight,
  Zap,
  Fuel,
  Flame,
  Atom,
  Mail,
} from "lucide-react";

const iconMap: Record<string, typeof Zap> = { Zap, Fuel, Flame, Atom };

export const metadata: Metadata = {
  title: "Catálogo de Equipos — Helifork Lift",
  description:
    "Descarga el catálogo completo de grúas horquillas HELI: eléctricas, diésel, GLP, hidrógeno verde, transpaletas, apiladores y más. Fichas técnicas y especificaciones.",
  alternates: { canonical: "/catalogo" },
};

export default function CatalogoPage() {
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
              <FileText className="h-8 w-8 text-heli-red" />
            </div>
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Documentación técnica
            </p>
            <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
              CATÁLOGO DE EQUIPOS
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-steel-300">
              Descarga las fichas técnicas y especificaciones completas de
              nuestra línea de grúas horquillas HELI. Más de 76 modelos
              disponibles con capacidades desde 800 kg hasta 46 toneladas.
            </p>
          </div>
        </section>

        {/* Catalogo por tipo de energia */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
              EXPLORA POR TIPO DE ENERGÍA
            </h2>
            <p className="mt-3 max-w-2xl text-steel-400">
              Cada categoría incluye especificaciones técnicas, capacidades,
              alturas de elevación y características destacadas de cada
              modelo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {fuelTypeCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Zap;
              return (
                <Link
                  key={cat.id}
                  href={`/productos?tipo=${cat.slug}`}
                  className="group flex flex-col rounded-2xl border border-steel-700/50 bg-steel-900/60 p-6 transition-all hover:-translate-y-1 hover:border-heli-red/40 hover:bg-steel-900"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/10 transition-colors group-hover:bg-heli-red/20">
                    <Icon className="h-6 w-6 text-heli-red" />
                  </div>
                  <h3 className="font-heading text-2xl text-white leading-tight">
                    {cat.name.toUpperCase()}
                  </h3>
                  <p className="mt-2 text-sm text-steel-400 line-clamp-3">
                    {cat.description}
                  </p>
                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-steel-800 mt-5">
                    <span className="text-xs font-medium uppercase tracking-wider text-steel-500">
                      {cat.productCount} equipos
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-heli-red-light transition-all group-hover:gap-2.5">
                      Ver
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Catalogo PDF general */}
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-heli-red/30 bg-gradient-to-br from-heli-red/10 via-steel-900 to-steel-900 p-6 sm:p-10">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-heli-red/20">
                  <Download className="h-7 w-7 text-heli-red" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white leading-tight">
                    CATÁLOGO PDF COMPLETO
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-steel-300">
                    Solicita el catálogo PDF general con todas nuestras líneas
                    de equipos. Te lo enviamos por correo electrónico.
                  </p>
                </div>
              </div>

              <a
                href="mailto:contacto@heliforklift.cl?subject=Solicitud%20de%20Cat%C3%A1logo%20PDF&body=Hola%2C%20me%20gustar%C3%ADa%20recibir%20el%20cat%C3%A1logo%20PDF%20completo%20de%20gr%C3%BAas%20horquillas%20HELI.%20Gracias."
                className="glow-red w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-heli-red px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-heli-red-dark hover:scale-[1.02]"
              >
                <Mail className="h-5 w-5" />
                SOLICITAR CATÁLOGO
              </a>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-steel-700/50 bg-steel-900/50 p-6">
            <h3 className="text-base font-bold text-white">
              ¿Necesitas la ficha técnica de un modelo específico?
            </h3>
            <p className="mt-2 text-sm text-steel-400">
              En cada página de producto encontrarás un botón para descargar la
              ficha técnica en PDF. Si el modelo que buscas no tiene ficha
              disponible, contáctanos y te la enviamos.
            </p>
            <Link
              href="/productos"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-heli-red-light hover:text-white transition-colors"
            >
              Ver catálogo de productos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
