const asset = (fileName) => new URL(`../images/${fileName}`, import.meta.url).href;

export const projects = [
  {
    id: 'sgta',
    title: 'Sistema Automotriz',
    category: 'Fullstack',
    image: asset('sgta.png'),
    summary:
      'Aplicacion fullstack para administrar clientes, vehículos, reparaciones y procesos internos de un taller automotriz.',
    description:
      'Proyecto orientado a la gestión operativa de un taller, conectando interfaz, lógica de negocio y persistencia para centralizar el seguimiento de servicios.',
    stack: ['.NET', 'PostgreSQL', 'React', 'TypeScript', 'Vite'],
    highlights: [
      'Organización del flujo administrativo del taller.',
      'Integración entre frontend y backend.',
      'Enfoque en mantenimiento y escalabilidad.',
    ],
    repository: 'https://github.com/LauraVargas22/SistemaAutomotriz.git',
    featured: true,
  },
  {
    id: 'invoice',
    title: 'Factura Electronica',
    category: 'Web Components',
    image: asset('invoice.png'),
    summary:
      'Sistema web para generar una experiencia de facturación dinámica utilizando componentes reutilizables.',
    description:
      'Explora una arquitectura basada en componentes, formularios dinámicos y una estructura modular pensada para crecer sin perder claridad.',
    stack: ['JavaScript', 'Lit', 'Vite', 'Componentes Web'],
    highlights: [
      'Construcción de interfaces modulares.',
      'Manejo de datos y cálculos en tiempo real.',
      'Experiencia centrada en claridad visual.',
    ],
    repository: 'https://github.com/LauraVargas22/FacturaElectronica-lit.git',
    featured: true,
  },
  {
    id: 'ligabetplay',
    title: 'LigaBetplay',
    category: 'Backend Logic',
    image: asset('ligabetplay.png'),
    summary:
      'Aplicación en Python para modelar y gestionar equipos, jugadores y dinámicas de una liga deportiva.',
    description:
      'Se centra en lógica de negocio, estructuras de datos y simulación de procesos para representar el comportamiento de una liga.',
    stack: ['Python', 'Estructura de datos'],
    highlights: [
      'Gestión de equipos y jugadores.',
      'Simulación de reglas deportivas.',
      'Organización clara de entidades y procesos.',
    ],
    repository: 'https://github.com/LauraVargas22/LigaBetplay.git',
    featured: true,
  },
  {
    id: 'campusdb',
    title: 'Campus Database',
    category: 'Databases',
    image: asset('campusdb.png'),
    summary:
      'Base de datos MySQL diseñada para administrar procesos educativos y datos asociados a Campuslands.',
    description:
      'Proyecto enfocado en estructura relacional, consistencia de la información y modelado de entidades para escenarios académicos.',
    stack: ['MySQL', 'Modelo relacional', 'Consultas SQL'],
    highlights: [
      'Diseño de tablas y relaciones.',
      'Consultas pensadas para necesidades académicas.',
      'Implementación de funciones y procedimientos almacenados.',
    ],
    repository: 'https://github.com/LauraVargas22/ProyectoMySQL.git',
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    category: 'C# Console App',
    image: asset('inventory.png'),
    summary:
      'Sistema CRUD de consola para registrar y controlar operaciones de inventario.',
    description:
      'Una solución orientada al flujo básico de inventario con foco en lógica, mantenimiento y organización del código.',
    stack: ['C#', '.NET', 'CRUD', 'Consola'],
    highlights: [
      'Registro de productos y movimientos.',
      'Lógica clara para operaciones básicas.',
      'Base sólida para ampliar funcionalidades.',
    ],
    repository: 'https://github.com/Isa94d-lab/InventoryManagement.git',
  },
  {
    id: 'formula1',
    title: 'Formula One',
    category: 'Frontend',
    image: asset('formula1.png'),
    summary:
      'Página web interactiva inspirada en Formula 1 con componentes visuales y dinámica en JavaScript.',
    description:
      'Proyecto pensado para experimentar con narrativa visual, secciones interactivas y una experiencia mas inmersiva para el usuario.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    highlights: [
      'Diseño temático y visualmente dinámico.',
      'Sistema con funcionalidades CRUD para pilotos y equipos.',
      'Simulación de carreras y estádisticas de competición en tiempo real.',
    ],
    repository: 'https://github.com/Omarjr33/projectf1.git',
  },
  {
    id: 'campuslove',
    title: 'Campus Love',
    category: 'C# Logic',
    image: asset('CampusLove.png'),
    summary:
      'Aplicación de consola que simula lógicas de decisión y condiciones para un juego de citas en un campus universitario.',
    description:
      'Proyecto orientado a resolver reglas y condiciones con una estructura clara de decisiones dentro de una experiencia ligera.',
    stack: ['C#', 'Figgle', 'Lógica condicional'],
    highlights: [
      'Manejo de condiciones y decisiones.',
      'Implementación de chats entre usuarios.',
      'Simulación de interacciones y resultados basados en elecciones del usuario.',
    ],
    repository: 'https://github.com/LauraVargas22/CampusLove.git',
  },
  {
    id: 'chachipun',
    title: 'The Chachipun',
    category: 'Python Game',
    image: asset('chachipun.jpg'),
    summary:
      'Juego en Python inspirado en piedra, papel o tijera con mecanicas propias.',
    description:
      'Un ejercicio creativo para practicar flujo del programa, reglas del juego y experiencia de usuario en consola.',
    stack: ['Python', 'Game Logic', 'Consola'],
    highlights: [
      'Manejo de lógica de programación básica y estructuras de control.',
      'Modo de juego contra la computadora y contra otro jugador.'
    ],
    repository: 'https://github.com/LauraVargas22/ProyectoThe-Chachipun_PythonVargasLaura',
  },
  {
    id: 'simulador',
    title: 'Simulador Mecánico',
    category: 'Python',
    image: asset('simulador.png'),
    summary:
      'Simulador educativo e interactivo que representa el comportamiento de dos cuerpos conectados mediante polea ideal y plano inclinado.',
    description:
      'Simula el comportamiento de dos cuerpos conectados mediante polea ideal y plano inclinado, teniendo en cuenta la aceleración, fricción y masas de los cuerpos.',
    stack: ['Python', 'Game Logic', 'Consola'],
    highlights: [
      'Manejo de lógica de programación básica y estructuras de control.',
      'Modo de juego contra la computadora y contra otro jugador.'
    ],
    repository: 'https://github.com/LauraVargas22/SimuladorMecanica',
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
