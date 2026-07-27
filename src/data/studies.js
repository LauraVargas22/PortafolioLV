import { getCurrentLanguage, resolveLocalizedValue } from '../i18n';

const studiesTimelineContent = {
  eyebrow: {
    es: 'Recorrido',
    en: 'Journey',
  },
  title: {
    es: 'Trayectoria academica y profesional',
    en: 'Academic and professional path',
  },
  description: {
    es: 'Aqui se encuentran algunos hitos academicos y profesionales que han fortalecido mi desarrollo integral.',
    en: 'Here are some academic and professional milestones that have strengthened my overall growth.',
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
        es: 'Formacion academica',
        en: 'Academic education',
      },
      period: {
        es: 'Bachiller con profundizacion en pedagogia',
        en: 'High school diploma with emphasis in pedagogy',
      },
      description: {
        es: 'Escuela Normal Superior Maria Auxiliadora - Noviembre 2023',
        en: 'Escuela Normal Superior Maria Auxiliadora - November 2023',
      },
      skills: [
        {
          es: 'Trabajo en equipo',
          en: 'Teamwork',
        },
        {
          es: 'Pensamiento critico',
          en: 'Critical thinking',
        },
        {
          es: 'Liderazgo',
          en: 'Leadership',
        },
        {
          es: 'Resolucion de problemas',
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
        es: 'Ingles',
        en: 'English',
      },
      period: {
        es: 'Ingles con enfoque academico',
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
        es: 'Tecnico en Desarrollo de Software',
        en: 'Software Development Technician',
      },
      category: {
        es: 'Programacion',
        en: 'Programming',
      },
      period: {
        es: 'Programacion y desarrollo de software',
        en: 'Programming and software development',
      },
      description: {
        es: 'Campuslands - Julio 2025',
        en: 'Campuslands - July 2025',
      },
      skills: [
        {
          es: 'Logica de programacion',
          en: 'Programming logic',
        },
        {
          es: 'Analisis de bases de datos',
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
        es: 'Ingenieria en Ciencia de Datos',
        en: 'Data Science Engineering',
      },
      category: {
        es: 'Ingenieria',
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
          es: 'Analisis de datos',
          en: 'Data analysis',
        },
        {
          es: 'Logica matematica',
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
          es: 'Buenas practicas de desarrollo',
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
