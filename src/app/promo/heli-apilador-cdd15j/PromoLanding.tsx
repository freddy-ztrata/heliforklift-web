"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Weight,
  ArrowUpDown,
  Zap,
  Move,
  Monitor,
  UnfoldVertical,
  Flame,
} from "lucide-react";
import HapeeForm from "@/components/shared/HapeeForm";

const PRODUCT_IMAGE = "/assets/legacy/products/cdd15j-apilador.webp";

const DELIVERY_NOTE =
  "El precio aplica con entrega en la sucursal HELI Santiago. El envío a regiones tiene otro valor.";

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

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

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <Link
            href="/"
            aria-label="Volver al inicio - HELI Chile"
            className="inline-flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/assets/legacy/logos/heli-chile-logo.webp"
              alt="HELI Forklift Chile"
              width={140}
              height={42}
              priority
              className="h-9 w-auto brightness-0 invert sm:h-10"
            />
          </Link>
        </motion.div>

        <div className="mt-8 grid flex-1 grid-cols-1 items-center gap-8 lg:mt-0 lg:grid-cols-2">
          <motion.div style={{ y: textY }} className="relative z-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-heli-yellow/30 bg-heli-yellow/10 px-3 py-1.5"
            >
              <Flame className="h-3.5 w-3.5 text-heli-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-heli-yellow">
                Precio especial durante noviembre
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading mt-4 text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white"
            >
              APILADOR
              <br />
              <span className="bg-gradient-to-r from-heli-red-light via-heli-red to-heli-red-dark bg-clip-text text-transparent">
                ELÉCTRICO HELI
              </span>
              <br />
              <span className="text-heli-yellow">CDD15J-LI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg"
            >
              Apilador eléctrico versátil{" "}
              <strong className="text-white">CDD15J-LI</strong>. Capacidad{" "}
              <strong className="text-white">1.500 kg</strong>, altura{" "}
              <strong className="text-white">3.500 mm</strong> y motor eléctrico{" "}
              <strong className="text-white">24V</strong>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-md rounded-2xl border border-heli-red/30 bg-gradient-to-br from-heli-red/20 via-heli-red/10 to-transparent p-5 backdrop-blur"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-heli-red-light">
                Precio promocional
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-heading text-[clamp(2.2rem,5vw,3.4rem)] leading-none text-white">
                  $1.990.000
                </span>
                <span className="text-base font-bold text-steel-300">+ IVA</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-steel-300">
                {DELIVERY_NOTE}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <a
                href="#cotiza"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-heli-red px-10 py-4 text-base font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(206,20,45,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(206,20,45,0.7)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-heli-red-dark via-heli-red to-heli-red-light opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">Cotizar ahora</span>
                <Zap className="relative h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 aspect-square w-full max-w-[17rem] justify-self-center sm:max-w-sm lg:order-2 lg:max-w-xl lg:justify-self-end"
          >
            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-white">
              <Image
                src={PRODUCT_IMAGE}
                alt="Apilador eléctrico HELI CDD15J-LI"
                fill
                priority
                quality={90}
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Weight,
    title: "Capacidad 1.500 kg",
    desc: "Apilador eléctrico CDD15J-LI de 1.500 kg.",
  },
  {
    icon: ArrowUpDown,
    title: "Altura 3.500 mm",
    desc: "Elevación de 3.500 mm.",
  },
  {
    icon: Zap,
    title: "Motor eléctrico 24V",
    desc: "Motor eléctrico de 24V.",
  },
  {
    icon: UnfoldVertical,
    title: "Mástil de alta elevación",
    desc: "Mástil de alta elevación.",
  },
  {
    icon: Move,
    title: "Horquillas ajustables",
    desc: "Horquillas ajustables.",
  },
  {
    icon: Monitor,
    title: "Pantalla de diagnóstico",
    desc: "Pantalla de diagnóstico.",
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
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-heli-red-light">
            Especificaciones
          </p>
          <h2 className="font-heading mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
            CDD15J-LI
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-steel-900 to-steel-950 p-7"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-heli-red/10 ring-1 ring-heli-red/30">
                <f.icon className="h-7 w-7 text-heli-red" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Formulario de Hapee 224 "HELI Apilador CDD15J-LI".
// Redirige a /promo/heli-apilador-cdd15j/gracias.
const HAPEE_FORM_ID = "heliforklift chile/heli-apilador-cdd15j-li";

function ConversionForm() {
  return (
    <section
      id="cotiza"
      className="relative overflow-hidden bg-gradient-to-br from-steel-900 via-steel-950 to-steel-900 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-heli-yellow/30 bg-heli-yellow/10 px-3 py-1.5">
              <Flame className="h-3.5 w-3.5 text-heli-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-heli-yellow">
                Precio especial durante noviembre
              </span>
            </div>
            <h2 className="font-heading mt-4 text-[clamp(2rem,5vw,4rem)] leading-none text-white">
              COTIZA EL
              <br />
              <span className="text-heli-red">CDD15J-LI</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-steel-300">
              Apilador eléctrico HELI CDD15J-LI a{" "}
              <strong className="text-white">$1.990.000 + IVA</strong>.{" "}
              {DELIVERY_NOTE}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full rounded-3xl border border-white/[0.08] bg-[#0d0d18] p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center gap-3 border-b border-white/[0.08] px-2 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-heli-red text-white">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-lg leading-none text-white">COTIZA AHORA</p>
                <p className="mt-1 text-xs text-steel-400">Solo te tomará 1 minuto</p>
              </div>
            </div>
            <HapeeForm formId={HAPEE_FORM_ID} className="hapee-form-container w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FooterMini() {
  return (
    <footer className="border-t border-white/[0.06] bg-steel-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <Link href="/" aria-label="Volver al inicio - HELI Chile" className="inline-flex items-center transition-opacity hover:opacity-80">
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
              +56 9 9320 9186
            </a>
            <span className="hidden sm:inline">·</span>
            <a href="mailto:contacto@heliforklift.cl" className="hover:text-white">
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
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-steel-950/95 p-3 backdrop-blur-xl lg:hidden"
      >
        <a
          href="#cotiza"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-heli-red text-sm font-bold uppercase tracking-wider text-white"
        >
          <Zap className="h-4 w-4" />
          Cotizar ahora
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
          y: isVisible ? 0 : 20,
        }}
        className="fixed bottom-6 right-6 z-50 hidden lg:block"
      >
        <a
          href="#cotiza"
          className="inline-flex items-center gap-2 rounded-full bg-heli-red px-7 py-4 text-base font-bold uppercase tracking-wider text-white shadow-[0_8px_30px_rgba(206,20,45,0.5)]"
        >
          <Zap className="h-5 w-5" />
          Cotizar ahora
        </a>
      </motion.div>
    </>
  );
}

export default function PromoLanding() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: "promo_apilador_cdd15j",
        content_category: "apilador_electrico",
        content_ids: ["heli-apilador-cdd15j"],
      });
    }
  }, []);

  return (
    <main className="bg-steel-950 pb-20 lg:pb-0">
      <Hero />
      <FeaturesGrid />
      <ConversionForm />
      <FooterMini />
      <FloatingCTA />
    </main>
  );
}
