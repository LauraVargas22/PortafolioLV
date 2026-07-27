import { getCurrentLanguage, resolveLocalizedValue } from '../i18n';

const asset = (fileName) => new URL(`../images/${fileName}`, import.meta.url).href;
const resumeUrl =
  'https://www.canva.com/design/DAGpnJeNmq4/mliQF_3gsvryGqRamQYc1A/view?utm_content=DAGpnJeNmq4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3cedd1cb24';

const navigationContent = {
  brandTitle: 'Laura Vargas',
  brandSubtitle: {
    es: 'Desarrolladora de Software',
    en: 'Software Developer',
  },
  menuLabel: {
    es: 'Abrir menu',
    en: 'Open menu',
  },
  navLabel: {
    es: 'Navegacion principal',
    en: 'Primary navigation',
  },
  languageLabel: {
    es: 'Cambiar idioma',
    en: 'Change language',
  },
  links: {
    home: {
      label: {
        es: 'Inicio',
        en: 'Home',
      },
    },
    personality: {
      label: {
        es: 'Sobre mi',
        en: 'About me',
      },
    },
    studies: {
      label: {
        es: 'Estudios',
        en: 'Studies',
      },
    },
    experience: {
      label: {
        es: 'Trayectoria',
        en: 'Experience',
      },
    },
    contact: {
      label: {
        es: 'Contacto',
        en: 'Contact',
      },
    },
  },
};

const footerContent = {
  name: 'Laura Mariana Vargas Rojas',
  role: {
    es: 'Desarrolladora de Software',
    en: 'Software Developer',
  },
  study: {
    es: 'Estudiante de Ingenieria en Ciencia de Datos',
    en: 'Data Science Engineering Student',
  },
};

const homeContent = {
  hero: {
    greeting: {
      es: 'Soy Laura Vargas',
      en: "I'm Laura Vargas",
    },
    title: {
      es: 'Desarrolladora de Software',
      en: 'Software Developer',
    },
    description: {
      es: 'Con experiencia en desarrollo frontend y backend creando experiencias interactivas, claras y amigables para las personas.',
      en: 'Experienced in frontend and backend development, building interactive, clear, and user-friendly experiences.',
    },
    primaryCta: {
      label: {
        es: 'Ver CV',
        en: 'View resume',
      },
      href: resumeUrl,
    },
    image: asset('aboutme.png'),
    imageAlt: {
      es: 'Retrato de Laura Vargas',
      en: 'Portrait of Laura Vargas',
    },
  },
  about: {
    eyebrow: {
      es: 'Sobre mi',
      en: 'About me',
    },
    title: {
      es: 'Perfil y enfoque',
      en: 'Profile and approach',
    },
    paragraphs: [
      {
        es: 'Desarrolladora de software en formacion con nivel intermedio de ingles y experiencia en tecnologias como Python, HTML, CSS, JavaScript, C#, Git, GitHub, MySQL y PostgreSQL.',
        en: 'Software developer in training with intermediate English skills and hands-on experience with technologies such as Python, HTML, CSS, JavaScript, C#, Git, GitHub, MySQL, and PostgreSQL.',
      },
      {
        es: 'He participado en proyectos de desarrollo web, diseno de bases de datos y aplicaciones de consola, fortaleciendo tanto la parte tecnica como la capacidad de organizar soluciones con criterio.',
        en: 'I have worked on web development projects, database design, and console applications, strengthening both my technical foundation and my ability to organize solutions with intention.',
      },
      {
        es: 'Me caracterizan la comunicacion, el liderazgo, la adaptabilidad y el trabajo en equipo, cualidades que facilitan la colaboracion en entornos academicos y profesionales.',
        en: 'I am known for communication, leadership, adaptability, and teamwork, qualities that make collaboration easier in both academic and professional environments.',
      },
    ],
    cards: [
      {
        src: asset('Front.png'),
        alt: {
          es: 'Ilustracion de desarrollo frontend',
          en: 'Frontend development illustration',
        },
        title: {
          es: 'Frontend',
          en: 'Frontend',
        },
        subtitle: {
          es: 'Desarrolladora',
          en: 'Developer',
        },
      },
      {
        src: asset('Pc.jpg'),
        alt: {
          es: 'Ilustracion de bases de datos',
          en: 'Database design illustration',
        },
        title: {
          es: 'Bases de datos',
          en: 'Databases',
        },
        subtitle: {
          es: 'Disenadora',
          en: 'Designer',
        },
      },
      {
        src: asset('Back.png'),
        alt: {
          es: 'Ilustracion de desarrollo backend',
          en: 'Backend development illustration',
        },
        title: {
          es: 'Backend',
          en: 'Backend',
        },
        subtitle: {
          es: 'Desarrolladora',
          en: 'Developer',
        },
      },
    ],
  },
  knowledge: {
    heading: {
      es: 'Tecnologias que manejo',
      en: 'Technologies I work with',
    },
    subheading: {
      es: 'Herramientas con las que construyo interfaces responsive, logica backend y bases de datos confiables.',
      en: 'Tools I use to build responsive interfaces, backend logic, and reliable databases.',
    },
    labels: {
      carouselLabel: {
        es: 'Carrusel de tecnologias',
        en: 'Technology carousel',
      },
      previous: {
        es: 'Mostrar tecnologias anteriores',
        en: 'Show previous technologies',
      },
      next: {
        es: 'Mostrar tecnologias siguientes',
        en: 'Show next technologies',
      },
      level: {
        es: 'Nivel de dominio',
        en: 'Proficiency',
      },
      goTo: {
        es: 'Ir a la tecnologia',
        en: 'Go to technology',
      },
    },
  },
  projects: {
    eyebrow: {
      es: 'Seleccion de proyectos',
      en: 'Project selection',
    },
    title: {
      es: 'Proyectos destacados',
      en: 'Featured projects',
    },
    repositoryLabel: {
      es: 'Repositorio',
      en: 'Repository',
    },
    paginationLabel: {
      es: 'Paginacion de proyectos',
      en: 'Project pagination',
    },
    previousPageLabel: {
      es: 'Pagina anterior',
      en: 'Previous page',
    },
    nextPageLabel: {
      es: 'Pagina siguiente',
      en: 'Next page',
    },
    cta: {
      label: {
        es: 'Ver trayectoria',
        en: 'View experience',
      },
      href: 'experience.html',
    },
  },
  contact: {
    eyebrow: {
      es: 'Contacto',
      en: 'Contact',
    },
    title: {
      es: 'Construyamos algo con personalidad y estructura',
      en: "Let's build something with personality and structure",
    },
    description: {
      es: 'Si quieres hablar sobre colaboraciones, oportunidades o simplemente conectar, este espacio queda como punto de contacto principal del portafolio.',
      en: 'If you want to talk about collaborations, opportunities, or simply connect, this section works as the main contact point of the portfolio.',
    },
    email: 'lauramarianavargasrojas@gmail.com',
    cv: resumeUrl,
    primaryCta: {
      label: {
        es: 'Contactame',
        en: 'Contact me',
      },
    },
    secondaryCta: {
      label: {
        es: 'Ver CV',
        en: 'View resume',
      },
    },
  },
};

const personalityContent = {
  pageTitle: {
    es: 'Un poco sobre mi',
    en: 'A little about me',
  },
  mission: {
    es: 'Mediante mi experiencia en desarrollo de software y competencias interpersonales, busco resolver retos tecnologicos fomentando entornos de trabajo colaborativos que impulsen el progreso de la sociedad.',
    en: 'Through my experience in software development and interpersonal skills, I aim to solve technological challenges while fostering collaborative environments that support social progress.',
  },
  vision: {
    es: 'Quiero destacar como desarrolladora de software resaltando mis habilidades interpersonales, adaptandome a diferentes contextos y creando soluciones tecnologicas inclusivas y accesibles.',
    en: 'I want to stand out as a software developer by relying on my interpersonal strengths, adapting to different contexts, and creating inclusive and accessible technological solutions.',
  },
  values: [
    {
      title: {
        es: 'Empatia',
        en: 'Empathy',
      },
      description: {
        es: 'Comprender a las personas para comunicar ideas con claridad y construir mejores soluciones.',
        en: 'Understanding people in order to communicate ideas clearly and build better solutions.',
      },
    },
    {
      title: {
        es: 'Liderazgo',
        en: 'Leadership',
      },
      description: {
        es: 'Inspirar y motivar desde la confianza, la responsabilidad y la organizacion.',
        en: 'Inspiring and motivating through trust, responsibility, and organization.',
      },
    },
    {
      title: {
        es: 'Companerismo',
        en: 'Collaboration',
      },
      description: {
        es: 'Colaborar con apertura para que el trabajo en equipo sea realmente efectivo.',
        en: 'Collaborating openly so teamwork becomes genuinely effective.',
      },
    },
  ],
  missionCard: {
    title: {
      es: 'Mision',
      en: 'Mission',
    },
    eyebrow: {
      es: 'Pilar esencial',
      en: 'Essential pillar',
    },
    alt: {
      es: 'Ilustracion de mision profesional',
      en: 'Professional mission illustration',
    },
  },
  visionCard: {
    title: {
      es: 'Vision',
      en: 'Vision',
    },
    eyebrow: {
      es: 'Direccion profesional',
      en: 'Professional direction',
    },
    alt: {
      es: 'Ilustracion de vision profesional',
      en: 'Professional vision illustration',
    },
  },
  valuesCard: {
    title: {
      es: 'Valores',
      en: 'Values',
    },
    eyebrow: {
      es: 'Base de colaboracion',
      en: 'Collaboration base',
    },
    copy: {
      es: 'Los valores que sostienen mi forma de aprender, colaborar y construir soluciones.',
      en: 'The values that support the way I learn, collaborate, and build solutions.',
    },
    alt: {
      es: 'Ilustracion de valores',
      en: 'Values illustration',
    },
  },
  missionImage: asset('mision.png'),
  visionImage: asset('vision.png'),
  valuesImage: asset('valores.png'),
  interests: {
    eyebrow: {
      es: 'Lecturas',
      en: 'Reading',
    },
    title: {
      es: 'Intereses literarios',
      en: 'Literary interests',
    },
    description: {
      es: 'Cada libro abre una conversacion distinta entre la imaginacion, la memoria y la forma en la que entiendo el mundo.',
      en: 'Every book opens a different conversation between imagination, memory, and the way I understand the world.',
    },
    labels: {
      carousel: {
        es: 'Carrusel de intereses literarios',
        en: 'Literary interests carousel',
      },
      previous: {
        es: 'Mostrar libro anterior',
        en: 'Show previous book',
      },
      next: {
        es: 'Mostrar libro siguiente',
        en: 'Show next book',
      },
      goTo: {
        es: 'Ir al libro',
        en: 'Go to book',
      },
      return: {
        es: 'Volver a la portada',
        en: 'Back to cover',
      },
      emptyState: {
        es: 'No hay libros disponibles para mostrar en este momento.',
        en: 'There are no books available to show right now.',
      },
      reviewBadge: {
        es: 'Resena',
        en: 'Review',
      },
      ratingLabel: {
        es: 'Calificacion',
        en: 'Rating',
      },
      byConnector: {
        es: 'de',
        en: 'by',
      },
      statusConnector: {
        es: 'Estado',
        en: 'Status',
      },
    },
  },
};

const studiesContent = {
  banner: {
    eyebrow: {
      es: 'Recorrido formativo',
      en: 'Learning journey',
    },
    title: {
      es: 'Estudios',
      en: 'Studies',
    },
    description: {
      es: 'Un recorrido por mi formacion academica y los hitos que han fortalecido mis habilidades tecnicas, comunicativas y de aprendizaje continuo.',
      en: 'A tour through my academic background and the milestones that have strengthened my technical, communication, and continuous-learning skills.',
    },
  },
  coursesDraft: {
    eyebrow: {
      es: 'Credenciales',
      en: 'Credentials',
    },
    title: {
      es: 'Cursos adicionales',
      en: 'Additional courses',
    },
    description: {
      es: 'Cursos y credenciales que fortalecen mi crecimiento profesional y consolidan mis habilidades tecnicas y blandas.',
      en: 'Courses and credentials that reinforce my professional growth and strengthen both my technical and soft skills.',
    },
    labels: {
      credentialAria: {
        es: 'Ver credencial de',
        en: 'View credential for',
      },
      certificate: {
        es: 'Certificado',
        en: 'Certificate',
      },
      viewCredential: {
        es: 'Ver credencial',
        en: 'View credential',
      },
      verified: {
        es: 'Verificado',
        en: 'Verified',
      },
      pendingDate: {
        es: 'Por confirmar',
        en: 'To be confirmed',
      },
      courseFallback: {
        es: 'Curso',
        en: 'Course',
      },
      issuerFallback: {
        es: 'Entidad emisora',
        en: 'Issuing organization',
      },
      emptyState: {
        es: 'No hay credenciales registradas por el momento.',
        en: 'No credentials have been added yet.',
      },
    },
    courses: [
      {
        title: {
          es: 'English for IT 2',
          en: 'English for IT 2',
        },
        issuer: 'Cisco Networking Academy',
        issuedAt: {
          es: 'Julio 2026',
          en: 'July 2026',
        },
        credentialUrl:
          'https://www.credly.com/badges/e2c6399b-2e8d-409b-8de3-765fe80d9c85/public_url',
        image: asset('english-for-it-2-badge.png'),
        imageAlt: {
          es: 'Credencial English for IT 2 emitida por Cisco',
          en: 'English for IT 2 credential issued by Cisco',
        },
        summary: {
          es: 'Credencial orientada al ingles aplicado en entornos IT, con enfoque en software, networking, soporte al cliente y seguridad en nivel B2.',
          en: 'Credential focused on English for IT environments, covering software, networking, customer support, and security at a B2 level.',
        },
        tags: ['English for IT', 'B2'],
      },
      {
        title: {
          es: 'English for IT 1',
          en: 'English for IT 1',
        },
        issuer: 'Cisco Networking Academy',
        issuedAt: {
          es: 'Julio 2026',
          en: 'July 2026',
        },
        credentialUrl:
          'https://www.credly.com/badges/e05232cf-7f33-4fb0-b746-78b61511868a/public_url',
        image: asset('english-for-it-1-badge.png'),
        imageAlt: {
          es: 'Credencial English for IT 1 emitida por Cisco',
          en: 'English for IT 1 credential issued by Cisco',
        },
        summary: {
          es: 'Credencial orientada al ingles aplicado en entornos IT, con enfoque en software, networking, soporte al cliente y seguridad en nivel B1.',
          en: 'Credential focused on English for IT environments, covering software, networking, customer support, and security at a B1 level.',
        },
        tags: ['English for IT', 'B1'],
      },
      {
        title: {
          es: 'Fundamentos de Inteligencia Artificial',
          en: 'Artificial Intelligence Fundamentals',
        },
        issuer: 'IBM',
        issuedAt: {
          es: 'Agosto 2025',
          en: 'August 2025',
        },
        credentialUrl:
          'https://www.credly.com/earner/earned/badge/fed03078-d710-44a1-a977-e5ccaac7f3b9',
        image: asset('artificial-intelligence.png'),
        imageAlt: {
          es: 'Credencial de Fundamentos de Inteligencia Artificial emitida por IBM',
          en: 'Artificial Intelligence Fundamentals credential issued by IBM',
        },
        summary: {
          es: 'Credencial orientada a la comprension de conceptos fundamentales de inteligencia artificial, incluyendo aprendizaje automatico, redes neuronales y procesamiento del lenguaje natural.',
          en: 'Credential focused on core artificial intelligence concepts, including machine learning, neural networks, and natural language processing.',
        },
        tags: ['IA', 'Fundamentos'],
      },
      {
        title: {
          es: 'Aspectos basicos: Datos en todas partes',
          en: 'Foundations: Data, Data, Everywhere',
        },
        issuer: 'Google',
        issuedAt: {
          es: 'Diciembre 2024',
          en: 'December 2024',
        },
        credentialUrl:
          'https://www.coursera.org/account/accomplishments/records/76U4VNP7NTF6',
        image: asset('datos.png'),
        imageAlt: {
          es: 'Credencial de fundamentos de datos emitida por Google',
          en: 'Data foundations credential issued by Google',
        },
        summary: {
          es: 'Credencial orientada a conceptos fundamentales de datos, incluyendo recopilacion, analisis y visualizacion para la toma de decisiones.',
          en: 'Credential focused on foundational data concepts, including collection, analysis, and visualization for decision-making.',
        },
        tags: ['Datos', 'Analisis'],
      },
    ],
  },
};

const experienceContent = {
  banner: {
    eyebrow: {
      es: 'Trayectoria creativa',
      en: 'Creative path',
    },
    title: {
      es: 'Trayectoria',
      en: 'Experience',
    },
    description: {
      es: 'Una coleccion de proyectos personales y colaborativos que refleja mi evolucion en desarrollo, diseno de interfaces, logica y construccion de experiencias utiles.',
      en: 'A collection of personal and collaborative projects that reflects my growth in development, interface design, logic, and useful digital experiences.',
    },
  },
  labels: {
    code: {
      es: 'Codigo',
      en: 'Code',
    },
    demo: {
      es: 'Demo',
      en: 'Demo',
    },
    repositoryAria: {
      es: 'Repositorio de',
      en: 'Repository for',
    },
    demoAria: {
      es: 'Demo de',
      en: 'Demo for',
    },
  },
};

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/LauraVargas22',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/laura-vargas2209s/',
  },
  {
    label: 'Email',
    href: 'mailto:lauramarianavargasrojas22@gmail.com',
  },
];

export const getNavigationContent = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(navigationContent, language);

export const getFooterContent = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(footerContent, language);

export const getHomeContent = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(homeContent, language);

export const getPersonalityContent = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(personalityContent, language);

export const getStudiesContent = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(studiesContent, language);

export const getExperienceContent = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(experienceContent, language);
