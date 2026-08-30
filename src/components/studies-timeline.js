import { getStudiesTimelineContent } from '../data/studies';
import { shellStyles } from './shared-styles';
import { escapeHtml } from './utils';

class StudiesTimeline extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._openIndex = 0;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { eyebrow, title, description, items, skillsTitle, emptyState } =
      getStudiesTimelineContent();

    this.shadowRoot.innerHTML = `
      <style>
        ${shellStyles}

        :host {
          display: block;
        }

        .timeline-shell {
          position: relative;
          --timeline-gap: clamp(1rem, 2.2vw, 1.5rem);
          --timeline-center-column: clamp(3.8rem, 6vw, 4.8rem);
          padding: clamp(1.5rem, 3vw, 2.5rem);
          background:
            radial-gradient(circle at 12% 20%, rgba(110, 211, 255, 0.1), transparent 28%),
            radial-gradient(circle at 88% 80%, rgba(255, 45, 117, 0.08), transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03), transparent 40%),
            linear-gradient(160deg, rgba(12, 12, 15, 0.96), rgba(24, 25, 31, 0.9));
          border-radius: 28px;
          border: 1px solid rgba(169, 184, 211, 0.08);
          box-shadow: 0 24px 54px rgba(2, 6, 23, 0.25);
        }

        .timeline-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background:
            repeating-linear-gradient(45deg,
              transparent,
              transparent 30px,
              rgba(110, 211, 255, 0.02) 30px,
              rgba(110, 211, 255, 0.02) 31px
            ),
            repeating-linear-gradient(-45deg,
              transparent,
              transparent 30px,
              rgba(255, 45, 117, 0.02) 30px,
              rgba(255, 45, 117, 0.02) 31px
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
          border: 1px solid rgba(255, 110, 248, 0.22);
          background: rgba(255, 110, 195, 0.08);
          color: #ff9fc6;
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
          background: #ff2d75;
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

        .accordion-list {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.95rem;
          padding-block: 0.15rem;
        }

        .accordion-list::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0.75rem;
          bottom: 0.75rem;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(
            180deg,
            rgba(110, 211, 255, 0.18),
            rgba(226, 232, 240, 0.05) 45%,
            rgba(255, 45, 117, 0.14)
          );
          box-shadow: 0 0 18px rgba(110, 211, 255, 0.06);
          pointer-events: none;
        }

        .timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) var(--timeline-center-column) minmax(0, 1fr);
          column-gap: var(--timeline-gap);
          align-items: start;
        }

        .timeline-item--left .accordion-card {
          grid-column: 1;
        }

        .timeline-item--right .accordion-card {
          grid-column: 3;
        }

        .timeline-marker {
          position: relative;
          grid-column: 2;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100%;
          padding-top: 0.72rem;
          z-index: 2;
          pointer-events: none;
        }

        .timeline-node {
          position: relative;
          display: inline-flex;
          width: 3rem;
          height: 3rem;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(110, 211, 255, 0.14);
          background: rgba(17, 24, 39, 0.94);
          color: #6ed3ff;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          font-family: var(--font-display);
          box-shadow:
            0 0 0 6px rgba(10, 12, 18, 0.92),
            0 10px 22px rgba(2, 6, 23, 0.18);
          transition: all 0.3s ease;
        }

        .timeline-node::before {
          content: '';
          position: absolute;
          top: 50%;
          width: calc(var(--timeline-gap) + 0.45rem);
          height: 1px;
          transform: translateY(-50%);
          opacity: 0.72;
          transition: opacity 0.3s ease, background 0.3s ease;
        }

        .timeline-item--left .timeline-node::before {
          right: 100%;
          background: linear-gradient(90deg, transparent, rgba(110, 211, 255, 0.22));
        }

        .timeline-item--right .timeline-node::before {
          left: 100%;
          background: linear-gradient(90deg, rgba(110, 211, 255, 0.22), transparent);
        }

        .accordion-card {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(169, 184, 211, 0.08);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 4px 16px rgba(2, 6, 23, 0.15);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          min-width: 0;
        }

        .accordion-card:hover {
          border-color: rgba(110, 211, 255, 0.12);
          box-shadow: 0 8px 28px rgba(2, 6, 23, 0.2);
        }

        .accordion-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(110, 211, 255, 0.04), transparent 50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .accordion-card:hover::before,
        .accordion-card.is-open::before {
          opacity: 1;
        }

        .accordion-card.is-open {
          border-color: rgba(110, 211, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 12px 36px rgba(2, 6, 23, 0.25);
        }

        .timeline-item:hover .timeline-node,
        .timeline-item.is-open .timeline-node {
          background: rgba(110, 211, 255, 0.18);
          border-color: rgba(110, 211, 255, 0.22);
          color: white;
          box-shadow:
            0 0 0 6px rgba(10, 12, 18, 0.92),
            0 0 20px rgba(110, 211, 255, 0.12);
        }

        .timeline-item--left:hover .timeline-node::before,
        .timeline-item--left.is-open .timeline-node::before {
          opacity: 1;
          background: linear-gradient(90deg, transparent, rgba(110, 211, 255, 0.38));
        }

        .timeline-item--right:hover .timeline-node::before,
        .timeline-item--right.is-open .timeline-node::before {
          opacity: 1;
          background: linear-gradient(90deg, rgba(110, 211, 255, 0.38), transparent);
        }

        .accordion-card .card-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          border-radius: 0 999px 999px 0;
          background: linear-gradient(180deg, #6ed3ff, #ff2d75);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .accordion-card:hover .card-accent,
        .accordion-card.is-open .card-accent {
          opacity: 1;
        }

        .timeline-item--left .card-accent {
          left: auto;
          right: 0;
          border-radius: 999px 0 0 999px;
        }

        .timeline-item--left .accordion-card::before {
          background: linear-gradient(225deg, rgba(110, 211, 255, 0.04), transparent 50%);
        }

        .accordion-trigger {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 0.9rem;
          padding: 1.1rem 1.2rem;
          border: 0;
          background: transparent;
          color: inherit;
          text-align: left;
          cursor: pointer;
          position: relative;
          z-index: 2;
        }

        .accordion-trigger:focus-visible {
          outline: 2px solid rgba(110, 211, 255, 0.4);
          outline-offset: -2px;
          border-radius: 18px;
        }

        .accordion-heading {
          min-width: 0;
          display: grid;
          gap: 0.3rem;
        }

        .accordion-meta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          width: fit-content;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          background: rgba(110, 211, 255, 0.06);
          border: 1px solid rgba(110, 211, 255, 0.08);
          color: rgba(168, 219, 255, 0.8);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: var(--font-display);
        }

        .accordion-title {
          margin: 0;
          color: white;
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 0.95rem + 0.6vw, 1.4rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          transition: color 0.25s ease;
        }

        .accordion-trigger:hover .accordion-title {
          color: #6ed3ff;
        }

        .accordion-period {
          margin: 0;
          color: rgba(226, 232, 240, 0.55);
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .accordion-period .period-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(110, 211, 255, 0.3);
        }

        .accordion-icon {
          width: 2.5rem;
          height: 2.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(169, 184, 211, 0.08);
          background: rgba(255, 255, 255, 0.02);
          color: rgba(238, 244, 255, 0.5);
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          flex-shrink: 0;
        }

        .accordion-icon svg {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .accordion-card.is-open .accordion-icon {
          border-color: rgba(110, 211, 255, 0.2);
          background: rgba(110, 211, 255, 0.06);
          color: #6ed3ff;
        }

        .accordion-card.is-open .accordion-icon svg {
          transform: rotate(180deg);
        }

        .accordion-panel {
          padding: 0 1.2rem 1.25rem;
          border-top: 1px solid rgba(169, 184, 211, 0.06);
          animation: slideDown 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .accordion-copy {
          margin: 0;
          padding-top: 1rem;
          color: rgba(226, 232, 240, 0.75);
          font-size: 0.96rem;
          line-height: 1.7;
        }

        .skills-block {
          margin-top: 1rem;
          display: grid;
          gap: 0.6rem;
        }

        .skills-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          color: rgba(168, 219, 255, 0.8);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-family: var(--font-display);
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .skills-list li {
          padding: 0.35rem 0.8rem;
          border-radius: 999px;
          background: rgba(110, 211, 255, 0.04);
          border: 1px solid rgba(110, 211, 255, 0.06);
          color: rgba(226, 232, 240, 0.7);
          font-size: 0.78rem;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .skills-list li:hover {
          background: rgba(110, 211, 255, 0.08);
          border-color: rgba(110, 211, 255, 0.12);
          color: rgba(238, 244, 255, 0.9);
          transform: translateY(-2px);
        }

        .empty-state {
          padding: 2rem;
          border-radius: 20px;
          border: 1px dashed rgba(169, 184, 211, 0.12);
          background: rgba(255, 255, 255, 0.02);
          color: rgba(226, 232, 240, 0.5);
          text-align: center;
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .timeline-shell {
            --timeline-center-column: 3rem;
            --timeline-gap: 0.9rem;
          }

          .accordion-list::before {
            left: calc((var(--timeline-center-column) / 2) - 0.05rem);
            transform: none;
          }

          .timeline-item {
            grid-template-columns: var(--timeline-center-column) minmax(0, 1fr);
            column-gap: 0.85rem;
          }

          .timeline-marker {
            grid-column: 1;
            padding-top: 0.65rem;
          }

          .timeline-item .accordion-card {
            grid-column: 2;
          }

          .timeline-node {
            width: 2.45rem;
            height: 2.45rem;
            font-size: 0.72rem;
          }

          .timeline-item--left .timeline-node::before,
          .timeline-item--right .timeline-node::before,
          .timeline-item--left:hover .timeline-node::before,
          .timeline-item--left.is-open .timeline-node::before,
          .timeline-item--right:hover .timeline-node::before,
          .timeline-item--right.is-open .timeline-node::before {
            left: 100%;
            right: auto;
            width: 0.85rem;
            opacity: 1;
            background: linear-gradient(90deg, rgba(110, 211, 255, 0.24), transparent);
          }

          .timeline-item--left .card-accent,
          .timeline-item--right .card-accent {
            left: 0;
            right: auto;
            border-radius: 0 999px 999px 0;
          }

          .timeline-item--left .accordion-card::before,
          .timeline-item--right .accordion-card::before {
            background: linear-gradient(135deg, rgba(110, 211, 255, 0.04), transparent 50%);
          }
        }

        @media (max-width: 720px) {
          .timeline-shell {
            padding: 1rem;
            border-radius: 20px;
          }

          .accordion-trigger {
            padding: 0.9rem 0.95rem;
            gap: 0.75rem;
          }

          .accordion-icon {
            width: 2.2rem;
            height: 2.2rem;
          }

          .timeline-node {
            width: 2.2rem;
            height: 2.2rem;
            font-size: 0.7rem;
          }

          .accordion-heading {
            gap: 0.2rem;
          }

          .accordion-title {
            font-size: 1rem;
          }

          .accordion-panel {
            padding: 0 0.9rem 1rem;
          }

          .accordion-copy {
            font-size: 0.92rem;
          }

          .skills-list li {
            font-size: 0.72rem;
            padding: 0.3rem 0.7rem;
          }
        }

        @media (max-width: 575px) {
          .timeline-shell {
            --timeline-center-column: 2.55rem;
            --timeline-gap: 0.7rem;
            padding: 0.8rem;
            border-radius: 16px;
          }

          .section-header {
            margin-bottom: 1.25rem;
          }

          .accordion-trigger {
            padding: 0.75rem 0.82rem;
          }

          .accordion-icon,
          .timeline-node {
            width: 2rem;
            height: 2rem;
          }

          .timeline-node {
            font-size: 0.64rem;
            box-shadow:
              0 0 0 4px rgba(10, 12, 18, 0.92),
              0 8px 18px rgba(2, 6, 23, 0.18);
          }

          .accordion-icon svg {
            width: 16px;
            height: 16px;
          }

          .accordion-title {
            font-size: 0.92rem;
          }

          .accordion-period {
            font-size: 0.78rem;
          }

          .accordion-panel {
            padding: 0 0.75rem 0.85rem;
          }

          .accordion-copy {
            font-size: 0.88rem;
            padding-top: 0.75rem;
          }

          .skills-block {
            gap: 0.4rem;
          }

          .skills-list {
            gap: 0.4rem;
          }

          .skills-list li {
            font-size: 0.68rem;
            padding: 0.25rem 0.6rem;
          }

          .eyebrow {
            font-size: 0.65rem;
          }

          .description {
            font-size: 0.88rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .accordion-panel {
            animation: none;
          }

          .accordion-card,
          .accordion-trigger,
          .accordion-icon,
          .accordion-icon svg,
          .timeline-node,
          .skills-list li {
            transition: none !important;
          }
        }
      </style>

      <div class="timeline-shell">
        <header class="section-header">
          <span class="eyebrow">
            <span class="eyebrow-dot"></span>
            ${escapeHtml(eyebrow)}
          </span>
          <h2 class="title">${escapeHtml(title)}</h2>
          <p class="description">${escapeHtml(description)}</p>
        </header>

        ${
          items.length
            ? `
              <div class="accordion-list">
                ${items
                  .map((item, index) => {
                    const isOpen = index === this._openIndex;
                    const side = index % 2 === 0 ? 'right' : 'left';

                    return `
                      <div class="timeline-item timeline-item--${side} ${
                        isOpen ? 'is-open' : ''
                      }">
                        <span class="timeline-marker" aria-hidden="true">
                          <span class="timeline-node">${String(index + 1).padStart(2, '0')}</span>
                        </span>

                        <article class="accordion-card ${isOpen ? 'is-open' : ''}">
                          <span class="card-accent" aria-hidden="true"></span>

                          <button
                            class="accordion-trigger"
                            type="button"
                            data-index="${index}"
                            aria-expanded="${isOpen}"
                            aria-controls="study-panel-${index}"
                          >
                            <span class="accordion-heading">
                              <span class="accordion-meta">
                                <span>${escapeHtml(item.category)}</span>
                              </span>
                              <h3 class="accordion-title">${escapeHtml(item.title)}</h3>
                              <p class="accordion-period">
                                <span class="period-dot"></span>
                                ${escapeHtml(item.period)}
                              </p>
                            </span>
                            <span class="accordion-icon" aria-hidden="true">
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M6 9l6 6 6-6"></path>
                              </svg>
                            </span>
                          </button>

                          ${
                            isOpen
                              ? `
                                <div class="accordion-panel" id="study-panel-${index}">
                                  <p class="accordion-copy">${escapeHtml(item.description)}</p>
                                  ${
                                    item.skills?.length
                                      ? `
                                        <div class="skills-block">
                                          <p class="skills-title">
                                            <span aria-hidden="true">&#9889;</span>
                                            ${escapeHtml(skillsTitle)}
                                          </p>
                                          <ul class="skills-list">
                                            ${item.skills
                                              .map((skill) => `<li>${escapeHtml(skill)}</li>`)
                                              .join('')}
                                          </ul>
                                        </div>
                                      `
                                      : ''
                                  }
                                </div>
                              `
                              : ''
                          }
                        </article>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            `
            : `
              <div class="empty-state">
                <p>${escapeHtml(emptyState)}</p>
              </div>
            `
        }
      </div>
    `;

    this.shadowRoot.querySelectorAll('.accordion-trigger').forEach((button) => {
      button.addEventListener('click', () => {
        const nextIndex = Number(button.dataset.index);
        this._openIndex = this._openIndex === nextIndex ? -1 : nextIndex;
        this.render();
      });
    });
  }
}

if (!customElements.get('studies-timeline')) {
  customElements.define('studies-timeline', StudiesTimeline);
}
