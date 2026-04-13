"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";

const showcaseCategories = productCategories.slice(0, 6);

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
  category: (typeof productCategories)[number];
  className?: string;
  large?: boolean;
}

function ProductCard({ category, className, large }: CardProps) {
  return (
    <motion.div variants={cardVariants} className={className}>
      <Link
        href="/productos"
        className={cn(
          "group relative block h-full w-full overflow-hidden rounded-2xl",
          "border border-white/[0.08] bg-steel-900",
          "transition-all duration-500",
          "hover:border-heli-red/30 hover:shadow-[0_0_40px_rgba(206,20,45,0.12)]"
        )}
      >
        {/* Background image */}
        <div className="absolute inset-0 bg-steel-950">
          <img
            src={category.image}
            alt={`${category.name} — grúas horquillas Chile`}
            className="product-img-dark h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
        </div>

        {/* Highlight badge */}
        {category.highlight && (
          <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-heli-red px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-heli-red/30">
            <Zap className="h-3 w-3" />
            Innovación
          </div>
        )}

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
          {category.productCount && (
            <p className="mt-1 text-xs text-steel-500">
              {category.productCount} equipos disponibles
            </p>
          )}
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

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="equipos"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 sm:py-28 lg:py-32"
      style={{ backgroundColor: "var(--steel-950)" }}
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-steel-500 sm:text-sm">
            NUESTROS
          </p>
          <h2 className="font-heading text-[clamp(3rem,10vw,9rem)] leading-[0.85] text-white">
            EQUIPOS
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-heli-red" />
        </motion.div>

        {/* Bento Grid — fixed heights with explicit min-h */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Card 0 — Large (spans 2 cols, 2 rows on desktop) */}
          <ProductCard
            category={showcaseCategories[0]}
            large
            className="min-h-[280px] md:min-h-[320px] lg:col-span-2 lg:row-span-2 lg:min-h-[540px]"
          />
          {/* Card 1 */}
          <ProductCard
            category={showcaseCategories[1]}
            className="min-h-[240px] md:min-h-[260px]"
          />
          {/* Card 2 */}
          <ProductCard
            category={showcaseCategories[2]}
            className="min-h-[240px] md:min-h-[260px]"
          />
          {/* Card 3 */}
          <ProductCard
            category={showcaseCategories[3]}
            className="min-h-[240px] md:min-h-[260px]"
          />
          {/* Card 4 */}
          <ProductCard
            category={showcaseCategories[4]}
            className="min-h-[240px] md:min-h-[260px]"
          />
          {/* Card 5 */}
          <ProductCard
            category={showcaseCategories[5]}
            className="min-h-[240px] md:min-h-[260px]"
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
            href="/productos"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/10 bg-transparent px-6 sm:px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-heli-red/50 hover:bg-heli-red/5 hover:shadow-[0_0_30px_rgba(206,20,45,0.15)]"
          >
            VER CATÁLOGO COMPLETO
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
