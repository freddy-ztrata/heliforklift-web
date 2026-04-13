"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
  AnimatePresence,
} from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------- */
/*  Animated Counter Component                         */
/* -------------------------------------------------- */

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        setDisplayValue(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------- */
/*  Stats Data                                         */
/* -------------------------------------------------- */

const stats = [
  { value: 67, suffix: "+", label: "Años" },
  { value: 1100, suffix: "+", label: "Equipos" },
  { value: 150, suffix: "+", label: "Países" },
  { value: 24, suffix: "/7", label: "Soporte" },
];

/* -------------------------------------------------- */
/*  Hero Component                                     */
/* -------------------------------------------------- */

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Transform mouse position to spotlight gradient position
  const spotlightX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]: string[]) =>
      `radial-gradient(600px circle at ${x} ${y}, rgba(206, 20, 45, 0.07), rgba(206, 20, 45, 0.03) 40%, transparent 70%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  /* Animation variants */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay,
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      id="inicio"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* ---- Background Layers ---- */}

      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay over video for text readability */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Red tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#CE142D]/5 via-transparent to-[#0a0a0f]/90 pointer-events-none" />

      {/* Mouse-following spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlightBackground }}
      />

      {/* Vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0a0f_100%)] pointer-events-none" />

      {/* ---- Main Content ---- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 sm:pb-24 flex flex-col items-center text-center">
        {/* Headline Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          {/* Line 1 — Subheading */}
          <motion.p
            variants={lineVariants}
            className="text-sm sm:text-base tracking-[0.3em] uppercase font-medium text-steel-400 mb-4"
          >
            Especialistas en
          </motion.p>

          {/* Line 2 — Main headline */}
          <motion.h1
            variants={lineVariants}
            className="font-heading text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] text-white mb-2"
          >
            Grúas Horquillas
          </motion.h1>

          {/* Line 3 — Red accent */}
          <motion.span
            variants={lineVariants}
            className="block font-heading text-[clamp(2rem,7vw,6.5rem)] leading-[0.9] text-[#CE142D]"
          >
            En Chile
          </motion.span>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          custom={0.8}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-base sm:text-lg text-steel-400 leading-relaxed mb-10"
        >
          Venta, arriendo y servicio técnico de grúas horquillas con{" "}
          <span className="text-white font-semibold">+67 años de experiencia</span>.
          Respuesta en menos de{" "}
          <span className="text-[#CE142D] font-semibold">2 horas</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={1.0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full sm:w-auto flex-col sm:flex-row items-center gap-4 sm:gap-5"
        >
          {/* Primary CTA */}
          <Link
            href="#cotizar"
            className={cn(
              "group relative w-full sm:w-auto px-10 py-4 rounded-lg overflow-hidden",
              "text-base font-bold uppercase tracking-wider text-white text-center",
              "bg-[#CE142D] glow-red",
              "hover:bg-[#A8102A] transition-all duration-300",
              "hover:scale-105 active:scale-95"
            )}
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">COTIZAR AHORA</span>
          </Link>

          {/* Secondary CTA */}
          <a
            href="tel:+56958187035"
            className={cn(
              "flex w-full sm:w-auto items-center justify-center gap-2.5 px-8 py-4 rounded-lg",
              "text-base font-bold uppercase tracking-wider",
              "text-steel-200 border border-steel-600",
              "hover:border-[#CE142D] hover:text-white transition-all duration-300",
              "hover:scale-105 active:scale-95",
              "bg-white/[0.02] hover:bg-white/[0.05]"
            )}
          >
            <Phone className="h-5 w-5 text-[#CE142D]" />
            LLAMAR AHORA
          </a>
        </motion.div>

        {/* ---- Stats Counter Row ---- */}
        <motion.div
          custom={1.3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 sm:mt-20 w-full"
        >
          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-0",
              "max-w-4xl mx-auto",
              "rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm",
              "p-4 sm:p-6 md:p-8"
            )}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col items-center justify-center text-center",
                  i < stats.length - 1 && "md:border-r md:border-white/5"
                )}
              >
                <span className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </span>
                <span className="mt-1 text-xs sm:text-sm uppercase tracking-[0.2em] text-steel-400 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ---- Scroll Down Indicator ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-steel-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-5 w-5 text-steel-500" />
        </motion.div>
      </motion.div>

      {/* Bottom fade-out gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  );
}
