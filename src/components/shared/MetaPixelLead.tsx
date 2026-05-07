"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (
      action: "track" | "trackCustom",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

interface MetaPixelLeadProps {
  /** Identificador del formulario/landing para diferenciar campañas en Meta Ads */
  contentName: string;
  /** Categoria del producto/lead (gasolina, diesel, electrica, servicio_tecnico, etc.) */
  contentCategory?: string;
  /** Valor estimado del lead en CLP (para optimizacion por valor) */
  value?: number;
}

/**
 * Componente cliente que dispara el evento Meta Pixel "Lead" al montarse.
 * Usar en paginas /gracias para registrar conversiones diferenciadas por
 * landing/campaña en Meta Ads Manager.
 */
export default function MetaPixelLead({
  contentName,
  contentCategory = "general",
  value,
}: MetaPixelLeadProps) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("track", "Lead", {
      content_name: contentName,
      content_category: contentCategory,
      ...(value !== undefined ? { value, currency: "CLP" } : {}),
    });
  }, [contentName, contentCategory, value]);

  return null;
}
