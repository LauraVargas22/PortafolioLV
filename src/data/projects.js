import { getCurrentLanguage, resolveLocalizedValue } from '../i18n';

const asset = (fileName) => new URL(`../images/${fileName}`, import.meta.url).href;

const projectEntries = [
  {
    id: 'dataglobal',
    title: {
      es: 'DATAGLOBAL S.A.S.',
      en: 'DATAGLOBAL S.A.S.',
    },
    category: {
      es: 'Diseño WEB',
      en: 'Web Design',
    },
    image: asset('dataglobal.png'),
    summary: {
      es: 'Página web corporativa para una empresa de tecnología especializada en soluciones de software y servicios digitales.',
      en: 'Corporate website for a technology company specializing in software solutions and digital services.',
    },
    stack: ['NuxtJS', 'TypeScript', 'Vue'],
    repository: 'https://www.dataglobal.co/',
    url: 'https://www.dataglobal.co/',
    featured: true,
  },
  {
    id: 'sgta',
    title: {
      es: 'Sistema Automotriz',
      en: 'Automotive System',
    },
    category: {
      es: 'Full stack',
      en: 'Full stack',
    },
    image: asset('sgta.png'),
    summary: {
      es: 'Aplicación full stack para administrar clientes, vehículos, reparaciones y procesos internos de un taller automotriz.',
      en: 'Full-stack application to manage clients, vehicles, repairs, and internal processes for an automotive workshop.',
    },
    stack: ['.NET', 'PostgreSQL', 'React', 'TypeScript', 'Vite'],
    repository: 'https://github.com/LauraVargas22/SistemaAutomotriz.git',
    url: 'https://github.com/LauraVargas22/SistemaAutomotriz.git',
    featured: true,
  },
  {
    id: 'invoice',
    title: {
      es: 'Factura Electrónica',
      en: 'Electronic Invoice',
    },
    category: {
      es: 'Web components',
      en: 'Web components',
    },
    image: asset('invoice.png'),
    summary: {
      es: 'Sistema web para construir una experiencia de facturación dinámica mediante componentes reutilizables.',
      en: 'Web system designed to build a dynamic invoicing experience through reusable components.',
    },
    stack: ['JavaScript', 'Lit', 'Vite', 'Web Components'],
    repository: 'https://github.com/LauraVargas22/FacturaElectronica-lit.git',
    url: 'https://github.com/LauraVargas22/FacturaElectronica-lit.git'
  },
  {
    id: 'ligabetplay',
    title: {
      es: 'Liga BetPlay',
      en: 'Liga BetPlay',
    },
    category: {
      es: 'Backend',
      en: 'Backend',
    },
    image: asset('ligabetplay.png'),
    summary: {
      es: 'Aplicación en Python para modelar y gestionar equipos, jugadores y dinámicas de una liga deportiva.',
      en: 'Python application to model and manage teams, players, and workflows inside a sports league.',
    },
    stack: ['Python', 'Data structures'],
    repository: 'https://github.com/LauraVargas22/LigaBetplay.git',
    url: 'https://github.com/LauraVargas22/LigaBetplay.git'
  },
  {
    id: 'campusdb',
    title: {
      es: 'Base de Datos Campus',
      en: 'Campus Database',
    },
    category: {
      es: 'Bases de datos',
      en: 'Databases',
    },
    image: asset('campusdb.png'),
    summary: {
      es: 'Base de datos MySQL diseñada para administrar procesos educativos y datos asociados a Campuslands.',
      en: 'MySQL database designed to manage educational processes and related Campuslands data.',
    },
    stack: ['MySQL', 'Relational modeling', 'SQL queries'],
    repository: 'https://github.com/LauraVargas22/ProyectoMySQL.git',
    url: 'https://github.com/LauraVargas22/ProyectoMySQL.git'
  },
  {
    id: 'formula1',
    title: {
      es: 'Fórmula Uno',
      en: 'Formula One',
    },
    category: {
      es: 'Frontend',
      en: 'Frontend',
    },
    image: asset('formula1.png'),
    summary: {
      es: 'Sitio web interactivo inspirado en la Fórmula 1, con componentes visuales y dinámicas en JavaScript.',
      en: 'Interactive website inspired by Formula 1, with visual components and JavaScript-driven interactions.',
    },
    stack: ['JavaScript', 'HTML', 'CSS'],
    repository: 'https://github.com/Omarjr33/projectf1.git',
    url: 'https://github.com/Omarjr33/projectf1.git',
    featured: true,
  },
  {
    id: 'inventory',
    title: {
      es: 'Gestión de Inventario',
      en: 'Inventory Management',
    },
    category: {
      es: 'Consola en C#',
      en: 'C# console app',
    },
    image: asset('inventory.png'),
    summary: {
      es: 'Aplicación de consola tipo CRUD para registrar y controlar operaciones de inventario.',
      en: 'CRUD-style console application to register and control inventory operations.',
    },
    stack: ['C#', 'Figgle', 'CRUD', 'Console'],
    repository: 'https://github.com/Isa94d-lab/InventoryManagement.git',
    url: 'https://github.com/Isa94d-lab/InventoryManagement.git',
    featured: true,
  },
  {
    id: 'campuslove',
    title: {
      es: 'Campus Love',
      en: 'Campus Love',
    },
    category: {
      es: 'Lógica en C#',
      en: 'C# logic',
    },
    image: asset('campuslove.png'),
    summary: {
      es: 'Aplicación de consola que simula decisiones y condiciones dentro de un juego de citas ambientado en un campus universitario.',
      en: 'Console application that simulates decisions and conditions inside a campus-themed dating game.',
    },
    stack: ['C#', 'Figgle', 'Conditional logic'],
    repository: 'https://github.com/LauraVargas22/CampusLove.git',
    url: 'https://github.com/LauraVargas22/CampusLove.git',
    featured: true,
  },
  {
    id: 'chachipun',
    title: {
      es: 'The Chachipun',
      en: 'The Chachipun',
    },
    category: {
      es: 'Juego en Python',
      en: 'Python game',
    },
    image: asset('chachipun.png'),
    summary: {
      es: 'Juego en Python inspirado en piedra, papel o tijera, con mecánicas propias.',
      en: 'Python game inspired by rock, paper, scissors, with its own creative mechanics.',
    },
    stack: ['Python', 'Game logic', 'Console'],
    repository:
      'https://github.com/LauraVargas22/ProyectoThe-Chachipun_PythonVargasLaura',
    url: 'https://github.com/LauraVargas22/ProyectoThe-Chachipun_PythonVargasLaura',
    featured: true,
  },
  {
    id: 'simulador',
    title: {
      es: 'Simulador Mecánico',
      en: 'Mechanical Simulator',
    },
    category: {
      es: 'Python',
      en: 'Python',
    },
    image: asset('simulador.png'),
    summary: {
      es: 'Simulador educativo e interactivo que representa el comportamiento de dos cuerpos conectados por una polea ideal y un plano inclinado.',
      en: 'Educational interactive simulator that represents the behavior of two bodies connected by an ideal pulley and an inclined plane.',
    },
    stack: ['Python', 'Streamlit', 'Physics'],
    repository: 'https://github.com/LauraVargas22/SimuladorMecanica',
    url: 'https://github.com/LauraVargas22/SimuladorMecanica',
    featured: true,
  },
];

export const getProjects = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(projectEntries, language);

export const getFeaturedProjects = (language = getCurrentLanguage()) =>
  getProjects(language).filter((project) => project.featured);
