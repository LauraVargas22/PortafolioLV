const asset = (fileName) => new URL(`../images/${fileName}`, import.meta.url).href;

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

export const homeContent = {
  hero: {
    greeting: "I'm Laura Vargas",
    title: 'Software Developer',
    description:
      'Experienced in frontend and backend development creating interactive and user friendly experiences.',
    primaryCta: {
      label: 'CV',
      href: 'https://www.canva.com/design/DAGpnJeNmq4/mliQF_3gsvryGqRamQYc1A/view?utm_content=DAGpnJeNmq4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3cedd1cb24',
    },
    image: asset('aboutme.png'),
  },
  about: {
    title: 'About Me',
    paragraphs: [
      'Software developer in training with intermediate English skills and experience in programming languages and technologies such as Python, HTML, CSS, JavaScript, C#, Git, GitHub, MySQL, and PostgreSQL.',
      'She has worked on web development projects, database design, and console applications.',
      'She is known for her effective communication, leadership, adaptability, and teamwork skills, which facilitate collaboration in both academic and professional environments.',
    ],
    cards: [
      {
        src: asset('Front.png'),
        alt: 'Frontend development illustration',
        title: 'Frontend',
        subtitle: 'Developer',
      },
      {
        src: asset('Pc.jpg'),
        alt: 'Database design illustration',
        title: 'Database',
        subtitle: 'Designer',
      },
      {
        src: asset('Back.png'),
        alt: 'Backend development illustration',
        title: 'Backend',
        subtitle: 'Developer',
      },
    ],
  },
  projects: {
    eyebrow: 'Seleccion de proyectos',
    title: 'Proyectos destacados',
    cta: {
      label: 'Ver trayectoria',
      href: 'experience.html',
    },
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Construyamos algo con personalidad y estructura',
    description:
      'Si quieres hablar sobre colaboraciones, oportunidades o simplemente conectar, este espacio queda como punto de contacto principal del portafolio.',
    email: 'lauramarianavargasrojas@gmail.com',
    cv: 'https://www.canva.com/design/DAGpnJeNmq4/mliQF_3gsvryGqRamQYc1A/view?utm_content=DAGpnJeNmq4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3cedd1cb24',
    image: asset('contacto.png'),
  },
};

export const personalityContent = {
  banner: {
    eyebrow: 'Personality',
    title: 'Mision, vision y valores como parte del perfil profesional',
    description:
      'Esta pagina resume la manera en la que quiero crecer como desarrolladora: con criterio tecnico, empatia y una comunicacion clara.',
  },
  mission:
    'Mediante mi experiencia en desarrollo de software y competencias interpersonales, busco resolver retos tecnologicos fomentando entornos de trabajo colaborativos que impulsen el progreso de la sociedad.',
  vision:
    'Quiero destacar como desarrolladora de software resaltando mis habilidades interpersonales, adaptandome a diferentes contextos y creando soluciones tecnologicas inclusivas y accesibles.',
  values: [
    {
      title: 'Empatia',
      description:
        'Comprender a los demas para comunicar ideas con claridad y construir mejores soluciones.',
    },
    {
      title: 'Liderazgo',
      description:
        'Inspirar y motivar desde la confianza, la responsabilidad y la organizacion.',
    },
    {
      title: 'Companerismo',
      description:
        'Colaborar con apertura para que el trabajo en equipo sea realmente efectivo.',
    },
  ],
  missionImage: asset('mision.png'),
  visionImage: asset('vision.png'),
  valuesImage: asset('valores.png'),
  interestsDraft: {
    eyebrow: 'Lecturas',
    title: 'Intereses literarios',
    description:
      'Cada libro abre una conversacion distinta entre la imaginacion, la memoria y la forma en la que entiendo el mundo.',
  },
};

export const studiesContent = {
  banner: {
    eyebrow: 'Recorrido formativo',
    title: 'Estudios',
    description:
      'Un recorrido por mi formacion academica y los hitos que han fortalecido mis habilidades tecnicas, comunicativas y de aprendizaje continuo.',
  },
  coursesDraft: {
    eyebrow: 'Credenciales',
    title: 'Cursos adicionales',
    description:
      'A continuacion se presentan cursos que fortalecen mi crecimiento profesional y consolidan mis habilidades tecnicas y blandas.',
    courses: [
      {
        title: 'English for IT 2',
        issuer: 'Cisco Networking Academy',
        issuedAt: 'Julio 2026',
        credentialUrl:
          'https://www.credly.com/badges/e2c6399b-2e8d-409b-8de3-765fe80d9c85/public_url',
        image: asset('english-for-it-2-badge.png'),
        imageAlt: 'Credencial English for IT 2 emitida por Cisco',
        summary:
          'Credencial orientada al ingles aplicado en entornos IT, con enfoque en software, networking, customer support y security engineering en nivel B2.',
        tags: ['English for IT', 'Nivel B2'],
      },
      {
        title: 'English for IT 1',
        issuer: 'Cisco Networking Academy',
        issuedAt: 'Julio 2026',
        credentialUrl:
          'https://www.credly.com/badges/e05232cf-7f33-4fb0-b746-78b61511868a/public_url',
        image: asset('english-for-it-1-badge.png'),
        imageAlt: 'Credencial English for IT 1 emitida por Cisco',
        summary:
          'Credencial orientada al ingles aplicado en entornos IT, con enfoque en software, networking, customer support y security engineering en nivel B1.',
        tags: ['English for IT', 'Nivel B1'],
      },
      {
        title: 'Artificial Intelligence Fundamentals',
        issuer: 'IBM',
        issuedAt: 'Agosto 2025',
        credentialUrl:
          'https://www.credly.com/earner/earned/badge/fed03078-d710-44a1-a977-e5ccaac7f3b9',
        image: asset('artificial-intelligence.png'),
        imageAlt: 'Credencial Artificial Intelligence Fundamentals emitida por IBM',
        summary:
          'Credencial orientada a la comprension de conceptos fundamentales de inteligencia artificial, incluyendo aprendizaje automatico, redes neuronales y procesamiento del lenguaje natural.',
        tags: ['Inteligencia Artificial'],
      },
      {
        title: 'Aspectos basicos: Datos en todas partes',
        issuer: 'Google',
        issuedAt: 'Diciembre 2024',
        credentialUrl:
          'https://www.coursera.org/account/accomplishments/records/76U4VNP7NTF6',
        image: asset('datos.png'),
        imageAlt: 'Credencial Aspectos basicos: Datos en todas partes emitida por Google',
        summary:
          'Credencial orientada a la comprension de conceptos fundamentales de datos, incluyendo su recopilacion, analisis y visualizacion para la toma de decisiones.',
        tags: ['Datos', 'Analisis'],
      },
    ],
  },
};

export const experienceContent = {
  banner: {
    eyebrow: 'Trayectoria creativa',
    title: 'Trayectoria',
    description:
      'Una coleccion de proyectos personales y colaborativos que refleja mi evolucion en desarrollo, diseno de interfaces, logica y construccion de experiencias utiles.',
  },
};
