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
  mainPhone: "+56 9 5818 7035",
  mainEmail: "contacto@heliforklift.cl",
  whatsapp: "56958187035",
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
  hours: "Lun-Vie: 8:00 - 18:00 | Emergencias 24/7",
} as const;

export const certifications = [
  { name: "ISO 9001", description: "Gestión de calidad" },
  { name: "ISO 14001", description: "Gestión ambiental" },
  { name: "OHSAS 18001", description: "Seguridad y salud ocupacional" },
  { name: "CE", description: "Certificación Unión Europea" },
  { name: "EPA", description: "Agencia de Protección Ambiental (EE.UU.)" },
] as const;
