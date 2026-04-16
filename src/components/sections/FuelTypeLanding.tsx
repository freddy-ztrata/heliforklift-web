"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Fuel, Flame, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import { fuelTypeCategories, allProducts } from "@/lib/data/products";

const iconMap: Record<string, typeof Zap> = { Zap, Fuel, Flame, Atom };

const colorConfig: Record<string, { badgeBg: string }> = {
  emerald: { badgeBg: "bg-emerald-500" },
  amber: { badgeBg: "bg-amber-500" },
  sky: { badgeBg: "bg-sky-500" },
  teal: { badgeBg: "bg-teal-500" },
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

interface CardProps {
  category: (typeof fuelTypeCategories)[number];
  className?: string;
  large?: boolean;
}

function FuelCard({ category, className, large }: CardProps) {
  const Icon = iconMap[category.icon] || Zap;
  const c = colorConfig[category.color];

  return (
    <motion.div variants={cardVariants} className={className}>
      <Link
        href={`/productos?tipo=${category.slug}`}
        className={cn(
          "group relative block h-full w-full overflow-hidden rounded-2xl",
          "border border-white/[0.08] bg-steel-900",
          "transition-all duration-500",
          "hover:border-heli-red/30 hover:shadow-[0_0_40px_rgba(206,20,45,0.12)]"
        )}
      >
        {/* Background image — same pattern as ProductShowcase */}
        <div className="absolute inset-0 bg-steel-950">
          <Image
            src={category.image}
            alt={`Grúas horquillas ${category.name}`}
            fill
            sizes={large ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="product-img-dark h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
        </div>

        {/* Fuel type badge */}
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-black/30">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5", c.badgeBg)}>
            <Icon className="h-3 w-3" />
            {category.name}
          </span>
        </div>

        {/* Content */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end p-6",
            large && "lg:p-8"
          )}
        >
          <h3
            className={cn(
              "font-heading leading-none tracking-wide text-white",
              large
                ? "text-3xl sm:text-4xl lg:text-5xl"
                : "text-2xl lg:text-3xl"
            )}
          >
            {category.name.toUpperCase()}
          </h3>
          <p
            className={cn(
              "mt-2 text-steel-300 line-clamp-2",
              large ? "text-sm sm:text-base max-w-md" : "text-xs sm:text-sm"
            )}
          >
            {category.description}
          </p>
          <p className="mt-1 text-xs text-steel-500">
            {category.productCount} equipos disponibles
          </p>
          <div className="mt-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60 transition-colors duration-300 group-hover:text-heli-red">
              Ver equipos
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FuelTypeLanding() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <div ref={sectionRef}>
      {/* Bento Grid — same layout as ProductShowcase on homepage */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Electrica — large, spans 2 cols + 2 rows */}
        <FuelCard
          category={fuelTypeCategories[0]}
          large
          className="min-h-[280px] md:min-h-[320px] lg:col-span-2 lg:row-span-2 lg:min-h-[540px]"
        />
        {/* Diesel */}
        <FuelCard
          category={fuelTypeCategories[1]}
          className="min-h-[240px] md:min-h-[260px]"
        />
        {/* GLP */}
        <FuelCard
          category={fuelTypeCategories[2]}
          className="min-h-[240px] md:min-h-[260px]"
        />
        {/* Hidrogeno — spans full width, taller */}
        <FuelCard
          category={fuelTypeCategories[3]}
          large
          className="min-h-[280px] md:min-h-[340px] lg:col-span-3"
        />
      </motion.div>

      {/* Bottom CTA */}
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
          VER CATÁLOGO COMPLETO ({allProducts.length})
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
