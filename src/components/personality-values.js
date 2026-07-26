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

    this.shadowRoot.innerHTML = `
      <style>
        ${shellStyles}

        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          position: relative;
          z-index: 1;
        }

        .card img {
          width: 100%;
          height: 10rem;
          object-fit: cover;
          border-radius: 18px;
          margin-bottom: 1rem;
        }

        .value-list {
          margin-top: 0.9rem;
        }

        @media (max-width: 980px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="shell">
        <div class="grid">
          <article class="card">
            <img src="${personalityContent.missionImage}" alt="Mision">
            <h2 class="card-title">Mision</h2>
            <p class="card-copy">${escapeHtml(personalityContent.mission)}</p>
          </article>
          <article class="card">
            <img src="${personalityContent.visionImage}" alt="Vision">
            <h2 class="card-title">Vision</h2>
            <p class="card-copy">${escapeHtml(personalityContent.vision)}</p>
          </article>
          <article class="card">
            <img src="${personalityContent.valuesImage}" alt="Valores">
            <h2 class="card-title">Valores</h2>
            <p class="card-copy">Los valores que sostienen mi forma de aprender, colaborar y construir soluciones.</p>
            <ul class="clean-list value-list">
              ${renderBulletList(valuesList)}
            </ul>
          </article>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('personality-values')) {
  customElements.define('personality-values', PersonalityValues);
}
