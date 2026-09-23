"use client";

// Scroll a una sección de la MISMA página (los CTA "Cotizar" → #cotiza/#cotizar).
//
// globals.css difiere el render de toda <section> fuera de pantalla con
// `content-visibility: auto` y una altura ESTIMADA de 600px. El navegador calcula
// el destino del scroll con esas alturas estimadas y, mientras baja, las
// secciones que va pasando se dibujan y crecen a su alto real: el form termina
// muy por debajo de donde apuntó el botón. Medido en celular (390px): /cotiza se
// quedaba 2073px corto; el Home 1066; las promo 450-570.
//
// Por eso, antes de scrollear, se apaga el render diferido (clase `cv-off` en
// <html>): el layout pasa a ser el real y el destino es exacto. Se deja apagado
// el resto de la visita; la optimización sigue valiendo para la carga inicial,
// que es para lo que existe.
export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  document.documentElement.classList.add("cv-off");
  // Sin `behavior`: toma el `scroll-behavior` de globals.css, que ya respeta
  // prefers-reduced-motion.
  el.scrollIntoView();
  return true;
}
