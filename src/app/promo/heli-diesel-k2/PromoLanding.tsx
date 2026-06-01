"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Cog,
  Weight,
  Disc3,
  ArrowUpDown,
  Move,
  Armchair,
  ShieldCheck,
  Truck,
  Mail,
  Check,
  Flame,
  Clock,
  Zap,
  Award,
  TrendingDown,
  Building2,
  Fuel,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRODUCT_IMAGE_FRONT = "/assets/promo/heli-diesel-k2-hero.png";
const PRODUCT_IMAGE_SIDE = "/assets/promo/heli-diesel-k2-side.png";

// ============================================================
// COUNTDOWN — sentido de urgencia
// ============================================================
function useCountdown(targetHours: number) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date();
    target.setHours(target.getHours() + targetHours, 59, 59, 999);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;

      if (diff <= 0) {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetHours]);

  return time;
}

// ============================================================
// STOCK COUNTER — visualización de escasez (15 unidades)
// ============================================================
function StockCounter() {
  const totalStock = 15;
  const remainingStock = 11;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap justify-center gap-1">
        {Array.from({ length: totalStock }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={cn(
              "h-2 w-5 rounded-full transition-all",
              i < remainingStock
                ? "bg-heli-red shadow-[0_0_12px_rgba(206,20,45,0.6)]"
                : "bg-steel-700"
            )}
          />
        ))}
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-heli-red-light">
        Solo {remainingStock} de {totalStock} disponibles
      </p>
    </div>
  );
}

// ============================================================
// HERO — primer impacto
// ============================================================
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const countdown = useCountdown(48);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-steel-950 via-steel-900 to-steel-950"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-heli-red/20 blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute left-[-10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-heli-red-dark/30 blur-[120px]"
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Top bar — logo + countdown */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
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

          <div className="flex items-center gap-3 rounded-full border border-heli-red/30 bg-heli-red/10 px-4 py-2 backdrop-blur">
            <Clock className="h-4 w-4 text-heli-red-light" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Oferta termina en
            </span>
            <div className="flex items-center gap-1 font-mono text-sm font-bold text-heli-red-light">
              <span>{String(countdown.hours).padStart(2, "0")}h</span>
              <span>:</span>
              <span>{String(countdown.minutes).padStart(2, "0")}m</span>
              <span>:</span>
              <span>{String(countdown.seconds).padStart(2, "0")}s</span>
            </div>
          </div>
        </motion.div>

        {/* Main hero content */}
        <div className="mt-8 grid flex-1 grid-cols-1 items-center gap-8 lg:mt-0 lg:grid-cols-2">
          {/* Texto */}
          <motion.div style={{ y: textY }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-heli-yellow/30 bg-heli-yellow/10 px-3 py-1.5"
            >
              <Flame className="h-3.5 w-3.5 text-heli-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-heli-yellow">
                Últimas 15 unidades · Stock inmediato
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading mt-4 text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white"
            >
              GRÚAS HORQUILLA
              <br />
              <span className="bg-gradient-to-r from-heli-red-light via-heli-red to-heli-red-dark bg-clip-text text-transparent">
                HELI DIESEL
              </span>
              <br />
              <span className="text-heli-yellow">SERIE K2</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg"
            >
              Máxima productividad, menor costo operativo y la confiabilidad
              que tu operación necesita. Disponibles en{" "}
              <strong className="text-white">2.5, 3.0 y 3.5 toneladas</strong>{" "}
              para adaptarse a cualquier carga.
            </motion.p>

            {/* Tonelajes disponibles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-heli-red-light">
                Capacidades disponibles
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-heli-red/30 bg-gradient-to-br from-heli-red/20 via-heli-red/10 to-transparent p-4 backdrop-blur">
                  <p className="font-heading text-3xl leading-none text-white sm:text-4xl">
                    2.5
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-heli-red-light">
                    Tons
                  </p>
                </div>
                <div className="rounded-2xl border border-heli-red/40 bg-gradient-to-br from-heli-red/30 via-heli-red/15 to-transparent p-4 backdrop-blur ring-1 ring-heli-red/30">
                  <p className="font-heading text-3xl leading-none text-white sm:text-4xl">
                    3.0
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-heli-red-light">
                    Tons
                  </p>
                </div>
                <div className="rounded-2xl border border-heli-red/30 bg-gradient-to-br from-heli-red/20 via-heli-red/10 to-transparent p-4 backdrop-blur">
                  <p className="font-heading text-3xl leading-none text-white sm:text-4xl">
                    3.5
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-heli-red-light">
                    Tons
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA principal — solo formulario */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex"
            >
              <a
                href="#cotiza"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-heli-red px-10 py-4 text-base font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(206,20,45,0.4)] transition-all hover:shadow-[0_0_40px_rgba(206,20,45,0.7)] hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-heli-red-dark via-heli-red to-heli-red-light opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">Solicitar cotización</span>
                <Zap className="relative h-4 w-4" />
              </a>
            </motion.div>

            {/* Stock counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6"
            >
              <StockCounter />
            </motion.div>
          </motion.div>

          {/* Imagen */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full max-w-2xl justify-self-center lg:justify-self-end"
          >
            <div className="absolute inset-0 rounded-full bg-heli-red/30 blur-[100px]" />

            <div className="relative h-full w-full">
              <Image
                src={PRODUCT_IMAGE_FRONT}
                alt="Grúa Horquilla HELI Diesel Serie K2 — 2.5/3.0/3.5 toneladas"
                fill
                priority
                quality={90}
                className="object-contain drop-shadow-[0_30px_60px_rgba(206,20,45,0.5)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute right-0 top-4 sm:right-4 sm:top-8"
            >
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-heli-red text-white shadow-2xl sm:h-32 sm:w-32">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-heading text-base leading-none sm:text-lg">
                  ¡15
                </span>
                <span className="font-heading text-base leading-none sm:text-lg">
                  UNIDADES!
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider sm:text-xs">
                  Limitadas
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden pb-4 pt-8 text-center lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-1 text-steel-500"
          >
            <span className="text-[10px] uppercase tracking-widest">
              Conoce las especificaciones
            </span>
            <span className="text-xl">↓</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURES — 6 spec cards con animación scroll
// ============================================================
const features = [
  {
    icon: Fuel,
    title: "Motor Diesel",
    desc: "Potencia y eficiencia para trabajo pesado. Tecnología robusta probada en operaciones intensivas.",
  },
  {
    icon: Weight,
    title: "2.5 / 3.0 / 3.5 Tons",
    desc: "Tres capacidades disponibles para adaptarse a cualquier necesidad de carga.",
  },
  {
    icon: Disc3,
    title: "Neumáticos macizos",
    desc: "Mayor durabilidad y estabilidad en todo tipo de superficies. Sin pinchazos, sin tiempos muertos.",
  },
  {
    icon: ArrowUpDown,
    title: "Mástil triple 4.7 m",
    desc: "Mayor altura de elevación para optimizar tu operación en bodegas y centros de distribución.",
  },
  {
    icon: Move,
    title: "Desplazador lateral",
    desc: "Mayor precisión y eficiencia en el manejo de cargas sin necesidad de mover la máquina.",
  },
  {
    icon: Armchair,
    title: "Asiento con suspensión",
    desc: "Más comodidad para el operador en largas jornadas de trabajo. Reduce fatiga y mejora productividad.",
  },
];

function FeaturesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-steel-950 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(206,20,45,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
            Especificaciones técnicas
          </p>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
            RENDIMIENTO QUE
            <br />
            <span className="text-heli-red">NO SE DETIENE</span>
          </h2>
          <p className="mt-4 text-base text-steel-400">
            Cada componente está pensado para reducir tu costo operativo y
            maximizar la disponibilidad de tu flota.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-steel-900 to-steel-950 p-7 transition-all hover:border-heli-red/40 hover:shadow-[0_20px_60px_-15px_rgba(206,20,45,0.4)]"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-heli-red/0 blur-3xl transition-all duration-500 group-hover:bg-heli-red/20" />

              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-heli-red/10 ring-1 ring-heli-red/30 transition-all group-hover:bg-heli-red group-hover:ring-heli-red">
                  <f.icon className="h-7 w-7 text-heli-red transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-400">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SHOWCASE — vista lateral de la maquina con hotspots
// ============================================================
function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const specs = [
    {
      icon: ArrowUpDown,
      title: "Mástil triple 4.7m",
      desc: "Mayor altura de elevación para optimizar tu operación en bodegas modernas.",
    },
    {
      icon: Fuel,
      title: "Motor Diesel",
      desc: "Potencia y eficiencia para trabajo pesado. Tecnología robusta probada.",
    },
    {
      icon: Disc3,
      title: "Neumáticos macizos",
      desc: "Mayor durabilidad. Sin pinchazos, sin tiempos muertos en operación.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-steel-950 via-steel-900 to-steel-950 py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(206,20,45,0.15),transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-heli-red/15 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
            Tecnología HELI
          </p>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,4rem)] leading-none text-white">
            INGENIERÍA QUE
            <br />
            <span className="text-heli-red">NO PARA</span>
          </h2>
          <p className="mt-4 text-base text-steel-400">
            Cada detalle pensado para operaciones intensivas. Confiabilidad
            probada en miles de unidades operando hoy en Chile.
          </p>
        </motion.div>

        {/* Imagen central + cards laterales (3 col en desktop) */}
        <motion.div
          style={{ y: imageY }}
          className="relative mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6"
        >
          {/* Cards lateral izquierda (2 cards) — desktop */}
          <div className="hidden flex-col gap-5 lg:col-span-3 lg:flex">
            {specs.slice(0, 2).map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="group rounded-2xl border border-white/[0.08] bg-gradient-to-br from-steel-900/80 to-steel-950/80 p-5 backdrop-blur transition-all hover:border-heli-red/40 hover:shadow-[0_10px_40px_-10px_rgba(206,20,45,0.4)]"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-heli-red/10 ring-1 ring-heli-red/30 transition-all group-hover:bg-heli-red group-hover:ring-heli-red">
                  <s.icon className="h-5 w-5 text-heli-red transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-base font-bold text-white">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-steel-400">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Imagen central — agrandada */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-heli-red/30 blur-[120px]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full scale-110"
              >
                <Image
                  src={PRODUCT_IMAGE_SIDE}
                  alt="HELI Diesel Serie K2 vista lateral"
                  fill
                  quality={90}
                  className="object-contain drop-shadow-[0_30px_60px_rgba(206,20,45,0.5)]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </div>
          </div>

          {/* Card lateral derecha (1 card grande) — desktop */}
          <div className="hidden lg:col-span-3 lg:flex">
            {(() => {
              const SpecIcon = specs[2].icon;
              return (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="group w-full rounded-2xl border border-heli-red/30 bg-gradient-to-br from-heli-red/15 via-steel-900/80 to-steel-950/80 p-5 backdrop-blur transition-all hover:border-heli-red/60 hover:shadow-[0_10px_40px_-10px_rgba(206,20,45,0.6)]"
                >
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-heli-red/20 ring-1 ring-heli-red/40 transition-all group-hover:bg-heli-red">
                    <SpecIcon className="h-5 w-5 text-heli-red transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {specs[2].title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-steel-300">
                    {specs[2].desc}
                  </p>
                </motion.div>
              );
            })()}
          </div>

          {/* Cards en mobile/tablet — abajo de la imagen, grid horizontal */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:hidden">
            {specs.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-steel-900/80 to-steel-950/80 p-4 backdrop-blur"
              >
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-heli-red/10 ring-1 ring-heli-red/30">
                  <s.icon className="h-5 w-5 text-heli-red" />
                </div>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-steel-400">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6"
        >
          {[
            { value: "3.5T", label: "Capacidad max" },
            { value: "4.7m", label: "Altura mástil" },
            { value: "Diesel", label: "Tipo motor" },
            { value: "180+", label: "Países" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/[0.08] bg-steel-900/50 p-4 text-center backdrop-blur sm:p-6"
            >
              <p className="font-heading text-2xl text-heli-red sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-steel-400 sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// BENEFITS — 4 grandes diferenciadores (incluye GARANTÍA 1 AÑO)
// ============================================================
const benefits = [
  {
    icon: ShieldCheck,
    title: "Alta durabilidad",
    desc: "Componentes de calidad para máxima vida útil. HELI es el #1 mundial con +65 años de experiencia.",
    stat: "+65 años",
    statLabel: "de experiencia",
  },
  {
    icon: TrendingDown,
    title: "Bajo costo de operación",
    desc: "Diseñada para entregar eficiencia y ahorro. Hasta 30% más económica que la competencia.",
    stat: "30%",
    statLabel: "menor costo",
  },
  {
    icon: Cog,
    title: "Servicio y repuestos garantizados",
    desc: "Respaldo y soporte técnico a nivel nacional. Sucursales y socios estratégicos en todo Chile.",
    stat: "1 año",
    statLabel: "de garantía",
  },
  {
    icon: Truck,
    title: "Entrega inmediata",
    desc: "Stock disponible en Chile para entrega rápida. No esperes 3 meses como con otras marcas.",
    stat: "48 hrs",
    statLabel: "para retirar",
  },
];

function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-steel-950 via-steel-900 to-steel-950 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
            ¿Por qué elegirnos?
          </p>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
            LA INVERSIÓN INTELIGENTE
            <br />
            <span className="text-heli-yellow">PARA TU OPERACIÓN</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-steel-900 to-steel-950 p-6 sm:p-8"
            >
              <div className="absolute right-4 top-4 text-right sm:right-6 sm:top-6">
                <p className="font-heading text-2xl leading-none text-heli-red sm:text-3xl">
                  {b.stat}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-steel-500 sm:text-[10px]">
                  {b.statLabel}
                </p>
              </div>

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-heli-red/10 ring-1 ring-heli-red/30 sm:h-14 sm:w-14">
                <b.icon className="h-6 w-6 text-heli-red sm:h-7 sm:w-7" />
              </div>

              <h3 className="mt-5 text-lg font-bold leading-tight text-white sm:text-xl">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// USE CASES — donde funciona la máquina
// ============================================================
const useCases = [
  "Logística y distribución",
  "Industria manufacturera",
  "Centros de almacenamiento",
  "Operaciones portuarias",
  "Construcción y obra civil",
  "Bodegas de gran volumen",
];

function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-steel-950 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 0.3, x: 0 } : {}}
        transition={{ duration: 1 }}
        className="absolute right-[-10%] top-1/2 hidden h-[500px] w-[500px] -translate-y-1/2 lg:block"
      >
        <Image
          src={PRODUCT_IMAGE_FRONT}
          alt=""
          fill
          quality={85}
          className="object-contain"
          aria-hidden
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
              Aplicaciones
            </p>
            <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
              IDEAL PARA TU
              <br />
              <span className="text-heli-red">INDUSTRIA</span>
            </h2>
            <p className="mt-4 text-base text-steel-400">
              Las HELI Diesel Serie K2 son la solución versátil para
              operaciones que requieren rendimiento sostenido, máxima carga
              y bajo costo operativo. Disponibles en 3 capacidades.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {useCases.map((u, i) => (
              <motion.div
                key={u}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-steel-900/80 p-4 backdrop-blur"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-heli-red/10">
                  <Check className="h-4 w-4 text-heli-red" />
                </div>
                <span className="text-sm font-medium text-white">{u}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// FORM CTA — sección de conversión final
// ============================================================
const HUBSPOT_V2_SCRIPT = "https://js.hsforms.net/forms/embed/v2.js";
const HUBSPOT_PORTAL_ID = "50182752";
const HUBSPOT_FORM_ID = "8ae22a71-ea73-4cf7-8c57-634e768c0104";

declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
    fbq?: (
      action: "track" | "trackCustom",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

function ConversionForm() {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = formContainerRef.current;
    if (!container) return;

    const targetId = `hs-form-promo-${Math.random().toString(36).slice(2, 11)}`;
    container.id = targetId;

    function renderForm() {
      if (!window.hbspt?.forms?.create || !container) return;
      container.innerHTML = "";
      window.hbspt.forms.create({
        region: "na1",
        portalId: HUBSPOT_PORTAL_ID,
        formId: HUBSPOT_FORM_ID,
        target: `#${targetId}`,
      });
    }

    if (window.hbspt?.forms?.create) {
      renderForm();
      return;
    }

    const existing = document.querySelector(
      `script[src="${HUBSPOT_V2_SCRIPT}"]`
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = HUBSPOT_V2_SCRIPT;
      script.async = true;
      script.defer = true;
      script.onload = renderForm;
      document.body.appendChild(script);
    } else {
      existing.addEventListener("load", renderForm, { once: true });
      setTimeout(renderForm, 100);
    }
  }, []);

  return (
    <section
      id="cotiza"
      className="relative overflow-hidden bg-gradient-to-br from-steel-900 via-steel-950 to-steel-900 py-20 sm:py-28"
    >
      <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-heli-red/20 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-heli-yellow/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          {/* Left col — copy de conversión */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-heli-yellow/30 bg-heli-yellow/10 px-3 py-1.5">
              <Flame className="h-3.5 w-3.5 text-heli-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-heli-yellow">
                Aprovecha esta oportunidad única
              </span>
            </div>

            <h2 className="font-heading mt-4 text-[clamp(2rem,5vw,4rem)] leading-none text-white">
              ¿LISTO PARA
              <br />
              <span className="text-heli-red">ELEVAR TU OPERACIÓN?</span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-steel-300">
              Solo <strong className="text-white">15 unidades disponibles</strong>{" "}
              de la nueva serie K2. Cuando se acaben, cambian las condiciones
              y disponibilidad. Completa el formulario y te contactamos en
              menos de <strong className="text-white">2 horas hábiles</strong>.
            </p>

            <div className="mt-6 space-y-3">
              {[
                {
                  icon: Zap,
                  text: "Respuesta en menos de 2 horas hábiles",
                },
                {
                  icon: Award,
                  text: "+1.100 empresas chilenas confían en HELI",
                },
                {
                  icon: ShieldCheck,
                  text: "1 año de garantía y respaldo técnico nacional",
                },
                {
                  icon: Building2,
                  text: "Sucursales en Santiago, Antofagasta y Copiapó",
                },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-heli-red/10 ring-1 ring-heli-red/30">
                    <item.icon className="h-4 w-4 text-heli-red-light" />
                  </div>
                  <span className="text-sm text-steel-200">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Email de contacto (sin telefono — el formulario es la unica via) */}
            <div className="mt-8">
              <a
                href="mailto:contacto@heliforklift.cl"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-steel-900/50 p-4 backdrop-blur transition-all hover:border-heli-red/40 hover:bg-steel-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-heli-red/10 group-hover:bg-heli-red/20">
                  <Mail className="h-5 w-5 text-heli-red-light" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-steel-500">
                    Tambien puedes escribirnos a
                  </p>
                  <p className="truncate text-sm font-bold text-white">
                    contacto@heliforklift.cl
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right col — form (color matcheado con el iframe de HubSpot) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full rounded-3xl border border-white/[0.08] bg-[#0d0d18] p-4 backdrop-blur-xl sm:p-5"
          >
            <div className="mb-4 flex items-center gap-3 border-b border-white/[0.08] px-2 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-heli-red text-white">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-lg leading-none text-white">
                  COTIZA AHORA
                </p>
                <p className="mt-1 text-xs text-steel-400">
                  Solo te tomará 1 minuto
                </p>
              </div>
            </div>

            <div ref={formContainerRef} className="hubspot-form-container w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER MINI
// ============================================================
function FooterMini() {
  return (
    <footer className="border-t border-white/[0.06] bg-steel-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <Link
            href="/"
            aria-label="Volver al inicio - HELI Chile"
            className="inline-flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/assets/legacy/logos/heli-chile-logo.png"
              alt="HELI Forklift Chile"
              width={120}
              height={36}
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-steel-500">
            <a href="https://heliforklift.cl" className="hover:text-white">
              www.heliforklift.cl
            </a>
            <span className="hidden sm:inline">·</span>
            <a href="tel:+56993209186" className="hover:text-white">
              +56 9 9320 9186
            </a>
            <span className="hidden sm:inline">·</span>
            <a
              href="mailto:contacto@heliforklift.cl"
              className="hover:text-white"
            >
              contacto@heliforklift.cl
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-steel-600">
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
    </footer>
  );
}

// ============================================================
// FLOATING CTA — boton flotante que acompana al scroll
// Aparece despues de pasar el hero. Mobile: full-width abajo. Desktop: pill flotante.
// ============================================================
function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile: barra inferior full-width */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-steel-950/95 p-3 backdrop-blur-xl lg:hidden"
      >
        <a
          href="#cotiza"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-heli-red text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(206,20,45,0.4)]"
        >
          <Zap className="h-4 w-4" />
          Cotizar ahora
        </a>
      </motion.div>

      {/* Desktop: pill flotante esquina inferior derecha */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
          y: isVisible ? 0 : 20,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="fixed bottom-6 right-6 z-50 hidden lg:block"
      >
        <a
          href="#cotiza"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-heli-red px-7 py-4 text-base font-bold uppercase tracking-wider text-white shadow-[0_8px_30px_rgba(206,20,45,0.5)] transition-all hover:shadow-[0_12px_40px_rgba(206,20,45,0.8)] hover:-translate-y-0.5 hover:scale-105"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-heli-red/40" />
          <span className="absolute inset-0 bg-gradient-to-r from-heli-red-dark via-heli-red to-heli-red-light opacity-0 transition-opacity group-hover:opacity-100" />
          <Zap className="relative h-5 w-5" />
          <span className="relative">Cotizar ahora</span>
        </a>
      </motion.div>
    </>
  );
}

// ============================================================
// MAIN
// ============================================================
export default function PromoLanding() {
  // Meta Pixel — disparar ViewContent custom al cargar la landing
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "ViewContent", {
        content_name: "promo_k2",
        content_category: "diesel",
        content_ids: ["heli-diesel-k2"],
      });
    }
  }, []);

  return (
    <main className="bg-steel-950 pb-20 lg:pb-0">
      <Hero />
      <FeaturesGrid />
      <Showcase />
      <Benefits />
      <UseCases />
      <ConversionForm />
      <FooterMini />
      <FloatingCTA />
    </main>
  );
}
