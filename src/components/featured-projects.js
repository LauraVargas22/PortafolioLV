import { getFeaturedProjects } from '../data/projects';
import { getHomeContent } from '../data/site-content';
import { bootstrapCss } from './bootstrap-css';
import { sectionFrameStyles } from './shared-styles';
import { escapeHtml, renderTagList } from './utils';

class FeaturedProjects extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._currentPage = 1;
    this._itemsPerPage = 3;
    this._handleResize = this._handleResize.bind(this);
  }

  connectedCallback() {
    this._syncItemsPerPage();
    window.addEventListener('resize', this._handleResize, { passive: true });
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._handleResize);
  }

  get _projects() {
    return getFeaturedProjects();
  }

  _handleResize() {
    const previous = this._itemsPerPage;
    this._syncItemsPerPage();

    if (previous !== this._itemsPerPage) {
      this._currentPage = Math.min(this._currentPage, this._totalPages);
      this.render();
    }
  }

  _syncItemsPerPage() {
    const width = window.innerWidth || 1440;

    if (width <= 991) {
      this._itemsPerPage = 1;
      return;
    }

    this._itemsPerPage = 3;
  }

  get _totalPages() {
    return Math.max(1, Math.ceil(this._projects.length / this._itemsPerPage));
  }

  get _visibleProjects() {
    const startIndex = (this._currentPage - 1) * this._itemsPerPage;
    return this._projects.slice(startIndex, startIndex + this._itemsPerPage);
  }

  render() {
    const { projects: projectsContent } = getHomeContent();

    this.shadowRoot.innerHTML = `
      <style>${bootstrapCss}</style>
      <style>
        ${sectionFrameStyles}

        .projects-frame {
          background:
            radial-gradient(circle at 20% 14%, rgba(255, 45, 117, 0.08), transparent 18%),
            radial-gradient(circle at 82% 18%, rgba(110, 211, 255, 0.08), transparent 20%),
            linear-gradient(160deg, rgba(12, 12, 15, 0.94), rgba(24, 25, 31, 0.9));
        }

        .project-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: transparent;
        }

        .thumb-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 26px 26px 20px 20px;
          background: linear-gradient(180deg, rgba(18, 19, 24, 0.92), rgba(32, 34, 40, 0.76));
          box-shadow: 0 18px 42px rgba(2, 6, 23, 0.28);
        }

        .thumb-wrap::after {
          content: '';
          position: absolute;
          inset: auto 0 0;
          height: 45%;
          background: linear-gradient(180deg, transparent, rgba(3, 8, 20, 0.52));
          pointer-events: none;
        }

        .thumb {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          transition: transform 320ms ease;
        }

        .project-card:hover .thumb {
          transform: scale(1.04);
        }

        .content {
          position: relative;
          display: flex;
          flex: 1;
          flex-direction: column;
          width: calc(100% - 1.3rem);
          margin: -1.15rem auto 0;
          padding: 1.15rem 1.2rem 1.25rem;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(239, 242, 247, 0.98), rgba(224, 229, 238, 0.95));
          box-shadow:
            0 18px 38px rgba(2, 6, 23, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.42);
        }

        .meta {
          display: inline-flex;
          align-self: flex-start;
          margin-bottom: 0.75rem;
          padding: 0.35rem 0.72rem;
          border-radius: 999px;
          background: rgba(7, 19, 37, 0.08);
          color: #17325f;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .project-title {
          margin: 0 0 0.55rem;
          color: #071325;
          font-size: clamp(1.22rem, 1.06rem + 0.4vw, 1.55rem);
          font-weight: 800;
          line-height: 1.18;
        }

        .project-copy {
          margin: 0;
          color: rgba(7, 19, 37, 0.84);
          line-height: 1.72;
        }

        .tag-row {
          margin-top: 1rem;
        }

        .tag {
          background: rgba(7, 19, 37, 0.06);
          border-color: rgba(7, 19, 37, 0.08);
          color: #17325f;
        }

        .footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          margin-top: auto;
          padding-top: 1rem;
          flex-wrap: wrap;
        }

        .repo-link {
          color: #ff2d75;
          text-decoration: none;
          font-weight: 800;
        }

        .repo-link:hover {
          color: #d3195d;
        }

        .pagination-wrap {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          margin-top: 1.8rem;
        }

        .pagination {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.5rem 0.6rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(169, 184, 211, 0.12);
          backdrop-filter: blur(14px);
        }

        .pagination-button {
          width: 3rem;
          height: 2.4rem;
          border: 0;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(255, 45, 117, 0.98), rgba(255, 76, 149, 0.9));
          color: white;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 800;
          box-shadow: 0 12px 26px rgba(255, 45, 117, 0.22);
          transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
        }

        .pagination-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px rgba(255, 45, 117, 0.28);
        }

        .pagination-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }

        .page-indicator {
          min-width: 4rem;
          height: 2.35rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 0.9rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.94);
          color: #071325;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .see-more-row {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          margin-top: 1.3rem;
        }

        .see-more {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3.4rem;
          padding: 0.95rem 2rem;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(255, 45, 117, 0.96), rgba(255, 45, 117, 0.84));
          color: white;
          text-decoration: none;
          font-weight: 800;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 18px 34px rgba(255, 45, 117, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .see-more:hover {
          transform: translateY(-2px);
          box-shadow:
            0 22px 40px rgba(255, 45, 117, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }

        @media (max-width: 767px) {
          .content {
            width: calc(100% - 0.7rem);
            margin-top: -0.9rem;
            padding: 1rem;
          }

          .pagination {
            gap: 0.55rem;
            padding-inline: 0.45rem;
          }

          .pagination-button {
            width: 2.8rem;
          }
        }

        @media (max-width: 575px) {
          .thumb-wrap {
            border-radius: 20px 20px 16px 16px;
          }

          .content {
            width: calc(100% - 0.35rem);
            margin-top: -0.65rem;
            padding: 0.9rem;
            border-radius: 18px;
          }

          .project-title {
            font-size: 1.12rem;
          }

          .project-copy {
            font-size: 0.93rem;
            line-height: 1.62;
          }

          .pagination {
            width: 100%;
            justify-content: center;
          }

          .see-more {
            width: 100%;
          }
        }
      </style>
      <section class="section-frame projects-frame">
        <div class="container-fluid">
          <header class="section-header">
            <span class="eyebrow">${escapeHtml(projectsContent.eyebrow)}</span>
            <h2 class="title">${escapeHtml(projectsContent.title)}</h2>
          </header>
          <div class="row g-3 g-lg-4">
            ${this._visibleProjects
              .map(
                (project) => `
                  <div class="${
                    this._itemsPerPage === 1
                      ? 'col-12'
                      : this._itemsPerPage === 2
                        ? 'col-12 col-md-6'
                        : 'col-12 col-md-6 col-lg-4'
                  }">
                    <article class="project-card">
                      <div class="thumb-wrap">
                        <img class="thumb" src="${project.image}" alt="${escapeHtml(project.title)}">
                      </div>
                      <div class="content">
                        <span class="meta">${escapeHtml(project.category)}</span>
                        <h3 class="project-title">${escapeHtml(project.title)}</h3>
                        <p class="project-copy">${escapeHtml(project.summary)}</p>
                        <div class="tag-row">
                          ${renderTagList(project.stack.slice(0, 3))}
                        </div>
                        <div class="footer-row">
                          <a class="repo-link" href="${project.repository}" target="_blank" rel="noreferrer">${escapeHtml(projectsContent.repositoryLabel)}</a>
                        </div>
                      </div>
                    </article>
                  </div>
                `
              )
              .join('')}
          </div>
          <nav class="pagination-wrap" aria-label="${escapeHtml(
            projectsContent.paginationLabel
          )}">
            <div class="pagination">
              <button class="pagination-button" type="button" data-action="previous" ${this._currentPage === 1 ? 'disabled' : ''} aria-label="${escapeHtml(
                projectsContent.previousPageLabel
              )}">&#8249;</button>
              <span class="page-indicator" aria-live="polite">${this._currentPage}</span>
              <button class="pagination-button" type="button" data-action="next" ${this._currentPage === this._totalPages ? 'disabled' : ''} aria-label="${escapeHtml(
                projectsContent.nextPageLabel
              )}">&#8250;</button>
            </div>
          </nav>
          <div class="see-more-row">
            <a class="see-more" href="${projectsContent.cta.href}">${escapeHtml(projectsContent.cta.label)}</a>
          </div>
        </div>
      </section>
    `;

    this.shadowRoot
      .querySelector('[data-action="previous"]')
      ?.addEventListener('click', () => this._changePage(this._currentPage - 1));
    this.shadowRoot
      .querySelector('[data-action="next"]')
      ?.addEventListener('click', () => this._changePage(this._currentPage + 1));
  }

  _changePage(nextPage) {
    const safePage = Math.min(this._totalPages, Math.max(1, nextPage));

    if (safePage === this._currentPage) {
      return;
    }

    this._currentPage = safePage;
    this.render();
  }
}

if (!customElements.get('featured-projects')) {
  customElements.define('featured-projects', FeaturedProjects);
}
