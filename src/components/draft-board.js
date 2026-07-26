import { shellStyles } from './shared-styles';
import { escapeHtml } from './utils';

class DraftBoard extends HTMLElement {
  static observedAttributes = ['eyebrow', 'title', 'description'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._items = [];
  }

  set items(value) {
    this._items = Array.isArray(value) ? value : [];
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
    const eyebrow = this.getAttribute('eyebrow') ?? 'Draft';
    const title = this.getAttribute('title') ?? 'Seccion en construccion';
    const description =
      this.getAttribute('description') ??
      'Este bloque esta preparado para crecer con tu contenido.';

    this.shadowRoot.innerHTML = `
      <style>
        ${shellStyles}

        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          position: relative;
          z-index: 1;
        }

        .index {
          display: inline-flex;
          width: 2rem;
          height: 2rem;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          margin-bottom: 0.8rem;
          background: rgba(110, 211, 255, 0.12);
          color: var(--accent-soft);
          font-weight: 800;
        }

        @media (max-width: 980px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="shell">
        <header class="section-header">
          <span class="eyebrow">${escapeHtml(eyebrow)}</span>
          <h2 class="title">${escapeHtml(title)}</h2>
          <p class="description">${escapeHtml(description)}</p>
        </header>
        <div class="grid">
          ${this._items
            .map(
              (item, index) => `
                <article class="card">
                  <span class="index">${index + 1}</span>
                  <p class="card-copy">${escapeHtml(item)}</p>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('draft-board')) {
  customElements.define('draft-board', DraftBoard);
}
