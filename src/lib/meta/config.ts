/**
 * Configuración central de Meta (Pixel + Conversions API).
 *
 * El Pixel ID NO es secreto: viaja en el HTML de todas las páginas. Por eso vive
 * acá como constante y no como variable de entorno — así no depende de que el
 * build de Docker reciba una `NEXT_PUBLIC_*`, que se congela en tiempo de build.
 *
 * El access token de CAPI SÍ es secreto y vive solo en el servidor
 * (`META_CAPI_ACCESS_TOKEN`). Nunca se expone al navegador.
 */

/** Pixel de HELI FORKLIFT CHILE. */
export const META_PIXEL_ID = "1577006250866960";

/** Versión de la Graph API usada para enviar eventos server-side. */
export const META_GRAPH_VERSION = "v21.0";

/** Endpoint interno al que el navegador reporta los eventos para replicarlos por CAPI. */
export const META_CAPI_ENDPOINT = "/api/meta/capi";
