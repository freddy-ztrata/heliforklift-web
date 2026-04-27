"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Fuel, Flame, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import { allProducts, type FullProduct } from "@/lib/data/all-products";
import { deriveFuelType, getFuelTypeName } from "@/lib/data/products";
import FuelTypeBadge from "@/components/shared/FuelTypeBadge";

const fuelFilters = [
  { slug: "todos", label: "Todos", icon: null },
  { slug: "electrica", label: "Electrica", icon: Zap, color: "emerald" },
  { slug: "diesel", label: "Diesel", icon: Fuel, color: "amber" },
  { slug: "glp", label: "Gas (GLP)", icon: Flame, color: "sky" },
  { slug: "hidrogeno", label: "Hidrogeno", icon: Atom, color: "teal" },
] as const;

function matchesFuelFilter(product: FullProduct, tipo: string): boolean {
  switch (tipo) {
    case "electrica":
      return product.fuelType === "Electrica";
    case "diesel":
      return product.fuelType === "Diesel" || product.fuelType === "Diesel / GLP";
    case "glp":
      return product.fuelType === "GLP" || product.fuelType === "Diesel / GLP";
    case "hidrogeno":
      return product.fuelType === "Hidrogeno";
    default:
      return true;
  }
}

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
        <div className="product-img-container relative aspect-square overflow-hidden p-3 sm:p-6">
          <Image
            src={product.image}
            alt={`${product.name} — ${product.type} grua horquilla Chile`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain transition-transform duration-500 group-hover:scale-110 p-3 sm:p-6"
            loading="lazy"
            quality={75}
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-steel-800 p-3 sm:p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] sm:text-xs font-medium uppercase text-heli-red">
              {product.type}
            </span>
            <FuelTypeBadge fuelType={product.fuelType} size="sm" />
          </div>
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

interface ProductCatalogProps {
  defaultFuelType?: string;
}

export default function ProductCatalog({ defaultFuelType }: ProductCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tipoFromUrl = searchParams.get("tipo") || defaultFuelType || "todos";

  const [activeFuelType, setActiveFuelType] = useState(tipoFromUrl);
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Sync state with URL changes (when user navigates back/forward or clicks a different ?tipo link)
  useEffect(() => {
    setActiveFuelType(tipoFromUrl);
    setActiveCategory("Todos");
  }, [tipoFromUrl]);

  // Filter by fuel type first
  const fuelFiltered = useMemo(() => {
    if (activeFuelType === "todos") return allProducts;
    return allProducts.filter((p) => matchesFuelFilter(p, activeFuelType));
  }, [activeFuelType]);

  // Dynamic categories based on fuel-filtered products
  const categories = useMemo(() => {
    return [
      "Todos",
      ...Array.from(new Set(fuelFiltered.map((p) => p.category))),
    ];
  }, [fuelFiltered]);

  // Final filtered list
  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return fuelFiltered;
    return fuelFiltered.filter((p) => p.category === activeCategory);
  }, [fuelFiltered, activeCategory]);

  // Counts for category tabs
  const counts = useMemo(() => {
    const map: Record<string, number> = { Todos: fuelFiltered.length };
    fuelFiltered.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [fuelFiltered]);

  function handleFuelChange(slug: string) {
    setActiveFuelType(slug);
    setActiveCategory("Todos");
    router.replace(`/productos?tipo=${slug}`, { scroll: false });
  }

  return (
    <div>
      {/* Fuel type filter row */}
      <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
        {fuelFilters.map((f) => {
          const isActive = activeFuelType === f.slug;
          const Icon = f.icon;
          return (
            <button
              key={f.slug}
              onClick={() => handleFuelChange(f.slug)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200",
                isActive
                  ? f.slug === "todos"
                    ? "border-heli-red bg-heli-red/10 text-white"
                    : f.slug === "electrica"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : f.slug === "diesel"
                        ? "border-amber-500 bg-amber-500/10 text-amber-400"
                        : f.slug === "glp"
                          ? "border-sky-500 bg-sky-500/10 text-sky-400"
                          : "border-teal-500 bg-teal-500/10 text-teal-400"
                  : "border-steel-700 text-steel-400 hover:border-steel-500 hover:text-white"
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Category filter tabs */}
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
            <span className="ml-1.5 text-xs opacity-60">
              ({counts[cat] || 0})
            </span>
          </button>
        ))}
      </div>

      {/* Active heading */}
      <div className="mb-6 sm:mb-8 flex items-end justify-between border-b border-steel-800 pb-4">
        <div>
          <h2 className="font-heading text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-white">
            {activeCategory === "Todos"
              ? activeFuelType !== "todos"
                ? `EQUIPOS ${getFuelTypeName(activeFuelType).toUpperCase()}`
                : "TODOS LOS EQUIPOS"
              : activeCategory.toUpperCase()}
          </h2>
          <p className="mt-1 text-sm text-steel-400">
            {filtered.length} equipo{filtered.length !== 1 ? "s" : ""}{" "}
            {activeCategory === "Todos"
              ? "en catalogo"
              : "disponible" + (filtered.length !== 1 ? "s" : "")}
          </p>
        </div>
      </div>

      {/* Product grid */}
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
            No se encontraron equipos con estos filtros.
          </p>
        </div>
      )}
    </div>
  );
}
