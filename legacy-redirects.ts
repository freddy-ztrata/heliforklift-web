// =============================================================================
// REDIRECTS DEL SITIO WORDPRESS ANTIGUO (pre abril 2026)
//
// Google todavia rastrea 447 URLs del sitio Divi/WooCommerce que quedaron en
// 404 al migrar a Next. Estas reglas recuperan las que tienen equivalente.
// Lo que NO se redirige a proposito: /wp-content, /wp-admin, /wp-json,
// /author, /category, /mi-cuenta y paginacion suelta. Mandar basura a la home
// genera soft 404, que es peor que dejarla morir.
//
// ORDEN IMPORTANTE: las fichas concretas van antes que los comodines de
// categoria, porque Next aplica la primera regla que calza.
// =============================================================================

type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

const rule = (source: string, destination: string): LegacyRedirect => ({
  source,
  destination,
  permanent: true,
});

const legacy: LegacyRedirect[] = [
  // --- Fichas de producto con equivalente exacto (27) ---
  rule("/equipos/apiladores/contrabalanceados/cdd06-970", "/productos/cdd06-apilador-peatonal"),
  rule("/equipos/apiladores/contrabalanceados/cdd15j-zsm", "/productos/cdd15j-apilador-electrico"),
  rule("/equipos/apiladores/contrabalanceados/cpd12-970-910", "/productos/cpd12-apilador-electrico"),
  rule("/equipos/apiladores/contrabalanceados/cpd16-d970", "/productos/cpd16-apilador-electrico"),
  rule("/equipos/apiladores/order-picker/ops15", "/productos/ops15-order-picker"),
  rule("/equipos/apiladores/pallets-pallets-abiertos/cdd16-20", "/productos/cdd16-20jk-apilador-electrico"),
  rule("/equipos/apiladores/pallets-pallets-abiertos/cdd16-20j", "/productos/cdd16-20jk-apilador-electrico"),
  rule("/equipos/apiladores/straddle-todo-pallets/cbs05j-d-s", "/productos/cbs05j-d-s-apilador"),
  rule("/equipos/plataformas-elevadoras/js07", "/productos/js07-plataforma-elevadora-tijera"),
  rule("/equipos/porta-contenedores/apiladores-porta-contenedores/cpcd180ec", "/productos/cpcd180ec-porta-contenedor"),
  rule("/equipos/porta-contenedores/apiladores-porta-contenedores/cpcd250ec", "/productos/cpcd250ec-porta-contenedor"),
  rule("/equipos/porta-contenedores/reachstaker/rsh4527-31", "/productos/reachstacker-rsh4527-31"),
  rule("/equipos/porta-contenedores/reachstaker/rsh4528-32-36", "/productos/reachstacker-rsh4528-32-36"),
  rule("/equipos/reach-truck/sit-down/g2-series-1-6-2-ton-modelo-cqd16-20", "/productos/g2-series-reach-truck-1.6-2-ton"),
  rule("/equipos/reach-truck/stand-up/g2-series-2-2-5-ton-cqd20-25-gc2r", "/productos/g2-series-reach-truck-2-2.5-ton"),
  rule("/equipos/reach-truck/stand-up/g2-series-cqd15-18", "/productos/g-series-reach-truck-1.5-2-ton"),
  rule("/equipos/tractores-de-tiro/combustion/g-series-qycd20-30", "/productos/g2-series-qycd20-30-tractor-combustion"),
  rule("/equipos/tractores-de-tiro/combustion/g-series-qycd35-50", "/productos/qycd35-50-tractor-combustion"),
  rule("/equipos/tractores-de-tiro/electricas/g-series-8-15-ton-qyd80-100-120-150-200-250", "/productos/qyd80-150-tractor-electrico"),
  rule("/equipos/tractores-de-tiro/electricas/g-series-qyd15-20-30-40-50-60s", "/productos/g-series-qyd15-60s-tractor"),
  rule("/equipos/tractores-de-tiro/electricas/qyd50-60-100", "/productos/qyd50-60-100-tractor-electrico"),
  rule("/equipos/transpaletas/cbd15-20-a-blih", "/productos/cbd15-20-transpaleta-electrica"),
  rule("/equipos/transpaletas/cbd15-610", "/productos/cbd15-20-transpaleta-electrica"),
  rule("/equipos/transpaletas/cbd20-150", "/productos/cbd20-25-transpaleta-electrica"),
  rule("/equipos/transpaletas/cbd20-25-28-30-460-470", "/productos/cbd20-25-transpaleta-electrica"),
  rule("/equipos/transpaletas/cbd20-25-491", "/productos/cbd20-25-transpaleta-electrica"),
  rule("/equipos/transpaletas/cbd20-410", "/productos/cbd20-25-transpaleta-electrica"),

  // --- Notas del blog (8) ---
  rule("/2020/10/15/heli-celebra-su-aniversario-no60", "/noticias/heli-celebra-su-aniversario-no-60"),
  rule("/2020/11/08/grua-porta-contenedores-hibrida-heli-es-entregada-a-pearl-river-port", "/noticias/grua-porta-contenedores-hibrida-heli-pearl-river-port"),
  rule("/2020/11/17/que-son-los-purificadores-de-combustible", "/noticias/que-son-los-purificadores-de-combustible"),
  rule("/2021/04/08/gruas-horquilla-electricas-tecnologia-en-crecimiento", "/noticias/gruas-horquilla-electricas-tecnologia-en-crecimiento"),
  rule("/2022/04/04/2022-modex-heli-estara-contigo-de-nuevo", "/noticias/2022-modex-heli-estara-contigo-de-nuevo"),
  rule("/2022/04/14/gruas-horquilla-electricas-inversion-en-economia-y-medioambiente", "/noticias/gruas-horquilla-electricas-inversion-en-economia-y-medioambiente"),
  rule("/2023/04/03/entrega-de-maquinarias-en-puerto-montt", "/noticias/entrega-maquinarias-puerto-montt"),
  rule("/2025/08/14/entrega-de-la-flota-de-gran-tonelaje-en-sucursal-de-quilicura", "/noticias/entrega-flota-gran-tonelaje-quilicura"),

  // --- Paginas institucionales (8) ---
  rule("/ofertas-de-trabajo", "/trabaja-con-nosotros"),
  rule("/cotizacion", "/cotiza"),
  rule("/postventa", "/servicios/servicio-tecnico"),
  rule("/certificaciones", "/nosotros"),
  rule("/informacionydenuncia", "/ley-karin"),
  rule("/distribuye-heli", "/contacto"),
  rule("/usados", "/productos"),
  rule("/productos/manipulador-telescopico-40h130-170s", "/productos/manipulador-telescopico-serie-h"),

  // --- Secciones completas del WP viejo ---
  rule("/cool_timeline/:path*", "/nosotros"),
  rule("/tienda/:path*", "/productos"),

  // --- Comodines de categoria: todo lo que no calzo con una ficha (12) ---
  rule("/equipos/accesorios/:path*", "/productos?categoria=accesorios"),
  rule("/equipos/apiladores/:path*", "/productos?categoria=apiladores"),
  rule("/equipos/gruas-combustion/:path*", "/productos?categoria=gruas-horquillas-combustion"),
  rule("/equipos/gruas-electricas/:path*", "/productos?categoria=gruas-horquillas-electricas"),
  rule("/equipos/gruas-hidrogeno/:path*", "/productos?categoria=gruas-hidrogeno-verde"),
  rule("/equipos/gruas-todo-terreno/:path*", "/productos?categoria=gruas-horquillas-todo-terreno"),
  rule("/equipos/manipuladores-telescopicos/:path*", "/productos?categoria=manipuladores-telescopicos"),
  rule("/equipos/plataformas-elevadoras/:path*", "/productos?categoria=plataformas-elevadoras"),
  rule("/equipos/porta-contenedores/:path*", "/productos?categoria=porta-contenedores"),
  rule("/equipos/reach-truck/:path*", "/productos?categoria=reach-truck"),
  rule("/equipos/tractores-de-tiro/:path*", "/productos?categoria=tractores-de-tiro"),
  rule("/equipos/transpaletas/:path*", "/productos?categoria=transpaletas"),
  rule("/equipos/:path*", "/productos"),

  // --- Mirror /en del WP viejo: lo devolvemos al arbol en espanol, que
  //     encadena con las reglas de arriba. El sitio actual no tiene ingles.
  // "/en" a secas debe ir explicito: con :path* vacio Next emite un
  // Location en blanco y el redirect queda roto.
  rule("/en", "/"),
  rule("/en/:path*", "/:path*"),
];

export default legacy;
