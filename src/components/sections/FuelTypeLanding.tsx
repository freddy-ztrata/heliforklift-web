"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Fuel, Flame, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import { fuelTypeCategories, allProducts } from "@/lib/data/products";

const iconMap: Record<string, typeof Zap> = { Zap, Fuel, Flame, Atom };

const colorConfig: Record<string, { badgeBg: string; accent: string }> = {
  emerald: { badgeBg: "bg-emerald-500", accent: "text-emerald-400" },
  amber: { badgeBg: "bg-amber-500", accent: "text-amber-400" },
  sky: { badgeBg: "bg-sky-500", accent: "text-sky-400" },
  teal: { badgeBg: "bg-teal-500", accent: "text-teal-400" },
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
      {/*
        Grid: 2 cols x 2 rows on desktop.
        Row 1: Electrica (tall, left) + Diesel (right-top)
        Row 2: Electrica continues  + GLP (right-mid)
        Row 3 full width: Hidrogeno Verde (spans 2 cols)
      */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:grid-rows-[1fr_1fr_auto]"
      >
        {fuelTypeCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Zap;
          const c = colorConfig[cat.color];
          // i=0 Electrica: spans 2 rows on left
          // i=1 Diesel: right top
          // i=2 GLP: right bottom
          // i=3 Hidrogeno: full width bottom row
          const isHero = i === 0;
          const isWide = i === 3;

          return (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              className={cn(
                isHero && "md:row-span-2 min-h-[300px] sm:min-h-[360px]",
                !isHero && !isWide && "min-h-[240px] sm:min-h-[260px]",
                isWide && "md:col-span-2 min-h-[220px] sm:min-h-[260px]"
              )}
            >
              <Link
                href={`/productos?tipo=${cat.slug}`}
                className={cn(
                  "group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl",
                  "border border-white/[0.06] bg-steel-900",
                  "transition-all duration-500",
                  "hover:border-white/15 hover:shadow-2xl"
                )}
              >
                {/* Background: neutral gradient + machine image contained */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-steel-800 via-steel-900 to-steel-950" />
                  <Image
                    src={cat.image}
                    alt={`Grúas horquillas ${cat.name}`}
                    fill
                    sizes={
                      isWide
                        ? "(max-width: 768px) 100vw, 100vw"
                        : "(max-width: 768px) 100vw, 50vw"
                    }
                    className="object-contain p-8 sm:p-10 pb-20 sm:pb-24 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                    loading={i < 2 ? "eager" : "lazy"}
                    quality={80}
                  />
                  {/* Bottom gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                </div>

                {/* Badge — top right, solid color */}
                <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
                      "text-[11px] sm:text-xs font-bold uppercase tracking-wider",
                      "text-white shadow-lg",
                      c.badgeBg
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
                        : isWide
                          ? "text-3xl sm:text-4xl"
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
                        : "text-xs sm:text-sm max-w-md"
                    )}
                  >
                    {cat.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-steel-500 font-medium">
                      {cat.productCount} equipos disponibles
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 transition-all duration-300 group-hover:text-white group-hover:gap-2.5">
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

      {/* Bottom CTA */}
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
