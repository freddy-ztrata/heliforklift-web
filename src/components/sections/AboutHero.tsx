"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 67, suffix: "+", label: "Años de experiencia" },
  { value: 1100, suffix: "+", label: "Equipos vendidos en Chile" },
  { value: 150, suffix: "+", label: "Países de exportación" },
  { value: 1700, suffix: "+", label: "Modelos de equipos" },
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(0, target, {
      duration: 2.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {display.toLocaleString("es-CL")}
      {suffix}
    </span>
  );
}

export default function AboutHero({
  description,
}: {
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-steel-950 py-16 sm:py-28 lg:py-36">
      {/* Background with ambient gradients */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 bg-[radial-gradient(ellipse,rgba(206,20,45,0.08),transparent_70%)]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 bg-[radial-gradient(ellipse,rgba(245,166,35,0.05),transparent_70%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm font-medium uppercase tracking-widest text-steel-400"
          >
            Nuestra historia
          </motion.p>

          {/* Main title with stagger */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading mt-4 text-[clamp(3rem,8vw,6rem)] leading-[0.85] text-white"
          >
            ELEVANDO EL FUTURO
          </motion.h1>

          {/* Red accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-6 h-1 w-20 origin-left rounded-full bg-heli-red"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-lg leading-relaxed text-steel-300 lg:text-xl"
          >
            {description}
          </motion.p>
        </div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.15 }}
              className="group relative overflow-hidden rounded-xl border border-steel-700/50 bg-steel-900/50 p-4 sm:p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-heli-red/30 hover:bg-steel-900/80"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-heli-red/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="font-heading text-[clamp(2rem,5vw,3.5rem)] text-heli-red">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm text-steel-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
