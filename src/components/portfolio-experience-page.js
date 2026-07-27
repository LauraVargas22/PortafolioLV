import './portfolio-navbar.js';
import './site-footer.js';
import './project-gallery.js';

class PortfolioExperiencePage extends HTMLElement {
  connectedCallback() {
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
