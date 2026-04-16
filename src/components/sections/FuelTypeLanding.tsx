"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Fuel, Flame, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import { fuelTypeCategories, allProducts } from "@/lib/data/products";

const iconMap: Record<string, typeof Zap> = { Zap, Fuel, Flame, Atom };

const colorConfig: Record<
  string,
  {
    bg: string;
    bgHover: string;
    border: string;
    borderHover: string;
    badgeBg: string;
    accent: string;
    glow: string;
  }
> = {
  emerald: {
    bg: "bg-emerald-950/40",
    bgHover: "group-hover:bg-emerald-950/60",
    border: "border-emerald-500/20",
    borderHover: "hover:border-emerald-400/50",
    badgeBg: "bg-emerald-500",
    accent: "text-emerald-400",
    glow: "hover:shadow-[0_8px_40px_rgba(52,211,153,0.15)]",
  },
  amber: {
    bg: "bg-amber-950/40",
    bgHover: "group-hover:bg-amber-950/60",
    border: "border-amber-500/20",
    borderHover: "hover:border-amber-400/50",
    badgeBg: "bg-amber-500",
    accent: "text-amber-400",
    glow: "hover:shadow-[0_8px_40px_rgba(251,191,36,0.15)]",
  },
  sky: {
    bg: "bg-sky-950/40",
    bgHover: "group-hover:bg-sky-950/60",
    border: "border-sky-500/20",
    borderHover: "hover:border-sky-400/50",
    badgeBg: "bg-sky-500",
    accent: "text-sky-400",
    glow: "hover:shadow-[0_8px_40px_rgba(56,189,248,0.15)]",
  },
  teal: {
    bg: "bg-teal-950/40",
    bgHover: "group-hover:bg-teal-950/60",
    border: "border-teal-500/20",
    borderHover: "hover:border-teal-400/50",
    badgeBg: "bg-teal-500",
    accent: "text-teal-400",
    glow: "hover:shadow-[0_8px_40px_rgba(45,212,191,0.15)]",
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
      {/* Grid: 2x2 on desktop, equal sized cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2"
      >
        {fuelTypeCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Zap;
          const c = colorConfig[cat.color];

          return (
            <motion.div key={cat.id} variants={cardVariants}>
              <Link
                href={`/productos?tipo=${cat.slug}`}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl",
                  "border transition-all duration-500",
                  c.border,
                  c.borderHover,
                  c.glow,
                  "bg-steel-900"
                )}
              >
                {/* Top: Product image on light gradient bg */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* Light gradient background so the machine looks good */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f0f0f0] to-[#d8d8d8]" />
                  <Image
                    src={cat.image}
                    alt={`Grúas horquillas ${cat.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain p-6 sm:p-8 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                    loading={i < 2 ? "eager" : "lazy"}
                    quality={80}
                  />

                  {/* Badge — top right */}
                  <div className="absolute right-3 top-3 z-10">
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

                  {/* Product count pill */}
                  <div className="absolute left-3 top-3 z-10">
                    <span className="rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {cat.productCount} equipos
                    </span>
                  </div>
                </div>

                {/* Bottom: Info section on dark bg */}
                <div className={cn("flex flex-1 flex-col p-5 sm:p-6", c.bg, c.bgHover, "transition-colors duration-500")}>
                  <h3 className="font-heading text-2xl sm:text-3xl leading-none tracking-wide text-white">
                    {cat.name.toUpperCase()}
                  </h3>

                  <p className="mt-2 text-sm text-steel-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <span className={cn("text-xs font-semibold uppercase tracking-wider", c.accent)}>
                      <Icon className="mr-1.5 inline h-3.5 w-3.5" />
                      {cat.name}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider",
                        "text-white/60 transition-all duration-300",
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
