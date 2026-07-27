const asset = (fileName) => new URL(`../images/${fileName}`, import.meta.url).href;

export const projects = [
  {
    id: 'sgta',
    title: 'Sistema Automotriz',
    category: 'Full Stack',
    image: asset('sgta.png'),
    summary:
      'Aplicacion full stack para administrar clientes, vehiculos, reparaciones y procesos internos de un taller automotriz.',
    description:
      'Proyecto orientado a la gestion operativa de un taller, integrando interfaz, logica de negocio y persistencia para centralizar el seguimiento de servicios.',
    stack: ['.NET', 'PostgreSQL', 'React', 'TypeScript', 'Vite'],
    highlights: [
      'Organizacion del flujo administrativo del taller.',
      'Integracion entre frontend y backend.',
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
      'Sistema web para construir una experiencia de facturacion dinamica mediante componentes reutilizables.',
    description:
      'Explora una arquitectura basada en componentes, formularios dinamicos y una estructura modular pensada para crecer con claridad.',
    stack: ['JavaScript', 'Lit', 'Vite', 'Componentes Web'],
    highlights: [
      'Construccion de interfaces modulares.',
      'Manejo de datos y calculos en tiempo real.',
      'Experiencia centrada en claridad visual.',
    ],
    repository: 'https://github.com/LauraVargas22/FacturaElectronica-lit.git',
    featured: true,
  },
  {
    id: 'ligabetplay',
    title: 'Liga BetPlay',
    category: 'Backend',
    image: asset('ligabetplay.png'),
    summary:
      'Aplicacion en Python para modelar y gestionar equipos, jugadores y dinamicas de una liga deportiva.',
    description:
      'Se centra en logica de negocio, estructuras de datos y simulacion de procesos para representar el comportamiento de una liga.',
    stack: ['Python', 'Estructura de datos'],
    highlights: [
      'Gestion de equipos y jugadores.',
      'Simulacion de reglas deportivas.',
      'Organizacion clara de entidades y procesos.',
    ],
    repository: 'https://github.com/LauraVargas22/LigaBetplay.git',
    featured: true,
  },
  {
    id: 'campusdb',
    title: 'Campus Database',
    category: 'Bases de datos',
    image: asset('campusdb.png'),
    summary:
      'Base de datos MySQL disenada para administrar procesos educativos y datos asociados a Campuslands.',
    description:
      'Proyecto enfocado en estructura relacional, consistencia de la informacion y modelado de entidades para escenarios academicos.',
    stack: ['MySQL', 'Modelo relacional', 'Consultas SQL'],
    highlights: [
      'Diseno de tablas y relaciones.',
      'Consultas pensadas para necesidades academicas.',
      'Implementacion de funciones y procedimientos almacenados.',
    ],
    repository: 'https://github.com/LauraVargas22/ProyectoMySQL.git',
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    category: 'C# Console App',
    image: asset('inventory.png'),
    summary:
      'Aplicacion de consola tipo CRUD para registrar y controlar operaciones de inventario.',
    description:
      'Una solucion orientada al flujo basico de inventario, con foco en logica, mantenimiento y organizacion del codigo.',
    stack: ['C#', 'Figgle', 'CRUD', 'Consola'],
    highlights: [
      'Registro de productos y movimientos.',
      'Logica clara para operaciones basicas.',
      'Base solida para ampliar funcionalidades.',
    ],
    repository: 'https://github.com/Isa94d-lab/InventoryManagement.git',
  },
  {
    id: 'formula1',
    title: 'Formula One',
    category: 'Frontend',
    image: asset('formula1.png'),
    summary:
      'Sitio web interactivo inspirado en la Formula 1, con componentes visuales y dinamicas en JavaScript.',
    description:
      'Proyecto pensado para experimentar con narrativa visual, secciones interactivas y una experiencia inmersiva para el usuario.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    highlights: [
      'Diseno tematico y visualmente dinamico.',
      'Sistema con funcionalidades CRUD para pilotos y equipos.',
      'Simulacion de carreras y estadisticas de competicion en tiempo real.',
    ],
    repository: 'https://github.com/Omarjr33/projectf1.git',
  },
  {
    id: 'campuslove',
    title: 'Campus Love',
    category: 'Logica en C#',
    image: asset('campuslove.png'),
    summary:
      'Aplicacion de consola que simula decisiones y condiciones dentro de un juego de citas ambientado en un campus universitario.',
    description:
      'Proyecto orientado a resolver reglas y condiciones con una estructura clara de decisiones dentro de una experiencia ligera.',
    stack: ['C#', 'Figgle', 'Logica condicional'],
    highlights: [
      'Manejo de condiciones y decisiones.',
      'Implementacion de chats entre usuarios.',
      'Simulacion de interacciones y resultados segun las elecciones del usuario.',
    ],
    repository: 'https://github.com/LauraVargas22/CampusLove.git',
  },
  {
    id: 'chachipun',
    title: 'The Chachipun',
    category: 'Python Game',
    image: asset('chachipun.png'),
    summary:
      'Juego en Python inspirado en piedra, papel o tijera, con mecanicas propias.',
    description:
      'Un ejercicio creativo para practicar flujo del programa, reglas del juego y experiencia de usuario en consola.',
    stack: ['Python', 'Game Logic', 'Consola'],
    highlights: [
      'Manejo de logica de programacion basica y estructuras de control.',
      'Modo de juego contra la computadora y contra otro jugador.',
    ],
    repository: 'https://github.com/LauraVargas22/ProyectoThe-Chachipun_PythonVargasLaura',
  },
  {
    id: 'simulador',
    title: 'Simulador Mecanico',
    category: 'Python',
    image: asset('simulador.png'),
    summary:
      'Simulador educativo e interactivo que representa el comportamiento de dos cuerpos conectados por una polea ideal y un plano inclinado.',
    description:
      'Simula el comportamiento de dos cuerpos conectados por una polea ideal y un plano inclinado, teniendo en cuenta la aceleracion, la friccion y las masas involucradas.',
    stack: ['Python', 'Streamlit', 'Consola'],
    highlights: [
      'Representacion interactiva de un sistema fisico.',
      'Calculo de aceleracion, friccion y fuerzas involucradas.',
      'Visualizacion didactica de variables y resultados.',
    ],
    repository: 'https://github.com/LauraVargas22/SimuladorMecanica',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
