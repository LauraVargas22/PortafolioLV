import { experienceContent } from '../data/site-content';
import { projects } from '../data/projects';
import { shellStyles } from './shared-styles';
import { escapeHtml, renderBulletList, renderTagList } from './utils';

class ExperienceGallery extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        ${shellStyles}

        .wrapper {
          display: grid;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .project {
          display: grid;
          grid-template-columns: minmax(260px, 0.85fr) minmax(0, 1.15fr);
          gap: 1rem;
          align-items: stretch;
        }

        .project-image {
          width: 100%;
          height: 100%;
          min-height: 16rem;
          object-fit: cover;
          border-radius: 22px;
        }

        .project-content {
          display: grid;
          gap: 0.9rem;
          align-content: start;
        }

        .category {
          display: inline-flex;
          width: fit-content;
          padding: 0.35rem 0.7rem;
          border-radius: 999px;
          background: rgba(110, 211, 255, 0.08);
          color: var(--accent-soft);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        @media (max-width: 980px) {
          .project {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="shell">
        <header class="section-header">
          <span class="eyebrow">${escapeHtml(experienceContent.banner.eyebrow)}</span>
          <h2 class="title">Galeria de proyectos</h2>
          <p class="description">Cada tarjeta amplia la vista previa del home y deja una base lista para agregar objetivos, resultados, retos y aprendizajes por proyecto.</p>
        </header>
        <div class="wrapper">
          ${projects
            .map(
              (project) => `
                <article class="card project">
                  <img class="project-image" src="${project.image}" alt="${escapeHtml(
                    project.title
                  )}">
                  <div class="project-content">
                    <span class="category">${escapeHtml(project.category)}</span>
                    <h3 class="card-title">${escapeHtml(project.title)}</h3>
                    <p class="card-copy">${escapeHtml(project.summary)}</p>
                    <p class="card-copy">${escapeHtml(project.description)}</p>
                    <div class="tag-row">
                      ${renderTagList(project.stack)}
                    </div>
                    <ul class="clean-list">
                      ${renderBulletList(project.highlights)}
                    </ul>
                    <div class="actions">
                      <a class="button" href="${project.repository}" target="_blank" rel="noreferrer">Ver repositorio</a>
                    </div>
                  </div>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('experience-gallery')) {
  customElements.define('experience-gallery', ExperienceGallery);
}
