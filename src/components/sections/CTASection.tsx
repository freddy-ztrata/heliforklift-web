"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TRUST_ELEMENTS = [
  { text: "Respuesta en menos de 2 horas", emoji: "⚡", href: null },
  { text: "+1,100 empresas ya confían en nosotros", emoji: "🏆", href: null },
  { text: "¿Prefieres llamar? +56 9 9320 9186", emoji: "📞", href: "tel:+56993209186" },
  { text: "Tus datos están seguros. No spam.", emoji: "🔒", href: null },
];

const HUBSPOT_V2_SCRIPT = "https://js.hsforms.net/forms/embed/v2.js";
const HUBSPOT_PORTAL_ID = "50182752";
const HUBSPOT_FORM_ID = "15b3dd6b-0095-4c03-a306-3dde97e81456";

declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

export default function CTASection() {
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Renderiza el form de HubSpot. El embed v2 soporta múltiples renders
  // por página y SPA navigation (a diferencia del embed "developer" que
  // sólo escanea el DOM una vez al cargar).
  useEffect(() => {
    const container = formContainerRef.current;
    if (!container) return;

    // Asigna un ID único a este container (necesario para hbspt.forms.create)
    const targetId = `hs-form-${Math.random().toString(36).slice(2, 11)}`;
    container.id = targetId;

    function renderForm() {
      if (!window.hbspt?.forms?.create || !container) return;
      container.innerHTML = ""; // Limpiar cualquier render previo
      window.hbspt.forms.create({
        region: "na1",
        portalId: HUBSPOT_PORTAL_ID,
        formId: HUBSPOT_FORM_ID,
        target: `#${targetId}`,
      });
    }

    // Si el script ya está cargado, renderiza inmediatamente
    if (window.hbspt?.forms?.create) {
      renderForm();
      return;
    }

    // Si el script no existe en el DOM, inyectarlo
    const existing = document.querySelector(`script[src="${HUBSPOT_V2_SCRIPT}"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = HUBSPOT_V2_SCRIPT;
      script.async = true;
      script.defer = true;
      script.onload = renderForm;
      document.body.appendChild(script);
    } else {
      // Script existe pero quizá aún cargando — esperar load
      existing.addEventListener("load", renderForm, { once: true });
      // Por si ya cargó pero sin disparar load (race condition)
      setTimeout(renderForm, 100);
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

          {/* HubSpot Form Embed — populado por hbspt.forms.create en useEffect */}
          <div
            ref={formContainerRef}
            className="hubspot-form-container relative"
          />

          {/* Fallback: mensaje mientras carga el form */}
          <noscript>
            <p className="text-center text-sm text-steel-400">
              Para usar este formulario, habilita JavaScript o llámanos al{" "}
              <a href="tel:+56993209186" className="text-heli-red hover:underline">
                +56 9 9320 9186
              </a>
              .
            </p>
          </noscript>
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
