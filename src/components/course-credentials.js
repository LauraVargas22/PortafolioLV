import { bootstrapCss } from './bootstrap-css';
import { shellStyles } from './shared-styles';
import { escapeHtml } from './utils';

const icons = {
  badge: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3l2.7 5.46 6.03.88-4.36 4.25 1.03 6.01L12 16.9 6.6 19.6l1.03-6.01L3.27 9.34l6.03-.88L12 3z"></path>
    </svg>`,
  calendar: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2"></rect>
      <path d="M16 2v4M8 2v4M3 10h18"></path>
    </svg>`,
  external: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 5h5v5"></path>
      <path d="M10 14L19 5"></path>
      <path d="M19 14v5h-14v-14h5"></path>
    </svg>`,
  star: `
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>`,
  verified: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`,
};

class CourseCredentials extends HTMLElement {
  static observedAttributes = ['eyebrow', 'title', 'description'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._courses = [];
  }

  set courses(value) {
    this._courses = Array.isArray(value) ? value : [];
    if (this.isConnected) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const eyebrow = this.getAttribute('eyebrow') ?? 'Credenciales';
    const title = this.getAttribute('title') ?? 'Cursos adicionales';
    const description =
      this.getAttribute('description') ??
      'Credenciales y cursos complementarios con evidencia verificable.';

    this.shadowRoot.innerHTML = `
      <style>${bootstrapCss}</style>
      <style>
        ${shellStyles}

        :host {
          display: block;
        }

        .credentials-shell {
          position: relative;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          background:
            radial-gradient(circle at 15% 25%, rgba(110, 211, 255, 0.08), transparent 30%),
            radial-gradient(circle at 85% 75%, rgba(255, 45, 117, 0.06), transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(58, 136, 255, 0.04), transparent 40%),
            linear-gradient(160deg, rgba(6, 16, 34, 0.96), rgba(10, 27, 53, 0.88));
          border-radius: 28px;
          border: 1px solid rgba(169, 184, 211, 0.08);
          box-shadow: 0 24px 54px rgba(2, 6, 23, 0.25);
        }

        .credentials-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background:
            repeating-linear-gradient(45deg,
              transparent,
              transparent 35px,
              rgba(110, 211, 255, 0.015) 35px,
              rgba(110, 211, 255, 0.015) 36px
            ),
            repeating-linear-gradient(-45deg,
              transparent,
              transparent 35px,
              rgba(255, 45, 117, 0.015) 35px,
              rgba(255, 45, 117, 0.015) 36px
            );
          pointer-events: none;
        }

        .section-header {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          width: fit-content;
          padding: 0.3rem 0.85rem 0.3rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(110, 211, 255, 0.18);
          background: rgba(110, 211, 255, 0.06);
          color: rgba(169, 184, 211, 0.92);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: var(--font-display);
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6ed3ff;
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }

        .title {
          margin: 0;
          color: white;
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 1.4rem + 2.2vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        .description {
          margin: 0;
          max-width: 32rem;
          color: rgba(226, 232, 240, 0.72);
          font-size: 0.98rem;
          line-height: 1.7;
        }

        /* ========== COURSE GRID ========== */
        .courses-grid {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 1rem;
        }

        .course-card {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(169, 184, 211, 0.08);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 4px 16px rgba(2, 6, 23, 0.12);
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .course-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(110, 211, 255, 0.04), transparent 60%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .course-card:hover {
          transform: translateY(-4px);
          border-color: rgba(110, 211, 255, 0.12);
          box-shadow: 0 12px 32px rgba(2, 6, 23, 0.25);
        }

        .course-card:hover::before {
          opacity: 1;
        }

        .course-card .card-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          border-radius: 0 999px 999px 0;
          background: linear-gradient(180deg, #6ed3ff, #ff2d75);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .course-card:hover .card-accent {
          opacity: 1;
        }

        .course-layout {
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 576px) {
          .course-layout {
            flex-direction: row;
          }
        }

        /* ========== MEDIA ========== */
        .course-media {
          position: relative;
          display: block;
          flex: none;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(10, 19, 34, 0.12), rgba(10, 19, 34, 0.52)), #081325;
          text-decoration: none;
        }

        @media (min-width: 576px) {
          .course-media {
            width: 13rem;
            aspect-ratio: 4 / 3;
          }
        }

        @media (min-width: 992px) {
          .course-media {
            width: 14rem;
            aspect-ratio: 4 / 3;
          }
        }

        .course-media img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .course-card:hover .course-media img {
          transform: scale(1.04);
        }

        .course-media .media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(2, 6, 23, 0.6));
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .course-card:hover .media-overlay {
          opacity: 1;
        }

        .media-overlay .view-icon {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.2rem;
          border-radius: 999px;
          background: rgba(110, 211, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          transform: translateY(12px);
          transition: transform 0.3s ease;
        }

        .course-card:hover .media-overlay .view-icon {
          transform: translateY(0);
        }

        .course-media .media-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.25rem 0.6rem;
          border-radius: 999px;
          background: rgba(255, 45, 117, 0.2);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 45, 117, 0.15);
          color: #ff6b9d;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .course-media .media-badge svg {
          width: 0.7rem;
          height: 0.7rem;
          fill: #ff6b9d;
        }

        /* ========== BODY ========== */
        .course-body {
          min-width: 0;
          flex: 1;
          padding: 1.1rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .course-top-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem 0.9rem;
        }

        .course-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          border: 1px solid rgba(110, 211, 255, 0.12);
          background: rgba(110, 211, 255, 0.06);
          color: #6ed3ff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: var(--font-display);
        }

        .course-kicker svg {
          width: 0.8rem;
          height: 0.8rem;
        }

        .course-meta {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: rgba(168, 219, 255, 0.6);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .course-meta svg {
          width: 0.85rem;
          height: 0.85rem;
        }

        .course-title {
          margin: 0;
          color: white;
          font-family: var(--font-display);
          font-size: clamp(1.05rem, 0.95rem + 0.5vw, 1.35rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .course-issuer {
          margin: 0.05rem 0 0;
          color: rgba(168, 219, 255, 0.85);
          font-size: 0.88rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .course-issuer .verified-icon {
          display: inline-flex;
          color: #4ade80;
          width: 1rem;
          height: 1rem;
        }

        .course-summary {
          margin: 0.2rem 0 0;
          color: rgba(226, 232, 240, 0.65);
          font-size: 0.88rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-bottom-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.3rem;
        }

        /* ========== TAGS ========== */
        .course-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .course-tags li {
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(169, 184, 211, 0.08);
          color: rgba(226, 232, 240, 0.6);
          font-size: 0.7rem;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .course-tags li:hover {
          background: rgba(110, 211, 255, 0.06);
          border-color: rgba(110, 211, 255, 0.12);
          color: rgba(238, 244, 255, 0.85);
        }

        /* ========== LINK ========== */
        .course-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-left: auto;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(110, 211, 255, 0.15);
          background: linear-gradient(135deg, rgba(58, 136, 255, 0.85), rgba(110, 211, 255, 0.75));
          color: #03101f;
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 700;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .course-link:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 24px rgba(58, 136, 255, 0.25);
          color: #03101f;
          text-decoration: none;
        }

        .course-link svg {
          width: 0.9rem;
          height: 0.9rem;
          flex-shrink: 0;
        }

        /* ========== EMPTY STATE ========== */
        .empty-state {
          padding: 2rem;
          border-radius: 20px;
          border: 1px dashed rgba(169, 184, 211, 0.1);
          background: rgba(255, 255, 255, 0.02);
          color: rgba(226, 232, 240, 0.5);
          text-align: center;
          font-size: 0.95rem;
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */

        @media (max-width: 720px) {
          .credentials-shell {
            padding: 1rem;
            border-radius: 20px;
          }

          .course-body {
            padding: 0.9rem 1rem;
          }

          .course-link {
            margin-left: 0;
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 575px) {
          .credentials-shell {
            padding: 0.8rem;
            border-radius: 16px;
          }

          .section-header {
            margin-bottom: 1.25rem;
          }

          .course-media {
            aspect-ratio: 16 / 9;
          }

          .course-body {
            padding: 0.8rem 0.9rem;
            gap: 0.4rem;
          }

          .course-title {
            font-size: 0.95rem;
          }

          .course-issuer {
            font-size: 0.8rem;
          }

          .course-summary {
            font-size: 0.82rem;
          }

          .course-tags li {
            font-size: 0.65rem;
            padding: 0.2rem 0.6rem;
          }

          .course-link {
            font-size: 0.72rem;
            padding: 0.4rem 0.9rem;
          }

          .eyebrow {
            font-size: 0.65rem;
          }

          .description {
            font-size: 0.88rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .course-card,
          .course-card img,
          .course-link,
          .course-tags li,
          .media-overlay .view-icon {
            transition: none !important;
          }
          
          .course-card:hover {
            transform: none !important;
          }
          
          .course-card:hover img {
            transform: none !important;
          }
          
          .media-overlay,
          .media-overlay .view-icon {
            opacity: 0 !important;
            transform: none !important;
          }
        }
      </style>

      <div class="credentials-shell">
        <header class="section-header">
          <span class="eyebrow">
            <span class="eyebrow-dot"></span>
            ${escapeHtml(eyebrow)}
          </span>
          <h2 class="title">${escapeHtml(title)}</h2>
          <p class="description">${escapeHtml(description)}</p>
        </header>

        ${
          this._courses.length
            ? `
              <div class="courses-grid">
                ${this._courses
                  .map(
                    (course) => `
                      <article class="course-card">
                        <span class="card-accent" aria-hidden="true"></span>

                        <div class="course-layout">
                          <a
                            class="course-media"
                            href="${escapeHtml(course.credentialUrl ?? '#')}"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Ver credencial de ${escapeHtml(course.title ?? 'curso')}"
                          >
                            <img
                              src="${escapeHtml(course.image ?? '')}"
                              alt="${escapeHtml(course.imageAlt ?? course.title ?? 'Credencial de curso')}"
                              loading="lazy"
                            />
                            <span class="media-badge">
                              ${icons.star}
                              Certificado
                            </span>
                            <span class="media-overlay">
                              <span class="view-icon">
                                ${icons.external}
                                Ver credencial
                              </span>
                            </span>
                          </a>

                          <div class="course-body">
                            <div class="course-top-row">
                              <span class="course-kicker">
                                ${icons.badge}
                                Verificado
                              </span>
                              <span class="course-meta">
                                ${icons.calendar}
                                ${escapeHtml(course.issuedAt ?? 'Por confirmar')}
                              </span>
                            </div>

                            <div>
                              <h3 class="course-title">${escapeHtml(course.title ?? 'Curso')}</h3>
                              <p class="course-issuer">
                                ${escapeHtml(course.issuer ?? 'Entidad emisora')}
                                <span class="verified-icon">${icons.verified}</span>
                              </p>
                            </div>

                            <p class="course-summary">${escapeHtml(course.summary ?? '')}</p>

                            <div class="course-bottom-row">
                              ${
                                Array.isArray(course.tags) && course.tags.length
                                  ? `
                                    <ul class="course-tags">
                                      ${course.tags
                                        .map(
                                          (tag) => `<li>${escapeHtml(tag)}</li>`
                                        )
                                        .join('')}
                                    </ul>
                                  `
                                  : ''
                              }
                              ${
                                course.credentialUrl
                                  ? `
                                    <a
                                      class="course-link"
                                      href="${escapeHtml(course.credentialUrl)}"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      ${icons.external}
                                      Ver credencial
                                    </a>
                                  `
                                  : ''
                              }
                            </div>
                          </div>
                        </div>
                      </article>
                    `
                  )
                  .join('')}
              </div>
            `
            : `
              <div class="empty-state">
                <p>📚 No hay credenciales registradas por el momento.</p>
              </div>
            `
        }
      </div>
    `;
  }
}

if (!customElements.get('course-credentials')) {
  customElements.define('course-credentials', CourseCredentials);
}