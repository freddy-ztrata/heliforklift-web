"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Fuel, Flame, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import { fuelTypeCategories, allProducts } from "@/lib/data/products";

const iconMap: Record<string, typeof Zap> = { Zap, Fuel, Flame, Atom };

const colorMap: Record<string, { hover: string; glow: string; text: string; badge: string }> = {
  emerald: {
    hover: "hover:border-emerald-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  amber: {
    hover: "hover:border-amber-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  sky: {
    hover: "hover:border-sky-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(14,165,233,0.15)]",
    text: "text-sky-400",
    badge: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  },
  teal: {
    hover: "hover:border-teal-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(20,184,166,0.15)]",
    text: "text-teal-400",
    badge: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function FuelTypeLanding() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <div ref={sectionRef}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 sm:mb-16"
      >
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-steel-500 sm:text-sm">
          ELIGE TU
        </p>
        <h2 className="font-heading text-[clamp(3rem,10vw,7rem)] leading-[0.85] text-white">
          TIPO DE ENERGIA
        </h2>
        <div className="mt-4 h-1 w-16 rounded-full bg-heli-red" />
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {fuelTypeCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Zap;
          const colors = colorMap[cat.color];
          const isLarge = i === 0;

          return (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              className={cn(
                isLarge && "lg:col-span-2 lg:row-span-2",
                isLarge
                  ? "min-h-[280px] md:min-h-[320px] lg:min-h-[540px]"
                  : "min-h-[240px] md:min-h-[260px]"
              )}
            >
              <Link
                href={`/productos?tipo=${cat.slug}`}
                className={cn(
                  "group relative block h-full w-full overflow-hidden rounded-2xl",
                  "border border-white/[0.08] bg-steel-900",
                  "transition-all duration-500",
                  colors.hover,
                  colors.glow
                )}
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-steel-950">
                  <Image
                    src={cat.image}
                    alt={`Gruas horquillas ${cat.name}`}
                    fill
                    sizes={
                      isLarge
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
                </div>

                {/* Fuel type badge */}
                <div className="absolute right-4 top-4 z-10">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg",
                      colors.badge
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat.name}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-end p-6",
                    isLarge && "lg:p-8"
                  )}
                >
                  <h3
                    className={cn(
                      "font-heading leading-none tracking-wide text-white",
                      isLarge
                        ? "text-3xl sm:text-4xl lg:text-5xl"
                        : "text-2xl lg:text-3xl"
                    )}
                  >
                    {cat.name.toUpperCase()}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-steel-300 line-clamp-2",
                      isLarge
                        ? "text-sm sm:text-base max-w-md"
                        : "text-xs sm:text-sm"
                    )}
                  >
                    {cat.description}
                  </p>
                  <p className="mt-1 text-xs text-steel-500">
                    {cat.productCount} equipos disponibles
                  </p>
                  <div className="mt-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300",
                        "text-white/60",
                        `group-hover:${colors.text}`
                      )}
                      style={{
                        // Use inline for dynamic group-hover color
                      }}
                    >
                      <span className={cn("transition-colors duration-300 group-hover:text-current", colors.text.replace("text-", "group-hover:text-"))}>
                        Ver equipos
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA — see all */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 flex justify-center sm:mt-16"
      >
        <Link
          href="/productos?tipo=todos"
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/10 bg-transparent px-6 sm:px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-heli-red/50 hover:bg-heli-red/5 hover:shadow-[0_0_30px_rgba(206,20,45,0.15)]"
        >
          VER TODOS LOS EQUIPOS ({allProducts.length})
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
