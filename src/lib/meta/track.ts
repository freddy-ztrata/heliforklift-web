"use client";

import { META_CAPI_ENDPOINT } from "./config";

/**
 * Disparo de eventos de Meta con deduplicación Pixel ↔ CAPI.
 *
 * Genera un `eventId` único, lo pasa al Pixel del navegador como `eventID` y lo
 * reenvía al endpoint server-side con el mismo valor. Meta une ambas señales y
 * cuenta UNA sola conversión.
 *
 * Regla: ningún otro sistema (Hapee, GTM, etc.) debe disparar estos mismos
 * eventos de Meta. Dos disparos con IDs distintos = conversiones duplicadas.
 */

// `window.fbq` se declara en src/types/meta.d.ts (fuente única).

export interface MetaUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  region?: string;
  country?: string;
}

export interface TrackMetaEventArgs {
  eventName: "Lead" | "ViewContent" | "Contact" | "PageView";
  customData?: Record<string, unknown>;
  /** Datos personales para elevar el match quality. Se hashean en el servidor. */
  userData?: MetaUserData;
  /** true = evento custom (trackCustom) en vez de estándar. */
  custom?: boolean;
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Cookie _fbc. Si Meta aún no la escribió pero la URL trae `fbclid`, la
 * construimos con el formato que espera Meta: fb.1.<timestamp>.<fbclid>
 */
function resolveFbc(): string | undefined {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;

  if (typeof window === "undefined") return undefined;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid) return undefined;

  return `fb.1.${Date.now()}.${fbclid}`;
}

function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Lee datos del visitante desde el query string, para cuando el formulario vive
 * en un tercero (Hapee) y redirige a la página de gracias pasándolos por URL.
 * Sin esto, el Lead llega a Meta sin email ni teléfono y el match quality baja.
 */
export function userDataFromUrl(): MetaUserData {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const pick = (...keys: string[]) => {
    for (const k of keys) {
      const v = q.get(k);
      if (v) return v;
    }
    return undefined;
  };

  return {
    email: pick("email", "em"),
    phone: pick("telefono", "phone", "ph"),
    firstName: pick("nombre", "first_name", "fn"),
    lastName: pick("apellido", "last_name", "ln"),
    city: pick("comuna", "city"),
    region: pick("region", "state"),
    country: "CL",
  };
}

/**
 * Dispara el evento en el navegador y lo replica por CAPI.
 * Nunca lanza: un fallo de tracking no debe romper la página.
 */
export async function trackMetaEvent({
  eventName,
  customData,
  userData,
  custom = false,
}: TrackMetaEventArgs): Promise<void> {
  if (typeof window === "undefined") return;

  const eventId = newEventId();

  // 1) Navegador
  try {
    window.fbq?.(custom ? "trackCustom" : "track", eventName, customData, {
      eventID: eventId,
    });
  } catch {
    // El Pixel puede estar bloqueado; CAPI sigue adelante.
  }

  // 2) Servidor (mismo eventId ⇒ Meta deduplica)
  try {
    await fetch(META_CAPI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true, // sobrevive si el usuario navega justo después
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
        customData,
        userData: {
          ...userData,
          fbp: readCookie("_fbp"),
          fbc: resolveFbc(),
        },
      }),
    });
  } catch {
    // Silencioso a propósito.
  }
}
