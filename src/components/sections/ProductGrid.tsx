"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { featuredProducts } from "@/lib/data/products";

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featuredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group overflow-hidden rounded-2xl border border-steel-700/50 bg-steel-900 transition-all hover:-translate-y-2 hover:border-heli-red/40 hover:shadow-xl hover:shadow-heli-red/10"
        >
          <div className="product-img-container relative aspect-square overflow-hidden p-6">
            <Image
              src={product.image}
              alt={`${product.name} — grúa horquilla ${product.type}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain transition-transform duration-500 group-hover:scale-110 p-6"
              loading="lazy"
              quality={75}
            />
          </div>
          <div className="p-5">
            <span className="text-xs font-medium uppercase text-heli-red">
              {product.type}
            </span>
            <h3 className="mt-1 text-lg font-bold text-white">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-steel-400">
              Capacidad: {product.capacityRange}
            </p>
            {product.features && (
              <div className="mt-3 flex flex-wrap gap-1">
                {product.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-steel-800 px-2 py-0.5 text-xs text-steel-300"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
            <a
              href={`/contacto?equipo=${encodeURIComponent(product.name)}`}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-heli-red/10 py-2 text-sm font-medium text-heli-red-light transition-colors hover:bg-heli-red hover:text-white"
            >
              Cotizar este equipo
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
