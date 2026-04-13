"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

const certifications = [
  { id: "iso-9001", name: "ISO 9001", subtitle: "Gestión de Calidad" },
  { id: "iso-14001", name: "ISO 14001", subtitle: "Gestión Ambiental" },
  { id: "ohsas-18001", name: "OHSAS 18001", subtitle: "Seguridad y Salud" },
  { id: "ce", name: "CE", subtitle: "Conformidad Europea" },
  { id: "epa", name: "EPA", subtitle: "Estándar Ambiental" },
  { id: "iso-9001-2", name: "ISO 9001", subtitle: "Gestión de Calidad" },
  { id: "iso-14001-2", name: "ISO 14001", subtitle: "Gestión Ambiental" },
  { id: "ohsas-18001-2", name: "OHSAS 18001", subtitle: "Seguridad y Salud" },
  { id: "ce-2", name: "CE", subtitle: "Conformidad Europea" },
  { id: "epa-2", name: "EPA", subtitle: "Estándar Ambiental" },
];

function CertBadge({ cert }: { cert: (typeof certifications)[number] }) {
  return (
    <div
      className={cn(
        "flex-shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3",
        "rounded-xl border border-white/[0.06] bg-white/[0.03]",
        "hover:border-heli-red/20 hover:bg-white/[0.05]",
        "transition-all duration-300 select-none"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg",
          "bg-heli-red/10 border border-heli-red/20",
          "text-heli-red font-heading text-sm tracking-wider"
        )}
      >
        {cert.name.length <= 3 ? cert.name : cert.name.split(" ")[0]}
      </div>
      <div>
        <p className="text-white font-semibold text-sm tracking-wide">
          {cert.name}
        </p>
        <p className="text-steel-400 text-xs">{cert.subtitle}</p>
      </div>
    </div>
  );
}

export default function TrustBar() {
  const [ref, { width }] = useMeasure();
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const speed = useRef(50);

  useAnimationFrame((_, delta) => {
    const currentSpeed = isHovered ? speed.current * 0.2 : speed.current;
    const move = (currentSpeed * delta) / 1000;
    let newX = x.get() - move;
    // When half has scrolled off, jump back seamlessly
    if (width > 0 && newX <= -width / 2) {
      newX += width / 2;
    }
    x.set(newX);
  });

  return (
    <section
      className="relative w-full overflow-hidden py-6 sm:py-8"
      style={{ backgroundColor: "var(--steel-900)" }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 mb-5 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-steel-500 sm:text-sm">
          Certificaciones y estándares internacionales
        </p>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <motion.div
          ref={ref}
          style={{ x }}
          className="flex w-max items-center gap-4"
        >
          {/* Render 4x for seamless infinite scroll without gaps */}
          {[...certifications, ...certifications, ...certifications, ...certifications].map(
            (cert, i) => (
              <CertBadge key={`${cert.id}-${i}`} cert={cert} />
            )
          )}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
