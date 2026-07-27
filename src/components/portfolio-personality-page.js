import './portfolio-navbar.js';
import './site-footer.js';
import './personality-values.js';
import './literary-carousel.js';
import { books } from '../data/books';
import { personalityContent } from '../data/site-content';
import { escapeHtml } from './utils';

class PortfolioPersonalityPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .personality-intro-block {
          max-width: 50rem;
          margin: 0 auto;
          display: grid;
          gap: 1rem;
          justify-items: center;
          text-align: center;
        }

        .personality-intro-eyebrow {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          gap: 0.55rem;
          padding: 0.48rem 0.88rem;
          border-radius: 999px;
          border: 1px solid rgba(110, 211, 255, 0.22);
          background: rgba(110, 211, 255, 0.08);
          color: var(--accent-soft, #a8dbff);
          font-family: var(--font-display, inherit);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .about-page-title {
          margin: 0;
          max-width: 12ch;
          color: transparent;
          font-family: var(--font-display, inherit);
          font-size: clamp(2.35rem, 1.7rem + 3vw, 4.45rem);
          font-weight: 800;
          line-height: 0.94;
          letter-spacing: -0.06em;
          text-wrap: balance;
          background: linear-gradient(100deg, #f8fbff 24%, #6ed3ff 62%, #8f5bff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: 0 14px 34px rgba(110, 211, 255, 0.12);
        }

        .about-page-title-dot {
          color: #8f5bff;
          -webkit-text-fill-color: #8f5bff;
        }

        .personality-intro-description {
          margin: 0;
          max-width: 42rem;
          color: var(--text-secondary, rgba(226, 232, 240, 0.8));
          font-size: clamp(1rem, 0.96rem + 0.22vw, 1.08rem);
          line-height: 1.78;
        }

        @media (max-width: 575px) {
          .personality-intro-description {
            font-size: 0.95rem;
            line-height: 1.68;
          }
        }
      </style>
      <div style="padding-bottom: 1rem;">
        <portfolio-navbar current-page="personality"></portfolio-navbar>
      </div>
      <main class="page-stack">
        <section class="page-section">
          <div class="personality-intro-block">
            <h1 class="about-page-title">Un poco sobre m&#237;<span class="about-page-title-dot">...</span></h1>
          </div>
        </section>
        <section class="page-section">
          <personality-values></personality-values>
        </section>
        <section class="page-section">
          <literary-carousel
            eyebrow="${personalityContent.interestsDraft.eyebrow}"
            title="${personalityContent.interestsDraft.title}"
            description="${personalityContent.interestsDraft.description}">
          </literary-carousel>
        </section>
      </main>
      <site-footer></site-footer>
    `;

    const literaryCarousel = this.querySelector('literary-carousel');
    if (literaryCarousel) {
      literaryCarousel.books = books;
    }
  }
}

if (!customElements.get('portfolio-personality-page')) {
  customElements.define('portfolio-personality-page', PortfolioPersonalityPage);
}
