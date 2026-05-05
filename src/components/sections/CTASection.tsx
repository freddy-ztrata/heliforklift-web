"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { motion } from "framer-motion";

const TRUST_ELEMENTS = [
  { text: "Respuesta en menos de 2 horas", emoji: "⚡", href: null },
  { text: "+1,100 empresas ya confían en nosotros", emoji: "🏆", href: null },
  { text: "¿Prefieres llamar? +56 9 9320 9186", emoji: "📞", href: "tel:+56993209186" },
  { text: "Tus datos están seguros. No spam.", emoji: "🔒", href: null },
];

export default function CTASection() {
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Re-trigger HubSpot form rendering on mount (handles SPA navigation)
  useEffect(() => {
    const container = formContainerRef.current;
    if (!container) return;

    // If HubSpot script already loaded and form not yet rendered, ask it to scan
    // @ts-expect-error - HubSpot global injected by their script
    if (typeof window !== "undefined" && window.hbspt?.forms) {
      // No-op: the data-attribute version auto-renders
    }
  }, []);

  return (
    <section
      id="cotizar"
      className="relative overflow-hidden py-16 md:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-steel-950 via-steel-900 to-steel-950" />

      {/* Red accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-heli-red/5 via-transparent to-heli-red/5" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Spotlight / lamp glow effect */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(206, 20, 45, 0.15) 0%, rgba(206, 20, 45, 0.05) 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] text-white leading-none">
            COTIZA TU GRÚA HORQUILLA HOY
          </h2>
          <p className="mt-4 text-lg md:text-xl text-steel-300">
            Respuesta garantizada en menos de 2 horas. Sin compromiso.
          </p>
        </motion.div>

        {/* Trust elements - top row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {TRUST_ELEMENTS.slice(0, 2).map((item) => {
            const content = (
              <>
                <span className="text-base">{item.emoji}</span>
                {item.text}
              </>
            );
            return item.href ? (
              <a
                key={item.text}
                href={item.href}
                className="flex items-center gap-2 text-sm text-steel-300 hover:text-white transition-colors"
              >
                {content}
              </a>
            ) : (
              <span
                key={item.text}
                className="flex items-center gap-2 text-sm text-steel-300"
              >
                {content}
              </span>
            );
          })}
        </motion.div>

        {/* Form container — HubSpot embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto max-w-2xl rounded-2xl border border-steel-700/50 bg-steel-900/80 p-4 sm:p-6 md:p-10 backdrop-blur-sm"
        >
          {/* Subtle glow behind form */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-heli-red/10 via-transparent to-transparent opacity-60" />

          {/* HubSpot Form Embed */}
          <div className="relative" id="hubspot-form-container">
            <Script
              src="https://js.hsforms.net/forms/embed/developer/50182752.js"
              strategy="afterInteractive"
              defer
            />
            <div
              ref={formContainerRef}
              className="hs-form-html"
              data-region="na1"
              data-form-id="15b3dd6b-0095-4c03-a306-3dde97e81456"
              data-portal-id="50182752"
            />
          </div>
        </motion.div>

        {/* Trust elements - bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {TRUST_ELEMENTS.slice(2).map((item) => {
            const content = (
              <>
                <span className="text-base">{item.emoji}</span>
                {item.text}
              </>
            );
            return item.href ? (
              <a
                key={item.text}
                href={item.href}
                className="flex items-center gap-2 text-sm text-steel-300 hover:text-white transition-colors"
              >
                {content}
              </a>
            ) : (
              <span
                key={item.text}
                className="flex items-center gap-2 text-sm text-steel-300"
              >
                {content}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
