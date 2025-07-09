const bars = document.querySelector(".bars");
const nav = document.querySelector("nav");

bars.addEventListener("click", () => {
  nav.classList.toggle("active");
});


//Language
const langButtons = document.querySelectorAll("[data-language]");
const textToChange = document.querySelectorAll("[data-section]");
let currentLanguage = 'en'; // Idioma por defecto

// Función para obtener las traducciones de los proyectos
const getProjectTranslations = async (language) => {
    try {
        console.log('Fetching translations for language:', language);
        // Usar una ruta relativa que funcione tanto en desarrollo como en producción
        const response = await fetch(`languages/${language}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Loaded translations:', data.projects.cards);
        return data.projects.cards;
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
};

// Función para actualizar las cartas con las traducciones
const updateCardsWithTranslations = async (language) => {
    console.log('Updating cards with language:', language);
    const translations = await getProjectTranslations(language);
    if (!translations) {
        console.error('No translations available');
        return;
    }

    const cardsWithTranslations = cards.map(card => {
        console.log('Looking for translation with id:', card.id);
        const translation = translations[card.id];
        console.log('Found translation:', translation);
        
        return {
            ...card,
            translatedTitle: translation?.title || card.title,
            translatedDescription: translation?.description || card.description
        };
    });

    console.log('Cards with translations:', cardsWithTranslations);
    changeCards(cardsWithTranslations, currentPage, itemsPerPage);
};

langButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        console.log('Language button clicked:', button.dataset.language);
        currentLanguage = button.dataset.language;
        try {
            // Usar una ruta relativa que funcione tanto en desarrollo como en producción
            const response = await fetch(`languages/${currentLanguage}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            textToChange.forEach((e) => {
                const section = e.dataset.section;
                const value = e.dataset.value;
                if (data[section] && data[section][value]) {
                    e.innerHTML = data[section][value];
                }
            });

            // Actualizar las cartas con las nuevas traducciones
            await updateCardsWithTranslations(currentLanguage);
        } catch (error) {
            console.error('Error changing language:', error);
        }
    });
});

//Proyectos
const cards = [
  {
    id: 'ligabetplay',
    title: 'LigaBetplay',
    description: 'Python application to manage football teams and players, simulating a sports league system.',
    image: new URL('./images/ligabetplay.png', import.meta.url).href,
    link: 'https://github.com/LauraVargas22/LigaBetplay.git'
  },
  {
    id: 'concerts',
    title: 'Concerts',
    description: 'Responsive website built with HTML and CSS to showcase upcoming music concerts and events.',
    image: new URL('./images/musicconcert.png', import.meta.url).href,
    link: 'https://github.com/LauraVargas22/VargasLaura_ProyectoConcertCSS.git'
  },
  {
    id: 'formula1',
    title: 'Formula One',
    description: 'JavaScript web project that simulates a Formula 1 fan page with interactive features.',
    image: new URL('./images/formula1.png', import.meta.url).href,
    link: 'https://github.com/Omarjr33/projectf1.git'
  },
  {
    id: 'chachipun',
    title: 'The Chachipun',
    description: 'Python game project inspired by rock-paper-scissors with added creative mechanics.',
    image: new URL('./images/chachipun.jpg', import.meta.url).href,
    link: 'https://github.com/LauraVargas22/ProyectoThe-Chachipun_PythonVargasLaura'
  },
  {
    id: 'campuslove',
    title: 'Campus Love ... Where Is Love',
    description: 'C# console application that simulates matchmaking logic within a fictional campus environment.',
    image: new URL('./images/CampusLove.png', import.meta.url).href,
    link: 'https://github.com/LauraVargas22/CampusLove.git'
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    description: 'C# console-based CRUD system for managing inventory operations.',
    image: new URL('./images/inventory.png', import.meta.url).href,
    link: 'https://github.com/Isa94d-lab/InventoryManagement.git'
  },
  {
    id: 'campusdb',
    title: 'Campus Database',
    description: 'MySQL database system designed to manage educational processes and student data for Campuslands.',
    image: new URL('./images/campusdb.png', import.meta.url).href,
    link: 'https://github.com/LauraVargas22/ProyectoMySQL.git'
  },
  {
    id: 'invoice',
    title: 'Electronic Invoice',
    description: 'JavaScript project using Lit and Vite to create a dynamic electronic invoicing system with web components.',
    image: new URL('./images/invoice.png', import.meta.url).href,
    link: 'https://github.com/LauraVargas22/FacturaElectronica-lit.git'
  },
  {
    id: 'sgta',
    title: 'Automotive System',
    description: 'Fullstack project that allows the repair cars shop management through .NET, PostreSQL, Vite + React and Typescript.',
    image: new URL('./images/sgta.png', import.meta.url).href,
    link: 'https://github.com/LauraVargas22/SistemaAutomotriz.git'
  }
];

const cardsElement = document.querySelector('.cards');
const itemsPerPage = 3;
let currentPage = Math.min(
  Math.max(
    parseInt(
      new URLSearchParams(window.location.search)
      .get('page')
    ) || 1, 1
  ),
  Math.ceil(cards.length / itemsPerPage)
);

const totalPages = Math.ceil(cards.length / itemsPerPage);

const paginationSelect = document.getElementById('pagination_select');
const previousPageButton = document.getElementById('go-previous-page');
const nextPageButton = document.getElementById('go-next-page');

const setButtonState = (button, isDisabled) => {
  if (isDisabled) {
    button.classList.add('pagination_button--disabled');
    button.setAttribute('aria-disabled', 'true');
    button.setAttribute('tabindex', '-1');
  } else {
    button.classList.remove('pagination_button--disabled');
    button.removeAttribute('aria-disabled');
    button.removeAttribute('tabindex');
  }
};

const changeCards = (cards, pageIndex, itemsPerPage) => {
  const startIndex = (pageIndex -1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  cardsElement.innerHTML = cards.slice(startIndex, endIndex).map(card => /*html*/`
    <article>
      <figure>
        <img src="${card.image}" alt="${card.translatedTitle || card.title}" onerror="this.src='${new URL('./images/formula1.png', import.meta.url).href}'; this.alt='Image not available';">
      </figure>
      <a class="link" href="${card.link}" target="_blank">
        <div class="article-preview">
          <h2>${card.translatedTitle || card.title}</h2>
          <p>${card.translatedDescription || card.description}</p>
        </div>
      </a>
    </article>
  `).join('');

  currentPage = pageIndex;
  setButtonState(previousPageButton, currentPage === 1);
  setButtonState(nextPageButton, currentPage === totalPages);

  if (window.location.search !== `?page=${currentPage}`) {
    window.history.pushState({}, '', `?page=${currentPage}`);
  }

  paginationSelect.selectedIndex = currentPage - 1;

  // Scroll suave a la sección de proyectos
  const projectsSection = document.querySelector('#');
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

if (paginationSelect) {
  paginationSelect.innerHTML = Array.from({ length: totalPages }, 
  (_, index) => /*html*/`
    <option value="${index + 1}" aria-label="${index + 1}">${index + 1}</option>
  `).join('');

  paginationSelect.addEventListener('change', (event) => {
    changeCards(cards, parseInt(event.target.value), itemsPerPage);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await updateCardsWithTranslations(currentLanguage);
});

previousPageButton.addEventListener('click', () => {
  if (currentPage > 1)
    changeCards(cards, currentPage - 1, itemsPerPage);
});

nextPageButton.addEventListener('click', () => {
  if (currentPage < totalPages)
    changeCards(cards, currentPage + 1, itemsPerPage);
});

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key === 'arrowleft' || key === 'left') {
    if (currentPage > 1) changeCards(cards, currentPage - 1, itemsPerPage);
  } else if (key === 'arrowright' || key === 'right') {
    if (currentPage < totalPages) changeCards(cards, currentPage + 1, itemsPerPage);
  }
});