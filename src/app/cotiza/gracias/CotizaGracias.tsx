"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  FileText,
  Phone,
  MessageCircle,
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
    dataLayer?: Record<string, unknown>[];
  }
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
      "Te enviamos una propuesta formal con especificaciones, precio y opciones de financiamiento.",
    timing: "Mismo día hábil",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Coordinamos entrega",
    description:
      "Agendamos visita técnica si es necesario y coordinamos la entrega de tu equipo.",
    timing: "Stock inmediato disponible",
  },
];

const trustBadges = [
  { icon: Award, text: "+1.100 equipos vendidos en Chile" },
  { icon: ShieldCheck, text: "Servicio técnico y repuestos a nivel nacional" },
  { icon: Building2, text: "Sucursales en Santiago, Antofagasta y Copiapó" },
];

export default function CotizaGracias() {
  // Conversión: dispara Lead (Meta) y un evento dataLayer (GTM/Google Ads).
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.fbq?.("track", "Lead", {
      content_name: "cotiza_brand",
      content_category: "general",
    });
    window.dataLayer?.push({ event: "generate_lead", lead_source: "cotiza_lp" });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-steel-950 via-steel-900 to-steel-950">
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

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 flex items-center justify-center"
        >
          <Link
            href="/"
            aria-label="Volver al inicio - HELI Chile"
            className="inline-flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/assets/legacy/logos/heli-chile-logo.webp"
              alt="HELI Forklift Chile"
              width={150}
              height={45}
              priority
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
        </motion.div>

        {/* Confirmación */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
            className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-heli-red bg-heli-red/10 sm:h-24 sm:w-24"
          >
            <CheckCircle2 className="h-10 w-10 text-heli-red sm:h-12 sm:w-12" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm font-bold uppercase tracking-widest text-heli-red-light"
          >
            Solicitud recibida
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading mx-auto mt-3 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.9] text-white"
          >
            ¡GRACIAS POR{" "}
            <span className="bg-gradient-to-r from-heli-red-light via-heli-red to-heli-red-dark bg-clip-text text-transparent">
              COTIZAR CON HELI!
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg"
          >
            Un ejecutivo especializado te contactará en menos de{" "}
            <strong className="text-white">2 horas hábiles</strong> con tu
            cotización a medida. ¿Lo necesitas ahora mismo?
          </motion.p>

          {/* CTAs directas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="tel:+56993209186"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-heli-red px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(206,20,45,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(206,20,45,0.7)]"
            >
              <Phone className="h-4 w-4" />
              +56 9 9320 9186
            </a>
            <a
              href="https://wa.me/56993209186?text=Hola,%20acabo%20de%20cotizar%20en%20la%20web%20y%20quiero%20avanzar%20con%20mi%20gr%C3%BAa%20HELI."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur transition-all hover:border-heli-red/40 hover:bg-white/[0.08]"
            >
              <MessageCircle className="h-4 w-4 text-heli-red-light" />
              Escríbenos por WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Próximos pasos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
            {nextSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-steel-900 to-steel-950 p-6"
              >
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust + footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 border-t border-white/[0.06] pt-8"
        >
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustBadges.map((b) => (
              <div key={b.text} className="flex items-center gap-2.5">
                <b.icon className="h-4 w-4 flex-shrink-0 text-heli-red-light" />
                <span className="text-xs text-steel-300">{b.text}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-steel-400 transition-colors hover:text-white"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Volver a heliforklift.cl
            </Link>
            <p className="text-center text-xs text-steel-600">
              Desarrollado y diseñado por{" "}
              <a
                href="https://www.digitals.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-steel-400 transition-colors hover:text-white"
              >
                Agencia Digitals
              </a>{" "}
              · Agencia y consultora digital
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
