// ⚠️ Solo servidor. Este módulo lee `META_CAPI_ACCESS_TOKEN` y usa `crypto`:
// importarlo desde un componente cliente filtraría el token al bundle.
// Único consumidor permitido: src/app/api/meta/capi/route.ts
import { createHash } from "crypto";

import { META_GRAPH_VERSION, META_PIXEL_ID } from "./config";

/**
 * Conversions API de Meta — envío de eventos server-side.
 *
 * Por qué existe: el Pixel del navegador se pierde con bloqueadores, ITP de
 * Safari y cookies de terceros. El mismo evento enviado desde el servidor llega
 * igual. Meta une ambas señales y descarta la duplicada usando `event_id`, que
 * DEBE ser idéntico en la llamada del navegador y en la del servidor.
 */

/** Campos de `user_data` que Meta espera hasheados en SHA-256. */
type HashedUserField = "em" | "ph" | "fn" | "ln" | "ct" | "st" | "zp" | "country";

export interface CapiUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  region?: string;
  zip?: string;
  country?: string;
  /** Cookie _fbp del navegador. */
  fbp?: string;
  /** Cookie _fbc del navegador (o derivada del parámetro fbclid). */
  fbc?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
}

export interface CapiEvent {
  eventName: string;
  /** Debe coincidir con el `eventID` usado en `fbq()` en el navegador. */
  eventId: string;
  /** Epoch en segundos. Meta rechaza eventos de más de 7 días. */
  eventTime?: number;
  eventSourceUrl?: string;
  userData: CapiUserData;
  customData?: Record<string, unknown>;
  /** Solo para pruebas desde el Events Manager. */
  testEventCode?: string;
}

/**
 * Normaliza según las reglas de Meta antes de hashear. Saltarse esto hace que
 * el hash no calce con el de Meta y el match quality se va al suelo.
 */
function normalize(field: HashedUserField, raw: string): string {
  const value = raw.trim().toLowerCase();

  if (field === "ph") {
    // Solo dígitos, con código de país. Asumimos Chile (56) si viene sin él.
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("56")) return digits;
    // Móvil chileno sin prefijo: 9XXXXXXXX
    if (digits.length === 9 && digits.startsWith("9")) return `56${digits}`;
    if (digits.length === 8) return `569${digits}`;
    return digits;
  }

  if (field === "zp") return value.replace(/\s/g, "");
  if (field === "country") return value.slice(0, 2);
  if (field === "ct" || field === "st") {
    // Sin espacios, puntuación ni acentos.
    return value
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z]/g, "");
  }

  return value;
}

function hash(field: HashedUserField, raw?: string): string | undefined {
  if (!raw) return undefined;
  const normalized = normalize(field, raw);
  if (!normalized) return undefined;
  return createHash("sha256").update(normalized).digest("hex");
}

function buildUserData(u: CapiUserData): Record<string, unknown> {
  const data: Record<string, unknown> = {
    em: hash("em", u.email),
    ph: hash("ph", u.phone),
    fn: hash("fn", u.firstName),
    ln: hash("ln", u.lastName),
    ct: hash("ct", u.city),
    st: hash("st", u.region),
    zp: hash("zp", u.zip),
    country: hash("country", u.country),
    // fbp y fbc viajan SIN hashear — Meta los espera en texto plano.
    fbp: u.fbp,
    fbc: u.fbc,
    client_ip_address: u.clientIpAddress,
    client_user_agent: u.clientUserAgent,
  };

  // Meta rechaza claves con valor nulo/vacío.
  for (const key of Object.keys(data)) {
    if (data[key] === undefined || data[key] === "") delete data[key];
  }
  return data;
}

export interface CapiResult {
  ok: boolean;
  status: number;
  body: unknown;
}

/**
 * Envía un evento a la Conversions API. No lanza: devuelve el resultado para
 * que el caller decida. Un fallo de CAPI nunca debe romper la página del
 * usuario — el evento del navegador ya se disparó igual.
 */
export async function sendCapiEvent(event: CapiEvent): Promise<CapiResult> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;

  if (!token) {
    return {
      ok: false,
      status: 0,
      body: { error: "META_CAPI_ACCESS_TOKEN no está configurado en el entorno" },
    };
  }

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: buildUserData(event.userData),
        ...(event.customData ? { custom_data: event.customData } : {}),
      },
    ],
    ...(event.testEventCode ? { test_event_code: event.testEventCode } : {}),
  };

  const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const body = await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, body };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      body: { error: error instanceof Error ? error.message : String(error) },
    };
  }
}
