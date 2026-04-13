export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  cta: string;
  ctaPrefilledMessage: string;
}

export const services: Service[] = [
  {
    id: "venta",
    name: "Venta de Grúas Horquillas",
    description:
      "Equipos nuevos HELI con tecnología de punta. Grúas eléctricas, combustión e hidrógeno verde con financiamiento flexible.",
    icon: "ShoppingCart",
    features: [
      "Equipos nuevos certificados",
      "Múltiples categorías y tonelajes",
      "Financiamiento flexible",
      "Asesoría personalizada",
    ],
    cta: "Cotizar equipo",
    ctaPrefilledMessage: "Comprar grúa horquilla",
  },
  {
    id: "arriendo",
    name: "Arriendo de Equipos",
    description:
      "Arriendo de grúas horquillas a corto y largo plazo, con o sin operador. Entrega rápida en todo Chile.",
    icon: "Clock",
    features: [
      "Corto y largo plazo",
      "Con o sin operador",
      "Entrega en 24 horas",
      "Cobertura nacional",
    ],
    cta: "Solicitar arriendo",
    ctaPrefilledMessage: "Arrendar grúa horquilla",
  },
  {
    id: "servicio-tecnico",
    name: "Servicio Técnico",
    description:
      "Técnicos certificados y experimentados en todos los tipos de montacargas. Mantención preventiva y correctiva.",
    icon: "Wrench",
    features: [
      "Mantención preventiva y correctiva",
      "Técnicos certificados HELI",
      "Repuestos originales incluidos",
      "Cobertura nacional 24/7",
    ],
    cta: "Agendar servicio",
    ctaPrefilledMessage: "Servicio técnico",
  },
  {
    id: "repuestos",
    name: "Repuestos Originales",
    description:
      "Stock permanente de repuestos originales HELI y lubricantes autorizados. Envío a todo Chile.",
    icon: "Cog",
    features: [
      "Stock permanente",
      "100% originales certificados",
      "Lubricantes autorizados",
      "Envío a todo Chile",
    ],
    cta: "Consultar disponibilidad",
    ctaPrefilledMessage: "Repuestos",
  },
  {
    id: "usados",
    name: "Equipos Usados",
    description:
      "Compra, venta y retoma de equipos usados multimarca. Todos testeados y con mantención al día.",
    icon: "RefreshCw",
    features: [
      "Retoma: tu equipo como pie",
      "Comercialización de tu equipo",
      "Multimarca disponible",
      "Equipos testeados y mantenidos",
    ],
    cta: "Ver equipos usados",
    ctaPrefilledMessage: "Equipos usados",
  },
];
