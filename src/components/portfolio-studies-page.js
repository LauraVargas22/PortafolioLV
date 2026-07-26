import './portfolio-navbar.js';
import './site-footer.js';
import './page-banner.js';
import './studies-timeline.js';
import './draft-board.js';
import { studiesContent } from '../data/site-content';

class PortfolioStudiesPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <portfolio-navbar current-page="studies"></portfolio-navbar>
      <main class="page-stack">
        <section class="page-section">
          <page-banner
            eyebrow="${studiesContent.banner.eyebrow}"
            title="${studiesContent.banner.title}"
            description="${studiesContent.banner.description}">
          </page-banner>
        </section>
        <section class="page-section">
          <studies-timeline></studies-timeline>
        </section>
        <section class="page-section">
          <draft-board
            eyebrow="${studiesContent.coursesDraft.eyebrow}"
            title="${studiesContent.coursesDraft.title}"
            description="${studiesContent.coursesDraft.description}">
          </draft-board>
        </section>
      </main>
      <site-footer></site-footer>
    `;

    const draftBoard = this.querySelector('draft-board');
    if (draftBoard) {
      draftBoard.items = studiesContent.coursesDraft.items;
    }
  }
}

if (!customElements.get('portfolio-studies-page')) {
  customElements.define('portfolio-studies-page', PortfolioStudiesPage);
}
