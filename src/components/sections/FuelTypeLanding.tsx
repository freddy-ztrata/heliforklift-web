"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Fuel, Flame, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import { fuelTypeCategories, allProducts } from "@/lib/data/products";

const iconMap: Record<string, typeof Zap> = { Zap, Fuel, Flame, Atom };

const colorMap: Record<
  string,
  { border: string; glow: string; bg: string; text: string }
> = {
  emerald: {
    border: "border-emerald-400",
    glow: "shadow-[0_0_50px_rgba(52,211,153,0.25)]",
    bg: "bg-emerald-500",
    text: "text-emerald-400",
  },
  amber: {
    border: "border-amber-400",
    glow: "shadow-[0_0_50px_rgba(251,191,36,0.25)]",
    bg: "bg-amber-500",
    text: "text-amber-400",
  },
  sky: {
    border: "border-sky-400",
    glow: "shadow-[0_0_50px_rgba(56,189,248,0.25)]",
    bg: "bg-sky-500",
    text: "text-sky-400",
  },
  teal: {
    border: "border-teal-400",
    glow: "shadow-[0_0_50px_rgba(45,212,191,0.25)]",
    bg: "bg-teal-500",
    text: "text-teal-400",
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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
      {/* Bento Grid — 2 cols, 2 rows. First card tall on left, 3 stacked right */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2"
      >
        {fuelTypeCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Zap;
          const colors = colorMap[cat.color];
          const isHero = i === 0;

          return (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              className={cn(
                isHero
                  ? "md:row-span-2 min-h-[320px] sm:min-h-[400px] md:min-h-[520px]"
                  : "min-h-[180px] sm:min-h-[200px]"
              )}
            >
              <Link
                href={`/productos?tipo=${cat.slug}`}
                className={cn(
                  "group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl",
                  "border border-white/[0.06] bg-steel-900",
                  "transition-all duration-500",
                  "hover:border-white/20 hover:shadow-2xl",
                  `hover:${colors.glow}`
                )}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={`Grúas horquillas ${cat.name}`}
                    fill
                    sizes={isHero ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 50vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i === 0 ? "eager" : "lazy"}
                    quality={80}
                  />
                  {/* Gradient overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-all duration-500",
                      isHero
                        ? "bg-gradient-to-t from-black/95 via-black/40 to-black/10"
                        : "bg-gradient-to-t from-black/95 via-black/50 to-black/20"
                    )}
                  />
                </div>

                {/* Badge — top right, solid background for visibility */}
                <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
                      "text-[11px] sm:text-xs font-bold uppercase tracking-wider",
                      "text-white shadow-lg",
                      colors.bg
                    )}
                  >
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    {cat.name}
                  </span>
                </div>

                {/* Content — bottom */}
                <div
                  className={cn(
                    "relative z-10 p-5 sm:p-6",
                    isHero && "lg:p-8"
                  )}
                >
                  <h3
                    className={cn(
                      "font-heading leading-none tracking-wide text-white",
                      isHero
                        ? "text-4xl sm:text-5xl lg:text-6xl"
                        : "text-2xl sm:text-3xl"
                    )}
                  >
                    {cat.name.toUpperCase()}
                  </h3>

                  <p
                    className={cn(
                      "mt-2 text-steel-300 line-clamp-2",
                      isHero
                        ? "text-sm sm:text-base max-w-lg"
                        : "text-xs sm:text-sm max-w-sm"
                    )}
                  >
                    {cat.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-steel-500 font-medium">
                      {cat.productCount} equipos
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider",
                        "text-white/70 transition-all duration-300",
                        "group-hover:text-white group-hover:gap-2.5"
                      )}
                    >
                      Ver equipos
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
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-10 flex justify-center sm:mt-14"
      >
        <Link
          href="/productos?tipo=todos"
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/10 bg-transparent px-6 sm:px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-heli-red/50 hover:bg-heli-red/5 hover:shadow-[0_0_30px_rgba(206,20,45,0.15)]"
        >
          VER CATÁLOGO COMPLETO ({allProducts.length})
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
