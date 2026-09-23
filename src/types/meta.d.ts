/**
 * Declaración ÚNICA de los globals de tracking.
 *
 * Antes cada componente declaraba `window.fbq` por su cuenta. Al agregar el
 * cuarto parámetro (`options.eventID`, necesario para deduplicar Pixel ↔ CAPI)
 * esas firmas entraban en conflicto entre sí. Ahora vive solo acá.
 *
 * No declarar `fbq` en ningún otro archivo.
 */

declare global {
  interface Window {
    fbq?: (
      action: "track" | "trackCustom",
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;

    dataLayer?: Record<string, unknown>[];
  }
}

export {};
