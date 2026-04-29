export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD
  dateLabel: string; // human readable
  summary: string;
  content?: string;
  image: string;
  category: "Entregas" | "Eventos" | "Tecnología" | "Empresa";
}

const IMG = "/assets/legacy";

export const news: NewsItem[] = [
  {
    id: "entrega-quilicura-2025",
    slug: "entrega-flota-gran-tonelaje-quilicura-2025",
    title: "Entrega de la flota de gran tonelaje en sucursal de Quilicura",
    date: "2025-08-14",
    dateLabel: "14 de agosto de 2025",
    summary:
      "Se llevó a cabo una exitosa entrega de grúas horquillas de 16 toneladas en la sucursal de Quilicura, Santiago.",
    content:
      "Continuando con nuestro compromiso de excelencia, completamos la entrega de una nueva flota de grúas horquillas de 16 toneladas en nuestra sucursal de Quilicura. Estos equipos de alto tonelaje refuerzan la capacidad operativa de uno de nuestros clientes estratégicos del sector logístico, incorporando tecnología de última generación con motor diésel certificado y sistemas de seguridad avanzados.",
    image: `${IMG}/banners/banner-mineria.jpg`,
    category: "Entregas",
  },
  {
    id: "entrega-puerto-montt-2023",
    slug: "entrega-maquinarias-puerto-montt",
    title: "Entrega de Maquinarias en Puerto Montt",
    date: "2023-04-03",
    dateLabel: "3 de abril de 2023",
    summary:
      "Distribución de equipos para un cliente del sector pesquero local, con preparación de grúas de 2,5 toneladas.",
    content:
      "Realizamos la entrega y puesta en marcha de equipos de 2,5 toneladas a un importante cliente del sector pesquero en Puerto Montt. La operación incluyó capacitación de operadores y entrega de plan de mantención preventiva, asegurando una operación continua y eficiente desde el primer día.",
    image: `${IMG}/banners/heli-fleet-delivery.jpg`,
    category: "Entregas",
  },
  {
    id: "gruas-electricas-2022",
    slug: "gruas-horquilla-electricas-inversion-economia-medioambiente",
    title: "Grúas horquilla eléctricas: Inversión en economía y medioambiente",
    date: "2022-04-14",
    dateLabel: "14 de abril de 2022",
    summary:
      "Las grúas horquilla eléctricas representan una inversión inteligente: menor costo operativo, cero emisiones y mayor productividad en operaciones de bodega.",
    content:
      "Las grúas horquilla eléctricas modernas combinan beneficios económicos y ambientales que las hacen una opción cada vez más atractiva para operaciones industriales. Los costos operativos se reducen hasta un 60% comparado con equipos diésel, gracias al menor precio de la energía eléctrica versus el combustible. Además, eliminan emisiones contaminantes y reducen drásticamente los niveles de ruido, mejorando las condiciones laborales y permitiendo operaciones en interiores sin restricciones.",
    image: `${IMG}/misc/news-electric.jpg`,
    category: "Tecnología",
  },
  {
    id: "modex-2022",
    slug: "modex-2022-heli-estara-contigo",
    title: "2022 MODEX: HELI estará contigo de nuevo",
    date: "2022-04-04",
    dateLabel: "4 de abril de 2022",
    summary:
      "Participación de HELI en la exposición MODEX 2022 celebrada en Atlanta, Estados Unidos.",
    content:
      "HELI participó nuevamente en MODEX, una de las ferias más importantes de la industria de manejo de materiales y supply chain en Norteamérica. Durante el evento se presentaron las últimas innovaciones de la marca, incluyendo equipos de hidrógeno verde, modelos eléctricos de litio y soluciones automatizadas para almacenes inteligentes.",
    image: `${IMG}/misc/news-modex.jpg`,
    category: "Eventos",
  },
  {
    id: "gruas-electricas-2021",
    slug: "gruas-horquilla-electricas-tecnologia-en-crecimiento",
    title: "Grúas horquilla eléctricas: Tecnología en crecimiento",
    date: "2021-04-08",
    dateLabel: "8 de abril de 2021",
    summary:
      "Análisis sobre los avances tecnológicos en grúas horquilla eléctricas y su crecimiento sostenido en el mercado industrial.",
    content:
      "El mercado de grúas horquilla eléctricas continúa creciendo a tasas de doble dígito a nivel mundial. Los avances en tecnología de baterías de litio-ion, motores AC de alta eficiencia y sistemas de control inteligentes están permitiendo que los equipos eléctricos igualen e incluso superen el rendimiento de los equipos a combustión, manteniendo todas las ventajas operativas y ambientales.",
    image: `${IMG}/banners/banner-oferta.png`,
    category: "Tecnología",
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}
