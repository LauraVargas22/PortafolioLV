import { getCurrentLanguage, resolveLocalizedValue } from '../i18n';

const asset = (fileName) =>
  new URL(`../images/books/${fileName}`, import.meta.url).href;

const bookEntries = [
  {
    id: 'noticia-de-un-secuestro',
    title: {
      es: 'Noticia de un secuestro',
      en: 'News of a Kidnapping',
    },
    author: 'Gabriel García Márquez',
    cover: asset('noticia-secuestro.png'),
    coverAlt: {
      es: 'Portada de Noticia de un secuestro',
      en: 'Cover of News of a Kidnapping',
    },
    status: {
      es: 'Finalizado',
      en: 'Finished',
    },
    review: {
      es: 'Una reconstrucción periodística impactante que muestra las consecuencias del narcotráfico en Colombia a través de relatos reales llenos de tensión y humanidad.',
      en: 'A powerful journalistic reconstruction that shows the consequences of drug trafficking in Colombia through real stories full of tension and humanity.',
    },
    rating: 4.8,
    year: 1996,
    accent: '#632a2a',
    accentSoft: 'rgba(194, 47, 21, 0.43)',
  },
  {
    id: 'la-rebelion-de-la-granja',
    title: {
      es: 'La rebelión de la granja',
      en: 'Animal Farm',
    },
    author: 'George Orwell',
    cover: asset('rebelion-granja.png'),
    coverAlt: {
      es: 'Portada de La rebelión de la granja',
      en: 'Cover of Animal Farm',
    },
    status: {
      es: 'En curso',
      en: 'Reading',
    },
    review: {
      es: 'Una sátira política breve pero profunda que demuestra cómo el poder puede transformar incluso las mejores intenciones.',
      en: 'A short but profound political satire that shows how power can transform even the best intentions.',
    },
    rating: 4.7,
    year: 1945,
    accent: '#C2410C',
    accentSoft: 'rgba(194, 65, 12, 0.22)',
  },
  {
    id: 'jaime-garzon-el-genial-impertinente',
    title: {
      es: 'Jaime Garzón: El genial impertinente',
      en: 'Jaime Garzon: The Brilliant Troublemaker',
    },
    author: 'Germán Izquierdo',
    cover: asset('jaime-garzon.png'),
    coverAlt: {
      es: 'Portada de Jaime Garzón: El genial impertinente',
      en: 'Cover of Jaime Garzon: The Brilliant Troublemaker',
    },
    status: {
      es: 'Finalizado',
      en: 'Finished',
    },
    review: {
      es: 'Una biografía que permite conocer la vida, el humor y el legado de una de las figuras más influyentes de la historia reciente de Colombia.',
      en: 'A biography that explores the life, humor, and legacy of one of the most influential figures in recent Colombian history.',
    },
    rating: 4.9,
    year: 2002,
    accent: '#2563EB',
    accentSoft: 'rgba(37, 99, 235, 0.22)',
  },
  {
    id: 'harry-potter-y-la-piedra-filosofal',
    title: {
      es: 'Harry Potter',
      en: "Harry Potter",
    },
    author: 'J. K. Rowling',
    cover: asset('harry-potter.png'),
    coverAlt: {
      es: 'Portada de Harry Potter y la piedra filosofal',
      en: "Cover of Harry Potter and the Philosopher's Stone",
    },
    status: {
      es: 'Finalizado',
      en: 'Finished',
    },
    review: {
      es: 'Saga de los libros de Harry Potter que combina amistad, magia y crecimiento personal en un universo imaginativo.',
      en: 'The Harry Potter book series that combines friendship, magic, and personal growth in an imaginative universe.',
    },
    rating: 5,
    year: 1997,
    accent: '#7C3AED',
    accentSoft: 'rgba(124, 58, 237, 0.22)',
  },
  {
    id: 'corazon-diario-de-un-nino',
    title: {
      es: 'Corazón: Diario de un niño',
      en: "Heart: A Boy's Journal",
    },
    author: 'Edmondo De Amicis',
    cover: asset('corazon.png'),
    coverAlt: {
      es: 'Portada de Corazón: Diario de un niño',
      en: "Cover of Heart: A Boy's Journal",
    },
    status: {
      es: 'Finalizado',
      en: 'Finished',
    },
    review: {
      es: 'Una historia clásica que transmite valores como la empatía, la amistad, el esfuerzo y el respeto a través de las experiencias de un niño durante un año escolar.',
      en: 'A classic story that shares values such as empathy, friendship, effort, and respect through the experiences of a child during a school year.',
    },
    rating: 4.6,
    year: 1886,
    accent: '#DC2626',
    accentSoft: 'rgba(220, 38, 38, 0.22)',
  },
  {
    id: 'el-amor-en-los-tiempos-del-colera',
    title: {
      es: 'El amor en los tiempos del cólera',
      en: 'Love in the Time of Cholera',
    },
    author: 'Gabriel García Márquez',
    cover: asset('amor-colera.png'),
    coverAlt: {
      es: 'Portada de El amor en los tiempos del cólera',
      en: 'Cover of Love in the Time of Cholera',
    },
    status: {
      es: 'Finalizado',
      en: 'Finished',
    },
    review: {
      es: 'Una novela sobre la paciencia, el paso del tiempo y la persistencia del amor, escrita con el estilo característico del realismo mágico.',
      en: 'A novel about patience, the passage of time, and the persistence of love, written in the distinctive style of magical realism.',
    },
    rating: 4.5,
    year: 1985,
    accent: '#BE123C',
    accentSoft: 'rgba(190, 18, 60, 0.22)',
  },
  {
    id: 'hamlet',
    title: 'Hamlet',
    author: 'William Shakespeare',
    cover: asset('hamlet.png'),
    coverAlt: {
      es: 'Portada de Hamlet',
      en: 'Cover of Hamlet',
    },
    status: {
      es: 'Finalizado',
      en: 'Finished',
    },
    review: {
      es: 'Una de las tragedias más importantes de Shakespeare, centrada en la venganza, el poder y los conflictos internos del ser humano.',
      en: "One of Shakespeare's most important tragedies, centered on revenge, power, and the inner conflicts of human beings.",
    },
    rating: 4.4,
    year: 1603,
    accent: '#334155',
    accentSoft: 'rgba(51, 65, 85, 0.22)',
  },
  {
    id: 'otelo',
    title: {
      es: 'Otelo',
      en: 'Othello',
    },
    author: 'William Shakespeare',
    cover: asset('otelo.png'),
    coverAlt: {
      es: 'Portada de Otelo',
      en: 'Cover of Othello',
    },
    status: {
      es: 'Finalizado',
      en: 'Finished',
    },
    review: {
      es: 'Una tragedia que explora los efectos destructivos de los celos, la manipulación y la desconfianza en las relaciones humanas.',
      en: 'A tragedy that explores the destructive effects of jealousy, manipulation, and distrust in human relationships.',
    },
    rating: 4.5,
    year: 1604,
    accent: '#0F766E',
    accentSoft: 'rgba(15, 118, 110, 0.22)',
  },
];

export const getBooks = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(bookEntries, language);
