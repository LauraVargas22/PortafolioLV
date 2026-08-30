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

const enterpriseCompanyEntries = [
  {
    id: 'ladeca',
    name: {
      es: 'LADECA S.A.S.',
      en: 'LADECA S.A.S.',
    },
    logo: asset('logoLadeca.jpg'),
    logoAlt: {
      es: 'Logo de LADECA',
      en: 'LADECA logo',
    },
    backgroundImage: asset('ladeca.jpg'),
    backgroundImageAlt: {
      es: 'Ilustración industrial asociada a LADECA',
      en: 'Industrial illustration related to LADECA',
    },
    sector: {
      es: 'Industria y operaciones',
      en: 'Industry and operations',
    },
    accent: '#6ed3ff',
    accentSoft: 'rgba(110, 211, 255, 0.18)',
    accentStrong: 'rgba(110, 211, 255, 0.34)',
    description: {
      es: 'Desarrollo e implementación de soluciones tecnológicas orientadas a optimizar procesos, mejorar la eficiencia operativa y apoyar la toma de decisiones en diferentes áreas de la organización.',
      en: 'Development and implementation of technology solutions focused on optimizing processes, improving operational efficiency, and supporting decision-making across different areas of the organization.',
    },
    stats: [
      {
        value: '+15',
        label: {
          es: 'Requerimientos',
          en: 'Requirements',
        },
      },
      {
        value: '8',
        label: {
          es: 'Módulos principales',
          en: 'Core modules',
        },
      },
      {
        value: '1',
        label: {
          es: 'Año de colaboración',
          en: 'Year of collaboration',
        },
      },
    ],
    projects: [
      {
        id: 'production',
        icon: 'production',
        name: {
          es: 'Producción',
          en: 'Production',
        },
        shortDescription: {
          es: 'Sistema para el control y monitoreo de la producción en planta. Gestión catálogos base, órdenes y turnos de producción, representación de indicadores y reportes operativos.',
          en: 'System for plant production control and monitoring, including main modules, work orders, production shifts, indicator representation, and operational reporting.',
        },
        description: {
          es: 'Plataforma orientada al seguimiento de órdenes, producción de pedidos, mantenimientos y capacidad operativa para mejorar el rendimiento de planta.',
          en: 'Platform focused on tracking orders, order fulfillment, maintenance, and operational capacity to improve plant performance.',
        },
        technologies: ['Web Forms', 'SQL Server', 'VB.NET'],
        functionalities: [
          {
            es: 'Control de órdenes de producción',
            en: 'Production order control',
          },
          {
            es: 'Gestión de turnos de producción',
            en: 'Production shift management',
          },
          {
            es: 'Reportes operativos',
            en: 'Operational reporting',
          },
        ],
        accent: '#ff6b91',
        accentSoft: 'rgba(255, 107, 145, 0.2)',
        accentStrong: 'rgba(255, 107, 145, 0.34)',
      },
      {
        id: 'logistics',
        icon: 'logistics',
        name: {
          es: 'Logística',
          en: 'Logistics',
        },
        shortDescription: {
          es: 'Módulo para coordinar despachos, rutas, trazabilidad de entregas de facturas y devoluciones.',
          en: 'Module for coordinating shipments, routes, delivery traceability of invoices and returns.',
        },
        description: {
          es: 'Solución enfocada en distribución, seguimiento de pedidos y control logístico entre planta, bodega y clientes.',
          en: 'Solution focused on distribution, order tracking, and logistics control between plant, warehouse, and customers.',
        },
        technologies: ['Web Forms', 'SQL Server', 'VB.NET'],
        functionalities: [
          {
            es: 'Rutas y despachos',
            en: 'Routes and dispatches',
          },
          {
            es: 'Trazabilidad de entregas',
            en: 'Delivery traceability',
          },
          {
            es: 'Control rendimiento productos y vehículos',
            en: 'Control of product and vehicle performance',
          },
        ],
        accent: '#9e7cff',
        accentSoft: 'rgba(158, 124, 255, 0.2)',
        accentStrong: 'rgba(158, 124, 255, 0.34)',
      },
      {
        id: 'ROI',
        icon: 'ROI',
        name: {
          es: 'ROI',
          en: 'ROI',
        },
        shortDescription: {
          es: 'Módulo para el control de ingreso de productos para el seguimiento de rendimiento por proveedor.',
          en: 'Module for controlling product intake for performance tracking by supplier.',
        },
        description: {
          es: 'Manejo de diferencias en los productos solicitados y recibidos, reportes de rendimiento por proveedor.',
          en: 'Handling of differences in requested and received products, performance reports by supplier.',
        },
        technologies: ['Web Forms', 'SQL Server', 'VB.NET'],
        functionalities: [
          {
            es: 'Ingreso de productos',
            en: 'Product intake',
          },
          {
            es: 'Seguimiento rendimiento por proveedor',
            en: 'Performance tracking by supplier',
          },
          {
            es: 'Reportes comparativos',
            en: 'Comparative reports',
          },
        ],
        accent: '#ffbc5c',
        accentSoft: 'rgba(255, 188, 92, 0.2)',
        accentStrong: 'rgba(255, 188, 92, 0.34)',
      },
      {
        id: 'financial-cli',
        icon: 'financial',
        name: {
          es: 'CLI',
          en: 'CLI',
        },
        shortDescription: {
          es: 'Módulo para la gestión de importaciones, trazabilidad de ingreso de productos y manejo de procesos financieros.',
          en: 'Module for managing imports, product inbound traceability, and financial process handling.',
        },
        description: {
          es: 'Herramientas orientadas a validación de información, control de importaciones y pagos, consultas comerciales y soporte a cierre financiero.',
          en: 'Tools focused on information validation, import control and payments, business queries, and closing support.',
        },
        technologies: ['Web Forms', 'SQL Server', 'VB.NET'],
        functionalities: [
          {
            es: 'Importaciones',
            en: 'Imports',
          },
          {
            es: 'Pagos e impuestos',
            en: 'Payments and taxes',
          },
          {
            es: 'Reportes de seguimiento',
            en: 'Tracking reports',
          },
        ],
        accent: '#5ed5ff',
        accentSoft: 'rgba(94, 213, 255, 0.2)',
        accentStrong: 'rgba(94, 213, 255, 0.34)',
      },
      {
        id: 'acpm',
        icon: 'fuel',
        name: {
          es: 'ACPM',
          en: 'ACPM',
        },
        shortDescription: {
          es: 'Solución para registrar consumos, controlar abastecimiento, generar reportes y detectar variaciones de combustible.',
          en: 'Solution for logging consumption, controlling supply, generating reports, and detecting fuel deviations.',
        },
        description: {
          es: 'Módulo para control de combustibles, consumos por equipo y reportes de abastecimiento para seguimiento operativo.',
          en: 'Module for fuel control, per-equipment consumption, and supply reports for operational tracking.',
        },
        technologies: ['Web Forms', 'SQL Server', 'VB.NET'],
        functionalities: [
          {
            es: 'Control de abastecimiento',
            en: 'Supply control',
          },
          {
            es: 'Consumo por equipo',
            en: 'Per-equipment consumption',
          },
          {
            es: 'Alertas por variacion',
            en: 'Deviation alerts',
          },
        ],
        accent: '#57d38c',
        accentSoft: 'rgba(87, 211, 140, 0.2)',
        accentStrong: 'rgba(87, 211, 140, 0.34)',
      },
      {
        id: 'reports',
        icon: 'reports',
        name: {
          es: 'Reportes',
          en: 'Reports',
        },
        shortDescription: {
          es: 'PDF, gráficos y consultas que consolidan información productiva, financiera y comercial en reportes accionables.',
          en: 'PDF, charts and queries that consolidate productive, financial, and commercial information into actionable reports.',
        },
        description: {
          es: 'Conjunto de reportes para consolidación de indicadores de gestión comercial y productiva, análisis histórico y soporte a la toma de decisiones transversales.',
          en: 'Set of reports for indicator consolidation, historical analysis, and cross-functional decision support.',
        },
        technologies: ['SQL Server', 'SSRS', 'VB.NET'],
        functionalities: [
          {
            es: 'Indicadores consolidados',
            en: 'Consolidated indicators',
          },
          {
            es: 'Consultas históricas',
            en: 'Historical queries',
          },
          {
            es: 'Soporte a decisiones',
            en: 'Decision support',
          },
        ],
        accent: '#6ed3ff',
        accentSoft: 'rgba(110, 211, 255, 0.2)',
        accentStrong: 'rgba(110, 211, 255, 0.34)',
      },
    ],
  },
  {
    id: 'acreditacionisa',
    name: {
      es: 'ACREDITACIÓN ISA',
      en: 'ACREDITACION ISA',
    },
    logo: asset('acreditacionisa.png'),
    logoAlt: {
      es: 'Logo de ACREDITACIONISA',
      en: 'ACREDITACIONISA logo',
    },
    backgroundImage: asset('acreditacionisa.png'),
    backgroundImageAlt: {
      es: 'Ilustración industrial asociada a ACREDITACIONISA',
      en: 'Industrial illustration related to ACREDITACIONISA',
    },
    sector: {
      es: 'Gestión de sistemas acreditados',
      en: 'Accredited systems management',
    },
    accent: '#6ed3ff',
    accentSoft: 'rgba(110, 211, 255, 0.18)',
    accentStrong: 'rgba(110, 211, 255, 0.34)',
    description: {
      es: 'Soporte en el desarrollo e implementación de funcionalidades para la gestión de sistemas acreditados, incluyendo seguimiento de procesos, control de documentación y parametrización de nuevas organizaciones.',
      en: 'Support in the development and implementation of functionalities for managing accredited systems, including process tracking, document control, and parameterization of new organizations.',
    },
    stats: [
      {
        value: '+8',
        label: {
          es: 'Requerimientos',
          en: 'Requirements',
        },
      },
      {
        value: '4',
        label: {
          es: 'Módulos principales',
          en: 'Core modules',
        },
      },
      {
        value: '6',
        label: {
          es: 'Meses de colaboración',
          en: 'Months of collaboration',
        },
      },
    ],
    projects: [
      {
        id: 'carnets',
        icon: 'carnets',
        name: {
          es: 'Parametrización de empresas',
          en: 'Enterprise parameterization',
        },
        shortDescription: {
          es: 'Parametrización de nuevas empresas y organizaciones dentro de la plataforma, incluyendo la configuración de módulos, usuarios y permisos.',
          en: 'Parameterization within the platform, including module configuration, user management, and permission settings.',
        },
        description: {
          es: 'Plataforma multitenant para la gestión de órdenes de certificación y acreditación de equipos y personas en diferentes organizaciones, con control de documentación y seguimiento de procesos.',
          en: 'Multi-tenant platform for managing certification and accreditation orders for equipment and individuals across different organizations, with documentation control and process tracking.',
        },
        technologies: ['Web Forms', 'SQL Server', 'C#'],
        functionalities: [
          {
            es: 'Soporte y QA de funcionalidades',
            en: 'Support and quality assurance of functionalities',
          },
          {
            es: 'Diseño de carnets de certificación',
            en: 'Certification card design',
          },
          {
            es: 'Mejora de UI/UX',
            en: 'UI/UX improvement',
          },
        ],
        accent: '#ff6b91',
        accentSoft: 'rgba(255, 107, 145, 0.2)',
        accentStrong: 'rgba(255, 107, 145, 0.34)',
      },
    ],
  }
];

export const getProjects = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(projectEntries, language);

export const getFeaturedProjects = (language = getCurrentLanguage()) =>
  getProjects(language).filter((project) => project.featured);

export const getEnterpriseCompanies = (language = getCurrentLanguage()) =>
  resolveLocalizedValue(enterpriseCompanyEntries, language);
