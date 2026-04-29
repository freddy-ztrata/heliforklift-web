export const company = {
  name: "Helifork Lift",
  legalName: "HELI Chile",
  brand: "HELI",
  tagline: "ELEVANDO EL FUTURO",
  founded: 1958,
  yearsInBusiness: 67,
  yearsInChile: 12,
  globalRanking: 7,
  unitsSoldChile: 1100,
  exportCountries: 150,
  machineModels: 1700,
  description:
    "Cuando se trata de satisfacer las necesidades de nuestros clientes siempre estamos un paso adelante, a la vanguardia de nuevas tecnologías eficientes y amigables con el ecosistema.",
  mission:
    "Entrar al Top 5 de fabricantes mundiales de vehículos industriales.",
  vision:
    "Convertirnos en una empresa centenaria de clase mundial, líder en innovación y tecnología.",
  values: [
    "Responsabilidad",
    "Innovación",
    "Expansión internacional",
    "Tecnología amigable con el ecosistema",
    "Seguridad y salud laboral",
  ],
  stats: [
    { value: 67, suffix: "+", label: "Años de experiencia" },
    { value: 1100, suffix: "+", label: "Equipos vendidos en Chile" },
    { value: 150, suffix: "+", label: "Países de exportación" },
    { value: 1700, suffix: "+", label: "Modelos de equipos" },
  ],
} as const;

export const contact = {
  mainPhone: "+56 9 9320 9186",
  mainEmail: "contacto@heliforklift.cl",
  whatsapp: "56993209186",
  whatsappMessage:
    "Hola, me interesa cotizar una grúa horquilla. ¿Pueden ayudarme?",
  locations: [
    {
      city: "Santiago",
      address: "Av. Américo Vespucio 1445, Quilicura",
      isMain: true,
    },
    {
      city: "Antofagasta",
      address: "Calle 9 425, Galpón 27, AGPIA II",
    },
    {
      city: "Copiapó",
      address: "Megacentro Copiapó, bodega 15, Panamericana Norte 185",
    },
  ],
  socialMedia: {
    facebook: "https://facebook.com/heliforkliftCL",
    linkedin: "https://linkedin.com/company/heliforkliftcl/",
    instagram: "https://instagram.com/heliforkliftcl/",
  },
  hours: "Lun-Vie: 08:30 - 18:00 hrs",
} as const;

export const certifications = [
  { name: "ISO 9001", description: "Gestión de calidad" },
  { name: "ISO 14001", description: "Gestión ambiental" },
  { name: "OHSAS 18001", description: "Seguridad y salud ocupacional" },
  { name: "CE", description: "Certificación Unión Europea" },
  { name: "EPA", description: "Agencia de Protección Ambiental (EE.UU.)" },
] as const;

// =============================================================================
// EQUIPO COMERCIAL — Vendedores agrupados por sucursal (scraped heliforklift.cl)
// =============================================================================

export interface SalesContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  zone?: string;
}

export interface BranchTeam {
  branch: string;
  address: string;
  contacts: SalesContact[];
}

export const teamByBranch: BranchTeam[] = [
  {
    branch: "Antofagasta",
    address: "Calle 9 425, Galpón 27, Agpia II, Antofagasta",
    contacts: [
      {
        name: "Sebastián Araya",
        role: "Ventas",
        email: "sebastian@heliforklift.cl",
        phone: "+56 9 6122 3038",
      },
      {
        name: "Paola Ortiz",
        role: "Repuestos",
        email: "portiz@heliforklift.cl",
        phone: "+56 9 6190 8327",
      },
    ],
  },
  {
    branch: "Santiago",
    address: "Av. Américo Vespucio 1445, Quilicura",
    contacts: [
      {
        name: "Claudia Henríquez",
        role: "Gerente Comercial",
        email: "chenriquez@heliforklift.cl",
        phone: "+56 9 5818 7035",
      },
      {
        name: "Mirtha Suárez",
        role: "Ventas",
        email: "mirthas@heliforklift.cl",
        phone: "+56 9 5818 7022",
        zone: "Zona Centro",
      },
      {
        name: "John Díaz",
        role: "Ventas",
        email: "jdiaz@heliforklift.cl",
        phone: "+56 9 6122 3319",
        zone: "Zona Centro",
      },
      {
        name: "Marcela Huerta",
        role: "Ventas",
        email: "mhuerta@heliforklift.cl",
        phone: "+56 9 7333 6852",
        zone: "Sexta y Séptima Región",
      },
      {
        name: "Francisco Errázuriz",
        role: "Ventas",
        email: "ferrazuriz@heliforklift.cl",
        phone: "+56 9 3252 8102",
        zone: "Centro, Concepción, Chillán, Los Ángeles, Temuco",
      },
      {
        name: "Alain Marchant",
        role: "Ventas",
        email: "amarchant@heliforklift.cl",
        phone: "+56 9 6895 5890",
        zone: "Centro, La Serena, Coquimbo, Copiapó, Arica",
      },
      {
        name: "Ángel Leiva",
        role: "Repuestos",
        email: "repuestos@heliforklift.cl",
        phone: "+56 9 3253 7997",
      },
    ],
  },
];

// Flat list para compatibilidad con paginas que ya consumen salesTeam
export const salesTeam: SalesContact[] = teamByBranch.flatMap((b) => b.contacts);

// =============================================================================
// SOCIOS ESTRATÉGICOS / PUNTOS DE VENTA
// =============================================================================

export interface StrategicPartner {
  name: string;
  address: string;
  city: string;
  region: string;
  contactName: string;
  contactEmail?: string;
  contactPhone: string;
  isOwn?: boolean; // si es sucursal propia o partner externo
}

export const strategicPartners: StrategicPartner[] = [
  {
    name: "Heli Forklift Chile - Copiapó",
    address: "Megacentro Copiapó, bodega 15, Panamericana Norte 185",
    city: "Copiapó",
    region: "Atacama",
    contactName: "Claudia Henríquez",
    contactEmail: "chenriquez@heliforklift.cl",
    contactPhone: "+56 9 5818 7035",
    isOwn: true,
  },
  {
    name: "Lubricentro Opazo y López",
    address: "Francisco Bilbao 132",
    city: "Taltal",
    region: "Antofagasta",
    contactName: "José Luis Opazo",
    contactEmail: "opazoylopez.servicios@gmail.com",
    contactPhone: "+56 9 8761 3555",
  },
  {
    name: "Bailac",
    address: "Santa Rosa de Molle 4006",
    city: "Iquique",
    region: "Tarapacá",
    contactName: "Francisco Poblete Trullen",
    contactEmail: "francisco.poblete@bailac.com",
    contactPhone: "+56 9 3377 2027",
  },
  {
    name: "Pro Maquinaria",
    address: "Ruta Sur km 1015, La Foresta 111",
    city: "Puerto Varas",
    region: "Los Lagos",
    contactName: "Jean Phillipe Brunet",
    contactEmail: "jpbrunet@promaquinaria.cl",
    contactPhone: "+56 9 7388 1836",
  },
];

export const partsTeam = {
  email: "repuestos@heliforklift.cl",
  phone: "+56 9 3253 7997",
  description:
    "Stock permanente de repuestos originales HELI y lubricantes autorizados. Envío a todo Chile.",
};

export const serviceTeam = {
  email: "contacto@heliforklift.cl",
  phone: "+56 9 9320 9186",
  description:
    "Técnicos certificados HELI con cobertura nacional. Mantención preventiva, correctiva y emergencias.",
};
