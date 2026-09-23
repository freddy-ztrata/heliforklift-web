"use client";

import { useEffect, useRef } from "react";

import { trackMetaEvent, userDataFromUrl } from "@/lib/meta/track";

interface MetaPixelLeadProps {
  /** Identificador del formulario/landing para diferenciar campañas en Meta Ads */
  contentName: string;
  /** Categoria del producto/lead (gasolina, diesel, electrica, servicio_tecnico, etc.) */
  contentCategory?: string;
  /** Valor estimado del lead en CLP (para optimizacion por valor) */
  value?: number;
}

/**
 * Dispara el evento "Lead" al montarse, por Pixel y por Conversions API con el
 * mismo `event_id` (Meta deduplica y cuenta una sola conversión).
 *
 * Usar en páginas /gracias. Si el formulario vive en Hapee y redirige acá
 * pasando email/teléfono por query string, se toman para mejorar el match
 * quality — ver `userDataFromUrl`.
 */
export default function MetaPixelLead({
  contentName,
  contentCategory = "general",
  value,
}: MetaPixelLeadProps) {
  // React 18+ monta dos veces en dev con StrictMode: sin esto se envía duplicado.
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    void trackMetaEvent({
      eventName: "Lead",
      customData: {
        content_name: contentName,
        content_category: contentCategory,
        ...(value !== undefined ? { value, currency: "CLP" } : {}),
      },
      userData: userDataFromUrl(),
    });
  }, [contentName, contentCategory, value]);

  return null;
}
