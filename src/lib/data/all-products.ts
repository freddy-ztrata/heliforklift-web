// =============================================================================
// ALL PRODUCTS DATABASE — Helifork Lift (HELI Chile)
// Comprehensive product catalog with real specs and image paths.
// =============================================================================

export interface FullProduct {
  id: string;
  name: string;
  model?: string;
  category: string;
  categorySlug: string;
  type: string;
  capacityRange: string;
  heightRange?: string;
  power: string;
  image: string;
  features?: string[];
  description?: string;
  slug: string;
}

// ---------------------------------------------------------------------------
// Image base path
// ---------------------------------------------------------------------------
const IMG = "/assets/legacy/products";

// =============================================================================
// 1. GRUAS ELECTRICAS (Electric Forklifts)
// =============================================================================
export const electricForklifts: FullProduct[] = [
  {
    id: "g-series-1-3.5t-electric",
    name: "G Series 1-3.5 TON Electrica",
    model: "CPD10-35-GC2/GC6",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "1,000 - 3,500 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Electrica (Litio-ion 80V)",
    image: `${IMG}/g-series-1-3.5t-electric.jpg`,
    features: [
      "Motor AC de alto rendimiento",
      "Bateria de litio integrada",
      "Cero emisiones",
      "Pantalla LCD multifuncion",
      "Regeneracion de energia en frenado",
    ],
    description:
      "Grua horquilla electrica de la Serie G con capacidades de 1 a 3.5 toneladas. Disenada para operaciones intensivas en bodega con tecnologia de litio de ultima generacion.",
    slug: "g-series-electrica-1-3.5-ton",
  },
  {
    id: "g-series-1.5-2t-electric",
    name: "G Series 1.5-2 TON Electrica",
    model: "CPD15-20-GC1",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "1,500 - 2,000 kg",
    heightRange: "3,000 - 5,500 mm",
    power: "Electrica (Litio-ion 48V)",
    image: `${IMG}/g-series-1.5-2t-electric.jpg`,
    features: [
      "Compacta y maniobrable",
      "Bateria de litio de carga rapida",
      "Bajo costo operativo",
      "Ideal para pasillos estrechos",
    ],
    description:
      "Grua electrica compacta de la Serie G para capacidades de 1.5 a 2 toneladas. Perfecta para operaciones en espacios reducidos con maxima eficiencia energetica.",
    slug: "g-series-electrica-1.5-2-ton",
  },
  {
    id: "g-series-1.25-1.5t-three-wheel",
    name: "G Series 1.25-1.5 TON Tres Ruedas",
    model: "CPD12-15-ET",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "1,250 - 1,500 kg",
    heightRange: "3,000 - 4,800 mm",
    power: "Electrica (Litio-ion 48V)",
    image: `${IMG}/g-series-1.25-1.5t-electric.jpg`,
    features: [
      "Configuracion de 3 ruedas",
      "Radio de giro ultra reducido",
      "Ideal para pasillos angostos",
      "Silenciosa",
    ],
    description:
      "Grua electrica de tres ruedas, Serie G. Su radio de giro reducido la hace ideal para operaciones en espacios muy limitados y pasillos angostos.",
    slug: "g-series-electrica-tres-ruedas-1.25-1.5-ton",
  },
  {
    id: "g2-series-1.3-1.5t-electric",
    name: "G2 Series 1.3-1.5 TON Electrica",
    model: "CPD13-15-GD2",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "1,300 - 1,500 kg",
    heightRange: "3,000 - 4,500 mm",
    power: "Electrica (Litio-ion 48V)",
    image: `${IMG}/g2-series-1.3-1.5t-electric.png`,
    features: [
      "Segunda generacion G2",
      "Mayor eficiencia energetica",
      "Sistema de diagnostico CAN bus",
      "Ergonomia mejorada",
    ],
    description:
      "La Serie G2 de segunda generacion ofrece mejoras significativas en eficiencia y ergonomia para capacidades de 1.3 a 1.5 toneladas.",
    slug: "g2-series-electrica-1.3-1.5-ton",
  },
  {
    id: "g2-series-4-5t-alto-voltaje",
    name: "G2 Series 4-5 TON Alto Voltaje",
    model: "CPD40-50-GD2-HV",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "4,000 - 5,000 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Electrica (Alto Voltaje 96V)",
    image: `${IMG}/g2-series-4-5t-alto-voltaje.png`,
    features: [
      "Alto voltaje 96V",
      "Potencia equivalente a combustion",
      "Bateria de litio de gran capacidad",
      "Cero emisiones con maxima fuerza",
    ],
    description:
      "Grua electrica de alto voltaje de la Serie G2 con capacidades de 4 a 5 toneladas. Rendimiento comparable a equipos de combustion interna con cero emisiones.",
    slug: "g2-series-electrica-alto-voltaje-4-5-ton",
  },
  {
    id: "g2-series-6-10t-electric",
    name: "G2 Series 6-10 TON Electrica",
    model: "CPD60-100-GD2",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "6,000 - 10,000 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Electrica (Alto Voltaje 96V)",
    image: `${IMG}/g2-series-6-10t-electric.png`,
    features: [
      "Gran tonelaje electrico",
      "Motor AC de alta potencia",
      "Sistema de gestion de bateria BMS",
      "Uso industrial pesado",
    ],
    description:
      "Grua electrica de gran tonelaje Serie G2, de 6 a 10 toneladas. Reemplaza equipos diesel en operaciones pesadas manteniendo cero emisiones.",
    slug: "g2-series-electrica-6-10-ton",
  },
  {
    id: "g3-series-6-7t-electric",
    name: "G3 Series 6-7 TON Electrica",
    model: "CPD60-70-GD3",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "6,000 - 7,000 kg",
    heightRange: "3,000 - 5,500 mm",
    power: "Electrica (Alto Voltaje 96V)",
    image: `${IMG}/g3-series-6-7t-electric.png`,
    features: [
      "Tercera generacion G3",
      "Tecnologia AC de ultima generacion",
      "Eficiencia superior",
      "Menor costo total de propiedad",
    ],
    description:
      "La mas avanzada Serie G3 electrica de 6 a 7 toneladas. Tecnologia de tercera generacion con maxima eficiencia y menor costo de operacion.",
    slug: "g3-series-electrica-6-7-ton",
  },
  {
    id: "g-series-12-18t-electric",
    name: "G Series 12-18 TON Electrica",
    model: "CPD120-180-GC",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "12,000 - 18,000 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Electrica (Alto Voltaje 360V)",
    image: `${IMG}/g-series-12-18t-electric.png`,
    features: [
      "Ultra alto tonelaje electrico",
      "360V de potencia",
      "Para operaciones portuarias e industriales",
      "Tecnologia de punta",
    ],
    description:
      "Grua electrica de ultra alto tonelaje de 12 a 18 toneladas. Disenada para las operaciones mas exigentes con tecnologia electrica de 360V.",
    slug: "g-series-electrica-12-18-ton",
  },
  {
    id: "h4-series-0.8-1.2t-electric",
    name: "H4 Series 0.8-1.2 TON Electrica",
    model: "CPD08-12-H4",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "800 - 1,200 kg",
    heightRange: "2,500 - 4,000 mm",
    power: "Electrica (Litio-ion 48V)",
    image: `${IMG}/h4-series-0.8-1.2t-electric.png`,
    features: [
      "Ultra compacta",
      "Para espacios muy reducidos",
      "Bajo consumo energetico",
      "Mantenimiento minimo",
    ],
    description:
      "Grua electrica ultra compacta Serie H4 de 0.8 a 1.2 toneladas. Ideal para almacenes pequenos y operaciones ligeras en interiores.",
    slug: "h4-series-electrica-0.8-1.2-ton",
  },
  {
    id: "h4-series-1.5-3.8t-electric",
    name: "H4 Series 1.5-3.8 TON Electrica",
    model: "CPD15-38-H4",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "1,500 - 3,800 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Electrica (Litio-ion 80V)",
    image: `${IMG}/h4-series-1.5-3.8t-electric.png`,
    features: [
      "Serie H4 versatil",
      "Amplio rango de capacidades",
      "Diseno ergonomico avanzado",
      "Carga rapida oportunista",
    ],
    description:
      "Grua electrica Serie H4 con rango extendido de 1.5 a 3.8 toneladas. Combina versatilidad y rendimiento para operaciones de mediana intensidad.",
    slug: "h4-series-electrica-1.5-3.8-ton",
  },
  {
    id: "h3-series-explosion-proof",
    name: "H3 Series A Prueba de Explosion",
    model: "CPD-H3-EX",
    category: "Gruas Electricas",
    categorySlug: "gruas-horquillas-electricas",
    type: "Electrica",
    capacityRange: "2,000 - 3,500 kg",
    heightRange: "3,000 - 5,000 mm",
    power: "Electrica (Antiexplosion)",
    image: `${IMG}/h3-series-explosion-proof.png`,
    features: [
      "Certificacion antiexplosion",
      "Para ambientes peligrosos",
      "Industria quimica y petroquimica",
      "Maxima seguridad",
    ],
    description:
      "Grua electrica a prueba de explosion Serie H3. Certificada para operaciones en ambientes con gases o polvos inflamables. Ideal para industria quimica y petroquimica.",
    slug: "h3-series-electrica-explosion-proof",
  },
];

// =============================================================================
// 2. GRUAS COMBUSTION (Gas / Diesel Forklifts)
// =============================================================================
export const combustionForklifts: FullProduct[] = [
  {
    id: "k2-series-2-3.5t-combustion",
    name: "K2 Series 2-3.5 TON Combustion",
    model: "CPCD20-35-K2",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "2,000 - 3,500 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Diesel / GLP",
    image: `${IMG}/k2-series-2-3.5t-combustion.jpg`,
    features: [
      "Serie K2 de alta confiabilidad",
      "Motor Yanmar / Kubota",
      "Transmision powershift",
      "Bajo consumo de combustible",
    ],
    description:
      "Grua de combustion Serie K2 de 2 a 3.5 toneladas. Motor diesel o GLP con transmision powershift para operaciones exigentes.",
    slug: "k2-series-combustion-2-3.5-ton",
  },
  {
    id: "k2-series-2-3.5t-tier4",
    name: "K2 Series 2-3.5 TON TIER 4-5",
    model: "CPCD20-35-K2-T4",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "2,000 - 3,500 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Diesel TIER 4/5",
    image: `${IMG}/k2-series-2-3.5t-tier4.png`,
    features: [
      "Cumple norma TIER 4/5",
      "Menores emisiones",
      "Motor certificado EPA",
      "Para mercados con regulacion ambiental",
    ],
    description:
      "Grua de combustion Serie K2 certificada TIER 4/5. Cumple con las normas de emision mas exigentes del mercado internacional.",
    slug: "k2-series-combustion-tier4-5-2-3.5-ton",
  },
  {
    id: "g3-series-2-3.5t-gas",
    name: "G3 Series 2-3.5 TON Gas/Diesel",
    model: "CPCD20-35-GD3",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "2,000 - 3,500 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Diesel / GLP",
    image: `${IMG}/g3-series-2-3.5t-gas.jpg`,
    features: [
      "Tercera generacion G3",
      "Mayor confort del operador",
      "Tecnologia Smart",
      "Doble combustible disponible",
    ],
    description:
      "Grua de combustion Serie G3 de tercera generacion. Capacidades de 2 a 3.5 toneladas con opciones diesel y GLP.",
    slug: "g3-series-combustion-2-3.5-ton",
  },
  {
    id: "g3-series-4-5.5t-combustion",
    name: "G3 Series 4-5.5 TON Combustion",
    model: "CPCD40-55-GD3",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "4,000 - 5,500 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Diesel",
    image: `${IMG}/g3-series-4-5.5t-combustion.png`,
    features: [
      "Rango medio-alto de capacidad",
      "Motor diesel de alto torque",
      "Cabina amplia y confortable",
      "Sistema hidraulico de alta eficiencia",
    ],
    description:
      "Grua de combustion Serie G3 de 4 a 5.5 toneladas. Ideal para operaciones que requieren mayor capacidad de carga en ambientes industriales.",
    slug: "g3-series-combustion-4-5.5-ton",
  },
  {
    id: "g3-series-4-5t-gas",
    name: "G3 Series 4-5 TON Gas",
    model: "CPQD40-50-GD3",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "4,000 - 5,000 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "GLP (Gas Licuado)",
    image: `${IMG}/g3-series-4-5t-gas.png`,
    features: [
      "Motor a gas licuado",
      "Menores emisiones que diesel",
      "Uso interior/exterior",
      "Menor costo de combustible",
    ],
    description:
      "Grua a gas licuado Serie G3 de 4 a 5 toneladas. Opcion mas limpia que el diesel para operaciones de mediana capacidad.",
    slug: "g3-series-gas-4-5-ton",
  },
  {
    id: "g3-series-5-10t-combustion",
    name: "G3 Series 5-10 TON Combustion",
    model: "CPCD50-100-GD3",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "5,000 - 10,000 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Diesel",
    image: `${IMG}/g3-series-5-10t-combustion.jpg`,
    features: [
      "Alta capacidad de carga",
      "Motor diesel de alto rendimiento",
      "Estructura reforzada",
      "Para operaciones pesadas",
    ],
    description:
      "Grua de combustion Serie G3 de 5 a 10 toneladas. Robusta y confiable para las operaciones industriales mas exigentes.",
    slug: "g3-series-combustion-5-10-ton",
  },
  {
    id: "g3-series-5-10t-tier5",
    name: "G3 Series 5-10 TON TIER V",
    model: "CPCD50-100-GD3-T5",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "5,000 - 10,000 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Diesel TIER V",
    image: `${IMG}/g3-series-5-10t-tier5.png`,
    features: [
      "Cumple norma TIER V europea",
      "Filtro de particulas DPF",
      "Reduccion catalitica SCR",
      "Maxima eficiencia ambiental",
    ],
    description:
      "Grua de combustion Serie G3 certificada TIER V. De 5 a 10 toneladas con las menores emisiones de su categoria.",
    slug: "g3-series-combustion-tier5-5-10-ton",
  },
  {
    id: "h3-series-2-3.5t-combustion",
    name: "H3 Series 2-3.5 TON Combustion",
    model: "CPCD20-35-H3",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "2,000 - 3,500 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Diesel / GLP",
    image: `${IMG}/h3-series-2-3.5t-combustion.png`,
    features: [
      "Serie H3 economica",
      "Vibracion reducida",
      "Bajo ruido",
      "Excelente relacion precio/rendimiento",
    ],
    description:
      "Grua de combustion Serie H3 de 2 a 3.5 toneladas. Equilibrio ideal entre rendimiento y costo para operaciones estandar.",
    slug: "h3-series-combustion-2-3.5-ton",
  },
  {
    id: "h3-series-1-3.5t-combustion",
    name: "H3 Series 1-3.5 TON Combustion",
    model: "CPCD10-35-H3",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "1,000 - 3,500 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Diesel / GLP",
    image: `${IMG}/h3-series-1-3.5t-combustion.jpg`,
    features: [
      "Amplio rango de capacidades",
      "Motor confiable",
      "Mantenimiento sencillo",
      "Operacion economica",
    ],
    description:
      "Grua de combustion Serie H3 con rango extendido de 1 a 3.5 toneladas. Versatilidad para multiples aplicaciones industriales.",
    slug: "h3-series-combustion-1-3.5-ton",
  },
  {
    id: "ic-forklift-12-13.5t",
    name: "Grua Combustion 12-13.5 TON",
    model: "CPCD120-135",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "12,000 - 13,500 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Diesel",
    image: `${IMG}/ic-forklift-12-13.5t.png`,
    features: [
      "Alto tonelaje",
      "Chasis reforzado",
      "Motor diesel industrial",
      "Para cargas pesadas",
    ],
    description:
      "Grua de combustion de 12 a 13.5 toneladas para operaciones de alto tonelaje. Estructura robusta y motor diesel de gran potencia.",
    slug: "grua-combustion-12-13.5-ton",
  },
  {
    id: "ic-forklift-15-16t",
    name: "Grua Combustion 15-16 TON",
    model: "CPCD150-160",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "15,000 - 16,000 kg",
    heightRange: "3,000 - 5,500 mm",
    power: "Diesel",
    image: `${IMG}/ic-forklift-15-16t.jpg`,
    features: [
      "Gran capacidad de elevacion",
      "Estabilidad superior",
      "Motor Cummins/Isuzu",
      "Transmision automatica",
    ],
    description:
      "Grua de combustion de 15 a 16 toneladas. Disenada para operaciones portuarias, siderurgicas y de construccion pesada.",
    slug: "grua-combustion-15-16-ton",
  },
  {
    id: "ic-forklift-20-25t",
    name: "Grua Combustion 20-25 TON",
    model: "CPCD200-250",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "20,000 - 25,000 kg",
    heightRange: "3,000 - 5,000 mm",
    power: "Diesel",
    image: `${IMG}/ic-forklift-20-25t.png`,
    features: [
      "Muy alto tonelaje",
      "Cabina cerrada con A/C",
      "Direccion hidrostatica",
      "Para industria pesada",
    ],
    description:
      "Grua de combustion de 20 a 25 toneladas. Para las operaciones mas pesadas en puertos, mineria e industria siderurgica.",
    slug: "grua-combustion-20-25-ton",
  },
  {
    id: "ic-forklift-28-32t",
    name: "Grua Combustion 28-32 TON",
    model: "CPCD280-320",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "28,000 - 32,000 kg",
    heightRange: "3,000 - 4,500 mm",
    power: "Diesel",
    image: `${IMG}/ic-forklift-28-32t.png`,
    features: [
      "Ultra alto tonelaje",
      "Contrapeso masivo",
      "Motor industrial pesado",
      "Aplicaciones especiales",
    ],
    description:
      "Grua de combustion de 28 a 32 toneladas. Equipamiento especializado para movimiento de cargas ultra pesadas.",
    slug: "grua-combustion-28-32-ton",
  },
  {
    id: "ic-forklift-42-46t",
    name: "Grua Combustion 42-46 TON",
    model: "CPCD420-460",
    category: "Gruas Combustion",
    categorySlug: "gruas-horquillas-combustion",
    type: "Combustion",
    capacityRange: "42,000 - 46,000 kg",
    heightRange: "2,500 - 4,000 mm",
    power: "Diesel",
    image: `${IMG}/ic-forklift-42-46t.png`,
    features: [
      "Maximo tonelaje de la linea",
      "Motor Cummins de alto torque",
      "Para contenedores cargados",
      "Operaciones portuarias pesadas",
    ],
    description:
      "Grua de combustion de 42 a 46 toneladas, la mayor capacidad de la linea HELI. Para operaciones portuarias y manejo de contenedores llenos.",
    slug: "grua-combustion-42-46-ton",
  },
];

// =============================================================================
// 3. GRUAS HIDROGENO VERDE (Hydrogen Fuel Cell Forklifts)
// =============================================================================
export const hydrogenForklifts: FullProduct[] = [
  {
    id: "cpd20-25-hidrogeno",
    name: "CPD20/25/30 Hidrogeno 2-3 TON",
    model: "CPD20-30-FC",
    category: "Gruas Hidrogeno Verde",
    categorySlug: "gruas-hidrogeno-verde",
    type: "Hidrogeno Verde",
    capacityRange: "2,000 - 3,000 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Celda de Combustible H2",
    image: `${IMG}/cpd20-25-hidrogeno.png`,
    features: [
      "Celda de combustible de hidrogeno",
      "Cero emisiones (solo agua)",
      "Recarga en 3 minutos",
      "Operacion continua 24/7",
    ],
    description:
      "Grua de hidrogeno verde de 2 a 3 toneladas. Tecnologia de celda de combustible con recarga ultra rapida y cero emisiones contaminantes.",
    slug: "cpd20-30-hidrogeno-2-3-ton",
  },
  {
    id: "cpd30-35-hidrogeno",
    name: "CPD30/35 Hidrogeno 3-3.5 TON",
    model: "CPD30-35-FC",
    category: "Gruas Hidrogeno Verde",
    categorySlug: "gruas-hidrogeno-verde",
    type: "Hidrogeno Verde",
    capacityRange: "3,000 - 3,500 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Celda de Combustible H2",
    image: `${IMG}/cpd30-35-hidrogeno.png`,
    features: [
      "Mayor capacidad de carga",
      "Tecnologia Fuel Cell avanzada",
      "Sin necesidad de sala de carga",
      "Huella de carbono cero",
    ],
    description:
      "Grua de hidrogeno verde de 3 a 3.5 toneladas. Ideal para operaciones de alta intensidad que requieren cero emisiones y recarga instantanea.",
    slug: "cpd30-35-hidrogeno-3-3.5-ton",
  },
  {
    id: "cpd40-50-hidrogeno",
    name: "CPD40/50 Hidrogeno 4-5 TON",
    model: "CPD40-50-FC",
    category: "Gruas Hidrogeno Verde",
    categorySlug: "gruas-hidrogeno-verde",
    type: "Hidrogeno Verde",
    capacityRange: "4,000 - 5,000 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Celda de Combustible H2",
    image: `${IMG}/cpd40-50-hidrogeno.png`,
    features: [
      "Alto tonelaje con hidrogeno",
      "Rendimiento similar a diesel",
      "Sistema de almacenamiento seguro",
      "Monitoreo remoto",
    ],
    description:
      "Grua de hidrogeno verde de 4 a 5 toneladas. Potencia comparable a los equipos diesel con los beneficios del hidrogeno verde.",
    slug: "cpd40-50-hidrogeno-4-5-ton",
  },
  {
    id: "cpd60-70-hidrogeno",
    name: "CPD60/70 Hidrogeno 6-10 TON",
    model: "CPD60-100-FC",
    category: "Gruas Hidrogeno Verde",
    categorySlug: "gruas-hidrogeno-verde",
    type: "Hidrogeno Verde",
    capacityRange: "6,000 - 10,000 kg",
    heightRange: "3,000 - 6,000 mm",
    power: "Celda de Combustible H2",
    image: `${IMG}/cpd60-70-hidrogeno.png`,
    features: [
      "Gran tonelaje con hidrogeno",
      "Celda de combustible de alta potencia",
      "Para operaciones industriales pesadas",
      "Liderazgo en sostenibilidad",
    ],
    description:
      "Grua de hidrogeno verde de 6 a 10 toneladas. La mayor capacidad disponible en tecnologia Fuel Cell para operaciones industriales pesadas y sostenibles.",
    slug: "cpd60-70-hidrogeno-6-10-ton",
  },
];

// =============================================================================
// 4. GRUAS TODO TERRENO (All Terrain Forklifts)
// =============================================================================
export const allTerrainForklifts: FullProduct[] = [
  {
    id: "g3-5t-todo-terreno",
    name: "G3 5T Todo Terreno",
    model: "CPCD50-RT-G3",
    category: "Gruas Todo Terreno",
    categorySlug: "gruas-horquillas-todo-terreno",
    type: "Todo Terreno",
    capacityRange: "5,000 kg",
    heightRange: "3,000 - 5,500 mm",
    power: "Diesel 4x4",
    image: `${IMG}/g3-5t-todo-terreno.jpg`,
    features: [
      "Traccion 4x4",
      "Neumaticos todo terreno",
      "Chasis reforzado",
      "Para construccion y exteriores",
    ],
    description:
      "Grua todo terreno Serie G3 de 5 toneladas. Traccion en las 4 ruedas y neumaticos especiales para operaciones en terrenos dificiles.",
    slug: "g3-todo-terreno-5-ton",
  },
  {
    id: "g3-series-2-3.5t-todo-terreno",
    name: "G3 Series 2-3.5T Todo Terreno",
    model: "CPCD20-35-RT-G3",
    category: "Gruas Todo Terreno",
    categorySlug: "gruas-horquillas-todo-terreno",
    type: "Todo Terreno",
    capacityRange: "2,000 - 3,500 kg",
    heightRange: "3,000 - 5,000 mm",
    power: "Diesel 4x4",
    image: `${IMG}/g3-series-todo-terreno.png`,
    features: [
      "Compacta todo terreno",
      "Traccion integral",
      "Altura libre al suelo elevada",
      "Ideal para obras y canteras",
    ],
    description:
      "Grua todo terreno Serie G3 de 2 a 3.5 toneladas. Versatil y robusta para operaciones en construccion, canteras y terrenos irregulares.",
    slug: "g3-series-todo-terreno-2-3.5-ton",
  },
];

// =============================================================================
// 5. TRANSPALETAS (Pallet Jacks)
// =============================================================================
export const palletJacks: FullProduct[] = [
  {
    id: "cbd15-20-transpaleta",
    name: "CBD15/20 Transpaleta Electrica",
    model: "CBD15-20",
    category: "Transpaletas",
    categorySlug: "transpaletas",
    type: "Transpaleta Electrica",
    capacityRange: "1,500 - 2,000 kg",
    power: "Electrica (Litio-ion 24V)",
    image: `${IMG}/cbd15-20-transpaleta.png`,
    features: [
      "Operacion de pie",
      "Bateria de litio",
      "Carga rapida",
      "Para pasillos estrechos",
    ],
    description:
      "Transpaleta electrica CBD15/20 de 1.5 a 2 toneladas. Operacion de pie con bateria de litio de carga rapida para movimiento horizontal eficiente.",
    slug: "cbd15-20-transpaleta-electrica",
  },
  {
    id: "cbd20-25-transpaleta",
    name: "CBD20/25 Transpaleta Electrica",
    model: "CBD20-25",
    category: "Transpaletas",
    categorySlug: "transpaletas",
    type: "Transpaleta Electrica",
    capacityRange: "2,000 - 2,500 kg",
    power: "Electrica (Litio-ion 24V)",
    image: `${IMG}/cbd20-25-transpaleta.jpg`,
    features: [
      "Mayor capacidad de carga",
      "Plataforma plegable",
      "Manillar ergonomico",
      "Velocidad regulable",
    ],
    description:
      "Transpaleta electrica CBD20/25 de 2 a 2.5 toneladas. Mayor capacidad para movimiento de pallets pesados en centros de distribucion.",
    slug: "cbd20-25-transpaleta-electrica",
  },
  {
    id: "ctd16-20-transpaleta",
    name: "CTD16/20 Transpaleta Electrica",
    model: "CTD16-20",
    category: "Transpaletas",
    categorySlug: "transpaletas",
    type: "Transpaleta Electrica",
    capacityRange: "1,600 - 2,000 kg",
    power: "Electrica (Litio-ion 24V)",
    image: `${IMG}/ctd16-20-transpaleta.png`,
    features: [
      "Diseno compacto",
      "Control de traccion",
      "Freno electromagnetico",
      "Indicador de bateria LED",
    ],
    description:
      "Transpaleta electrica CTD16/20 de 1.6 a 2 toneladas. Diseno compacto con control de traccion para operaciones agiles.",
    slug: "ctd16-20-transpaleta-electrica",
  },
  {
    id: "ctd16-960h-transpaleta",
    name: "CTD16-960H Transpaleta Horquilla Corta",
    model: "CTD16-960H",
    category: "Transpaletas",
    categorySlug: "transpaletas",
    type: "Transpaleta Electrica",
    capacityRange: "1,600 kg",
    power: "Electrica (Litio-ion 24V)",
    image: `${IMG}/ctd16-960h-transpaleta.png`,
    features: [
      "Horquilla corta 960mm",
      "Para pallets de media medida",
      "Ultra maniobrable",
      "Ideal para retail",
    ],
    description:
      "Transpaleta electrica CTD16-960H con horquilla corta de 960mm. Disenada para pallets de media medida y operaciones en retail.",
    slug: "ctd16-960h-transpaleta-electrica",
  },
];

// =============================================================================
// 6. APILADORES (Stackers)
// =============================================================================
export const stackers: FullProduct[] = [
  {
    id: "ops15-order-picker",
    name: "OPS15 Order Picker",
    model: "OPS15",
    category: "Apiladores",
    categorySlug: "apiladores",
    type: "Order Picker",
    capacityRange: "1,500 kg",
    heightRange: "Hasta 3,000 mm",
    power: "Electrica (24V)",
    image: `${IMG}/ops15-order-picker.png`,
    features: [
      "Preparacion de pedidos",
      "Plataforma elevable",
      "Picking a nivel bajo y medio",
      "Ergonomico",
    ],
    description:
      "Order Picker OPS15 de 1.5 toneladas. Disenado para preparacion de pedidos eficiente con plataforma elevable para picking a distintos niveles.",
    slug: "ops15-order-picker",
  },
  {
    id: "cbs05-apilador",
    name: "CBS05J-D-S Apilador",
    model: "CBS05J-D-S",
    category: "Apiladores",
    categorySlug: "apiladores",
    type: "Apilador Electrico",
    capacityRange: "500 kg",
    heightRange: "Hasta 2,500 mm",
    power: "Electrica (24V)",
    image: `${IMG}/cbs05-apilador.jpg`,
    features: [
      "Apilador ligero",
      "Para cargas pequenas",
      "Facil operacion",
      "Ideal para almacenes pequenos",
    ],
    description:
      "Apilador electrico CBS05 de 500 kg. Compacto y ligero para operaciones de apilamiento en almacenes pequenos y medianos.",
    slug: "cbs05j-d-s-apilador",
  },
  {
    id: "cpd12-apilador-electric",
    name: "CPD12 Apilador Electrico",
    model: "CPD12",
    category: "Apiladores",
    categorySlug: "apiladores",
    type: "Apilador Electrico",
    capacityRange: "1,200 kg",
    heightRange: "Hasta 5,400 mm",
    power: "Electrica (24V)",
    image: `${IMG}/cpd12-apilador-electric.png`,
    features: [
      "Apilamiento a gran altura",
      "Motor AC",
      "Mastil triple",
      "Compacto",
    ],
    description:
      "Apilador electrico CPD12 de 1.2 toneladas. Capacidad de apilamiento a gran altura con mastil triple para almacenamiento vertical eficiente.",
    slug: "cpd12-apilador-electrico",
  },
  {
    id: "cpd16-apilador",
    name: "CPD16 Apilador Electrico",
    model: "CPD16",
    category: "Apiladores",
    categorySlug: "apiladores",
    type: "Apilador Electrico",
    capacityRange: "1,600 kg",
    heightRange: "Hasta 5,600 mm",
    power: "Electrica (24V)",
    image: `${IMG}/cpd16-apilador.jpg`,
    features: [
      "Mayor capacidad",
      "Mastil retractil",
      "Operador de pie",
      "Desplazamiento lateral",
    ],
    description:
      "Apilador electrico CPD16 de 1.6 toneladas. Mayor capacidad de carga con mastil retractil para operaciones versatiles de apilamiento.",
    slug: "cpd16-apilador-electrico",
  },
  {
    id: "cdd06-apilador",
    name: "CDD06 Apilador Peatonal",
    model: "CDD06",
    category: "Apiladores",
    categorySlug: "apiladores",
    type: "Apilador Peatonal",
    capacityRange: "600 kg",
    heightRange: "Hasta 3,000 mm",
    power: "Electrica (24V)",
    image: `${IMG}/cdd06-apilador.jpg`,
    features: [
      "Operacion peatonal",
      "Ultra compacto",
      "Bajo costo",
      "Facil mantenimiento",
    ],
    description:
      "Apilador peatonal CDD06 de 600 kg. Operacion a pie ultra compacta para almacenes con espacio limitado.",
    slug: "cdd06-apilador-peatonal",
  },
  {
    id: "cdd15j-apilador",
    name: "CDD15J Apilador Electrico",
    model: "CDD15J",
    category: "Apiladores",
    categorySlug: "apiladores",
    type: "Apilador Electrico",
    capacityRange: "1,500 kg",
    heightRange: "Hasta 5,500 mm",
    power: "Electrica (24V)",
    image: `${IMG}/cdd15j-apilador.jpg`,
    features: [
      "Apilador versatil",
      "Mastil de alta elevacion",
      "Horquillas ajustables",
      "Pantalla de diagnostico",
    ],
    description:
      "Apilador electrico CDD15J de 1.5 toneladas. Versatil con mastil de alta elevacion para operaciones de almacenamiento intensivo.",
    slug: "cdd15j-apilador-electrico",
  },
  {
    id: "cdd16-20jk-apilador",
    name: "CDD16-20JK Apilador Electrico",
    model: "CDD16-20JK",
    category: "Apiladores",
    categorySlug: "apiladores",
    type: "Apilador Electrico",
    capacityRange: "1,600 - 2,000 kg",
    heightRange: "Hasta 6,000 mm",
    power: "Electrica (24V)",
    image: `${IMG}/cdd16-20jk-apilador.jpg`,
    features: [
      "Alta capacidad",
      "Elevacion hasta 6m",
      "Operador de pie/sentado",
      "Control proporcional",
    ],
    description:
      "Apilador electrico CDD16-20JK de 1.6 a 2 toneladas. Alcanza hasta 6 metros de altura con control proporcional para posicionamiento preciso.",
    slug: "cdd16-20jk-apilador-electrico",
  },
];

// =============================================================================
// 7. REACH TRUCK
// =============================================================================
export const reachTrucks: FullProduct[] = [
  {
    id: "g-series-reach-truck",
    name: "G Series Reach Truck 1.5-2.0 TON",
    model: "CQD15-20-GC",
    category: "Reach Truck",
    categorySlug: "reach-truck",
    type: "Reach Truck",
    capacityRange: "1,500 - 2,000 kg",
    heightRange: "Hasta 12,000 mm",
    power: "Electrica (48V)",
    image: `${IMG}/g-series-reach-truck.png`,
    features: [
      "Mastil retractil",
      "Hasta 12m de elevacion",
      "Para pasillos angostos",
      "Camara de altura",
    ],
    description:
      "Reach Truck Serie G de 1.5 a 2 toneladas. Mastil retractil que alcanza hasta 12 metros de altura, ideal para racks de gran altitud en bodegas.",
    slug: "g-series-reach-truck-1.5-2-ton",
  },
  {
    id: "g2-series-reach-truck-1.6-2t",
    name: "G2 Series Reach Truck 1.6-2 TON",
    model: "CQD16-20-GD2",
    category: "Reach Truck",
    categorySlug: "reach-truck",
    type: "Reach Truck",
    capacityRange: "1,600 - 2,000 kg",
    heightRange: "Hasta 12,500 mm",
    power: "Electrica (48V)",
    image: `${IMG}/g2-series-reach-truck-1.6-2t.jpg`,
    features: [
      "Segunda generacion G2",
      "Pantalla a color HD",
      "Control joystick integrado",
      "Sensor de inclinacion",
    ],
    description:
      "Reach Truck Serie G2 de 1.6 a 2 toneladas. Segunda generacion con pantalla HD y joystick integrado para maxima precision en altura.",
    slug: "g2-series-reach-truck-1.6-2-ton",
  },
  {
    id: "g2-series-reach-truck-2-2.5t",
    name: "G2 Series Reach Truck 2-2.5 TON",
    model: "CQD20-25-GD2",
    category: "Reach Truck",
    categorySlug: "reach-truck",
    type: "Reach Truck",
    capacityRange: "2,000 - 2,500 kg",
    heightRange: "Hasta 11,500 mm",
    power: "Electrica (48V)",
    image: `${IMG}/g2-series-reach-truck-2-2.5t.jpg`,
    features: [
      "Mayor capacidad de carga",
      "Estabilidad mejorada",
      "Asistente de nivelacion",
      "Para pallets pesados",
    ],
    description:
      "Reach Truck Serie G2 de 2 a 2.5 toneladas. Mayor capacidad para pallets pesados con sistema de estabilidad mejorada y asistente de nivelacion.",
    slug: "g2-series-reach-truck-2-2.5-ton",
  },
];

// =============================================================================
// 8. MANIPULADORES TELESCOPICOS (Telehandlers)
// =============================================================================
export const telehandlers: FullProduct[] = [
  {
    id: "telehandler-40h130-170s",
    name: "Manipulador Telescopico 40H130-170S",
    model: "40H130-170S",
    category: "Manipuladores Telescopicos",
    categorySlug: "manipuladores-telescopicos",
    type: "Manipulador Telescopico",
    capacityRange: "4,000 kg",
    heightRange: "Hasta 17,000 mm",
    power: "Diesel",
    image: `${IMG}/telehandler-40h130-170s.jpg`,
    features: [
      "Brazo telescopico extensible",
      "Alcance hasta 17m",
      "Multiples accesorios",
      "Para construccion y logistica",
    ],
    description:
      "Manipulador telescopico 40H130-170S de 4 toneladas con alcance de hasta 17 metros. Versatil con multiples accesorios para construccion y logistica.",
    slug: "manipulador-telescopico-40h130-170s",
  },
];

// =============================================================================
// 9. PORTA CONTENEDORES (Container Handlers & Reachstackers)
// =============================================================================
export const containerHandlers: FullProduct[] = [
  {
    id: "cpcd250-porta-contenedor",
    name: "CPCD250EC Porta Contenedor",
    model: "CPCD250EC",
    category: "Porta Contenedores",
    categorySlug: "porta-contenedores",
    type: "Porta Contenedor",
    capacityRange: "25,000 kg",
    heightRange: "Hasta 6,000 mm",
    power: "Diesel",
    image: `${IMG}/cpcd250-porta-contenedor.png`,
    features: [
      "Manejo de contenedores llenos",
      "Spreader integrado",
      "Cabina elevada con visibilidad 360 grados",
      "Para operaciones portuarias",
    ],
    description:
      "Porta contenedor CPCD250EC de 25 toneladas. Disenado para manejar contenedores llenos en terminales portuarios con spreader integrado.",
    slug: "cpcd250ec-porta-contenedor",
  },
  {
    id: "cpcd180-porta-contenedor",
    name: "CPCD180EC Porta Contenedor",
    model: "CPCD180EC",
    category: "Porta Contenedores",
    categorySlug: "porta-contenedores",
    type: "Porta Contenedor",
    capacityRange: "18,000 kg",
    heightRange: "Hasta 5,500 mm",
    power: "Diesel",
    image: `${IMG}/container-handler-cpcd180ec.png`,
    features: [
      "Manejo de contenedores vacios y semi-cargados",
      "Sistema hidraulico de alta presion",
      "Cabina con A/C y calefaccion",
      "Operacion portuaria",
    ],
    description:
      "Porta contenedor CPCD180EC de 18 toneladas. Para manejo de contenedores vacios y semi-cargados en terminales y depositos.",
    slug: "cpcd180ec-porta-contenedor",
  },
  {
    id: "reachstacker-rsh4527",
    name: "Reachstacker RSH4527-31",
    model: "RSH4527-31",
    category: "Porta Contenedores",
    categorySlug: "porta-contenedores",
    type: "Reachstacker",
    capacityRange: "45,000 kg",
    heightRange: "Hasta 15,100 mm",
    power: "Diesel",
    image: `${IMG}/reachstacker-rsh4527-31.jpeg`,
    features: [
      "Apilamiento de contenedores 5+1",
      "Brazo telescopico",
      "Spreader rotativo 360 grados",
      "Para terminales de contenedores",
    ],
    description:
      "Reachstacker RSH4527-31 de 45 toneladas. Apila contenedores hasta 5+1 de altura con brazo telescopico y spreader rotativo para terminales portuarios.",
    slug: "reachstacker-rsh4527-31",
  },
  {
    id: "reachstacker-rsh4528",
    name: "Reachstacker RSH4528-32/36",
    model: "RSH4528-32/36",
    category: "Porta Contenedores",
    categorySlug: "porta-contenedores",
    type: "Reachstacker",
    capacityRange: "45,000 kg",
    heightRange: "Hasta 18,200 mm",
    power: "Diesel",
    image: `${IMG}/reachstacker-rsh4528-32-36.png`,
    features: [
      "Apilamiento de contenedores 6+1",
      "Mayor alcance lateral",
      "Cabina elevada premium",
      "Sistema anti-balanceo",
    ],
    description:
      "Reachstacker RSH4528-32/36 de 45 toneladas con mayor alcance. Apila contenedores hasta 6+1 de altura para terminales de alta capacidad.",
    slug: "reachstacker-rsh4528-32-36",
  },
];

// =============================================================================
// 10. TRACTORES DE TIRO (Tow Tractors)
// =============================================================================
export const towTractors: FullProduct[] = [
  {
    id: "qyd-tractor-electrico-80-150",
    name: "QYD80-150 Tractor Electrico",
    model: "QYD80-150",
    category: "Tractores de Tiro",
    categorySlug: "tractores-de-tiro",
    type: "Tractor de Tiro Electrico",
    capacityRange: "8,000 - 15,000 kg (arrastre)",
    power: "Electrica (80V)",
    image: `${IMG}/qyd-tractor-electrico.jpg`,
    features: [
      "Gran capacidad de arrastre",
      "Motor electrico AC",
      "Para lineas de produccion",
      "Operacion silenciosa",
    ],
    description:
      "Tractor de tiro electrico QYD80-150 con capacidad de arrastre de 8 a 15 toneladas. Ideal para lineas de produccion y logistica interna.",
    slug: "qyd80-150-tractor-electrico",
  },
  {
    id: "qyd15-60s-tractor",
    name: "G Series QYD15-60S Tractor",
    model: "QYD15-60S",
    category: "Tractores de Tiro",
    categorySlug: "tractores-de-tiro",
    type: "Tractor de Tiro Electrico",
    capacityRange: "1,500 - 6,000 kg (arrastre)",
    power: "Electrica (48V)",
    image: `${IMG}/qyd15-60s-tractor.jpg`,
    features: [
      "Serie G compacta",
      "Maniobrable",
      "Acople automatico",
      "Bateria de litio opcional",
    ],
    description:
      "Tractor de tiro electrico Serie G QYD15-60S. Compacto y maniobrable con capacidad de arrastre de 1.5 a 6 toneladas.",
    slug: "g-series-qyd15-60s-tractor",
  },
  {
    id: "qyd20-30-45s-tractor",
    name: "QYD20-30-45S Tractor Electrico",
    model: "QYD20-30-45S",
    category: "Tractores de Tiro",
    categorySlug: "tractores-de-tiro",
    type: "Tractor de Tiro Electrico",
    capacityRange: "2,000 - 4,500 kg (arrastre)",
    power: "Electrica (48V)",
    image: `${IMG}/qyd20-30-45s-tractor.jpg`,
    features: [
      "Rango medio de arrastre",
      "Conduccion sentado",
      "Direccion electrica",
      "Freno regenerativo",
    ],
    description:
      "Tractor de tiro electrico QYD20-30-45S con capacidad de arrastre de 2 a 4.5 toneladas. Operacion sentado con direccion electrica asistida.",
    slug: "qyd20-30-45s-tractor-electrico",
  },
  {
    id: "qyd20-70-tractor",
    name: "QYD20-70 Tractor Electrico",
    model: "QYD20-70",
    category: "Tractores de Tiro",
    categorySlug: "tractores-de-tiro",
    type: "Tractor de Tiro Electrico",
    capacityRange: "2,000 - 7,000 kg (arrastre)",
    power: "Electrica (48V/80V)",
    image: `${IMG}/qyd20-70-tractor.jpg`,
    features: [
      "Versatilidad de arrastre",
      "Plataforma de operador amplia",
      "Control de velocidad variable",
      "Para industria automotriz",
    ],
    description:
      "Tractor de tiro electrico QYD20-70 con capacidad de arrastre de 2 a 7 toneladas. Versatil para industria automotriz y lineas de ensamblaje.",
    slug: "qyd20-70-tractor-electrico",
  },
  {
    id: "qyd50-60-100-tractor",
    name: "QYD50-60-100 Tractor Electrico",
    model: "QYD50-60-100",
    category: "Tractores de Tiro",
    categorySlug: "tractores-de-tiro",
    type: "Tractor de Tiro Electrico",
    capacityRange: "5,000 - 10,000 kg (arrastre)",
    power: "Electrica (80V)",
    image: `${IMG}/qyd50-60-100-tractor.jpg`,
    features: [
      "Alto arrastre electrico",
      "Motor AC potente",
      "Cabina con proteccion",
      "Uso industrial pesado",
    ],
    description:
      "Tractor de tiro electrico QYD50-60-100 con capacidad de arrastre de 5 a 10 toneladas. Para logistica industrial y centros de distribucion de gran escala.",
    slug: "qyd50-60-100-tractor-electrico",
  },
  {
    id: "qycd35-50-tractor-combustion",
    name: "QYCD35-50 Tractor Combustion",
    model: "QYCD35-50",
    category: "Tractores de Tiro",
    categorySlug: "tractores-de-tiro",
    type: "Tractor de Tiro Combustion",
    capacityRange: "3,500 - 5,000 kg (arrastre)",
    power: "Diesel / GLP",
    image: `${IMG}/qycd35-50-tractor-combustion.jpg`,
    features: [
      "Motor de combustion",
      "Para uso exterior",
      "Alta resistencia",
      "Operacion continua",
    ],
    description:
      "Tractor de tiro a combustion QYCD35-50 con capacidad de arrastre de 3.5 a 5 toneladas. Para operaciones en exteriores y largas distancias.",
    slug: "qycd35-50-tractor-combustion",
  },
  {
    id: "g2-series-qycd20-30-tractor",
    name: "G2 Series QYCD20-30 Tractor",
    model: "QYCD20-30-GD2",
    category: "Tractores de Tiro",
    categorySlug: "tractores-de-tiro",
    type: "Tractor de Tiro Combustion",
    capacityRange: "2,000 - 3,000 kg (arrastre)",
    power: "Diesel / GLP",
    image: `${IMG}/g2-series-qycd20-30-tractor.jpg`,
    features: [
      "Serie G2 combustion",
      "Compacto y potente",
      "Para patio y exterior",
      "Mantenimiento sencillo",
    ],
    description:
      "Tractor de tiro a combustion Serie G2 QYCD20-30 con capacidad de 2 a 3 toneladas de arrastre. Compacto para operaciones en patio.",
    slug: "g2-series-qycd20-30-tractor-combustion",
  },
];

// =============================================================================
// 11. PLATAFORMAS ELEVADORAS (Aerial Work Platforms)
// =============================================================================
export const platforms: FullProduct[] = [
  {
    id: "js07-plataforma",
    name: "JS07 Plataforma Elevadora Tipo Tijera",
    model: "JS07",
    category: "Plataformas Elevadoras",
    categorySlug: "plataformas-elevadoras",
    type: "Plataforma Elevadora",
    capacityRange: "230 kg (personas + herramientas)",
    heightRange: "Hasta 7,800 mm",
    power: "Electrica (24V)",
    image: `${IMG}/platform-js07.jpg`,
    features: [
      "Tipo tijera electrica",
      "Para trabajo en altura",
      "Plataforma extensible",
      "Seguridad certificada",
    ],
    description:
      "Plataforma elevadora tipo tijera JS07 con altura de trabajo de hasta 7.8 metros. Electrica y silenciosa para trabajo en interiores.",
    slug: "js07-plataforma-elevadora-tijera",
  },
];

// =============================================================================
// 12. ACCESORIOS (Accessories / Attachments)
// =============================================================================
export const accessories: FullProduct[] = [
  {
    id: "accessory-side-shifter",
    name: "Side Shifter (Desplazador Lateral)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo de grua",
    power: "Hidraulico",
    image: `${IMG}/accessory-side-shifter.jpg`,
    features: [
      "Desplazamiento lateral de horquillas",
      "Posicionamiento preciso de carga",
      "Compatible con todas las gruas HELI",
    ],
    description:
      "Desplazador lateral hidraulico para posicionamiento preciso de la carga sin necesidad de mover la grua completa.",
    slug: "side-shifter-desplazador-lateral",
  },
  {
    id: "accessory-side-shifter-lc",
    name: "Side Shifter LC (Gran Capacidad)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Para gruas de alto tonelaje",
    power: "Hidraulico",
    image: `${IMG}/accessory-side-shifter-lc.jpg`,
    features: [
      "Para cargas pesadas",
      "Mayor recorrido lateral",
      "Construccion reforzada",
    ],
    description:
      "Desplazador lateral de gran capacidad para gruas de alto tonelaje. Mayor recorrido y construccion reforzada.",
    slug: "side-shifter-lc-gran-capacidad",
  },
  {
    id: "accessory-fork-clamp",
    name: "Pinza para Horquillas (Fork Clamp)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-fork-clamp.jpg`,
    features: [
      "Sujecion de carga sin pallets",
      "Apertura ajustable",
      "Para multiples materiales",
    ],
    description:
      "Pinza hidraulica para horquillas que permite sujetar cargas directamente sin necesidad de pallets.",
    slug: "fork-clamp-pinza-horquillas",
  },
  {
    id: "accessory-paper-roll-clamp",
    name: "Pinza para Rollos de Papel",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-paper-roll-clamp.jpg`,
    features: [
      "Disenada para rollos de papel",
      "Presion regulable",
      "Rotacion 360 grados",
      "Industria papelera",
    ],
    description:
      "Pinza especializada para manejo de rollos de papel con presion regulable y rotacion 360 grados. Esencial para la industria papelera.",
    slug: "paper-roll-clamp-pinza-rollos-papel",
  },
  {
    id: "accessory-block-clamp",
    name: "Pinza para Bloques (Block Clamp)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-block-clamp.jpg`,
    features: [
      "Para bloques de concreto",
      "Agarre multiple",
      "Industria de construccion",
    ],
    description:
      "Pinza para bloques de concreto, ladrillos y materiales de construccion. Permite transportar multiples bloques simultaneamente.",
    slug: "block-clamp-pinza-bloques",
  },
  {
    id: "accessory-drum-clamp",
    name: "Pinza para Tambores (Drum Clamp)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "1-4 tambores",
    power: "Hidraulico",
    image: `${IMG}/accessory-drum-clamp.jpg`,
    features: [
      "Manejo de tambores/barriles",
      "Simple o multiple",
      "Seguro y eficiente",
    ],
    description:
      "Pinza para tambores y barriles con capacidad de uno a cuatro tambores. Manejo seguro de liquidos y quimicos.",
    slug: "drum-clamp-pinza-tambores",
  },
  {
    id: "accessory-rotating-drum-clamp",
    name: "Pinza Rotativa para Tambores",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "1-2 tambores",
    power: "Hidraulico",
    image: `${IMG}/accessory-rotating-drum-clamp.jpg`,
    features: [
      "Rotacion para vaciado",
      "Volcado controlado",
      "Industria quimica",
    ],
    description:
      "Pinza rotativa para tambores que permite el volcado controlado para vaciado. Ideal para industria quimica y alimentaria.",
    slug: "rotating-drum-clamp-pinza-rotativa-tambores",
  },
  {
    id: "accessory-foam-clamp",
    name: "Pinza para Espuma/Foam (Foam Clamp)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-foam-clamp.jpg`,
    features: [
      "Para materiales blandos",
      "Presion suave regulable",
      "Industria del colchon y espuma",
    ],
    description:
      "Pinza para materiales blandos como espuma, colchones y embalajes. Presion suave regulable para no danar el producto.",
    slug: "foam-clamp-pinza-espuma",
  },
  {
    id: "accessory-tyre-clamp",
    name: "Pinza para Neumaticos (Tyre Clamp)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-tyre-clamp.jpg`,
    features: [
      "Para neumaticos y ruedas",
      "Agarre seguro",
      "Industria automotriz",
    ],
    description:
      "Pinza para manejo de neumaticos y ruedas de diversos tamanos. Esencial para la industria automotriz y distribuidoras.",
    slug: "tyre-clamp-pinza-neumaticos",
  },
  {
    id: "accessory-push-pull",
    name: "Push/Pull (Empujador/Jalador)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-push-pull.jpg`,
    features: [
      "Carga/descarga sin pallets",
      "Para slip sheets",
      "Reduce costos de pallets",
    ],
    description:
      "Sistema push/pull para carga y descarga usando slip sheets en lugar de pallets. Reduce significativamente los costos de embalaje.",
    slug: "push-pull-empujador",
  },
  {
    id: "accessory-bag-pusher",
    name: "Empujador de Bolsas (Bag Pusher)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-bag-pusher.jpg`,
    features: [
      "Para sacos y bolsas",
      "Descarga rapida",
      "Industria alimenticia y agricola",
    ],
    description:
      "Empujador hidraulico para descarga rapida de sacos y bolsas. Ideal para industria alimenticia, agricola y de materiales a granel.",
    slug: "bag-pusher-empujador-bolsas",
  },
  {
    id: "accessory-inverta-push",
    name: "Inverta Push (Volcador/Empujador)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-inverta-push.jpg`,
    features: [
      "Volteo y empuje combinado",
      "Para contenedores y bins",
      "Descarga por gravedad",
    ],
    description:
      "Accesorio de volteo y empuje combinado para vaciado de contenedores y bins. Descarga por gravedad controlada.",
    slug: "inverta-push-volcador-empujador",
  },
  {
    id: "accessory-load-stabilizer",
    name: "Estabilizador de Carga (Load Stabilizer)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-load-stabilizer.jpg`,
    features: [
      "Sujeta la carga desde arriba",
      "Evita caidas y deslizamientos",
      "Mayor seguridad",
    ],
    description:
      "Estabilizador de carga que sujeta desde arriba para evitar caidas durante el transporte. Aumenta la seguridad en el movimiento de cargas.",
    slug: "load-stabilizer-estabilizador-carga",
  },
  {
    id: "accessory-push-stabilizer",
    name: "Estabilizador con Empuje",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-push-stabilizer.jpg`,
    features: [
      "Estabilizacion y empuje",
      "Doble funcion",
      "Para cargas irregulares",
    ],
    description:
      "Estabilizador con funcion de empuje para cargas irregulares. Combina sujecion superior con capacidad de desplazamiento.",
    slug: "push-stabilizer-estabilizador-empuje",
  },
  {
    id: "accessory-load-extender",
    name: "Extension de Carga (Load Extender)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-load-extender.jpg`,
    features: [
      "Extiende alcance de horquillas",
      "Para cargas largas",
      "Ajustable",
    ],
    description:
      "Extension hidraulica que aumenta el alcance de las horquillas para manejo de cargas largas o profundas en racks.",
    slug: "load-extender-extension-carga",
  },
  {
    id: "accessory-pallet-handler",
    name: "Manipulador de Pallets (Pallet Handler)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-pallet-handler.jpg`,
    features: [
      "Manejo doble de pallets",
      "Mayor productividad",
      "Reduce viajes",
    ],
    description:
      "Manipulador de pallets que permite manejar dos pallets simultaneamente, duplicando la productividad en cada viaje.",
    slug: "pallet-handler-manipulador-pallets",
  },
  {
    id: "accessory-turnaforks",
    name: "Horquillas Rotativas (Turnaforks)",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Hidraulico",
    image: `${IMG}/accessory-turnaforks.jpg`,
    features: [
      "Rotacion de horquillas",
      "Para volcado de contenedores",
      "Angulo ajustable",
    ],
    description:
      "Horquillas rotativas que permiten el volcado controlado de contenedores y bins. Angulo de rotacion ajustable.",
    slug: "turnaforks-horquillas-rotativas",
  },
  {
    id: "accessory-sanitation-fork",
    name: "Horquillas Sanitarias",
    category: "Accesorios",
    categorySlug: "accesorios",
    type: "Accesorio",
    capacityRange: "Segun modelo",
    power: "Mecanico",
    image: `${IMG}/accessory-sanitation-fork.jpg`,
    features: [
      "Acero inoxidable",
      "Industria alimenticia y farmaceutica",
      "Facil limpieza y sanitizacion",
    ],
    description:
      "Horquillas de acero inoxidable para industria alimenticia y farmaceutica. Disenadas para cumplir normativas sanitarias.",
    slug: "sanitation-fork-horquillas-sanitarias",
  },
];

// =============================================================================
// COMBINED: ALL PRODUCTS
// =============================================================================
export const allProducts: FullProduct[] = [
  ...electricForklifts,
  ...combustionForklifts,
  ...hydrogenForklifts,
  ...allTerrainForklifts,
  ...palletJacks,
  ...stackers,
  ...reachTrucks,
  ...telehandlers,
  ...containerHandlers,
  ...towTractors,
  ...platforms,
  ...accessories,
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/** Get all products for a given category slug */
export function getProductsByCategory(categorySlug: string): FullProduct[] {
  return allProducts.filter((p) => p.categorySlug === categorySlug);
}

/** Get a single product by its slug */
export function getProductBySlug(slug: string): FullProduct | undefined {
  return allProducts.find((p) => p.slug === slug);
}

/** Get a single product by its id */
export function getProductById(id: string): FullProduct | undefined {
  return allProducts.find((p) => p.id === id);
}

/** Get all unique category slugs */
export function getAllCategorySlugs(): string[] {
  return Array.from(new Set(allProducts.map((p) => p.categorySlug)));
}

/** Get product count by category */
export function getProductCountByCategory(): Record<string, number> {
  return allProducts.reduce(
    (acc, p) => {
      acc[p.categorySlug] = (acc[p.categorySlug] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}
