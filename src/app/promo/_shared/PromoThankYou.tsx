"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  FileText,
  Award,
  ShieldCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

declare global {
  interface Window {
    fbq?: (
      action: "track" | "trackCustom",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

// Mapeo de slugs a content_name + value estimado para Meta Pixel
const PROMO_TRACKING: Record<string, { contentName: string; value: number }> = {
  "heli-gasolina-25": { contentName: "promo_25t", value: 14000000 },
  "heli-gasolina-35": { contentName: "promo_35t", value: 18000000 },
  "heli-diesel-k2": { contentName: "promo_k2", value: 16000000 },
  "heli-transpaleta-cbd1520": {
    contentName: "promo_transpaleta_2t",
    value: 950000,
  },
};

interface PromoThankYouProps {
  /** Nombre del producto que el lead cotizó (para personalizar el mensaje) */
  productName: string;
  /** Imagen del producto para mostrar como referencia visual */
  productImage: string;
  /** Eslogan corto debajo del título */
  productTagline: string;
  /** Color identificador del producto (slug) — solo para tracking */
  productSlug: string;
}

const nextSteps = [
  {
    icon: Clock,
    step: "01",
    title: "Revisamos tu solicitud",
    description:
      "Nuestro equipo comercial analiza tu requerimiento y prepara una propuesta a medida.",
    timing: "Próximas 2 horas hábiles",
  },
  {
    icon: FileText,
    step: "02",
    title: "Recibes tu cotización",
    description:
      "Te enviamos propuesta formal con especificaciones, precio y opciones de financiamiento.",
    timing: "Mismo día hábil",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Coordinamos entrega",
    description:
      "Coordinamos visita técnica si es necesario y agendamos la entrega de tu equipo.",
    timing: "Stock inmediato disponible",
  },
];

const trustBadges = [
  { icon: Award, text: "+1.100 empresas confían en HELI" },
  { icon: ShieldCheck, text: "1 año de garantía y respaldo nacional" },
  { icon: Building2, text: "Sucursales en Santiago, Antofagasta y Copiapó" },
];

export default function PromoThankYou({
  productName,
  productImage,
  productTagline,
  productSlug,
}: PromoThankYouProps) {
  // Meta Pixel — disparar Lead event al cargar la thank-you page
  // Esto es la conversion principal que Meta usa para optimizar las campañas
  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    const tracking = PROMO_TRACKING[productSlug];
    if (!tracking) return;
    const category = productSlug.includes("diesel")
      ? "diesel"
      : productSlug.includes("transpaleta")
        ? "transpaleta_electrica"
        : "gasolina";
    window.fbq("track", "Lead", {
      content_name: tracking.contentName,
      content_category: category,
      content_ids: [productSlug],
      value: tracking.value,
      currency: "CLP",
    });
  }, [productSlug]);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-steel-950 via-steel-900 to-steel-950"
      data-promo-thank-you={productSlug}
    >
      {/* Fondo: grid + glows rojos */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-[-10%] top-[10%] h-[600px] w-[600px] rounded-full bg-heli-red/20 blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute left-[-10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-heli-red-dark/30 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-10 flex items-center justify-center sm:justify-start"
        >
          <Link
            href="/"
            aria-label="Volver al inicio - HELI Chile"
            className="inline-flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/assets/legacy/logos/heli-chile-logo.png"
              alt="HELI Forklift Chile"
              width={140}
              height={42}
              priority
              className="h-9 w-auto brightness-0 invert sm:h-10"
            />
          </Link>
        </motion.div>

        {/* Hero — confirmación con producto */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Texto de confirmación */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Check animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-heli-red bg-heli-red/10 sm:h-24 sm:w-24"
            >
              <CheckCircle2 className="h-10 w-10 text-heli-red sm:h-12 sm:w-12" />
            </motion.div>

            <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
              Solicitud recibida
            </p>
            <h1 className="font-heading mt-3 text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.9] text-white">
              ¡GRACIAS POR
              <br />
              <span className="bg-gradient-to-r from-heli-red-light via-heli-red to-heli-red-dark bg-clip-text text-transparent">
                COTIZAR CON NOSOTROS!
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg">
              Hemos recibido tu solicitud por la{" "}
              <strong className="text-white">{productName}</strong>. Un
              ejecutivo especializado te contactará en menos de{" "}
              <strong className="text-white">2 horas hábiles</strong> con tu
              cotización formal.
            </p>

            {/* Trust badges */}
            <div className="mt-8 space-y-3">
              {trustBadges.map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-heli-red/10 ring-1 ring-heli-red/30">
                    <b.icon className="h-4 w-4 text-heli-red-light" />
                  </div>
                  <span className="text-sm text-steel-200">{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Imagen del producto cotizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative aspect-square w-full max-w-xl justify-self-center lg:justify-self-end"
          >
            <div className="absolute inset-0 rounded-full bg-heli-red/30 blur-[100px]" />

            <div className="relative h-full w-full">
              <Image
                src={productImage}
                alt={productName}
                fill
                priority
                quality={90}
                className="object-contain drop-shadow-[0_30px_60px_rgba(206,20,45,0.5)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Badge tagline */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute -bottom-2 right-0 sm:right-4"
            >
              <div className="rounded-full border border-heli-red/40 bg-steel-950/90 px-5 py-2 backdrop-blur">
                <span className="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-white sm:text-sm">
                  {productTagline}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Próximos pasos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
              Qué sigue ahora
            </p>
            <h2 className="font-heading mt-2 text-[clamp(2rem,4vw,3rem)] leading-none text-white">
              PRÓXIMOS PASOS
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
            {nextSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-steel-900 to-steel-950 p-6 transition-all hover:border-heli-red/40"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-heli-red/0 blur-3xl transition-all duration-500 hover:bg-heli-red/20" />

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/10 ring-1 ring-heli-red/30">
                      <item.icon className="h-6 w-6 text-heli-red" />
                    </div>
                    <span className="font-heading text-3xl text-steel-700">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-400">
                    {item.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-heli-red/10 px-3 py-1.5 text-xs font-medium text-heli-red-light">
                    <Clock className="h-3 w-3" />
                    {item.timing}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer mini */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 border-t border-white/[0.06] pt-8"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <Link
              href="https://heliforklift.cl"
              className="inline-flex items-center gap-2 text-sm text-steel-400 transition-colors hover:text-white"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Volver a heliforklift.cl
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-steel-500">
              <span>HELI Chile · Helifork Lift</span>
              <span className="hidden sm:inline">·</span>
              <a
                href="mailto:contacto@heliforklift.cl"
                className="hover:text-white"
              >
                contacto@heliforklift.cl
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
