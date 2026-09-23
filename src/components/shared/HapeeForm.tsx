"use client";

import { useEffect, useRef } from "react";

// Embed de formularios de Hapee (reemplaza a los embeds de HubSpot).
//
// El script de Hapee recorre el DOM UNA sola vez, al ejecutarse: monta el
// iframe en cada `div[data-zentru-form]` que encuentra en ese momento. En una
// navegación del lado del cliente (Link de Next) el script ya corrió y el div
// nuevo quedaría vacío, sin error. Por eso se vuelve a inyectar en cada montaje:
// los divs que ya tienen iframe se saltan, así que no duplica formularios.
//
// Lo que resuelve el script y NO hay que replicar acá:
//  - redirect post-envío a la página de gracias navegando la página completa
//    (no el iframe), que es donde se dispara el Lead del Pixel;
//  - UTMs, fbclid/gclid y cookies _fbp/_fbc de ESTA página reenviados al
//    iframe, que es de otro origen y no los puede leer;
//  - alto del iframe ajustado al contenido.
const HAPEE_EMBED_SRC = "https://beta.hapee.ai/static/form-embed.js";

interface HapeeFormProps {
  /** Identificador del botón "Integrar" de Hapee: `{cliente}/{slug}`. */
  formId: string;
  className?: string;
}

export default function HapeeForm({ formId, className }: HapeeFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let script: HTMLScriptElement | null = null;

    function montar() {
      if (!container) return;
      // El div se crea fuera de React para que la reconciliación no toque el
      // iframe que el script le cuelga adentro.
      const mount = document.createElement("div");
      mount.setAttribute("data-zentru-form", formId);
      mount.setAttribute("data-mode", "inline");
      // Alto inicial CHICO a propósito: el form mide su alto contra el viewport
      // del iframe, así que puede crecer hasta su tamaño real pero nunca
      // achicarse por debajo del alto con que nace (quedaría un hueco abajo).
      mount.setAttribute("data-height", "400px");
      container.replaceChildren(mount);

      script = document.createElement("script");
      script.src = HAPEE_EMBED_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    // Se monta recién cuando la sección está por entrar en pantalla. Un iframe
    // creado fuera de pantalla nace con viewport 0x0: el form se mide a ese
    // ancho (label por palabra, ~1244px de alto), avisa ese alto y, como su
    // <body> es min-h-screen, al reacomodarse ya no puede achicarse. Resultado
    // medido: ~580px de hueco vacío bajo el botón en todas las landings, donde
    // el form está al final de la página.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          montar();
        }
      },
      { rootMargin: "0px 0px 150px 0px" }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      script?.remove();
      container.replaceChildren();
    };
  }, [formId]);

  return <div ref={containerRef} className={className} />;
}
