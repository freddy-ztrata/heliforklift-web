import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { news, getNewsBySlug } from "@/lib/data/news";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "Noticia no encontrada" };
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/noticias/${slug}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      images: [{ url: item.image }],
      type: "article",
      publishedTime: item.date,
    },
  };
}

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

const categoryColors: Record<string, string> = {
  Entregas: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Eventos: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Tecnología: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Empresa: "bg-heli-red/15 text-heli-red-light border-heli-red/30",
};

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const related = news
    .filter((n) => n.slug !== slug && n.category === item.category)
    .slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-steel-400">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/noticias" className="hover:text-white transition-colors">
              Noticias
            </Link>
            <span>/</span>
            <span className="text-white truncate">{item.title}</span>
          </nav>
        </div>

        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Hero image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-steel-700/50">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute left-4 top-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                  categoryColors[item.category] || "bg-steel-700 text-steel-200"
                }`}
              >
                <Tag className="h-3 w-3" />
                {item.category}
              </span>
            </div>
          </div>

          {/* Header */}
          <header className="mt-8">
            <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-steel-500">
              <Calendar className="h-4 w-4" />
              {item.dateLabel}
            </div>
            <h1 className="font-heading mt-3 text-[clamp(2rem,5vw,3.75rem)] leading-tight text-white">
              {item.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-steel-300">
              {item.summary}
            </p>
          </header>

          {/* Body */}
          {item.content && (
            <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-steel-300">
              {item.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 border-t border-steel-800 pt-8">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-steel-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a todas las noticias
            </Link>
          </div>
        </article>

        {/* Relacionadas */}
        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="font-heading mb-8 text-2xl sm:text-3xl text-white">
              NOTICIAS RELACIONADAS
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/noticias/${r.slug}`}
                  className="group overflow-hidden rounded-2xl border border-steel-700/50 bg-steel-900 transition-all hover:-translate-y-1 hover:border-heli-red/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      quality={70}
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-steel-500">
                      {r.dateLabel}
                    </p>
                    <h3 className="mt-2 text-base font-bold text-white line-clamp-2">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
