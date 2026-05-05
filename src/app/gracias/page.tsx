import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import {
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  ArrowRight,
  FileText,
  Mail,
  Newspaper,
} from "lucide-react";

export const metadata: Metadata = {
  title: "¡Gracias por contactarnos! — Tu solicitud fue recibida",
  description:
    "Recibimos tu solicitud de cotización. Un ejecutivo de Helifork Lift te contactará en menos de 24 horas hábiles con toda la información que necesitas.",
  alternates: { canonical: "/gracias" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "¡Gracias! — Helifork Lift",
    description:
      "Recibimos tu solicitud. Te contactaremos en menos de 24 horas hábiles.",
  },
};

const nextSteps = [
  {
    icon: Clock,
    step: "01",
    title: "Revisamos tu solicitud",
    description:
      "Nuestro equipo comercial analiza tu requerimiento y prepara una propuesta a medida según tu operación.",
    timing: "Próximas 2 horas hábiles",
  },
  {
    icon: Phone,
    step: "02",
    title: "Te contactamos",
    description:
      "Un ejecutivo especializado te llamará para coordinar los detalles, resolver dudas y agendar una visita técnica si la necesitas.",
    timing: "Mismo día hábil",
  },
  {
    icon: FileText,
    step: "03",
    title: "Recibes tu cotización",
    description:
      "Te enviamos una propuesta formal con especificaciones, precio, plazos de entrega y opciones de financiamiento.",
    timing: "En menos de 24 horas hábiles",
  },
];

const exploreLinks = [
  {
    href: "/productos",
    icon: FileText,
    title: "Explora nuestro catálogo",
    description: "76 modelos de grúas horquillas, transpaletas y más equipos",
  },
  {
    href: "/noticias",
    icon: Newspaper,
    title: "Últimas noticias",
    description: "Conoce nuestros proyectos, capacitaciones y novedades",
  },
  {
    href: "/nosotros",
    icon: CheckCircle2,
    title: "Sobre Helifork Lift",
    description: "12 años en Chile, +67 años de trayectoria mundial",
  },
];

export default function GraciasPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Hero — Confirmación */}
        <section className="relative overflow-hidden bg-steel-950 py-16 sm:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
          <div className="absolute -top-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(206,20,45,0.1),transparent_70%)]" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Check animado */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-heli-red bg-heli-red/10 sm:h-24 sm:w-24">
              <CheckCircle2 className="h-10 w-10 text-heli-red sm:h-12 sm:w-12" />
            </div>

            <p className="text-sm font-medium uppercase tracking-widest text-heli-red">
              Solicitud recibida
            </p>
            <h1 className="font-heading mt-3 text-[clamp(2.5rem,7vw,5.5rem)] leading-none text-white">
              ¡GRACIAS POR CONTACTARNOS!
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-steel-300">
              Hemos recibido tu solicitud correctamente. Un ejecutivo
              especializado te contactará en menos de{" "}
              <span className="font-bold text-white">24 horas hábiles</span>{" "}
              para entregarte toda la información que necesitas.
            </p>

            {/* Quick contact pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="tel:+56993209186"
                className="inline-flex items-center gap-2 rounded-full border border-steel-600 bg-steel-900/50 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-heli-red hover:bg-heli-red/10"
              >
                <Phone className="h-4 w-4 text-heli-red" />
                +56 9 9320 9186
              </a>
              <a
                href="https://wa.me/56993209186?text=Hola%2C%20acabo%20de%20enviar%20una%20solicitud%20por%20la%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-steel-600 bg-steel-900/50 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-heli-red hover:bg-heli-red/10"
              >
                <MessageCircle className="h-4 w-4 text-heli-red" />
                WhatsApp
              </a>
              <a
                href="mailto:contacto@heliforklift.cl"
                className="inline-flex items-center gap-2 rounded-full border border-steel-600 bg-steel-900/50 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-heli-red hover:bg-heli-red/10"
              >
                <Mail className="h-4 w-4 text-heli-red" />
                contacto@heliforklift.cl
              </a>
            </div>
          </div>
        </section>

        {/* Próximos pasos */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Qué sigue ahora
            </p>
            <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
              PRÓXIMOS PASOS
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
            {nextSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-steel-700/50 bg-steel-900/50 p-6 transition-all hover:border-heli-red/40 hover:bg-steel-900"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/10">
                      <Icon className="h-6 w-6 text-heli-red" />
                    </div>
                    <span className="font-heading text-3xl text-steel-700">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-400">
                    {item.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-heli-red/10 px-3 py-1.5 text-xs font-medium text-heli-red">
                    <Clock className="h-3 w-3" />
                    {item.timing}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mientras tanto — Explorar */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Mientras esperas nuestra respuesta
            </p>
            <h2 className="font-heading mt-2 text-[clamp(1.75rem,4vw,2.75rem)] leading-none text-white">
              EXPLORA HELIFORK
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exploreLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col rounded-2xl border border-steel-700/50 bg-steel-900/60 p-6 transition-all hover:-translate-y-1 hover:border-heli-red/40"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/10">
                    <Icon className="h-6 w-6 text-heli-red" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{link.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-400">
                    {link.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-heli-red transition-transform group-hover:translate-x-1">
                    Ver más
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA volver inicio */}
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-steel-700/50 bg-gradient-to-br from-heli-red/10 via-steel-900 to-steel-900 p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] leading-tight text-white">
                ¿NECESITAS RESPUESTA INMEDIATA?
              </h2>
              <p className="mt-4 max-w-xl text-base text-steel-300">
                Si tu requerimiento es urgente, llámanos directamente o
                escríbenos por WhatsApp. Estamos disponibles de Lunes a Viernes
                de 08:30 a 18:00 hrs.
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href="https://wa.me/56993209186?text=Hola%2C%20necesito%20ayuda%20urgente"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-red inline-flex items-center justify-center gap-2 rounded-xl bg-heli-red px-6 sm:px-8 py-3.5 sm:py-4 text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-heli-red-dark hover:scale-[1.02]"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp ahora
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-steel-600 px-6 sm:px-8 py-3.5 sm:py-4 text-base font-medium text-white transition-all hover:border-white hover:bg-white/5"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
