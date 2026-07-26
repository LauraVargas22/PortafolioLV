import './portfolio-navbar.js';
import './site-footer.js';
import './page-banner.js';
import './experience-gallery.js';
import { experienceContent } from '../data/site-content';

class PortfolioExperiencePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <portfolio-navbar current-page="experience"></portfolio-navbar>
      <main class="page-stack">
        <section class="page-section">
          <page-banner
            eyebrow="${experienceContent.banner.eyebrow}"
            title="${experienceContent.banner.title}"
            description="${experienceContent.banner.description}">
          </page-banner>
        </section>
        <section class="page-section">
          <experience-gallery></experience-gallery>
        </section>
      </main>
      <site-footer></site-footer>
    `;
  }
}

if (!customElements.get('portfolio-experience-page')) {
  customElements.define('portfolio-experience-page', PortfolioExperiencePage);
}
