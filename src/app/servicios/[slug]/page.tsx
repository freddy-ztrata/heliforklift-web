import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { services, getServiceBySlug } from "@/lib/data/services";
import {
  ShoppingCart,
  Clock,
  Wrench,
  Cog,
  RefreshCw,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Phone,
} from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Clock,
  Wrench,
  Cog,
  RefreshCw,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Servicio no encontrado" };

  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `/servicios/${slug}` },
    openGraph: {
      title: `${service.name} — Helifork Lift Chile`,
      description: service.description,
      images: [{ url: service.image }],
    },
  };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicioDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] || Cog;
  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-steel-400">
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span>/</span>
            <Link
              href="/servicios"
              className="transition-colors hover:text-white"
            >
              Servicios
            </Link>
            <span>/</span>
            <span className="text-white">{service.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-steel-950 py-12 sm:py-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 bg-[radial-gradient(ellipse,rgba(206,20,45,0.06),transparent_70%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
            <div>
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-heli-red/20 bg-heli-red/10">
                <Icon className="h-7 w-7 text-heli-red" />
              </div>
              <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
                Servicio
              </p>
              <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-white">
                {service.name.toUpperCase()}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-steel-300">
                {service.heroSubtitle}
              </p>

              {/* Features quick list */}
              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-steel-200"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-heli-red" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href={`/contacto?servicio=${encodeURIComponent(service.name)}`}
                  className="glow-red inline-flex w-full items-center justify-center gap-2 rounded-xl bg-heli-red px-6 py-3.5 font-bold text-white transition-all hover:bg-heli-red-dark sm:w-auto sm:px-7"
                >
                  {service.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+56958187035"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-steel-600 px-6 py-3.5 font-medium text-white transition-all hover:border-white hover:bg-white/5 sm:w-auto sm:px-7"
                >
                  <Phone className="h-4 w-4" />
                  +56 9 5818 7035
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl border border-steel-700/50 bg-steel-900">
              <div className="relative aspect-[4/3] product-img-container p-4 sm:p-8">
                <Image
                  src={service.image}
                  alt={`${service.name} — Helifork Lift Chile`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4 sm:p-8"
                  quality={80}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats / Benefits */}
        {service.benefits && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {service.benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-steel-700/50 bg-steel-900/60 p-5 sm:p-6 text-center"
                >
                  <div className="font-heading text-3xl text-heli-red sm:text-4xl">
                    {b.title}
                  </div>
                  <div className="mt-1 text-sm text-steel-400">
                    {b.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Long-form content */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {service.sections.map((s, i) => (
              <article
                key={s.title}
                className="rounded-2xl border border-steel-700/50 bg-steel-900/40 p-6 sm:p-8"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-heading text-2xl text-heli-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {s.title}
                  </h2>
                </div>
                <p className="text-steel-300 leading-relaxed">{s.content}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Other services */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-heading mb-8 text-3xl text-white">
            OTROS SERVICIOS
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((s) => {
              const SIcon = iconMap[s.icon] || Cog;
              return (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="group flex flex-col rounded-2xl border border-steel-700/50 bg-steel-900/60 p-5 transition-all hover:-translate-y-1 hover:border-heli-red/30"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-heli-red/10">
                    <SIcon className="h-5 w-5 text-heli-red" />
                  </div>
                  <h3 className="font-bold text-white">{s.name}</h3>
                  <p className="mt-1 text-sm text-steel-400 line-clamp-2">
                    {s.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-heli-red transition-transform group-hover:translate-x-1">
                    Ver más →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Back link */}
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-steel-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver todos los servicios
          </Link>
        </div>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
