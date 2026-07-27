import './portfolio-navbar.js';
import './site-footer.js';
import './page-banner.js';
import './studies-timeline.js';
import './course-credentials.js';
import { getStudiesContent } from '../data/site-content';
import { getCurrentLanguage, onLanguageChange, setCurrentLanguage } from '../i18n';
import { escapeHtml } from './utils';

class PortfolioStudiesPage extends HTMLElement {
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
    const studiesContent = getStudiesContent(language);

    setCurrentLanguage(language);
    document.title =
      language === 'es' ? 'Laura Vargas | Estudios' : 'Laura Vargas | Studies';

    this.innerHTML = `
      <div style="padding-bottom: 1rem;">
        <portfolio-navbar current-page="studies"></portfolio-navbar>
      </div>
      <main class="page-stack">
        <section class="page-section">
          <page-banner
            eyebrow="${escapeHtml(studiesContent.banner.eyebrow)}"
            title="${escapeHtml(studiesContent.banner.title)}"
            description="${escapeHtml(studiesContent.banner.description)}"
            plain>
          </page-banner>
        </section>
        <section class="page-section">
          <studies-timeline></studies-timeline>
        </section>
        <section class="page-section">
          <course-credentials
            eyebrow="${escapeHtml(studiesContent.coursesDraft.eyebrow)}"
            title="${escapeHtml(studiesContent.coursesDraft.title)}"
            description="${escapeHtml(studiesContent.coursesDraft.description)}">
          </course-credentials>
        </section>
      </main>
      <site-footer></site-footer>
    `;

    const courseCredentials = this.querySelector('course-credentials');
    if (courseCredentials) {
      courseCredentials.courses = studiesContent.coursesDraft.courses;
    }
  }
}

if (!customElements.get('portfolio-studies-page')) {
  customElements.define('portfolio-studies-page', PortfolioStudiesPage);
}
