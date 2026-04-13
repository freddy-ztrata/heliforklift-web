"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { allProducts, type FullProduct } from "@/lib/data/all-products";

const categories = [
  "Todos",
  ...Array.from(new Set(allProducts.map((p) => p.category))),
];

function ProductCard({ product }: { product: FullProduct }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/productos/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-steel-700/50 bg-steel-900 transition-all duration-300 hover:-translate-y-2 hover:border-heli-red/40 hover:shadow-xl hover:shadow-heli-red/10"
      >
        <div className="product-img-container aspect-square overflow-hidden p-3 sm:p-6">
          <img
            src={product.image}
            alt={`${product.name} — ${product.type} grúa horquilla Chile`}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-steel-800 p-3 sm:p-4">
          <span className="text-[10px] sm:text-xs font-medium uppercase text-heli-red">
            {product.type}
          </span>
          <h3 className="mt-1 text-sm sm:text-base font-bold text-white line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-steel-400">
            {product.capacityRange}
          </p>
          {product.features && product.features.length > 0 && (
            <div className="mt-2 hidden sm:flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-steel-800 px-2 py-0.5 text-xs text-steel-300"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
          <span className="mt-auto inline-flex items-center pt-2 sm:pt-3 text-xs sm:text-sm font-medium text-heli-red-light transition-transform group-hover:translate-x-1">
            Ver detalles →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return allProducts;
    return allProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { Todos: allProducts.length };
    allProducts.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-8 sm:mb-10 flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full border px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200",
              activeCategory === cat
                ? "border-heli-red bg-heli-red/10 text-white"
                : "border-steel-700 text-steel-400 hover:border-steel-500 hover:text-white"
            )}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-60">({counts[cat] || 0})</span>
          </button>
        ))}
      </div>

      {/* Active category label */}
      <div className="mb-6 sm:mb-8 flex items-end justify-between border-b border-steel-800 pb-4">
        <div>
          <h2 className="font-heading text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-white">
            {activeCategory === "Todos"
              ? "TODOS LOS EQUIPOS"
              : activeCategory.toUpperCase()}
          </h2>
          <p className="mt-1 text-sm text-steel-400">
            {filtered.length} equipo{filtered.length !== 1 ? "s" : ""}{" "}
            {activeCategory === "Todos" ? "en catálogo" : "disponible" + (filtered.length !== 1 ? "s" : "")}
          </p>
        </div>
      </div>

      {/* Product grid with animation */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-steel-400">
            No se encontraron equipos en esta categoría.
          </p>
        </div>
      )}
    </div>
  );
}
