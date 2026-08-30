import { getCurrentLanguage, resolveLocalizedValue } from '../i18n';

const studiesTimelineContent = {
  eyebrow: {
    es: 'Recorrido',
    en: 'Journey',
  },
  title: {
    es: 'Trayectoria académica y profesional',
    en: 'Academic and professional path',
  },
  description: {
    es: 'Aquí se encuentran algunos logros académicos y profesionales que han fortalecido mi desarrollo integral.',
    en: 'Here are some academic and professional achievements that have strengthened my overall growth.',
  },
  skillsTitle: {
    es: 'Habilidades desarrolladas',
    en: 'Skills developed',
  },
  emptyState: {
    es: 'No hay estudios registrados por ahora.',
    en: 'No studies have been added yet.',
  },
  items: [
    {
      title: {
        es: 'Estudios principales',
        en: 'Core studies',
      },
      category: {
        es: 'Formación académica',
        en: 'Academic education',
      },
      period: {
        es: 'Bachiller con profundización en pedagogía',
        en: 'High school diploma with emphasis in pedagogy',
      },
      description: {
        es: 'Escuela Normal Superior María Auxiliadora - Noviembre 2023',
        en: 'Escuela Normal Superior Maria Auxiliadora - November 2023',
      },
      skills: [
        {
          es: 'Trabajo en equipo',
          en: 'Teamwork',
        },
        {
          es: 'Pensamiento crítico',
          en: 'Critical thinking',
        },
        {
          es: 'Liderazgo',
          en: 'Leadership',
        },
        {
          es: 'Resolución de problemas',
          en: 'Problem solving',
        },
      ],
    },
    {
      title: {
        es: 'Lengua extranjera',
        en: 'Foreign language',
      },
      category: {
        es: 'Inglés',
        en: 'English',
      },
      period: {
        es: 'Inglés con enfoque académico',
        en: 'Academic English track',
      },
      description: {
        es: 'Centro de Idiomas Connect4 - Julio 2024',
        en: 'Connect4 Language Center - July 2024',
      },
      skills: ['Speaking', 'Writing', 'Reading'],
    },
    {
      title: {
        es: 'Técnico en Desarrollo de Software',
        en: 'Software Development Technician',
      },
      category: {
        es: 'Programación',
        en: 'Programming',
      },
      period: {
        es: 'Programación y desarrollo de software',
        en: 'Programming and software development',
      },
      description: {
        es: 'Campuslands - Julio 2025',
        en: 'Campuslands - July 2025',
      },
      skills: [
        {
          es: 'Lógica de programación',
          en: 'Programming logic',
        },
        {
          es: 'Análisis de bases de datos',
          en: 'Database analysis',
        },
        {
          es: 'Desarrollo web',
          en: 'Web development',
        },
        {
          es: 'Arquitectura hexagonal',
          en: 'Hexagonal architecture',
        },
      ],
    },
    {
      title: {
        es: 'Ingeniería en Ciencia de Datos',
        en: 'Data Science Engineering',
      },
      category: {
        es: 'Ingeniería',
        en: 'Engineering',
      },
      period: {
        es: 'Universidad Industrial de Santander',
        en: 'Industrial University of Santander',
      },
      description: {
        es: 'UIS - Cursando actualmente',
        en: 'UIS - Currently studying',
      },
      skills: [
        {
          es: 'Análisis de datos',
          en: 'Data analysis',
        },
        {
          es: 'Lógica matemática',
          en: 'Mathematical reasoning',
        },
      ],
    },
    {
      title: {
        es: 'Trayectoria profesional',
        en: 'Professional experience',
      },
      category: {
        es: 'Desarrollo de software',
        en: 'Software development',
      },
      period: {
        es: 'DATAGLOBAL SAS',
        en: 'DATAGLOBAL SAS',
      },
      description: {
        es: 'Diciembre 2025 - Actualmente',
        en: 'December 2025 - Present',
      },
      skills: [
        {
          es: 'Estructuras de datos',
          en: 'Data structures',
        },
        {
          es: 'Aplicativos web',
          en: 'Web applications',
        },
        {
          es: 'Buenas prácticas de desarrollo',
          en: 'Development best practices',
        },
        {
          es: 'Trabajo en equipo',
          en: 'Teamwork',
        },
      ],
    },
  ],
};

export const getStudiesTimelineContent = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(studiesTimelineContent, language);
