import { shellStyles } from './shared-styles';
import { escapeHtml } from './utils';

class PageBanner extends HTMLElement {
  static observedAttributes = ['eyebrow', 'title', 'description', 'plain'];

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
    const isPlain = this.hasAttribute('plain');

    this.shadowRoot.innerHTML = `
      <style>
        ${shellStyles}

        .shell {
          text-align: center;
          background:
            radial-gradient(circle at 16% 18%, rgba(255, 96, 145, 0.14), transparent 24%),
            radial-gradient(circle at 86% 16%, rgba(110, 211, 255, 0.14), transparent 24%),
            radial-gradient(circle at 50% 100%, rgba(255, 188, 92, 0.1), transparent 28%),
            linear-gradient(160deg, rgba(7, 19, 37, 0.94), rgba(10, 27, 53, 0.84));
        }

        .shell.plain {
          padding: 0.15rem 0 0;
          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
          overflow: visible;
        }

        .shell.plain::before {
          display: none;
        }

        .section-header {
          max-width: 48rem;
          margin: 0 auto;
          justify-items: center;
          text-align: center;
          gap: 0.8rem;
        }

        .banner-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 110, 248, 0.24);
          background: linear-gradient(
              135deg,
              rgba(255, 96, 145, 0.2),
              rgba(255, 45, 117, 0.1)
            ),
            rgba(7, 19, 37, 0.68);
          color: #ff9fc6;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 14px 30px rgba(2, 6, 23, 0.18);
        }

        .banner-eyebrow-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #ff8ab5, #ff2d75);
          box-shadow: 0 0 14px rgba(255, 96, 145, 0.34);
        }

        .title {
          position: relative;
          margin: 0;
          padding-bottom: 0.95rem;
          color: #f8fbff;
          text-wrap: balance;
          text-shadow: 0 16px 32px rgba(2, 6, 23, 0.2);
        }

        .title::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: clamp(4.5rem, 14vw, 7rem);
          height: 0.34rem;
          border-radius: 999px;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #ff6091, #ffbc5c, #6ed3ff);
          box-shadow: 0 10px 24px rgba(255, 96, 145, 0.24);
        }

        .description {
          max-width: 42rem;
          text-wrap: balance;
        }

        @media (max-width: 575px) {
          .banner-eyebrow {
            padding-inline: 0.78rem;
            font-size: 0.7rem;
          }

          .shell.plain {
            padding-top: 0;
          }

          .title {
            padding-bottom: 0.8rem;
          }
        }
      </style>
      <div class="shell${isPlain ? ' plain' : ''}">
        <div class="section-header">
          ${
            eyebrow
              ? `
                <span class="banner-eyebrow">
                  <span class="banner-eyebrow-dot"></span>
                  ${escapeHtml(eyebrow)}
                </span>
              `
              : ''
          }
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
