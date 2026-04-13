"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Phone, FileText, Truck, Headphones } from "lucide-react";

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

function DesktopDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const pos = index / (total - 1);
  const bg = useTransform(
    progress,
    [Math.max(0, pos - 0.05), pos + 0.05],
    ["#1a1a2e", "#CE142D"]
  );
  const border = useTransform(
    progress,
    [Math.max(0, pos - 0.05), pos + 0.05],
    ["#2a2a3e", "#CE142D"]
  );
  const scale = useTransform(
    progress,
    [Math.max(0, pos - 0.05), pos + 0.05],
    [0.7, 1]
  );

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={{ left: `${pos * 100}%` }}
    >
      <motion.div
        className="flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2"
        style={{ backgroundColor: bg, borderColor: border, scale }}
      >
        <motion.div
          className="h-2 w-2 rounded-full bg-white"
          style={{
            scale: useTransform(
              progress,
              [pos, pos + 0.05],
              [0, 1]
            ),
          }}
        />
      </motion.div>
    </div>
  );
}

function MobileDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const pos = index / (total - 1);
  const bg = useTransform(
    progress,
    [Math.max(0, pos - 0.08), pos],
    ["#1a1a2e", "#CE142D"]
  );
  const border = useTransform(
    progress,
    [Math.max(0, pos - 0.08), pos],
    ["#2a2a3e", "#CE142D"]
  );

  return (
    <motion.div
      className="absolute left-0 top-3 h-4 w-4 -translate-x-[7px] rounded-full border-2"
      style={{ backgroundColor: bg, borderColor: border }}
    />
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0.35 1", "0.65 0.3"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
        <div className="mb-12 text-center md:mb-20">
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

        {/* Desktop horizontal */}
        <div className="hidden md:block">
          {/* Timeline bar */}
          <div className="relative mx-auto mb-14 h-[3px] max-w-4xl rounded-full bg-steel-800">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-heli-red"
              style={{ width: fillWidth }}
            />
            {steps.map((_, i) => (
              <DesktopDot
                key={i}
                index={i}
                total={steps.length}
                progress={progress}
              />
            ))}
          </div>

          {/* Steps */}
          <div className="mx-auto grid max-w-4xl grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
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

        {/* Mobile vertical */}
        <div className="block md:hidden">
          <div className="relative ml-6 sm:ml-8">
            <div className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-steel-800" />
            <motion.div
              className="absolute left-0 top-0 w-[3px] rounded-full bg-heli-red"
              style={{ height: fillHeight }}
            />

            <div className="flex flex-col gap-14">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    className="relative pl-10"
                  >
                    <MobileDot
                      index={i}
                      total={steps.length}
                      progress={progress}
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
