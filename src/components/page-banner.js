import { shellStyles } from './shared-styles';
import { escapeHtml } from './utils';

class PageBanner extends HTMLElement {
  static observedAttributes = ['eyebrow', 'title', 'description'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
    const eyebrow = this.getAttribute('eyebrow') ?? '';
    const title = this.getAttribute('title') ?? '';
    const description = this.getAttribute('description') ?? '';

    this.shadowRoot.innerHTML = `
      <style>
        ${shellStyles}

        .shell {
          text-align: left;
        }
      </style>
      <div class="shell">
        <div class="section-header">
          <span class="eyebrow">${escapeHtml(eyebrow)}</span>
          <h1 class="title">${escapeHtml(title)}</h1>
          <p class="description">${escapeHtml(description)}</p>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('page-banner')) {
  customElements.define('page-banner', PageBanner);
}
