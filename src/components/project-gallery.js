import { projects } from '../data/projects';
import { escapeHtml } from './utils';
import '../styles/featured-projects.css';

/* Iconos inline (currentColor) — sin dependencias externas */
const icons = {
  github: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>`,
  external: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>`,
};

class ProjectGallery extends HTMLElement {
  constructor() {
    super();
    this._observer = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="container-xl">
        <div class="projects-heading home-reveal">
          <span class="projects-eyebrow">
            <span class="projects-eyebrow-dot"></span>
            Seleccion destacada
          </span>
          <h2 class="projects-title">Proyectos</h2>
          <p class="projects-subtitle">
            Proyectos personales y colaborativos a lo largo de mi proceso de aprendizaje. Cada uno refleja el avance de mis habilidades técnicas, la aplicación de buenas prácticas y mi enfoque en la experiencia del usuario.
          </p>
        </div>

        <div class="projects-grid">
          ${projects
            .map(
              (project) => `
                <article class="project-card home-reveal">
                  <div class="project-card-media">
                    <img
                      src="${escapeHtml(project.image)}"
                      alt="${escapeHtml(project.title)}"
                      loading="lazy"
                    >
                  </div>

                  <div class="project-card-body">
                    <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
                    <p class="project-card-summary">${escapeHtml(project.summary)}</p>

                    ${
                      (project.tags?.length || project.stack?.length)
                        ? `
                          <ul class="project-card-tags">
                            ${(project.tags ?? project.stack ?? [])
                              .map((tag) => `<li>${escapeHtml(tag)}</li>`)
                              .join('')}
                          </ul>
                        `
                        : ''
                    }

                    <div class="project-card-links">
                      ${
                        (project.repoUrl ?? project.repository)
                          ? `
                            <a
                              class="project-card-link"
                              href="${escapeHtml(project.repoUrl ?? project.repository)}"
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Repositorio de ${escapeHtml(project.title)}"
                            >
                              ${icons.github}
                              <span>Código</span>
                            </a>
                          `
                          : ''
                      }
                      ${
                        project.demoUrl
                          ? `
                            <a
                              class="project-card-link"
                              href="${escapeHtml(project.demoUrl)}"
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Demo de ${escapeHtml(project.title)}"
                            >
                              ${icons.external}
                              <span>Demo</span>
                            </a>
                          `
                          : ''
                      }
                    </div>
                  </div>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    `;

    this._setupRevealObserver();
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    this._observer = null;
  }

  _setupRevealObserver() {
    const revealItems = [...this.querySelectorAll('.home-reveal')];

    if (!revealItems.length) {
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    this._observer?.disconnect();

    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          this._observer?.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    revealItems.forEach((item) => this._observer?.observe(item));
  }
}

if (!customElements.get('project-gallery')) {
  customElements.define('project-gallery', ProjectGallery);
}
