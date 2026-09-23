import { NextResponse } from "next/server";

import { sendCapiEvent, type CapiUserData } from "@/lib/meta/capi";

/**
 * Relay del navegador hacia la Conversions API de Meta.
 *
 * El navegador dispara el evento con `fbq(..., { eventID })` y además hace POST
 * acá con el MISMO eventId. Meta recibe la señal dos veces y descarta la
 * duplicada. Si el Pixel del navegador fue bloqueado, sobrevive la del servidor.
 *
 * El access token nunca sale del servidor.
 */

// `crypto` para el hash SHA-256 obliga a runtime Node, no Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Solo estos eventos se aceptan: evita que el endpoint sea un relay abierto. */
const ALLOWED_EVENTS = new Set(["Lead", "ViewContent", "Contact", "PageView"]);

interface RequestBody {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  userData?: Partial<CapiUserData>;
  customData?: Record<string, unknown>;
  testEventCode?: string;
}

/** IP real del visitante detrás de proxy/CDN. */
function clientIp(req: Request): string | undefined {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-real-ip") ??
    undefined
  );
}

/** Rechaza POST que no vengan de nuestro propio sitio. */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // navegación directa / sin CORS
  try {
    const host = req.headers.get("host");
    return !host || new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "origen no permitido" }, { status: 403 });
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const { eventName, eventId } = body;

  if (!eventName || !eventId) {
    return NextResponse.json(
      { ok: false, error: "eventName y eventId son obligatorios" },
      { status: 400 }
    );
  }

  if (!ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json(
      { ok: false, error: `evento no permitido: ${eventName}` },
      { status: 400 }
    );
  }

  const result = await sendCapiEvent({
    eventName,
    eventId,
    eventSourceUrl: body.eventSourceUrl ?? req.headers.get("referer") ?? undefined,
    customData: body.customData,
    testEventCode: body.testEventCode,
    userData: {
      ...body.userData,
      // Estos dos SIEMPRE se toman del servidor: son los que más peso tienen en
      // el match quality y el cliente no debería poder falsearlos.
      clientIpAddress: clientIp(req),
      clientUserAgent: req.headers.get("user-agent") ?? undefined,
    },
  });

  if (!result.ok) {
    // Se registra pero se responde 200: un fallo de CAPI no debe romper la
    // página de gracias del usuario ni ensuciar su consola.
    console.error("[meta-capi] envío fallido", result.status, result.body);
    return NextResponse.json({ ok: false, delivered: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
