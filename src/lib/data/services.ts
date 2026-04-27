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
    id: "arriendo",
    slug: "arriendo",
    name: "Arriendo de Equipos",
    description:
      "Arriendo de grúas horquillas a corto y largo plazo, con o sin operador. Entrega rápida en todo Chile.",
    icon: "Clock",
    image: "/assets/legacy/products/h3-series-1-3.5t-combustion.jpg",
    heroSubtitle:
      "Flota disponible inmediatamente. Sin inversión inicial, sin costos de mantenimiento. Tú operas, nosotros nos encargamos del resto.",
    features: [
      "Corto y largo plazo",
      "Con o sin operador",
      "Entrega en 24 horas",
      "Cobertura nacional",
    ],
    cta: "Solicitar arriendo",
    ctaPrefilledMessage: "Arrendar grúa horquilla",
    sections: [
      {
        title: "Flexibilidad total",
        content:
          "Ofrecemos arriendos desde 1 día hasta varios años. Ideal para proyectos puntuales, períodos peak de producción, reemplazo durante mantenciones, o como alternativa permanente a la compra. Tarifas diarias, semanales y mensuales con descuentos progresivos.",
      },
      {
        title: "Mantención incluida",
        content:
          "Todos nuestros arriendos incluyen mantención preventiva, repuestos consumibles y atención de emergencias 24/7. Si tu equipo falla, te lo cambiamos en menos de 24 horas. Tú solo te preocupas de operar.",
      },
      {
        title: "Operador certificado opcional",
        content:
          "Si lo necesitas, te enviamos un operador certificado HELI con experiencia comprobada. Cumple con todas las normativas de seguridad chilenas y trae su propia certificación vigente.",
      },
    ],
    benefits: [
      { title: "24h", description: "Entrega rápida" },
      { title: "0 mantención", description: "Todo incluido" },
      { title: "Sin inversión", description: "Solo pagas el uso" },
      { title: "24/7", description: "Soporte continuo" },
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
  {
    id: "usados",
    slug: "usados",
    name: "Equipos Usados",
    description:
      "Compra, venta y retoma de equipos usados multimarca. Todos testeados y con mantención al día.",
    icon: "RefreshCw",
    image: "/assets/legacy/products/g3-series-2-3.5t-gas.jpg",
    heroSubtitle:
      "Equipos usados certificados con mantención al día. Una alternativa económica con la confianza de HELI Chile.",
    features: [
      "Retoma: tu equipo como pie",
      "Comercialización de tu equipo",
      "Multimarca disponible",
      "Equipos testeados y mantenidos",
    ],
    cta: "Ver equipos usados",
    ctaPrefilledMessage: "Equipos usados",
    sections: [
      {
        title: "Compra de equipos usados",
        content:
          "Adquirimos tu grúa horquilla usada al mejor precio del mercado. Realizamos una evaluación técnica completa y te entregamos una oferta justa. También aceptamos retoma como parte de pago para equipos nuevos, lo que te permite renovar tu flota con menor inversión.",
      },
      {
        title: "Venta de usados certificados",
        content:
          "Todos nuestros equipos usados pasan por un proceso riguroso de inspección, mantención y certificación antes de ser comercializados. Reciben los repuestos necesarios, lubricantes nuevos y son testeados bajo carga. Incluyen garantía limitada y respaldo postventa.",
      },
      {
        title: "Comercialización por consignación",
        content:
          "¿Tienes equipos que ya no usas? Te ayudamos a venderlos. Los exhibimos en nuestras sucursales, los promocionamos en nuestros canales digitales y los presentamos a nuestra cartera de clientes. Tú fijas el precio mínimo, nosotros gestionamos toda la operación.",
      },
    ],
    benefits: [
      { title: "Multimarca", description: "Todas las marcas" },
      { title: "Testeados", description: "Inspección completa" },
      { title: "Garantía", description: "Respaldo HELI Chile" },
      { title: "Retoma", description: "Tu equipo como pie" },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
