import './portfolio-navbar.js';
import './site-footer.js';
import './project-gallery.js';
import { getCurrentLanguage, onLanguageChange, setCurrentLanguage } from '../i18n';

class PortfolioExperiencePage extends HTMLElement {
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

    setCurrentLanguage(language);
    document.title =
      language === 'es'
        ? 'Laura Vargas | Trayectoria'
        : 'Laura Vargas | Experience';

    this.innerHTML = `
      <div style="padding-bottom: 1rem;">
        <portfolio-navbar current-page="experience"></portfolio-navbar>
      </div>
      <main class="page-stack">
        <section class="page-section">
          <project-gallery></project-gallery>
        </section>
      </main>
      <site-footer></site-footer>
    `;
  }
}

if (!customElements.get('portfolio-experience-page')) {
  customElements.define('portfolio-experience-page', PortfolioExperiencePage);
}
