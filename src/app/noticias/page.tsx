import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { news } from "@/lib/data/news";
import { Calendar, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Noticias y Novedades — Helifork Lift",
  description:
    "Últimas noticias, entregas, eventos y novedades de Helifork Lift. Sigue las novedades del sector de grúas horquillas en Chile.",
  alternates: { canonical: "/noticias" },
  openGraph: {
    title: "Noticias y Novedades — Helifork Lift",
    description:
      "Entregas de equipos, participación en eventos y novedades tecnológicas del sector.",
  },
};

const categoryColors: Record<string, string> = {
  Entregas: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Eventos: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Tecnología: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Empresa: "bg-heli-red/15 text-heli-red-light border-heli-red/30",
};

export default function NoticiasPage() {
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-steel-950 py-16 sm:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Mantente al día
            </p>
            <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
              NOTICIAS Y NOVEDADES
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-steel-300">
              Entregas de equipos, participación en eventos internacionales y
              las últimas novedades del sector.
            </p>
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          <Link
            href={`/noticias/${featured.slug}`}
            className="group block overflow-hidden rounded-2xl border border-steel-700/50 bg-steel-900 transition-all hover:border-heli-red/40 hover:shadow-2xl hover:shadow-heli-red/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                      categoryColors[featured.category] ||
                      "bg-steel-700 text-steel-200"
                    }`}
                  >
                    <Tag className="h-3 w-3" />
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-steel-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {featured.dateLabel}
                </div>
                <h2 className="font-heading mt-3 text-2xl sm:text-3xl lg:text-4xl leading-tight text-white">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-steel-300 line-clamp-4">
                  {featured.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-heli-red transition-all group-hover:gap-3">
                  Leer noticia
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* Grid de noticias */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <Link
                key={item.id}
                href={`/noticias/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-steel-700/50 bg-steel-900 transition-all hover:-translate-y-1 hover:border-heli-red/40 hover:shadow-xl hover:shadow-heli-red/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        categoryColors[item.category] ||
                        "bg-steel-700 text-steel-200"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-steel-500">
                    <Calendar className="h-3 w-3" />
                    {item.dateLabel}
                  </div>
                  <h3 className="mt-2 text-lg font-bold leading-tight text-white line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-400 line-clamp-3">
                    {item.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-heli-red-light transition-all group-hover:gap-2.5">
                    Leer más
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
