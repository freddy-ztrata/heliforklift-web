"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, FileText, Truck, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "CONTÁCTANOS",
    description: "Cuéntanos qué necesitas. Respondemos en menos de 2 horas.",
    icon: Phone,
  },
  {
    number: "02",
    title: "COTIZACIÓN PERSONALIZADA",
    description: "Preparamos una propuesta a tu medida sin compromiso.",
    icon: FileText,
  },
  {
    number: "03",
    title: "ENTREGA RÁPIDA",
    description: "Coordinamos la entrega o el inicio del servicio.",
    icon: Truck,
  },
  {
    number: "04",
    title: "SOPORTE CONTINUO",
    description: "Te acompañamos con mantención y soporte 24/7.",
    icon: Headphones,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="como-trabajamos"
      className="relative overflow-hidden py-16 md:py-32"
      style={{ backgroundColor: "var(--steel-900)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-steel-950/50 via-transparent to-steel-950/50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 md:mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-heli-red"
          >
            CÓMO
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 font-heading text-[clamp(3rem,10vw,9rem)] text-steel-100"
          >
            TRABAJAMOS
          </motion.h2>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block">
          {/* Timeline bar + dots */}
          <div className="relative mx-auto mb-14 max-w-4xl">
            {/* Background track */}
            <div className="h-[3px] w-full rounded-full bg-steel-800" />
            {/* Animated fill — grows from left to right */}
            <motion.div
              className="absolute left-0 top-0 h-[3px] rounded-full bg-heli-red"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Dots — positioned at 0%, 33%, 66%, 100% */}
            {steps.map((_, i) => {
              const pct = (i / (steps.length - 1)) * 100;
              const dotDelay = 0.5 + (i / (steps.length - 1)) * 1.8;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${pct}%` }}
                >
                  <motion.div
                    className="h-4 w-4 -translate-x-1/2 rounded-full border-2"
                    initial={{
                      borderColor: "var(--steel-700)",
                      backgroundColor: "var(--steel-900)",
                    }}
                    animate={
                      isInView
                        ? {
                            borderColor: "var(--heli-red)",
                            backgroundColor: "var(--heli-red)",
                          }
                        : {}
                    }
                    transition={{ duration: 0.3, delay: dotDelay }}
                  />
                </div>
              );
            })}
          </div>

          {/* Steps row */}
          <div className="mx-auto grid max-w-4xl grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="font-heading text-6xl leading-none text-heli-red md:text-7xl">
                    {step.number}
                  </span>
                  <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-steel-700 bg-steel-800">
                    <Icon className="h-6 w-6 text-heli-red" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg tracking-wide text-steel-100 md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-steel-400">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="block md:hidden">
          <div className="relative ml-6 sm:ml-8">
            {/* Vertical track */}
            <div className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-steel-800" />
            {/* Animated fill */}
            <motion.div
              className="absolute left-0 top-0 w-[3px] rounded-full bg-heli-red"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="flex flex-col gap-16">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const dotDelay = 0.5 + (i / (steps.length - 1)) * 2;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
                    className="relative pl-10"
                  >
                    {/* Dot */}
                    <motion.div
                      className="absolute left-0 top-2 h-4 w-4 -translate-x-[6.5px] rounded-full border-2"
                      initial={{
                        borderColor: "var(--steel-700)",
                        backgroundColor: "var(--steel-900)",
                      }}
                      animate={
                        isInView
                          ? {
                              borderColor: "var(--heli-red)",
                              backgroundColor: "var(--heli-red)",
                            }
                          : {}
                      }
                      transition={{ duration: 0.3, delay: dotDelay }}
                    />
                    <span className="font-heading text-5xl leading-none text-heli-red">
                      {step.number}
                    </span>
                    <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-xl border border-steel-700 bg-steel-800">
                      <Icon className="h-5 w-5 text-heli-red" />
                    </div>
                    <h3 className="mt-3 font-heading text-xl tracking-wide text-steel-100">
                      {step.title}
                    </h3>
                    <p className="mt-1 max-w-[280px] text-sm leading-relaxed text-steel-400">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
