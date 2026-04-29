"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ProductCategoriesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <div ref={sectionRef} className="mt-16 sm:mt-24">
      {/* Header */}
      <div className="mb-10 sm:mb-12 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
          O explora por
        </p>
        <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
          TIPO DE EQUIPO
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-steel-400">
          12 categorías de equipos industriales: desde transpaletas hasta
          porta contenedores de 45 toneladas.
        </p>
      </div>

      {/* Grid 4 columnas en desktop, 2 en tablet, 1 en mobile */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {productCategories.map((cat) => (
          <motion.div key={cat.id} variants={cardVariants}>
            <Link
              href={`/productos?categoria=${cat.slug}`}
              className={cn(
                "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl",
                "border border-white/[0.06] bg-steel-900",
                "transition-all duration-500",
                "hover:border-heli-red/30 hover:shadow-[0_0_30px_rgba(206,20,45,0.12)] hover:-translate-y-1"
              )}
            >
              {/* Imagen — fondo claro como tarjetas de producto */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] to-[#d8d8d8]" />
                <Image
                  src={cat.image}
                  alt={`Grúas horquillas ${cat.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-2 sm:p-3 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_6px_16px_rgba(0,0,0,0.22)]"
                  loading="lazy"
                  quality={80}
                />

                {/* Badge highlight (Hidrogeno) */}
                {cat.highlight && (
                  <div className="absolute right-3 top-3 z-10 rounded-full bg-heli-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Innovación
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col border-t border-steel-800 p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold leading-tight text-white">
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-steel-400 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-steel-800/60 pt-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-steel-500">
                    {cat.productCount} equipo{cat.productCount !== 1 ? "s" : ""}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-heli-red-light transition-all group-hover:gap-2">
                    Ver
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
