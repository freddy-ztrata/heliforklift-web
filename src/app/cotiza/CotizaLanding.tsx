"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ShieldCheck,
  Truck,
  Cog,
  Wrench,
  CreditCard,
  MapPin,
  Award,
  Building2,
  Mail,
  Headphones,
  PackageCheck,
  Sparkles,
  Battery,
  Fuel,
  Flame,
  Atom,
  Container,
  Mountain,
  Layers,
  ArrowUpDown,
  Maximize2,
  MoveVertical,
  Send,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { company, contact, certifications } from "@/lib/data/company";
import { fuelTypeCategories } from "@/lib/data/products";

const HERO_IMAGE = "/assets/promo/heli-diesel-k2-hero.webp";

// ============================================================
// COUNT-UP — contador animado al entrar en viewport
// ============================================================
function CountUp({
  end,
  suffix = "",
  duration = 1.8,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let startTime = 0;
    const tick = (t: number) => {
      if (!startTime) startTime = t;
      const p = Math.min((t - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("es-CL")}
      {suffix}
    </span>
  );
}

const energyIcons: Record<string, typeof Zap> = {
  electrica: Battery,
  diesel: Fuel,
  glp: Flame,
  hidrogeno: Atom,
};
// Imágenes TRANSPARENTES por tipo (las de fuelTypeCategories tienen fondo blanco)
const energyImg: Record<string, string> = {
  electrica: "/assets/cotiza/fleet-electrica.webp",
  diesel: "/assets/promo/heli-combustion-g3-hero.webp",
  glp: "/assets/legacy/products/g3-series-2-3.5t-gas-nobg.webp",
  hidrogeno: "/assets/cotiza/fleet-hidrogeno.webp",
};

const categoryCards = [
  { label: "Transpaleta", icon: Truck, desc: "Eléctricas y manuales para bodega." },
  { label: "Apilador", icon: Layers, desc: "Almacenamiento vertical eficiente." },
  { label: "Reach Truck", icon: ArrowUpDown, desc: "Pasillos angostos y gran altura." },
  { label: "Todo Terreno", icon: Mountain, desc: "Construcción y exteriores exigentes." },
  { label: "Manipulador Telescópico", icon: Maximize2, desc: "Alcance extendido y versátil." },
  { label: "Porta Contenedores", icon: Container, desc: "Alto tonelaje para puertos." },
  { label: "Tractor de Tiro", icon: Truck, desc: "Arrastre de cargas en planta." },
  { label: "Plataforma Elevadora", icon: MoveVertical, desc: "Trabajo en altura seguro." },
];

// ============================================================
// HELPERS de scroll
// ============================================================
function scrollToQuote() {
  document.getElementById("cotiza")?.scrollIntoView({ behavior: "smooth" });
}

// ============================================================
// STICKY HEADER
// ============================================================
function StickyHeader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: show ? 0 : -80 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-steel-950/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="HELI Chile" className="inline-flex items-center">
          <Image
            src="/assets/legacy/logos/heli-chile-logo.webp"
            alt="HELI Forklift Chile"
            width={120}
            height={36}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>
        <button
          onClick={scrollToQuote}
          className="inline-flex items-center gap-2 rounded-full bg-heli-red px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(206,20,45,0.4)] transition-all hover:-translate-y-0.5"
        >
          Cotizar
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.header>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero({ onPickEnergy }: { onPickEnergy: (slug: string) => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-steel-950 via-steel-900 to-steel-950"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-[-10%] top-[15%] h-[600px] w-[600px] rounded-full bg-heli-red/20 blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute left-[-10%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-heli-red-dark/30 blur-[120px]"
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pt-6 pb-10 sm:px-6 lg:px-8">
        {/* Top bar — logo siempre visible + acciones */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <Link href="/" aria-label="HELI Chile" className="inline-flex items-center transition-opacity hover:opacity-80">
            <Image
              src="/assets/legacy/logos/heli-chile-logo.webp"
              alt="HELI Forklift Chile"
              width={150}
              height={45}
              priority
              className="h-9 w-auto brightness-0 invert sm:h-11"
            />
          </Link>
          <button
            onClick={scrollToQuote}
            className="inline-flex items-center gap-2 rounded-full bg-heli-red px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(206,20,45,0.4)] transition-all hover:-translate-y-0.5"
          >
            Cotizar
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        <div className="mt-6 grid flex-1 grid-cols-1 items-center gap-10 lg:mt-0 lg:grid-cols-2">
          {/* Texto */}
          <motion.div style={{ y: textY }} className="relative z-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-heli-yellow/30 bg-heli-yellow/10 px-3 py-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-heli-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-heli-yellow">
                Distribuidor oficial HELI en Chile
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-heading mt-4 text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white"
            >
              GRÚAS HORQUILLA
              <br />
              <span className="bg-gradient-to-r from-heli-red-light via-heli-red to-heli-red-dark bg-clip-text text-transparent">
                HELI
              </span>{" "}
              <span className="text-heli-yellow">PARA CADA</span>
              <br />
              <span className="text-heli-yellow">OPERACIÓN</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg"
            >
              Eléctricas, diésel, gas e hidrógeno verde. Líder mundial en
              montacargas con{" "}
              <strong className="text-white">+67 años de experiencia</strong> y
              respaldo técnico en todo Chile. Cuéntanos qué necesitas y te
              cotizamos en menos de 2 horas hábiles.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-7 flex"
            >
              <button
                onClick={scrollToQuote}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-heli-red px-10 py-4 text-base font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(206,20,45,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(206,20,45,0.7)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-heli-red-dark via-heli-red to-heli-red-light opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">Cotiza tu equipo</span>
                <ArrowRight className="relative h-4 w-4" />
              </button>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-2"
            >
              {[
                { icon: Award, text: "+1.100 equipos en Chile" },
                { icon: PackageCheck, text: "Entrega inmediata" },
                { icon: Headphones, text: "Servicio nacional" },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-2">
                  <c.icon className="h-4 w-4 text-heli-red-light" />
                  <span className="text-sm text-steel-300">{c.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Imagen */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 aspect-square w-full max-w-[17rem] justify-self-center sm:max-w-sm lg:order-2 lg:max-w-2xl lg:justify-self-end"
          >
            <div className="absolute inset-0 rounded-full bg-heli-red/30 blur-[100px]" />
            <div className="relative h-full w-full">
              <Image
                src={HERO_IMAGE}
                alt="Grúa Horquilla HELI"
                fill
                priority
                quality={90}
                className="object-contain drop-shadow-[0_30px_60px_rgba(206,20,45,0.5)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Chips de energía flotantes */}
            <div className="absolute inset-x-0 -bottom-2 flex flex-wrap justify-center gap-2">
              {fuelTypeCategories.map((f, i) => {
                const Icon = energyIcons[f.id] ?? Zap;
                return (
                  <motion.button
                    key={f.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    onClick={() => onPickEnergy(f.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-steel-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-all hover:border-heli-red/50 hover:bg-steel-900"
                  >
                    <Icon className="h-3.5 w-3.5 text-heli-red-light" />
                    {f.name}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden pt-6 text-center lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-1 text-steel-500"
          >
            <span className="text-[10px] uppercase tracking-widest">
              Conoce la línea completa
            </span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// FLEET MARQUEE — la flota completa en movimiento (todos los tipos)
// ============================================================
const fleet = [
  { img: "/assets/cotiza/fleet-electrica.webp", label: "Eléctrica", tag: "Litio-ion" },
  { img: "/assets/promo/heli-diesel-k2-hero.webp", label: "Diésel K2", tag: "Combustión" },
  { img: "/assets/cotiza/fleet-hidrogeno.webp", label: "Hidrógeno Verde", tag: "Cero emisiones" },
  { img: "/assets/cotiza/fleet-reach.webp", label: "Reach Truck", tag: "Gran altura" },
  { img: "/assets/cotiza/fleet-telescopico.webp", label: "Telescópico", tag: "Alcance" },
  { img: "/assets/promo/heli-combustion-g3-hero.webp", label: "Combustión G3", tag: "5–10 ton" },
  { img: "/assets/cotiza/fleet-todoterreno.webp", label: "Todo Terreno", tag: "Exteriores" },
  { img: "/assets/promo/heli-h4-electrica-hero.webp", label: "Eléctrica H4", tag: "80V" },
];

function FleetCard({ item }: { item: (typeof fleet)[number] }) {
  return (
    <button
      onClick={scrollToQuote}
      className="group relative flex h-48 w-60 shrink-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-steel-900/80 to-steel-950/80 p-4 text-left backdrop-blur transition-all hover:border-heli-red/50 hover:shadow-[0_15px_40px_-15px_rgba(206,20,45,0.5)] sm:w-72"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-heli-red/0 blur-3xl transition-all duration-500 group-hover:bg-heli-red/25" />
      <div className="relative h-28 w-full">
        <Image
          src={item.img}
          alt={`Grúa HELI ${item.label}`}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="288px"
        />
      </div>
      <div className="relative mt-auto flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-white">{item.label}</span>
        <span className="rounded-full bg-heli-red/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-heli-red-light">
          {item.tag}
        </span>
      </div>
    </button>
  );
}

function FleetMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-gradient-to-b from-steel-900 via-steel-950 to-steel-900 py-14 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(206,20,45,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
          Una línea para cada operación
        </p>
        <h2 className="font-heading mt-2 text-[clamp(1.75rem,4.5vw,3rem)] leading-none text-white">
          TODA LA FLOTA HELI, <span className="text-heli-red">EN UN SOLO LUGAR</span>
        </h2>
      </div>

      <div className="relative mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <motion.div
          className="flex shrink-0 gap-5 pr-5"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {fleet.map((item, i) => (
            <FleetCard key={`a-${i}`} item={item} />
          ))}
        </motion.div>
        <motion.div
          aria-hidden
          className="flex shrink-0 gap-5 pr-5"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {fleet.map((item, i) => (
            <FleetCard key={`b-${i}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// TRUST STRIP — stats animadas + certificaciones
// ============================================================
function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative border-y border-white/[0.06] bg-steel-950 py-14" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {company.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-heading text-4xl text-heli-red sm:text-5xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-steel-400 sm:text-sm">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/[0.06] pt-8">
          <span className="text-xs font-bold uppercase tracking-widest text-steel-500">
            Certificaciones
          </span>
          {certifications.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
              title={c.description}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-heli-red-light" />
              <span className="text-xs font-semibold text-steel-200">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ENERGY BENTO — 4 tipos de energía
// ============================================================
function EnergyBento({ onPick }: { onPick: (slug: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featured =
    fuelTypeCategories.find((f) => f.id === "hidrogeno") ??
    fuelTypeCategories[fuelTypeCategories.length - 1];
  const rest = fuelTypeCategories.filter((f) => f.id !== featured.id);
  const FeaturedIcon = energyIcons[featured.id] ?? Zap;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-steel-950 via-steel-900 to-steel-950 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(206,20,45,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
              Toda la energía que necesitas
            </p>
            <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.75rem)] leading-none text-white">
              ELIGE TU <span className="text-heli-red">FUENTE DE PODER</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-steel-400">
            Cuatro tecnologías para cada operación. Toca una y la sumamos a tu
            cotización.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Destacado — hidrógeno verde */}
          <motion.button
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            onClick={() => onPick(featured.id)}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-heli-red/40 bg-gradient-to-br from-heli-red/20 via-steel-900 to-steel-950 text-left transition-all hover:border-heli-red/60"
          >
            {/* Imagen contenida arriba */}
            <div className="relative h-56 w-full overflow-hidden sm:h-72">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-heli-red/30 blur-[90px]" />
              <Image
                src={energyImg[featured.id] ?? featured.image}
                alt={`Grúa ${featured.name}`}
                fill
                className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-heli-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                <Sparkles className="h-3 w-3" /> Pioneros en Chile
              </span>
            </div>
            {/* Contenido abajo */}
            <div className="relative flex flex-1 flex-col p-8 pt-0">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/20 ring-1 ring-heli-red/40">
                <FeaturedIcon className="h-6 w-6 text-heli-red-light" />
              </div>
              <h3 className="font-heading text-3xl text-white sm:text-4xl">
                {featured.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-300">
                {featured.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-heli-red-light">
                Cotizar {featured.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.button>

          {/* Resto — filas compactas */}
          <div className="flex flex-col gap-5">
            {rest.map((f, i) => {
              const Icon = energyIcons[f.id] ?? Zap;
              return (
                <motion.button
                  key={f.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  onClick={() => onPick(f.id)}
                  className="group flex flex-1 items-center gap-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-steel-900 to-steel-950 p-4 text-left transition-all hover:border-heli-red/40 hover:shadow-[0_15px_40px_-15px_rgba(206,20,45,0.4)] sm:p-5"
                >
                  <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent sm:h-28 sm:w-40">
                    <Image
                      src={energyImg[f.id] ?? f.image}
                      alt={`Grúa ${f.name}`}
                      fill
                      className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                      sizes="160px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 flex-shrink-0 text-heli-red" />
                      <h3 className="text-lg font-bold text-white">{f.name}</h3>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-steel-400">
                      {f.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-steel-600 transition-all group-hover:translate-x-1 group-hover:text-heli-red-light" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED OFFERS — 3 promociones destacadas (filas showcase)
// ============================================================
const featuredOffers = [
  {
    machine: "Transpaleta",
    icon: Truck,
    eyebrow: "Transpaleta eléctrica",
    name: "HELI CBD15/20",
    tagline: "Movimiento ágil de pallets en bodega, retail y logística interior.",
    image: "/assets/promo/heli-transpaleta-cbd1520-hero.webp",
    offer: "100% eléctrica · hasta 2 toneladas",
    specs: [
      "Capacidad hasta 2.000 kg",
      "Eléctrica, de bajo mantenimiento",
      "Compacta y maniobrable",
    ],
  },
  {
    machine: "Grúa Diésel",
    icon: Wrench,
    eyebrow: "Grúas combustión Serie G3",
    name: "Diésel 5 · 7 · 10 TON",
    tagline: "Potencia y robustez para las operaciones industriales más exigentes.",
    image: "/assets/promo/heli-combustion-g3-hero.webp",
    offer: "Kit de mantención por cada 1.000 hrs incluido",
    specs: [
      "De 5 a 10 toneladas",
      "Motor diésel de alto rendimiento",
      "Estructura reforzada",
    ],
  },
  {
    machine: "Grúa Eléctrica",
    icon: Battery,
    eyebrow: "Grúa eléctrica Serie H4",
    name: "Litio-ion 80V · 2.5–3.5 TON",
    tagline: "Cero emisiones, silenciosa y lista para operar en múltiples turnos.",
    image: "/assets/promo/heli-h4-electrica-hero.webp",
    offer: "12 cuotas al precio de contado",
    specs: [
      "2.5 a 3.5 toneladas",
      "Batería litio-ion 80V",
      "Carga rápida oportunista",
    ],
  },
];

function OfferRow({
  offer,
  index,
  onPick,
}: {
  offer: (typeof featuredOffers)[number];
  index: number;
  onPick: (label: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reversed = index % 2 === 1;
  const Icon = offer.icon;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
    >
      {/* Imagen */}
      <motion.div
        initial={{ opacity: 0, x: reversed ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={cn("relative", reversed && "lg:order-2")}
      >
        <button
          onClick={() => onPick(offer.machine)}
          className="group relative block aspect-[4/3] w-full"
          aria-label={`Cotizar ${offer.name}`}
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-heli-red/25 blur-[110px]"
          />
          <Image
            src={offer.image}
            alt={`Grúa HELI ${offer.name}`}
            fill
            className="object-contain drop-shadow-[0_30px_60px_rgba(206,20,45,0.45)] transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Badge de oferta flotante */}
          <motion.div
            initial={{ scale: 0, rotate: -6 }}
            animate={inView ? { scale: 1, rotate: -4 } : {}}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="absolute left-2 top-2 max-w-[15rem] rounded-2xl border border-heli-yellow/40 bg-steel-950/90 px-4 py-2.5 text-left backdrop-blur"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-heli-yellow">
              Oferta
            </p>
            <p className="text-sm font-bold leading-tight text-white">
              {offer.offer}
            </p>
          </motion.div>
        </button>
      </motion.div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={cn(reversed && "lg:order-1")}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <Icon className="h-4 w-4 text-heli-red-light" />
          <span className="text-xs font-bold uppercase tracking-widest text-heli-red-light">
            {offer.eyebrow}
          </span>
        </div>
        <h3 className="font-heading mt-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-white">
          {offer.name}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-steel-300">
          {offer.tagline}
        </p>
        <ul className="mt-5 space-y-2.5">
          {offer.specs.map((s) => (
            <li key={s} className="flex items-center gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-heli-red/10 ring-1 ring-heli-red/30">
                <Check className="h-3.5 w-3.5 text-heli-red-light" />
              </span>
              <span className="text-sm text-steel-200">{s}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => onPick(offer.machine)}
          className="group mt-7 inline-flex items-center gap-2 rounded-full bg-heli-red px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(206,20,45,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(206,20,45,0.7)]"
        >
          Cotizar este equipo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
}

function FeaturedOffers({ onPick }: { onPick: (label: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-steel-950 via-steel-900 to-steel-950 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(206,20,45,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-heli-yellow/30 bg-heli-yellow/10 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-heli-yellow" />
            <span className="text-xs font-bold uppercase tracking-widest text-heli-yellow">
              Promociones activas
            </span>
          </div>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.75rem)] leading-none text-white">
            OFERTAS QUE NO
            <br />
            <span className="text-heli-red">PUEDES DEJAR PASAR</span>
          </h2>
          <p className="mt-4 text-base text-steel-400">
            Equipos seleccionados con condiciones especiales por tiempo limitado.
            Toca cada uno para ver el detalle.
          </p>
        </motion.div>

        <div className="mt-16 space-y-20 sm:space-y-24">
          {featuredOffers.map((o, i) => (
            <OfferRow key={o.machine} offer={o} index={i} onPick={onPick} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CATEGORIES — el resto de la línea
// ============================================================
function Categories({ onPick }: { onPick: (label: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-steel-950 py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
            Línea completa de equipos
          </p>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
            MÁS QUE GRÚAS
            <br />
            <span className="text-heli-red">HORQUILLA</span>
          </h2>
          <p className="mt-4 text-base text-steel-400">
            Todo el manejo de materiales en un solo proveedor. Selecciona el
            equipo que necesitas y lo agregamos a tu cotización.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {categoryCards.map((c, i) => (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05 }}
              onClick={() => onPick(c.label)}
              title={c.desc}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-steel-200 transition-all hover:-translate-y-0.5 hover:border-heli-red/50 hover:bg-heli-red/10 hover:text-white"
            >
              <c.icon className="h-4 w-4 text-heli-red-light transition-transform group-hover:scale-110" />
              {c.label}
            </motion.button>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-steel-500">
          Toca un equipo y lo agregamos automáticamente a tu cotización.
        </p>
      </div>
    </section>
  );
}

// ============================================================
// WHY HELI — diferenciadores
// ============================================================
const whyCards = [
  {
    icon: Award,
    title: "Líder mundial en montacargas",
    desc: "Tecnología de un fabricante presente en +150 países, con 1.700+ modelos y respaldo global.",
  },
  {
    icon: CreditCard,
    title: "Financiamiento flexible",
    desc: "Opciones de financiamiento y cuotas para que adquieras tu equipo sin descapitalizarte.",
  },
  {
    icon: Headphones,
    title: "Servicio técnico nacional",
    desc: "Técnicos certificados HELI con cobertura en todo Chile. Mantención preventiva y de emergencia.",
  },
  {
    icon: Cog,
    title: "Repuestos originales",
    desc: "Stock permanente de repuestos originales y lubricantes autorizados, con envío a todo Chile.",
  },
  {
    icon: PackageCheck,
    title: "Entrega inmediata",
    desc: "Stock disponible en Chile para entrega rápida. No esperes meses como con otras marcas.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía y respaldo",
    desc: "Equipos con garantía y el respaldo de una empresa con más de 67 años de trayectoria.",
  },
];

function WhyHeli() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-steel-950 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8" ref={ref}>
        {/* Columna izquierda — sticky */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
            ¿Por qué HELI?
          </p>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
            LA DECISIÓN
            <br />
            INTELIGENTE
            <br />
            <span className="text-heli-yellow">PARA TU OPERACIÓN</span>
          </h2>
          <p className="mt-5 max-w-sm text-base text-steel-400">
            Más que vender grúas: te entregamos respaldo, servicio y la
            tranquilidad de trabajar con el líder mundial en montacargas.
          </p>
          <button
            onClick={scrollToQuote}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-heli-red px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(206,20,45,0.4)] transition-all hover:-translate-y-0.5"
          >
            Cotizar ahora
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Columna derecha — filas con divisores */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {whyCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="group flex items-start gap-5 py-6"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-heli-red/10 ring-1 ring-heli-red/30 transition-all group-hover:bg-heli-red group-hover:ring-heli-red">
                <c.icon className="h-6 w-6 text-heli-red transition-colors group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-steel-400">
                  {c.desc}
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
// SERVICES — venta, servicio técnico, repuestos
// ============================================================
const services = [
  {
    icon: Truck,
    title: "Venta de equipos",
    desc: "Asesoría especializada para elegir el equipo ideal según tu operación, carga y entorno de trabajo.",
  },
  {
    icon: Wrench,
    title: "Servicio técnico",
    desc: "Mantención preventiva, correctiva y de emergencia con técnicos certificados HELI a nivel nacional.",
  },
  {
    icon: Cog,
    title: "Repuestos originales",
    desc: "Stock permanente de repuestos originales HELI y lubricantes autorizados. Envío a todo Chile.",
  },
];

function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-steel-950 via-steel-900 to-steel-950 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(206,20,45,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
            Un solo proveedor, todo el ciclo
          </p>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
            TE ACOMPAÑAMOS
            <br />
            <span className="text-heli-red">DE PRINCIPIO A FIN</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 border-t border-white/[0.1] md:grid-cols-3 md:divide-x md:divide-white/[0.1]">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              className="group border-b border-white/[0.1] py-8 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-5xl text-heli-red/30 transition-colors group-hover:text-heli-red/60">
                  0{i + 1}
                </span>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/10 ring-1 ring-heli-red/30">
                  <s.icon className="h-6 w-6 text-heli-red" />
                </div>
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROCESS — cómo funciona
// ============================================================
const steps = [
  {
    n: "01",
    title: "Cuéntanos qué necesitas",
    desc: "Completa el cotizador con el tipo de equipo y tu operación. Toma menos de 1 minuto.",
  },
  {
    n: "02",
    title: "Te asesoramos",
    desc: "Un ejecutivo te contacta en menos de 2 horas hábiles con la propuesta ideal y financiamiento.",
  },
  {
    n: "03",
    title: "Entregamos y damos soporte",
    desc: "Coordinamos la entrega de tu equipo y te respaldamos con servicio técnico y repuestos.",
  },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-steel-950 via-steel-900 to-steel-950 py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
            Así de simple
          </p>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
            CÓMO FUNCIONA
          </h2>
        </motion.div>

        <div className="relative mt-16">
          {/* Línea conectora (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-heli-red/50 to-transparent md:block" />
          {/* Línea conectora (mobile, vertical) */}
          <div className="absolute bottom-7 left-7 top-7 w-px bg-gradient-to-b from-heli-red/50 to-transparent md:hidden" />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className="relative flex gap-5 md:block"
              >
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-heli-red font-heading text-2xl text-white shadow-[0_0_24px_rgba(206,20,45,0.5)] ring-4 ring-steel-950">
                  {s.n}
                </div>
                <div className="md:mt-6">
                  <h3 className="text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-steel-400">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA BANNER — franja roja para romper el ritmo entre secciones
// ============================================================
function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-heli-red-dark via-heli-red to-heli-red-dark py-14">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.12)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
        <div>
          <h2 className="font-heading text-[clamp(1.75rem,4vw,3rem)] leading-none text-white">
            ¿NECESITAS TU EQUIPO AHORA?
          </h2>
          <p className="mt-2 text-base text-white/85">
            Cotiza hoy y te respondemos en menos de 2 horas hábiles.
          </p>
        </div>
        <button
          onClick={scrollToQuote}
          className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-sm font-bold uppercase tracking-wider text-heli-red shadow-lg transition-all hover:-translate-y-0.5"
        >
          <Send className="h-4 w-4" />
          Cotizar ahora
        </button>
      </div>
    </section>
  );
}

// ============================================================
// QUOTER — formulario de cotización (embed HubSpot)
// ============================================================
const HUBSPOT_EMBED_SRC =
  "https://js.hsforms.net/forms/embed/developer/50182752.js";

function Quoter() {
  useEffect(() => {
    // El script "developer" de HubSpot auto-renderiza los div .hs-form-html.
    if (document.querySelector(`script[src="${HUBSPOT_EMBED_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = HUBSPOT_EMBED_SRC;
    s.defer = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section
      id="cotiza"
      className="relative overflow-hidden bg-gradient-to-br from-steel-900 via-steel-950 to-steel-900 py-20 sm:py-28"
    >
      <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-heli-red/20 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-heli-yellow/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-heli-yellow/30 bg-heli-yellow/10 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-heli-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-heli-yellow">
                Cotización sin compromiso
              </span>
            </div>
            <h2 className="font-heading mt-4 text-[clamp(2rem,5vw,4rem)] leading-none text-white">
              ARMA TU
              <br />
              <span className="text-heli-red">COTIZACIÓN</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-steel-300">
              Déjanos tus datos y cuéntanos qué equipo necesitas. Te contactamos
              en menos de{" "}
              <strong className="text-white">2 horas hábiles</strong> con una
              propuesta a medida.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { icon: Zap, text: "Respuesta en menos de 2 horas hábiles" },
                { icon: CreditCard, text: "Opciones de financiamiento y cuotas" },
                { icon: Award, text: "+1.100 empresas chilenas confían en HELI" },
                { icon: Building2, text: "Sucursales en Santiago, Antofagasta y Copiapó" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-heli-red/10 ring-1 ring-heli-red/30">
                    <item.icon className="h-4 w-4 text-heli-red-light" />
                  </div>
                  <span className="text-sm text-steel-200">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM — embed HubSpot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full rounded-3xl border border-white/[0.08] bg-[#0d0d18] p-5 backdrop-blur-xl sm:p-7"
          >
            <div className="mb-5 flex items-center gap-3 border-b border-white/[0.08] pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-heli-red text-white">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-lg leading-none text-white">
                  SOLICITA TU COTIZACIÓN
                </p>
                <p className="mt-1 text-xs text-steel-400">
                  Te respondemos en menos de 2 horas hábiles
                </p>
              </div>
            </div>

            <div className="hubspot-form-container w-full">
              <div
                className="hs-form-html"
                data-region="na1"
                data-form-id="d9974614-f923-4712-b337-79132d6705e5"
                data-portal-id="50182752"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// COVERAGE — sucursales + cobertura
// ============================================================
function Coverage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-steel-950 py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
              Cobertura nacional
            </p>
            <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
              ESTAMOS CERCA
              <br />
              <span className="text-heli-red">DE TU OPERACIÓN</span>
            </h2>
            <p className="mt-4 text-base text-steel-400">
              Sucursales propias y socios estratégicos de Arica a Puerto Varas.
              Venta, servicio técnico y repuestos donde nos necesites.
            </p>
            <button
              onClick={scrollToQuote}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-heli-red px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(206,20,45,0.4)] transition-all hover:-translate-y-0.5"
            >
              Cotiza tu equipo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {contact.locations.map((loc, i) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-steel-900 to-steel-950 p-5"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-heli-red" />
                  <h3 className="text-base font-bold text-white">{loc.city}</h3>
                  {"isMain" in loc && loc.isMain && (
                    <span className="rounded-full bg-heli-red/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-heli-red-light">
                      Casa matriz
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-steel-400">
                  {loc.address}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — acordeón
// ============================================================
const faqs = [
  {
    q: "¿Ofrecen financiamiento o cuotas?",
    a: "Sí. Trabajamos con distintas alternativas de financiamiento y campañas con cuotas para que adquieras tu equipo sin descapitalizar tu empresa. Cuéntanos tu caso en la cotización y te detallamos las opciones disponibles.",
  },
  {
    q: "¿Las grúas tienen garantía y respaldo técnico?",
    a: "Todos nuestros equipos cuentan con garantía y el respaldo de HELI, líder mundial en montacargas. Además tenemos servicio técnico con técnicos certificados y repuestos originales con cobertura en todo Chile.",
  },
  {
    q: "¿Hacen despacho a regiones?",
    a: "Sí. Contamos con sucursales en Santiago, Antofagasta y Copiapó, además de socios estratégicos de Arica a Puerto Varas. Coordinamos la entrega de tu equipo donde lo necesites.",
  },
  {
    q: "¿Qué tipo de energía me conviene?",
    a: "Depende de tu operación: eléctricas (litio-ion) para interiores y bajo costo operativo, diésel para trabajo pesado en exteriores, gas (GLP) para uso mixto e hidrógeno verde para operación continua sin emisiones. En la cotización te asesoramos según tu carga, turnos y entorno.",
  },
  {
    q: "¿Cuánto tardan en responder?",
    a: "Te contactamos en menos de 2 horas hábiles desde que recibimos tu solicitud, con una propuesta a medida y las opciones de financiamiento disponibles.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-steel-950 via-steel-900 to-steel-950 py-20 sm:py-24">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
            Preguntas frecuentes
          </p>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
            RESOLVEMOS TUS DUDAS
          </h2>
        </motion.div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06 }}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-steel-900/50 backdrop-blur"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-base font-bold text-white">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 flex-shrink-0 text-heli-red-light transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-steel-300">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-steel-950 py-20 sm:py-28">
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-heli-red/15 blur-[150px]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] text-white"
        >
          ¿LISTO PARA{" "}
          <span className="bg-gradient-to-r from-heli-red-light via-heli-red to-heli-red-dark bg-clip-text text-transparent">
            ELEVAR TU OPERACIÓN?
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-base text-steel-300 sm:text-lg"
        >
          Cotiza hoy tu grúa horquilla HELI. Te respondemos en menos de 2 horas
          hábiles con la solución ideal para tu empresa.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={scrollToQuote}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-heli-red px-10 py-4 text-base font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(206,20,45,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(206,20,45,0.7)]"
          >
            Cotizar ahora
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-steel-950 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <Link href="/" aria-label="HELI Chile" className="inline-flex items-center">
            <Image
              src="/assets/legacy/logos/heli-chile-logo.webp"
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
              {contact.mainPhone}
            </a>
            <span className="hidden sm:inline">·</span>
            <a
              href="mailto:contacto@heliforklift.cl"
              className="inline-flex items-center gap-1 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              {contact.mainEmail}
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-steel-600">
          {contact.hours} · Desarrollado y diseñado por{" "}
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
// FLOATING BAR — móvil sticky (cotizar + llamar)
// ============================================================
function FloatingBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: show ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-steel-950/95 p-3 backdrop-blur-xl lg:hidden"
    >
      <button
        onClick={scrollToQuote}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-heli-red text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(206,20,45,0.4)]"
      >
        <Send className="h-4 w-4" />
        Cotizar ahora
      </button>
    </motion.div>
  );
}

// ============================================================
// MAIN
// ============================================================
export default function CotizaLanding() {
  // Meta Pixel — ViewContent al cargar la landing de marca (Google Ads).
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "ViewContent", {
        content_name: "cotiza_brand",
        content_category: "general",
      });
    }
  }, []);

  // Todos los CTA / cards llevan al formulario (embed HubSpot) en #cotiza.
  const goQuote = () => scrollToQuote();

  return (
    <main className="bg-steel-950 pb-20 lg:pb-0">
      <StickyHeader />
      <Hero onPickEnergy={goQuote} />
      <FleetMarquee />
      <TrustStrip />
      <EnergyBento onPick={goQuote} />
      <FeaturedOffers onPick={goQuote} />
      <WhyHeli />
      <CTABanner />
      <Categories onPick={goQuote} />
      <Services />
      <Process />
      <Quoter />
      <Coverage />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingBar />
    </main>
  );
}
