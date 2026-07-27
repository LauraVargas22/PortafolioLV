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
    eyebrow: 'Experience Preview',
    title: 'Proyectos Destacados',
    cta: {
      label: 'See More',
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
      'No duermas para descansar; duerme para soñar, porque los sueños están para cumplirse.',
  },
};

export const studiesContent = {
  banner: {
    eyebrow: 'Studies',
    title: 'Formacion academica y crecimiento continuo',
    description:
      'La pagina queda planteada como un espacio para ordenar tu cronologia de aprendizaje y los cursos que complementan tu perfil.',
  },
  timeline: [
    {
      stage: 'Formacion principal',
      status: 'Borrador',
      description:
        'Agregar institucion, periodo, enfoque academico y logros destacados de la formacion principal.',
    },
    {
      stage: 'Fortalecimiento tecnico',
      status: 'Borrador',
      description:
        'Agregar hitos relacionados con desarrollo de software, bases de datos, proyectos o practicas relevantes.',
    },
    {
      stage: 'Proximo paso',
      status: 'Borrador',
      description:
        'Reservado para especializaciones, certificaciones o metas formativas futuras.',
    },
  ],
  coursesDraft: {
    eyebrow: 'Draft',
    title: 'Cursos adicionales',
    description:
      'Zona lista para registrar cursos, bootcamps, certificaciones e iniciativas de aprendizaje complementario.',
    items: [
      'Curso o certificacion 1.',
      'Curso o certificacion 2.',
      'Ruta de aprendizaje futura.',
    ],
  },
};

export const experienceContent = {
  banner: {
    eyebrow: 'Experience',
    title: 'Proyectos con mayor contexto y detalle',
    description:
      'Esta pagina expande los proyectos del home y deja una base elegante para profundizar en objetivos, stack, decisiones y resultados.',
  },
};
