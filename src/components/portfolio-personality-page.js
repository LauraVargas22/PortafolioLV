import './portfolio-navbar.js';
import './site-footer.js';
import './personality-values.js';
import './literary-carousel.js';
import { getBooks } from '../data/books';
import { getPersonalityContent } from '../data/site-content';
import { getCurrentLanguage, onLanguageChange, setCurrentLanguage } from '../i18n';
import { escapeHtml } from './utils';

class PortfolioPersonalityPage extends HTMLElement {
  constructor() {
    super();
    this._removeLanguageListener = null;
  }

  connectedCallback() {
    this._removeLanguageListener = onLanguageChange(() => this.render());
    this.render();
  }

  disconnectedCallback() {
    this._removeLanguageListener?.();
    this._removeLanguageListener = null;
  }

  render() {
    const language = getCurrentLanguage();
    const personalityContent = getPersonalityContent(language);

    setCurrentLanguage(language);
    document.title =
      language === 'es'
        ? 'Laura Vargas | Sobre mí'
        : 'Laura Vargas | About me';

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
          background: linear-gradient(100deg, #f8fbff 24%, #d7dde8 62%, #6ed3ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: 0 14px 34px rgba(255, 255, 255, 0.08);
        }

        .about-page-title-dot {
          color: #6ed3ff;
          -webkit-text-fill-color: #6ed3ff;
        }
      </style>
      <div style="padding-bottom: 1rem;">
        <portfolio-navbar current-page="personality"></portfolio-navbar>
      </div>
      <main class="page-stack">
        <section class="page-section">
          <div class="personality-intro-block">
            <h1 class="about-page-title">${escapeHtml(personalityContent.pageTitle)}<span class="about-page-title-dot">.</span></h1>
          </div>
        </section>
        <section class="page-section">
          <personality-values></personality-values>
        </section>
        <section class="page-section">
          <literary-carousel
            eyebrow="${escapeHtml(personalityContent.interests.eyebrow)}"
            title="${escapeHtml(personalityContent.interests.title)}"
            description="${escapeHtml(personalityContent.interests.description)}">
          </literary-carousel>
        </section>
      </main>
      <site-footer></site-footer>
    `;

    const literaryCarousel = this.querySelector('literary-carousel');
    if (literaryCarousel) {
      literaryCarousel.books = getBooks(language);
      literaryCarousel.labels = personalityContent.interests.labels;
    }
  }
}

if (!customElements.get('portfolio-personality-page')) {
  customElements.define('portfolio-personality-page', PortfolioPersonalityPage);
}
