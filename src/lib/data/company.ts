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
// EQUIPO COMERCIAL — Vendedores y áreas (scraped de heliforklift.cl)
// =============================================================================

export interface SalesContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  zone?: string;
}

export const salesTeam: SalesContact[] = [
  {
    name: "Mauricio Glaser",
    role: "Gerente de Ventas",
    email: "mglaser@heliforklift.cl",
    phone: "+56 9 5818 7035",
    zone: "Casa Matriz - Antofagasta",
  },
  {
    name: "Claudia Henríquez",
    role: "Gerente Comercial",
    email: "chenriquez@heliforklift.cl",
    phone: "+56 9 5818 7035",
  },
  {
    name: "Sebastián Araya",
    role: "Ejecutivo de Ventas",
    email: "sebastian@heliforklift.cl",
    phone: "+56 9 6122 3038",
    zone: "Antofagasta",
  },
  {
    name: "Alain Marchant",
    role: "Ejecutivo de Ventas",
    email: "amarchant@heliforklift.cl",
    phone: "+56 9 6895 5890",
    zone: "La Serena, Coquimbo, Copiapó, Arica",
  },
  {
    name: "Mirtha Suárez",
    role: "Ejecutiva de Ventas",
    email: "mirthas@heliforklift.cl",
    phone: "+56 9 5818 7022",
    zone: "Zona Centro",
  },
  {
    name: "John Díaz",
    role: "Ejecutivo de Ventas",
    email: "jdiaz@heliforklift.cl",
    phone: "+56 9 6122 3319",
    zone: "Zona Centro",
  },
  {
    name: "Marcela Huerta",
    role: "Ejecutiva de Ventas",
    email: "mhuerta@heliforklift.cl",
    phone: "+56 9 7333 6852",
    zone: "VI y VII Región",
  },
  {
    name: "Francisco Errázuriz",
    role: "Ejecutivo de Ventas",
    email: "ferrazuriz@heliforklift.cl",
    phone: "+56 9 3252 8102",
    zone: "Concepción, Chillán, Los Ángeles, Temuco",
  },
];

export const partsTeam = {
  email: "contacto@heliforklift.cl",
  phone: "+56 9 9320 9186",
  description:
    "Stock permanente de repuestos originales HELI y lubricantes autorizados. Envío a todo Chile.",
};

export const serviceTeam = {
  email: "contacto@heliforklift.cl",
  phone: "+56 9 9320 9186",
  description:
    "Técnicos certificados HELI con cobertura nacional. Mantención preventiva, correctiva y emergencias.",
};
