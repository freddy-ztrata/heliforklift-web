"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { company, contact } from "@/lib/data/company";

/* -------------------------------------------------------
   Animated counter — counts from 0 to `target` when visible
   ------------------------------------------------------- */
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.5,
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(Math.round(latest).toLocaleString("es-CL"));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <motion.span ref={ref}>
      {display}
      {suffix}
    </motion.span>
  );
}

/* -------------------------------------------------------
   Differentiators data
   ------------------------------------------------------- */
const differentiators = [
  "+67 a\u00f1os de experiencia en veh\u00edculos industriales",
  "Servicio t\u00e9cnico con cobertura nacional",
  "Stock permanente de repuestos originales",
  "T\u00e9cnicos certificados por HELI",
  "Respuesta en menos de 2 horas",
  "Financiamiento flexible para tu empresa",
  "Flota de arriendo disponible inmediatamente",
];

/* -------------------------------------------------------
   WhyChooseUs Section
   ------------------------------------------------------- */
export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const whatsappLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage
  )}`;

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative py-16 md:py-28 bg-steel-950 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---- Top split: left decorative / right differentiators ---- */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left — image with overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-end rounded-2xl overflow-hidden min-h-[520px]"
          >
            <img
              src="/assets/legacy/products/g-series-1-3.5t-electric.jpg"
              alt="Grúa horquilla HELI en operación"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 h-24 w-24 border-t-2 border-l-2 border-heli-red/50 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 h-24 w-24 border-b-2 border-r-2 border-heli-red/50 rounded-br-2xl" />
            {/* Bottom text over image */}
            <div className="relative z-10 p-8">
              <span className="font-heading text-8xl leading-none text-white">67+</span>
              <p className="mt-1 font-heading text-xl tracking-wider text-heli-yellow">
                AÑOS DE EXPERIENCIA
              </p>
              <p className="mt-2 text-sm text-steel-300">
                Fabricando grúas horquillas de clase mundial desde 1958
              </p>
            </div>
          </motion.div>

          {/* Right — differentiators list */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-steel-400 mb-3">
                &iquest;Por qu&eacute; elegirnos?
              </p>
              <h2 className="font-heading text-[clamp(2.5rem,6vw,4rem)] text-white leading-none">
                <span className="block">LA DIFERENCIA</span>
                <span className="block text-[#F5A623]">HELI</span>
              </h2>
            </motion.div>

            {/* Mobile-only giant number badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:hidden flex items-center gap-4 mb-8 p-4 rounded-xl bg-steel-900/80 border border-steel-700/50"
            >
              <span className="font-heading text-5xl text-heli-yellow leading-none">
                67+
              </span>
              <span className="text-sm text-steel-300 leading-snug">
                A&ntilde;os de experiencia en veh&iacute;culos industriales
              </span>
            </motion.div>

            {/* Differentiator items */}
            <ul className="space-y-4">
              {differentiators.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.2 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.3 + index * 0.1,
                    }}
                    className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-heli-red/15 border border-heli-red/30"
                  >
                    <Check className="h-3.5 w-3.5 text-heli-red" />
                  </motion.div>
                  <span className="text-base text-steel-200 leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Stats counters ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {company.stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "text-center p-4 sm:p-6 rounded-xl border border-steel-700/40 bg-steel-900/60",
                "transition-colors duration-300 hover:border-heli-red/30"
              )}
            >
              <p className="font-heading text-[clamp(2rem,5vw,3.5rem)] text-white leading-none mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                />
              </p>
              <p className="text-sm text-steel-400 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ---- Bottom CTA ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="font-heading text-[clamp(1.5rem,4vw,2.5rem)] text-white mb-8">
            &iquest;Listo para potenciar tu operaci&oacute;n?
          </p>

          <div className="flex w-full sm:w-auto flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <Link
              href="#cotizar"
              className={cn(
                "w-full sm:w-auto inline-flex items-center justify-center rounded-lg px-8 py-3.5",
                "text-sm font-bold uppercase tracking-wider",
                "bg-heli-red text-white glow-red",
                "transition-all duration-300",
                "hover:bg-heli-red-dark hover:scale-105 active:scale-95"
              )}
            >
              COTIZAR AHORA
            </Link>

            {/* Secondary CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5",
                "text-sm font-bold uppercase tracking-wider",
                "border border-steel-500 text-steel-200",
                "transition-all duration-300",
                "hover:border-white hover:text-white hover:scale-105 active:scale-95"
              )}
            >
              <MessageCircle className="h-4 w-4" />
              HABLAR CON UN ASESOR
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
