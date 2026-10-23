import type { FaqItem, Service, Stat, Testimonial } from './types';

export const stats: Stat[] = [
  {
    id: 'st-01',
    value: 2000,
    suffix: '+',
    label: { es: 'profesionales formados', en: 'trained professionals' },
  },
  {
    id: 'st-02',
    value: 40,
    label: { es: 'países representados', en: 'countries represented' },
  },
  {
    id: 'st-03',
    value: 120,
    label: { es: 'proyectos de comunidad', en: 'community projects' },
  },
  {
    id: 'st-04',
    value: 48000,
    suffix: 'h',
    label: { es: 'de formación entregada', en: 'of training delivered' },
  },
  {
    id: 'st-05',
    value: 300,
    suffix: '+',
    label: { es: 'herramientas dominadas', en: 'tools mastered' },
  },
  {
    id: 'st-06',
    value: 25,
    label: { es: 'partners y aliados', en: 'partners and allies' },
  },
  {
    id: 'st-07',
    value: 60,
    label: { es: 'sesiones mensuales', en: 'monthly sessions' },
  },
  {
    id: 'st-08',
    value: 94,
    suffix: '%',
    label: { es: 'de retención de alumnos', en: 'student retention' },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'ts-01',
    name: 'Laura Mendoza',
    role: { es: 'Data Lead, seguros', en: 'Data Lead, insurance' },
    country: 'México',
    quote: {
      es: 'En ocho semanas dejamos de discutir intuiciones y pasamos a medir cada modelo con un golden set propio. El proceso de triaje bajó un 42 % el tiempo de revisión.',
      en: 'In eight weeks we stopped arguing on intuition and started measuring every model against our own golden set. The triage workflow cut review time by 42 %.',
    },
  },
  {
    id: 'ts-02',
    name: 'Daniel Rojas',
    role: { es: 'Ingeniero de software', en: 'Software engineer' },
    country: 'España',
    quote: {
      es: 'Llegué escribiendo prompts a ciegas y salí con una suite de regresión para mi asistente. Mi equipo desplegó el primer agente dos meses después.',
      en: 'I arrived writing prompts blind and left with a regression suite for my assistant. My team shipped its first agent two months later.',
    },
  },
  {
    id: 'ts-03',
    name: 'Camila Duarte',
    role: { es: 'Product Manager', en: 'Product Manager' },
    country: 'Brasil',
    quote: {
      es: 'El módulo de caso de negocio me dio el marco exacto para defender el presupuesto ante dirección. Aprobamos el proyecto con ROI a nueve meses.',
      en: 'The business-case module gave me the exact framework to defend the budget with leadership. The project was approved with a nine-month ROI.',
    },
  },
  {
    id: 'ts-04',
    name: 'Andrés Villalba',
    role: { es: 'Científico de datos, salud', en: 'Data scientist, healthcare' },
    country: 'Argentina',
    quote: {
      es: 'Aprendí a delegar investigación a modelos sin perder criterio clínico. Nuestro documento de derivaciones pasó del 78 % al 92 % de precisión.',
      en: 'I learned to delegate research to models without losing clinical judgment. Our referral document went from 78 % to 92 % accuracy.',
    },
  },
  {
    id: 'ts-05',
    name: 'Sofía Herrera',
    role: { es: 'Responsable de Operaciones', en: 'Head of Operations' },
    country: 'Colombia',
    quote: {
      es: 'Automatizamos conciliación de facturas con supervisión humana en los casos límite. Devolvimos 15 horas semanales al equipo financiero.',
      en: 'We automated invoice reconciliation with human oversight on edge cases. We gave 15 hours a week back to the finance team.',
    },
  },
  {
    id: 'ts-06',
    name: 'Miguel Santos',
    role: { es: 'Arquitecto de datos', en: 'Data architect' },
    country: 'Portugal',
    quote: {
      es: 'El track de RAG me obligó a medir la recuperación antes de tocar el modelo. Con métricas serias reducimos un 31 % las respuestas sin fuente.',
      en: 'The RAG track forced me to measure retrieval before touching the model. With serious metrics we cut no-source answers by 31 %.',
    },
  },
  {
    id: 'ts-07',
    name: 'Valentina Ortiz',
    role: { es: 'Fundadora, startup legaltech', en: 'Founder, legaltech startup' },
    country: 'Chile',
    quote: {
      es: 'Construimos un extractor de cláusulas que hoy procesa 4.000 contratos al mes. El taller de seguridad nos evitó dos fallos serios en producción.',
      en: 'We built a clause extractor that now processes 4,000 contracts a month. The security workshop saved us from two serious production failures.',
    },
  },
  {
    id: 'ts-08',
    name: 'Javier Peña',
    role: { es: 'Responsable de Marketing', en: 'Head of Marketing' },
    country: 'España',
    quote: {
      es: 'El programa ejecutivo ordenó el caos de herramientas que usábamos. Estandarizamos seis casos de uso y medimos ahorro real desde el primer mes.',
      en: 'The executive program organized our tool chaos. We standardized six use cases and measured real savings from the first month.',
    },
  },
  {
    id: 'ts-09',
    name: 'Isabel Kramer',
    role: { es: 'Investigadora postdoctoral', en: 'Postdoctoral researcher' },
    country: 'Alemania',
    quote: {
      es: 'La mentoría de investigación convirtió mi lectura de papers en un hábito con protocolo. Publiqué dos meses antes de lo previsto.',
      en: 'Research mentoring turned my paper reading into a protocol-driven habit. I published two months earlier than planned.',
    },
  },
  {
    id: 'ts-10',
    name: 'Rodrigo Lima',
    role: { es: 'ML Engineer', en: 'ML Engineer' },
    country: 'Brasil',
    quote: {
      es: 'Migramos serving a inferencia cuantizada sin perder calidad medible: 46 % menos de coste y latencia estable en horas punta.',
      en: 'We moved serving to quantized inference with no measurable quality loss: 46 % lower cost and stable latency at peak.',
    },
  },
  {
    id: 'ts-11',
    name: 'Mariana Costa',
    role: { es: 'Directora de RR. HH.', en: 'HR Director' },
    country: 'Perú',
    quote: {
      es: 'Diseñamos un copiloto interno para políticas y onboarding con 1,100 empleados. Las consultas al equipo de RR. HH. cayeron un 38 %.',
      en: 'We designed an internal copilot for policies and onboarding covering 1,100 employees. HR queries dropped by 38 %.',
    },
  },
  {
    id: 'ts-12',
    name: 'Alejandro Vidal',
    role: { es: 'CTO, logística', en: 'CTO, logistics' },
    country: 'México',
    quote: {
      es: 'El bootcamp de agentes fue el primer curso donde mis ingenieros discutieron evaluación antes que frameworks. Se nota en cada pull request.',
      en: 'The agents bootcamp was the first course where my engineers debated evaluation before frameworks. You can see it in every pull request.',
    },
  },
  {
    id: 'ts-13',
    name: 'Paula Gutiérrez',
    role: { es: 'Analista de negocio sénior', en: 'Senior business analyst' },
    country: 'Uruguay',
    quote: {
      es: 'Pasé de informes manuales a pipelines con validación automática. Mis análisis llegan dos días antes y con trazabilidad completa.',
      en: 'I moved from manual reports to pipelines with automatic validation. My analyses arrive two days earlier with full traceability.',
    },
  },
  {
    id: 'ts-14',
    name: 'Nicolás Ferrer',
    role: { es: 'Especialista en ciberseguridad', en: 'Cybersecurity specialist' },
    country: 'España',
    quote: {
      es: 'La jornada de red teaming me dio un catálogo de ataques contra LLMs que hoy aplico en auditorías a clientes. Es otro oficio desde entonces.',
      en: 'The red teaming day gave me an LLM attack catalog I now apply in client audits. It has been a different craft ever since.',
    },
  },
  {
    id: 'ts-15',
    name: 'Daniela Paredes',
    role: { es: 'Coordinadora de innovación', en: 'Innovation coordinator' },
    country: 'Ecuador',
    quote: {
      es: 'Organizamos el primer hackathon interno con la plantilla de la academia. Tres de los doce prototipos están hoy en piloto real.',
      en: 'We ran our first internal hackathon using the academy template. Three of the twelve prototypes are in a live pilot today.',
    },
  },
  {
    id: 'ts-16',
    name: 'Óscar Delgado',
    role: { es: 'Backend Engineer', en: 'Backend Engineer' },
    country: 'Argentina',
    quote: {
      es: 'El módulo de observabilidad de agentes me hizo añadir trazas y presupuestos de coste antes del lanzamiento. Cero sorpresas en la factura.',
      en: 'The agent observability module made me add traces and cost budgets before launch. Zero surprises on the bill.',
    },
  },
  {
    id: 'ts-17',
    name: 'Carolina Méndez',
    role: { es: 'Directora de Content Ops', en: 'Director of Content Ops' },
    country: 'Chile',
    quote: {
      es: 'Con IA generativa controlada producimos el doble de piezas con el mismo equipo y revisamos calidad con una checklist compartida.',
      en: 'With controlled generative AI we produce twice the pieces with the same team and review quality against a shared checklist.',
    },
  },
  {
    id: 'ts-18',
    name: 'Emilio Navarro',
    role: { es: 'Profesor de secundaria', en: 'Secondary school teacher' },
    country: 'España',
    quote: {
      es: 'El taller para docentes cambió cómo diseño evaluaciones: la IA devuelve borradores y yo decido qué es aprendizaje. Mis alumnos notan la diferencia.',
      en: 'The educators workshop changed how I design assessments: AI returns drafts and I decide what counts as learning. My students notice the difference.',
    },
  },
  {
    id: 'ts-19',
    name: 'Renata Silva',
    role: { es: 'Gestora de producto', en: 'Product manager' },
    country: 'Brasil',
    quote: {
      es: 'La comunidad es lo que mantiene el aprendizaje vivo: cada semana hay una revisión de proyecto donde gente real discute números.',
      en: 'The community is what keeps learning alive: every week there is a project review where real people argue over numbers.',
    },
  },
  {
    id: 'ts-20',
    name: 'Héctor Salas',
    role: { es: 'Responsable de Energía y Datos', en: 'Head of Energy & Data' },
    country: 'Colombia',
    quote: {
      es: 'Aplicamos el método de la fase 1 a un problema de consumo eléctrico mal definido. Tres semanas después teníamos un piloto medible.',
      en: 'We applied the phase-1 method to a badly defined electricity consumption problem. Three weeks later we had a measurable pilot.',
    },
  },
];

export const services: Service[] = [
  {
    id: 'sv-01',
    icon: 'GraduationCap',
    title: { es: 'Formación in-company', en: 'In-company training' },
    desc: {
      es: 'Programas a medida por equipo y nivel, con retos tomados de tus propios datos y seguimiento de adopción.',
      en: 'Tailored programs by team and level, with challenges drawn from your own data and adoption tracking.',
    },
  },
  {
    id: 'sv-02',
    icon: 'Compass',
    title: { es: 'Consultoría de IA', en: 'AI consulting' },
    desc: {
      es: 'Del diagnóstico al despliegue: priorizamos casos de uso, diseñamos arquitectura y acompañamos la puesta en marcha.',
      en: 'From diagnosis to deployment: we prioritize use cases, design the architecture and support rollout.',
    },
  },
  {
    id: 'sv-03',
    icon: 'Target',
    title: { es: 'Retos de datos', en: 'Data challenges' },
    desc: {
      es: 'Reto abierto con la comunidad sobre un dataset real de tu organización, con solución y métricas entregadas.',
      en: 'An open community challenge on a real dataset from your organization, delivered with solutions and metrics.',
    },
  },
  {
    id: 'sv-04',
    icon: 'ScanSearch',
    title: { es: 'Auditoría de prompts', en: 'Prompt auditing' },
    desc: {
      es: 'Revisión de prompts, cadenas y system messages: riesgos, coste latente y plan de corrección priorizado.',
      en: 'Review of prompts, chains and system messages: risk, hidden cost and a prioritized fix plan.',
    },
  },
  {
    id: 'sv-05',
    icon: 'MessagesSquare',
    title: { es: 'Mentorías 1:1', en: '1:1 mentoring' },
    desc: {
      es: 'Sesiones individuales con mentores senior sobre tu proyecto real, con revisión de código y plan de carrera.',
      en: 'Individual sessions with senior mentors on your real project, with code review and career planning.',
    },
  },
  {
    id: 'sv-06',
    icon: 'Users',
    title: { es: 'Comunidad privada', en: 'Private community' },
    desc: {
      es: 'Espacio permanente para tu organización: sesiones, plantillas, revisiones de proyecto y correo entre pares.',
      en: 'A permanent space for your organization: sessions, templates, project reviews and peer correspondence.',
    },
  },
  {
    id: 'sv-07',
    icon: 'Presentation',
    title: { es: 'Programas ejecutivos', en: 'Executive programs' },
    desc: {
      es: 'Jornadas y programas para comités de dirección: mapa de oportunidades, riesgos y decisiones de inversión.',
      en: 'Days and programs for executive committees: opportunity maps, risks and investment decisions.',
    },
  },
  {
    id: 'sv-08',
    icon: 'ClipboardCheck',
    title: { es: 'Evaluación de modelos', en: 'Model evaluation' },
    desc: {
      es: 'Diseño de golden sets, jueces calibrados y comparativas honestas entre modelos para tu caso de uso concreto.',
      en: 'Golden-set design, calibrated judges and honest model comparisons for your specific use case.',
    },
  },
  {
    id: 'sv-09',
    icon: 'Wrench',
    title: { es: 'Enablement técnico', en: 'Technical enablement' },
    desc: {
      es: 'Onboarding acelerado para tus equipos de ingeniería: stacks, buenas prácticas y estándares internos de IA.',
      en: 'Accelerated onboarding for your engineering teams: stacks, good practices and internal AI standards.',
    },
  },
  {
    id: 'sv-10',
    icon: 'Microscope',
    title: { es: 'Research fellowships', en: 'Research fellowships' },
    desc: {
      es: 'Becas de investigación con partners académicos para equipos que quieren publicar y prototipar en la frontera.',
      en: 'Research fellowships with academic partners for teams that want to publish and prototype at the frontier.',
    },
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'fq-01',
    q: { es: '¿Cómo es el proceso de admisión?', en: 'What does the admission process look like?' },
    a: {
      es: 'Completas un formulario breve, revisamos tu perfil y agendamos una llamada de 20 minutos para validar nivel y objetivos. Recibes respuesta en un plazo máximo de 48 horas hábiles.',
      en: 'You complete a short form, we review your profile and schedule a 20-minute call to confirm level and goals. You hear back within 48 business hours.',
    },
  },
  {
    id: 'fq-02',
    q: { es: '¿Qué precios tienen los programas?', en: 'What do the programs cost?' },
    a: {
      es: 'Los cursos self-paced empiezan en 290 €, los programas híbridos entre 790 € y 1.900 € y los bootcamps intensivos entre 2.100 € y 2.900 €. Hay pago en tres plazos y becas parciales para perfiles de la comunidad.',
      en: 'Self-paced courses start at €290, hybrid programs run from €790 to €1,900 and intensive bootcamps from €2,100 to €2,900. Three-part payment and partial scholarships are available for community profiles.',
    },
  },
  {
    id: 'fq-03',
    q: { es: '¿Qué requisitos técnicos hay que cumplir?', en: 'What technical requirements do I need?' },
    a: {
      es: 'Para los programas de iniciación basta con ordenador portátil, Python básico y comodidad con la línea de comandos. Los tracks avanzados exigen experiencia previa en programación o datos.',
      en: 'For introductory programs a laptop, basic Python and comfort with the command line are enough. Advanced tracks require prior programming or data experience.',
    },
  },
  {
    id: 'fq-04',
    q: { es: '¿En qué idioma se imparte?', en: 'What language are classes taught in?' },
    a: {
      es: 'La comunidad es bilingüe: cada programa se imparte en español e inglés en grupos separados, y todo el material, plantillas y grabaciones están disponibles en ambos idiomas.',
      en: 'The community is bilingual: each program runs in Spanish and English in separate cohorts, and all material, templates and recordings are available in both languages.',
    },
  },
  {
    id: 'fq-05',
    q: { es: '¿Cuánto tiempo tengo que dedicar cada semana?', en: 'How much time do I need per week?' },
    a: {
      es: 'Entre 5 y 10 horas semanales según el formato: los self-paced son flexibles, los híbridos combinan dos sesiones en directo y los bootcamps exigen entre 12 y 15 horas.',
      en: 'Between 5 and 10 hours a week depending on format: self-paced is flexible, hybrid adds two live sessions and bootcamps demand 12 to 15 hours.',
    },
  },
  {
    id: 'fq-06',
    q: { es: '¿Emiten certificado al finalizar?', en: 'Do you issue a certificate on completion?' },
    a: {
      es: 'Sí. Emitimos certificado verificable al completar el 80 % de las actividades y el proyecto final, con identificador único comprobable por terceros.',
      en: 'Yes. We issue a verifiable certificate once you complete 80 % of the activities and the final project, with a unique ID third parties can check.',
    },
  },
  {
    id: 'fq-07',
    q: { es: '¿La formación es válida fuera de mi país?', en: 'Is the training recognized outside my country?' },
    a: {
      es: 'Nuestros alumnos están en 40 países y los certificados son aceptados por equipos de producto e ingeniería de empresas multinacionales. No sustituyen títulos universitarios oficiales.',
      en: 'Our students span 40 countries and certificates are accepted by product and engineering teams in multinational companies. They do not replace official university degrees.',
    },
  },
  {
    id: 'fq-08',
    q: { es: '¿Trabajáis con empresas y equipos?', en: 'Do you work with companies and teams?' },
    a: {
      es: 'Sí: formación in-company, talleres corporativos, consultoría, auditoría de prompts y comunidades privadas. Trabajamos con equipos de 5 a 500 personas.',
      en: 'Yes: in-company training, corporate workshops, consulting, prompt auditing and private communities. We work with teams of 5 to 500 people.',
    },
  },
  {
    id: 'fq-09',
    q: { es: '¿Hay política de reembolso?', en: 'Is there a refund policy?' },
    a: {
      es: 'Puedes solicitar reembolso íntegro hasta 14 días después del inicio si no has superado el 20 % del contenido. Después ofrecemos cambio de cohorte sin coste.',
      en: 'You can request a full refund up to 14 days after the start if you have not gone past 20 % of the content. Afterwards we offer a free cohort change.',
    },
  },
  {
    id: 'fq-10',
    q: { es: '¿Necesito un nivel técnico alto?', en: 'Do I need a high technical level?' },
    a: {
      es: 'No. El 40 % de nuestros alumnos viene de perfiles de negocio, producto o investigación. Cada track indica su nivel y existe ruta de puente para nivel beginner.',
      en: 'No. Forty percent of our students come from business, product or research backgrounds. Every track states its level and there is a bridge route for beginners.',
    },
  },
  {
    id: 'fq-11',
    q: { es: '¿Qué incluye el acceso a la comunidad?', en: 'What does community access include?' },
    a: {
      es: 'Acceso de por vida a sesiones mensuales, canal de dudas, revisión de proyectos, biblioteca de plantillas y directorio de herramientas actualizado.',
      en: 'Lifetime access to monthly sessions, a Q&A channel, project reviews, a template library and an updated tool directory.',
    },
  },
  {
    id: 'fq-12',
    q: { es: '¿Todo es online o hay clases presenciales?', en: 'Is everything online or are there in-person classes?' },
    a: {
      es: 'El 80 % es online en directo o a tu ritmo. Organizamos además encuentros presenciales en Madrid, Barcelona, Ciudad de México, Bogotá, Buenos Aires y Lisboa.',
      en: 'Eighty percent is online, live or on demand. We also run in-person gatherings in Madrid, Barcelona, Mexico City, Bogotá, Buenos Aires and Lisbon.',
    },
  },
];

export const methodology: {
  id: string;
  phase: 1 | 2 | 3 | 4;
  title: { es: string; en: string };
  desc: { es: string; en: string };
}[] = [
  {
    id: 'phase-1',
    phase: 1,
    title: { es: 'Punto concreto', en: 'Concrete starting point' },
    desc: {
      es: 'Definimos el problema real detrás de la petición: quién sufre el cuello de botella, qué dato lo demuestra y qué decisión cambia si lo resolvemos. Sin esto, la IA solo añade velocidad a la dirección equivocada.',
      en: 'We define the real problem behind the request: who suffers the bottleneck, what data proves it and what decision changes if we solve it. Without this step, AI only adds speed in the wrong direction.',
    },
  },
  {
    id: 'phase-2',
    phase: 2,
    title: { es: 'Fuerzas computacionales', en: 'Computational forces' },
    desc: {
      es: 'Delegamos investigación y análisis a los modelos con instrucciones, fuentes y límites claros. Aprendes a dirigir fuerzas computacionales en lugar de teclear tú solo: más alcance, mismo criterio.',
      en: 'We delegate research and analysis to models with clear instructions, sources and limits. You learn to direct computational forces instead of typing alone: more reach, same judgment.',
    },
  },
  {
    id: 'phase-3',
    phase: 3,
    title: { es: 'Resultado aplicable', en: 'Applicable result' },
    desc: {
      es: 'Convertimos el resultado en un prototipo medible: métrica de éxito fijada antes de escribir código, evaluación con datos reales y criterios de paso o no paso. El entregable es algo que se puede usar o rechazar.',
      en: 'We turn the output into a measurable prototype: a success metric set before any code, evaluation on real data and go/no-go criteria. The deliverable is something you can use or reject.',
    },
  },
  {
    id: 'phase-4',
    phase: 4,
    title: { es: 'Amplificación', en: 'Amplification' },
    desc: {
      es: 'Escalamos lo que funciona en la comunidad y en la empresa: plantillas, documentación, formación de compañeros y métricas de adopción. Lo que empezó como un piloto acaba convertido en proceso del equipo.',
      en: 'We scale what works across the community and the company: templates, documentation, peer training and adoption metrics. What started as a pilot becomes a team process.',
    },
  },
];

export const partners: { name: string; href?: string }[] = [
  { name: 'Universidad Politécnica de Madrid', href: 'https://www.upm.es' },
  { name: 'Universidad de Chile', href: 'https://uchile.cl' },
  { name: 'Instituto Tecnológico de Monterrey', href: 'https://tec.mx' },
  { name: 'NVIDIA Inception', href: 'https://www.nvidia.com/en-us/startups/' },
  { name: 'Hugging Face', href: 'https://huggingface.co' },
  { name: 'Cloudflare', href: 'https://www.cloudflare.com' },
  { name: 'JetBrains', href: 'https://www.jetbrains.com' },
  { name: 'Datadog', href: 'https://www.datadoghq.com' },
  { name: 'Red Bull Batalla Tech', href: 'https://www.redbull.com' },
  { name: 'Python España', href: 'https://pythonesp.es' },
  { name: 'PyLadies Madrid', href: 'https://pyladies.com' },
  { name: 'Open Source Initiative', href: 'https://opensource.org' },
  { name: 'Spain AI', href: 'https://spain.ai' },
  { name: 'Data Community LATAM', href: 'https://www.datacommunitylatam.org' },
  { name: 'Mujeres en STEM' },
];
