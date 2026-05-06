"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  Phone,
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

const PRODUCT_IMAGE_FRONT = "/assets/promo/heli-diesel-k2-front.png";
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
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white p-2.5 shadow-[0_4px_20px_rgba(206,20,45,0.25)]">
              <Image
                src="/assets/legacy/logos/heli-chile-logo.png"
                alt="HELI Forklift Chile"
                width={120}
                height={36}
                priority
                className="h-7 w-auto sm:h-8"
              />
            </div>
          </div>

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

            {/* CTAs principales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#cotiza"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-heli-red px-8 py-4 text-base font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(206,20,45,0.4)] transition-all hover:shadow-[0_0_40px_rgba(206,20,45,0.7)] hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-heli-red-dark via-heli-red to-heli-red-light opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">Solicitar cotización</span>
                <Zap className="relative h-4 w-4" />
              </a>
              <a
                href="tel:+56993209186"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-bold uppercase tracking-wider text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Llámanos
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

  // Hotspots: dot sobre la pieza fisica, pill SIEMPRE hacia el espacio vacio
  // (no debe tapar la maquina). Vista lateral K2 Diesel.
  const hotspots = [
    {
      // Mastil esta en la izquierda — pill va aun mas a la izquierda (espacio vacio)
      label: "Mástil triple 4.7m",
      dotX: "30%",
      dotY: "32%",
      pillSide: "left" as const,
    },
    {
      // Motor esta en la derecha — pill va aun mas a la derecha (espacio vacio)
      label: "Motor Diesel",
      dotX: "72%",
      dotY: "55%",
      pillSide: "right" as const,
    },
    {
      // Rueda esta abajo central — pill va a la izquierda (espacio vacio izquierdo)
      label: "Neumáticos macizos",
      dotX: "55%",
      dotY: "78%",
      pillSide: "left" as const,
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

        {/* Imagen central + hotspots */}
        <motion.div
          style={{ y: imageY }}
          className="relative mt-10 flex items-center justify-center"
        >
          <div className="relative aspect-[4/3] w-full max-w-4xl">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-heli-red/30 blur-[100px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={PRODUCT_IMAGE_SIDE}
                alt="HELI Diesel Serie K2 vista lateral"
                fill
                quality={90}
                className="object-contain drop-shadow-[0_30px_60px_rgba(206,20,45,0.5)]"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </motion.div>

            {/* Hotspots — dot + pill juntos sobre la pieza */}
            {hotspots.map((h, i) => (
              <motion.div
                key={`hotspot-${h.label}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
                className={cn(
                  "group absolute z-20 hidden lg:flex items-center gap-3",
                  h.pillSide === "right" ? "flex-row" : "flex-row-reverse"
                )}
                style={{
                  left: h.dotX,
                  top: h.dotY,
                  transform:
                    h.pillSide === "right"
                      ? "translate(-8px, -50%)"
                      : "translate(calc(-100% + 8px), -50%)",
                }}
              >
                {/* Dot — clavado sobre la pieza */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    animate={{
                      scale: [1, 2.2, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    className="absolute inset-0 rounded-full bg-heli-red"
                  />
                  <div className="absolute -inset-3 rounded-full bg-heli-red/0 blur-md transition-all duration-300 group-hover:bg-heli-red/60" />
                  <div className="relative h-4 w-4 rounded-full bg-heli-red ring-2 ring-white/30 shadow-[0_0_15px_rgba(206,20,45,0.8)] transition-all duration-300 group-hover:scale-150 group-hover:ring-white/80 group-hover:shadow-[0_0_25px_rgba(206,20,45,1)]" />
                </div>

                {/* Pill — al lado inmediato del dot */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="cursor-pointer rounded-full border border-heli-red/40 bg-steel-950/90 px-4 py-2 backdrop-blur transition-all hover:border-heli-red hover:bg-heli-red hover:shadow-[0_0_30px_rgba(206,20,45,0.6)]"
                >
                  <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-white">
                    {h.label}
                  </span>
                </motion.div>
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
const HUBSPOT_FORM_ID = "15b3dd6b-0095-4c03-a306-3dde97e81456";

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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
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

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href="tel:+56993209186"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-steel-900/50 p-4 backdrop-blur transition-all hover:border-heli-red/40 hover:bg-steel-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-heli-red/10 group-hover:bg-heli-red/20">
                  <Phone className="h-5 w-5 text-heli-red-light" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-steel-500">
                    Llámanos
                  </p>
                  <p className="text-sm font-bold text-white">
                    +56 9 9320 9186
                  </p>
                </div>
              </a>
              <a
                href="mailto:contacto@heliforklift.cl"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-steel-900/50 p-4 backdrop-blur transition-all hover:border-heli-red/40 hover:bg-steel-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-heli-red/10 group-hover:bg-heli-red/20">
                  <Mail className="h-5 w-5 text-heli-red-light" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-steel-500">
                    Email
                  </p>
                  <p className="truncate text-sm font-bold text-white">
                    contacto@heliforklift.cl
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right col — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-steel-900/80 to-steel-950/80 p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3 border-b border-white/[0.08] pb-5">
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

            <div ref={formContainerRef} className="hubspot-form-container" />
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
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-heli-red text-sm font-black text-white">
              H
            </div>
            <span className="text-sm font-bold text-white">
              HELI Chile · Helifork Lift
            </span>
          </div>
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
      </div>
    </footer>
  );
}

// ============================================================
// STICKY MOBILE CTA
// ============================================================
function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-steel-950/95 p-3 backdrop-blur-xl lg:hidden">
      <div className="flex items-center gap-3">
        <a
          href="tel:+56993209186"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 text-sm font-bold text-white"
        >
          <Phone className="h-4 w-4" />
          Llamar
        </a>
        <a
          href="#cotiza"
          className="flex h-12 flex-[1.5] items-center justify-center gap-2 rounded-xl bg-heli-red text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(206,20,45,0.4)]"
        >
          <Zap className="h-4 w-4" />
          Cotizar ahora
        </a>
      </div>
    </div>
  );
}

// ============================================================
// MAIN
// ============================================================
export default function PromoLanding() {
  return (
    <main className="bg-steel-950 pb-20 lg:pb-0">
      <Hero />
      <FeaturesGrid />
      <Showcase />
      <Benefits />
      <UseCases />
      <ConversionForm />
      <FooterMini />
      <StickyMobileCTA />
    </main>
  );
}
