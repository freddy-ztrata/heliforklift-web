"use client";

import { trackMetaEvent, userDataFromUrl, type MetaUserData } from "./track";

/**
 * Conversión de una página de gracias de campaña.
 *
 * Se dispara al montar el componente, así que corre igual si la URL trae
 * UTM, fbclid u otros parámetros. Meta recibe el Lead por Pixel y por CAPI
 * con el mismo eventID. GA4 recibe `generate_lead` una sola vez, por
 * gtag('event'): el snippet directo de G-3HLYKF62PW lo procesa. GTM
 * (GTM-M9FW8BM3) también carga esa etiqueta, pero sus eventos de formulario
 * son dg_envio_* por URL; no hay activador para generate_lead, así que un
 * push {event:'generate_lead'} no llega a GA4 y no se envía.
 * `heli_lead` queda en el dataLayer para Google Ads / GTM, con form_id,
 * slug y modelo.
 *
 * La conversión de Google Ads (gtag `conversion`) solo se envía si existen
 * NEXT_PUBLIC_GADS_ID y NEXT_PUBLIC_GADS_LEAD_LABEL. Sin ellas no se llama
 * a gtag para Ads y el resto sigue igual.
 */
export interface PromoLeadArgs {
  contentName: string;
  contentCategory: string;
  contentId?: string;
  /** 0 = no se envía value. currency CLP sale siempre. */
  value?: number;
  formId: string;
  slug: string;
  model: string;
  userData?: MetaUserData;
}

export function firePromoLead({
  contentName,
  contentCategory,
  contentId,
  value = 0,
  formId,
  slug,
  model,
  userData,
}: PromoLeadArgs): void {
  if (typeof window === "undefined") return;

  void trackMetaEvent({
    eventName: "Lead",
    customData: {
      content_name: contentName,
      content_category: contentCategory,
      ...(contentId ? { content_ids: [contentId] } : {}),
      currency: "CLP",
      ...(value > 0 ? { value } : {}),
    },
    userData: userData ?? userDataFromUrl(),
  });

  const payload = {
    form_id: formId,
    slug,
    modelo: model,
    currency: "CLP",
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "heli_lead", ...payload });
  // Una sola vez. gtag.js (G-3HLYKF62PW en el layout) envía el hit. No se
  // hace dataLayer.push({event:'generate_lead'}): GTM no tiene activador
  // para ese nombre, así que ese push no llegaría a GA4 y, si alguien lo
  // agrega después, se contaría dos veces junto con este gtag.
  window.gtag?.("event", "generate_lead", payload);

  const gadsId = process.env.NEXT_PUBLIC_GADS_ID;
  const gadsLabel = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL;
  if (gadsId && gadsLabel) {
    window.gtag?.("config", gadsId);
    window.gtag?.("event", "conversion", {
      send_to: `${gadsId}/${gadsLabel}`,
      form_id: formId,
      slug,
      modelo: model,
    });
  }
}
