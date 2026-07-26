import { studiesContent } from '../data/site-content';
import { shellStyles } from './shared-styles';
import { escapeHtml } from './utils';

class StudiesTimeline extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        ${shellStyles}

        .timeline {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 1rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 1rem;
          top: 0.5rem;
          bottom: 0.5rem;
          width: 2px;
          background: linear-gradient(180deg, rgba(110, 211, 255, 0.45), rgba(169, 184, 211, 0.1));
        }

        .item {
          position: relative;
          margin-left: 2rem;
        }

        .item::before {
          content: '';
          position: absolute;
          left: -1.45rem;
          top: 1.25rem;
          width: 0.85rem;
          height: 0.85rem;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--accent), var(--accent-strong));
          box-shadow: 0 0 0 6px rgba(110, 211, 255, 0.08);
        }

        .status {
          display: inline-flex;
          margin-bottom: 0.7rem;
          padding: 0.35rem 0.7rem;
          border-radius: 999px;
          background: rgba(110, 211, 255, 0.08);
          color: var(--accent-soft);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        @media (max-width: 720px) {
          .timeline::before {
            left: 0.7rem;
          }

          .item {
            margin-left: 1.5rem;
          }
        }
      </style>
      <div class="shell">
        <header class="section-header">
          <span class="eyebrow">Timeline</span>
          <h2 class="title">Cronologia de estudios</h2>
          <p class="description">La estructura ya deja claro como organizar instituciones, periodos y etapas de aprendizaje sin inventar datos que aun no has definido.</p>
        </header>
        <div class="timeline">
          ${studiesContent.timeline
            .map(
              (item) => `
                <article class="card item">
                  <span class="status">${escapeHtml(item.status)}</span>
                  <h3 class="card-title">${escapeHtml(item.stage)}</h3>
                  <p class="card-copy">${escapeHtml(item.description)}</p>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('studies-timeline')) {
  customElements.define('studies-timeline', StudiesTimeline);
}
