"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Clock, Wrench, Cog, RefreshCw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data/services";

const iconMap: Record<string, React.ComponentType<any>> = {
  ShoppingCart,
  Clock,
  Wrench,
  Cog,
  RefreshCw,
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-16 md:py-28 bg-steel-950 overflow-hidden"
    >
      {/* Dot-grid background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      {/* Gradient overlay at top and bottom for smooth blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-steel-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-steel-950 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-steel-400 mb-3">
            Nuestras soluciones
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,4rem)] text-white leading-none">
            <span className="block">&#191;QU&#201; HACEMOS</span>
            <span className="block text-[clamp(3rem,8vw,5.5rem)] text-[#F5A623]">
              POR TI?
            </span>
          </h2>
        </motion.div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        {/* 3 cards: 1col mobile, 3col desktop */}
        <div
          className={cn(
            "flex gap-6 pb-4 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory",
            "md:grid md:grid-cols-2 md:overflow-visible md:mx-0 md:px-0 md:snap-none",
            "lg:grid-cols-3",
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          )}
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-auto snap-center",
                  "flex flex-col rounded-xl border border-steel-700/50 bg-steel-900/80 backdrop-blur-sm",
                  "p-6 transition-all duration-300",
                  "hover:-translate-y-1 hover:border-heli-red/30 hover:shadow-[0_0_30px_rgba(206,20,45,0.12)]"
                )}
              >
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-heli-red/10 border border-heli-red/20 transition-colors duration-300 group-hover:bg-heli-red/20">
                  {Icon && (
                    <Icon className="h-6 w-6 text-heli-red transition-colors duration-300" />
                  )}
                </div>

                {/* Name */}
                <h3 className="mb-2 text-lg font-bold text-white">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm leading-relaxed text-steel-400">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="mb-6 flex-1 space-y-2.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-steel-300"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-heli-red" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={`/contacto?servicio=${encodeURIComponent(service.name)}`}
                  className={cn(
                    "mt-auto inline-flex items-center justify-center rounded-lg px-5 py-2.5",
                    "text-sm font-bold uppercase tracking-wider",
                    "bg-heli-red text-white",
                    "transition-all duration-300",
                    "hover:bg-heli-red-dark hover:scale-[1.02] active:scale-95"
                  )}
                >
                  {service.cta}
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
