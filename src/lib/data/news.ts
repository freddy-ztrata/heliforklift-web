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

const IMG = "/assets/legacy/news";

// Contenido scrapeado de heliforklift.cl/noticias/ — no inventar
export const news: NewsItem[] = [
  {
    id: "entrega-quilicura-2025",
    slug: "entrega-flota-gran-tonelaje-quilicura",
    title: "Entrega de la flota de gran tonelaje en sucursal de Quilicura",
    date: "2025-08-14",
    dateLabel: "14 de agosto de 2025",
    summary:
      "Se llevó a cabo una exitosa entrega de grúas horquillas de 16 toneladas en la sucursal de Quilicura, Santiago.",
    content:
      "Se realizó la entrega de grúas horquillas de 16 toneladas en la sucursal de Quilicura, Santiago.\n\nEsta nueva flota reafirma la sólida relación y la confianza que nuestros clientes depositan en la marca. Nuestros clientes han elegido a la compañía como socio estratégico para sus operaciones.\n\nAgradecemos la preferencia de los usuarios, lo que nos motiva a continuar ofreciendo equipamiento de calidad superior y servicios distinguidos.",
    image: `${IMG}/quilicura-2025.jpg`,
    category: "Entregas",
  },
  {
    id: "entrega-puerto-montt-2023",
    slug: "entrega-maquinarias-puerto-montt",
    title: "Entrega de Maquinarias en Puerto Montt",
    date: "2023-04-03",
    dateLabel: "3 de abril de 2023",
    summary:
      "Entrega de maquinas distribuidor Pro Maquinaria Puerto Montt a importante cliente en pesquera local.",
    content:
      "Entrega de máquinas a través del distribuidor Pro Maquinaria Puerto Montt a un importante cliente del sector pesquero local.\n\nPreparando la flota: grúas de 2,5 toneladas semi cabinada gas/bencina.",
    image: `${IMG}/puerto-montt-2023.jpg`,
    category: "Entregas",
  },
  {
    id: "gruas-electricas-economia-2022",
    slug: "gruas-horquilla-electricas-inversion-en-economia-y-medioambiente",
    title:
      "Grúas horquilla eléctricas: Inversión en economía y medioambiente",
    date: "2022-04-14",
    dateLabel: "14 de abril de 2022",
    summary:
      "¿Qué las hace tan convenientes? Existen diversas ventajas que hacen de este equipo eléctrico una excelente alternativa.",
    content:
      "¿Qué las hace tan convenientes?\n\nExisten diversas ventajas que hacen de este equipo eléctrico una excelente alternativa: una hora de uso de un equipo eléctrico es cerca de un 80% más económica que uno a combustión, tampoco emiten gases contaminantes en el lugar de trabajo ni calor, lo que las hace perfectas para su uso en bodegas y espacios cerrados. Lo anterior se traduce también en mejorar las condiciones laborales para los operadores y los vecinos del punto de trabajo.\n\nVentajas de las grúas horquilla eléctricas:\n\nEstos vehículos con baterías de litio, a diferencia de las grúas a combustión interna con motores diésel o gasolina, ofrecen una amplia variedad de ventajas en todo ámbito, entre las que se pueden destacar:\n\n• Reducción en el gasto energético: el costo de la energía eléctrica es mucho menor al del combustible diésel y/o gasolina; además, estos últimos sufren constantes variaciones de precio.\n\n• Espacios sin ventilación: las grúas eléctricas funcionan en bodegas, subterráneos o lugares cerrados sin generar emisiones contaminantes.\n\n• Cuidado del medioambiente: no emiten gases ni partículas contaminantes, reduciendo la huella de carbono.\n\n• Menor contaminación acústica: reducen el ruido en más del 50% comparadas con grúas a combustión.\n\n• Bajo costo de mantenimiento: requieren menos mantención que sus contrapartes a combustión.\n\n• Mayor eficiencia en frenado: equipadas con transmisión hidrostática, reducen el desgaste de frenos.\n\nDesde HELI nos mantenemos a la vanguardia del mercado, liderando el apoyo a empresas para renovar equipos a combustión por tecnología limpia y segura.",
    image: `${IMG}/electricas-economia-2022.jpg`,
    category: "Tecnología",
  },
  {
    id: "modex-2022",
    slug: "2022-modex-heli-estara-contigo-de-nuevo",
    title: "2022 MODEX: HELI estará contigo de nuevo",
    date: "2022-04-04",
    dateLabel: "4 de abril de 2022",
    summary:
      "La exposición MODEX 2022 se llevó a cabo con éxito en el Georgia World Congress Center en Atlanta.",
    content:
      "La exposición MODEX 2022 se realizó exitosamente en el Georgia World Congress Center en Atlanta entre el 28 y 31 de marzo. En este evento comercial dedicado a manufactura, cadena de suministro y distribución, HELI presentó productos innovadores para el mercado norteamericano, incluyendo montacargas con llantas de rodamiento, montacargas de iones de litio, apiladores de paletas, transpaletas con operador a pie y tractores eléctricos.\n\nComo novedad internacional, HELI exhibió una carretilla elevadora de celda de combustible de hidrógeno de 5500 libras con llantas amortiguadas, que fue punto destacado de la feria. La empresa planea ampliar la cooperación en profundidad con empresas centrales en la cadena de la industria del hidrógeno para mejorar diseños y desarrollar tecnología de carretillas impulsadas por hidrógeno.\n\nHELI mantiene su posición como primera marca china de carretillas elevadoras en América del Norte. A pesar de las restricciones epidémicas, el stand recibió numerosos visitantes interesados. Con la operación establecida de Heli America Inc. en Atlanta, la cooperación se ha fortalecido, y la empresa busca mejorar competitividad, expandir su marca y ofrecer soluciones logísticas más eficientes.",
    image: `${IMG}/modex-2022.jpg`,
    category: "Eventos",
  },
  {
    id: "gruas-electricas-tecnologia-2021",
    slug: "gruas-horquilla-electricas-tecnologia-en-crecimiento",
    title: "Grúas horquilla eléctricas: Tecnología en crecimiento",
    date: "2021-04-08",
    dateLabel: "8 de abril de 2021",
    summary:
      "Es bien sabido que los avances tecnológicos están en constante crecimiento, transformando todos los sectores económicos.",
    content:
      "Los avances tecnológicos continúan transformando todos los sectores económicos, obligándolos a renovarse constantemente. A nivel mundial, aproximadamente el 70% de los equipos en países como Estados Unidos ya son eléctricos, con proyecciones de superar el 90% en la próxima década. Europa ha priorizado equipos eléctricos durante más de quince años para operaciones de alto tonelaje.\n\nEn Chile, el transporte de carga desde tres toneladas ha sido dominado tradicionalmente por grúas a combustión, aunque esta tendencia está cambiando. Existe una preocupación cada vez mayor por utilizar energías más limpias debido a compromisos ambientales nacionales e internacionales. Grandes empresas del retail, logística y sector forestal están reemplazando masivamente equipos, con algunas llegando al 90% de grúas eléctricas.\n\nHELI impulsa esta transición energética hacia tecnologías limpias, alineándose con tendencias internacionales. La empresa trabaja para ser un actor relevante en reducción de huella de carbono a precios competitivos, apoyando a empresas en el cambio de equipos a combustión por eléctricos.",
    image: `${IMG}/electricas-tecnologia-2021.jpg`,
    category: "Tecnología",
  },
  {
    id: "purificadores-combustible-2020",
    slug: "que-son-los-purificadores-de-combustible",
    title: "¿Qué son los purificadores de combustible?",
    date: "2020-11-17",
    dateLabel: "17 de noviembre de 2020",
    summary:
      "Los purificadores de combustible son los únicos productos que usan las tres etapas del proceso de purificación.",
    content:
      "Los purificadores de combustible utilizan tres etapas de purificación con principios de separación centrífuga y fusión. El agua y otros contaminantes son aislados del combustible, así se elimina el atascamiento de los filtros y averías en inyectores, evitando cambios frecuentes.\n\nFuncionamiento:\n\nEn la etapa inicial, la velocidad del combustible disminuye permitiendo que el agua decante libremente mientras los contaminantes se acumulan en el fondo. Durante la segunda fase, el combustible atraviesa paredes perforadas que detienen partículas; el agua restante sedimenta naturalmente. En la fase final, el combustible pasa a través del medio de fusión patentado para eliminar partículas mínimas, mejorando combustión e inyección.\n\nBeneficios:\n\n• Operacionales: mejora rendimiento y extiende la vida útil del motor.\n\n• Financieros: reduce gastos de mantenimiento y reparación.\n\n• Ecológicos: disminuye contaminación entre 6% y 17% según mediciones estadounidenses.",
    image: `${IMG}/purificadores-2020.jpg`,
    category: "Tecnología",
  },
  {
    id: "pearl-river-port-2020",
    slug: "grua-porta-contenedores-hibrida-heli-pearl-river-port",
    title:
      "Grúa Porta Contenedores Híbrida HELI es entregada a Pearl River Port",
    date: "2020-11-08",
    dateLabel: "8 de noviembre de 2020",
    summary:
      "Con la creciente demanda de alta eficiencia, conveniencia y ahorro de energía en operaciones portuarias.",
    content:
      "La primera grúa porta contenedores híbrida de HELI fue entregada oficialmente a Pearl River Port en Zhuhai, Guangdong. Este equipo responde a la demanda creciente de eficiencia y ahorro energético en operaciones portuarias.\n\nEl vehículo incorpora un sistema eléctrico de alto voltaje (600V), control inteligente de disipación térmica multicanal, y tecnologías enfocadas en protección ambiental y seguridad. Entre sus características destaca que la tasa de ahorro de combustible puede alcanzar un 50% y el súper condensador puede utilizarse alrededor de 300 mil veces.\n\nDurante la vida útil del equipo, considerando 500 mil traslados de contenedores, la máquina híbrida reduce emisiones en al menos 125 toneladas de carbón estándar comparada con modelos de combustión interna. La compañía proporciona soporte técnico profesional integral para optimizar funcionamiento y reducir tiempos de inactividad.",
    image: `${IMG}/pearl-river-port-2020.jpg`,
    category: "Entregas",
  },
  {
    id: "aniversario-60-2020",
    slug: "heli-celebra-su-aniversario-no-60",
    title: "HELI celebra su aniversario Nº 60",
    date: "2020-10-15",
    dateLabel: "15 de octubre de 2020",
    summary:
      "El 28 de octubre se llevó a cabo la ceremonia del aniversario Nº 60 de HELI en Hefei, China.",
    content:
      "El 28 de octubre se realizó la ceremonia del aniversario número 60 de HELI en Hefei, China. Aproximadamente 400 personas de la Asociación de la Industria de Maquinaria de Construcción de China (CCMA), autoridades, socios nacionales e internacionales, periodistas y representantes de diferentes niveles jerárquicos asistieron al evento de celebración.\n\nEl tema central fue \"Cuanto más HELI, más futuro\", con una revisión completa de la trayectoria empresarial que inició hace seis décadas.\n\nDurante estas seis décadas, la compañía superó las proyecciones de la industria manufacturera china de equipos. HELI ha estado en la cima de la manufactura de montacargas en China durante veintisiete años y actualmente se posiciona como el séptimo fabricante de grúas horquilla más importante globalmente.\n\nDurante la ceremonia se presentó el millonésimo montacargas fabricado por la empresa, entregado a Shanghai International Port Group Co. Ltd (SIPG).\n\nEl presidente de Anhui HELI Co. Ltd destacó que la compañía evolucionó de ser una fábrica de grúas horquilla común a la marca china más conocida a nivel internacional durante estos sesenta años de desarrollo empresarial.",
    image: `${IMG}/aniversario-60-2020.png`,
    category: "Empresa",
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}
