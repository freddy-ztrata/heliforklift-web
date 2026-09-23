"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/lib/scroll-to-section";

// Hace que TODO enlace a una sección de la misma página (`href="#cotiza"`,
// `href="#cotizar"`…) use scrollToSection, que calcula el destino con el alto
// real de las secciones. Un solo listener en el layout en vez de tocar cada
// uno de los ~25 CTA del sitio.
export default function SectionLinkScroll() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = decodeURIComponent((a.getAttribute("href") || "").slice(1));
      if (!id || !scrollToSection(id)) return;
      e.preventDefault();
      history.replaceState(null, "", `#${id}`);
    }
    // En CAPTURA: el CTA del Home es un <Link href="#cotizar"> de Next, que
    // atiende el clic en la fase de burbuja (listener de React en la raíz) y
    // hace su propio scroll con las alturas estimadas. Atendido antes y con
    // preventDefault, Link lo ve `defaultPrevented` y no hace nada.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
