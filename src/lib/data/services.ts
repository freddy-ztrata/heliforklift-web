export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  cta: string;
  ctaPrefilledMessage: string;
  /** Slug used for /servicios/[slug] page */
  slug: string;
  /** Hero subtitle on the detail page */
  heroSubtitle: string;
  /** Long-form content blocks for the detail page */
  sections: { title: string; content: string }[];
  /** Optional benefits for an additional grid */
  benefits?: { title: string; description: string }[];
  /** Stats to highlight */
  stats?: { value: string; label: string }[];
  /** Image to show in the detail page */
  image: string;
}

export const services: Service[] = [
  {
    id: "venta",
    slug: "venta",
    name: "Venta de Grúas Horquillas",
    description:
      "Equipos nuevos HELI con tecnología de punta. Grúas eléctricas, combustión e hidrógeno verde con financiamiento flexible.",
    icon: "ShoppingCart",
    image: "/assets/legacy/products/g-series-1-3.5t-electric.jpg",
    heroSubtitle:
      "Equipos nuevos HELI directos del fabricante. Asesoría experta para encontrar la grúa perfecta para tu operación.",
    features: [
      "Equipos nuevos certificados",
      "Múltiples categorías y tonelajes",
      "Financiamiento flexible",
      "Asesoría personalizada",
    ],
    cta: "Cotizar equipo",
    ctaPrefilledMessage: "Comprar grúa horquilla",
    sections: [
      {
        title: "Equipos para cada necesidad",
        content:
          "Ofrecemos la línea completa de grúas horquillas HELI: eléctricas para operaciones internas con cero emisiones, combustión para trabajos exigentes en exteriores, hidrógeno verde para empresas comprometidas con la sostenibilidad, y equipos especializados como reach trucks, transpaletas, apiladores y manipuladores telescópicos. Capacidades desde 800 kg hasta 46 toneladas.",
      },
      {
        title: "Financiamiento a tu medida",
        content:
          "Trabajamos con las principales instituciones financieras del país para ofrecerte planes de financiamiento flexibles: leasing operativo, leasing financiero, crédito directo o pago al contado con descuento. Nuestro equipo te asesora en la mejor estructura según tu flujo de caja.",
      },
      {
        title: "Garantía y respaldo",
        content:
          "Todos nuestros equipos incluyen garantía oficial HELI con cobertura nacional. Como distribuidor exclusivo en Chile, garantizamos repuestos originales, servicio técnico certificado y entrenamiento para tus operadores.",
      },
    ],
    benefits: [
      { title: "+1.100", description: "Equipos vendidos en Chile" },
      { title: "12 categorías", description: "Línea completa de productos" },
      { title: "Garantía oficial", description: "Respaldo HELI nacional" },
      { title: "Financiamiento", description: "Hasta 60 meses" },
    ],
  },
  {
    id: "servicio-tecnico",
    slug: "servicio-tecnico",
    name: "Servicio Técnico",
    description:
      "Técnicos certificados y experimentados en todos los tipos de montacargas. Mantención preventiva y correctiva.",
    icon: "Wrench",
    image: "/assets/legacy/products/k2-series-2-3.5t-combustion.jpg",
    heroSubtitle:
      "Técnicos certificados HELI con cobertura nacional. Mantención preventiva, correctiva y emergencias 24/7 para mantener tu operación siempre activa.",
    features: [
      "Mantención preventiva y correctiva",
      "Técnicos certificados HELI",
      "Repuestos originales incluidos",
      "Cobertura nacional 24/7",
    ],
    cta: "Agendar servicio",
    ctaPrefilledMessage: "Servicio técnico",
    sections: [
      {
        title: "Mantención preventiva programada",
        content:
          "Plan de mantención periódica diseñado por el fabricante para preservar la vida útil de tu equipo. Cambio de aceites, filtros, revisión de sistemas hidráulicos, eléctricos y mecánicos según las horas de operación. Te ayudamos a programar las mantenciones para que tu operación nunca se detenga.",
      },
      {
        title: "Reparaciones y emergencias",
        content:
          "Equipo técnico disponible 24/7 para emergencias en todo Chile. Diagnóstico remoto inicial, despacho de técnico certificado en las regiones donde operamos, repuestos originales en stock para reparaciones rápidas. Promedio de respuesta en zona central: menos de 4 horas.",
      },
      {
        title: "Contratos de servicio",
        content:
          "Ofrecemos contratos de mantención anual con tarifas preferenciales, atención prioritaria y SLA garantizados. Ideal para empresas con flotas de equipos. Te entregamos reportes mensuales del estado de cada equipo.",
      },
    ],
    benefits: [
      { title: "24/7", description: "Atención de emergencias" },
      { title: "Certificados", description: "Técnicos HELI oficiales" },
      { title: "Originales", description: "Solo repuestos HELI" },
      { title: "Nacional", description: "Cobertura todo Chile" },
    ],
  },
  {
    id: "repuestos",
    slug: "repuestos",
    name: "Repuestos Originales",
    description:
      "Stock permanente de repuestos originales HELI y lubricantes autorizados. Envío a todo Chile.",
    icon: "Cog",
    image: "/assets/legacy/products/g3-series-5-10t-combustion.jpg",
    heroSubtitle:
      "Repuestos originales HELI con disponibilidad inmediata. Mantén tu equipo operando con la garantía del fabricante.",
    features: [
      "Stock permanente",
      "100% originales certificados",
      "Lubricantes autorizados",
      "Envío a todo Chile",
    ],
    cta: "Consultar disponibilidad",
    ctaPrefilledMessage: "Repuestos",
    sections: [
      {
        title: "Por qué repuestos originales",
        content:
          "Los repuestos genéricos pueden parecer más baratos al inicio, pero comprometen el rendimiento, reducen la vida útil del equipo y anulan la garantía. Los repuestos originales HELI están diseñados específicamente para tu modelo, garantizan el desempeño óptimo y mantienen vigente la garantía del fabricante.",
      },
      {
        title: "Stock disponible",
        content:
          "Mantenemos un inventario permanente de los repuestos más rotativos: filtros, baterías, ruedas, mástiles, cadenas, cilindros, bombas hidráulicas, controladores eléctricos, y todos los consumibles. Lo que no esté en stock, lo importamos en plazos cortos directamente desde fábrica.",
      },
      {
        title: "Lubricantes y consumibles",
        content:
          "Aceites hidráulicos, aceites de motor, líquidos de freno y refrigerantes autorizados por HELI. Usar lubricantes certificados es crítico para preservar la garantía y maximizar el rendimiento de tu equipo.",
      },
    ],
    benefits: [
      { title: "Stock", description: "Disponibilidad inmediata" },
      { title: "100%", description: "Originales certificados" },
      { title: "Envío", description: "A todo Chile" },
      { title: "Garantía", description: "Del fabricante HELI" },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
