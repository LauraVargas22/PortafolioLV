import { personalityContent } from '../data/site-content';
import { shellStyles } from './shared-styles';
import { escapeHtml, renderBulletList } from './utils';

class PersonalityValues extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const valuesList = personalityContent.values.map((value) => value.title);
    const cards = [
      {
        index: '01',
        title: 'Mision',
        eyebrow: 'Pilar esencial',
        copy: personalityContent.mission,
        image: personalityContent.missionImage,
        alt: 'Mision',
        accent: '#6ed3ff',
        glow: 'rgba(110, 211, 255, 0.26)',
      },
      {
        index: '02',
        title: 'Vision',
        eyebrow: 'Direccion profesional',
        copy: personalityContent.vision,
        image: personalityContent.visionImage,
        alt: 'Vision',
        accent: '#ff2d75',
        glow: 'rgba(255, 45, 117, 0.24)',
      },
      {
        index: '03',
        title: 'Valores',
        eyebrow: 'Base de colaboracion',
        copy:
          'Los valores que sostienen mi forma de aprender, colaborar y construir soluciones.',
        image: personalityContent.valuesImage,
        alt: 'Valores',
        accent: '#9f7cff',
        glow: 'rgba(159, 124, 255, 0.24)',
        values: valuesList,
      },
    ];

    this.shadowRoot.innerHTML = `
      <style>
        ${shellStyles}

        .shell {
          background:
            radial-gradient(circle at 14% 16%, rgba(110, 211, 255, 0.12), transparent 22%),
            radial-gradient(circle at 84% 18%, rgba(255, 45, 117, 0.1), transparent 18%),
            linear-gradient(160deg, rgba(7, 19, 37, 0.94), rgba(10, 27, 53, 0.86));
        }

        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          position: relative;
          z-index: 1;
          gap: clamp(1.15rem, 2.4vw, 1.8rem);
          align-items: stretch;
        }

        .card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          padding: 1rem;
          border-radius: 28px;
          overflow: hidden;
          isolation: isolate;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 26%),
            linear-gradient(180deg, rgba(10, 26, 51, 0.96), rgba(6, 17, 33, 0.98));
          border: 1px solid rgba(169, 184, 211, 0.14);
          box-shadow: 0 22px 48px rgba(2, 6, 23, 0.22);
          transition:
            transform 240ms ease,
            box-shadow 240ms ease,
            border-color 240ms ease;
        }

        .card:hover {
          transform: translateY(-8px);
          border-color: var(--card-accent, #6ed3ff);
          box-shadow:
            0 28px 56px rgba(2, 6, 23, 0.32),
            0 0 30px var(--card-glow, rgba(110, 211, 255, 0.18));
        }

        .card::before,
        .card::after {
          content: '';
          position: absolute;
          pointer-events: none;
        }

        .card::before {
          inset: 0;
          border-radius: inherit;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .card::after {
          top: -22%;
          right: -14%;
          width: 11rem;
          height: 11rem;
          border-radius: 999px;
          background: radial-gradient(circle, var(--card-glow, rgba(110, 211, 255, 0.2)), transparent 70%);
          filter: blur(10px);
          opacity: 0.95;
        }

        .card-media {
          position: relative;
          aspect-ratio: 16 / 10;
          border-radius: 22px;
          overflow: hidden;
          margin-bottom: 1.1rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 18px 36px rgba(2, 6, 23, 0.24);
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          margin: 0;
          display: block;
          transition: transform 420ms ease;
        }

        .card:hover img {
          transform: scale(1.06);
        }

        .card-media::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 26%),
            linear-gradient(180deg, transparent 54%, rgba(2, 6, 23, 0.6));
          pointer-events: none;
        }

        .card-index {
          position: absolute;
          top: 0.8rem;
          left: 0.8rem;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 2.35rem;
          height: 2.35rem;
          padding: 0 0.62rem;
          border-radius: 999px;
          background: rgba(5, 15, 34, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 10px 24px rgba(2, 6, 23, 0.24);
          backdrop-filter: blur(10px);
          color: var(--card-accent, #6ed3ff);
          font-family: var(--font-display, inherit);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.06em;
        }

        .card-body {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.85rem;
          flex: 1;
        }

        .card-eyebrow {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          padding: 0.36rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          color: rgba(238, 244, 255, 0.74);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .card-title {
          margin: 0;
          color: white;
          font-family: var(--font-display, inherit);
          font-size: clamp(1.35rem, 1.18rem + 0.5vw, 1.65rem);
          line-height: 1.1;
          letter-spacing: -0.04em;
        }

        .card-copy {
          margin: 0;
          color: var(--text-secondary, rgba(226, 232, 240, 0.8));
          font-size: 0.96rem;
          line-height: 1.82;
        }

        .value-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: auto 0 0;
          padding: 0;
          list-style: none;
          padding-top: 0.95rem;
          border-top: 1px solid rgba(169, 184, 211, 0.12);
        }

        .value-list li {
          padding: 0.4rem 0.78rem;
          border-radius: 999px;
          border: 1px solid rgba(159, 124, 255, 0.22);
          background:
            linear-gradient(135deg, rgba(159, 124, 255, 0.12), rgba(255, 45, 117, 0.08));
          color: #f1eaff;
          font-size: 0.79rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        @media (max-width: 980px) {
          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .card {
            padding: 0.9rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card,
          .card img {
            transition: none;
          }
        }
      </style>
      <div class="shell">
        <div class="grid">
          ${cards
            .map(
              (card) => `
                <article
                  class="card"
                  style="--card-accent: ${card.accent}; --card-glow: ${card.glow};"
                >
                  <div class="card-media">
                    <span class="card-index">${card.index}</span>
                    <img src="${card.image}" alt="${escapeHtml(card.alt)}">
                  </div>
                  <div class="card-body">
                    <h2 class="card-title">${escapeHtml(card.title)}</h2>
                    <p class="card-copy">${escapeHtml(card.copy)}</p>
                    ${
                      card.values?.length
                        ? `
                          <ul class="value-list">
                            ${renderBulletList(card.values)}
                          </ul>
                        `
                        : ''
                    }
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

if (!customElements.get('personality-values')) {
  customElements.define('personality-values', PersonalityValues);
}
