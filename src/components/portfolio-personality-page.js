import './portfolio-navbar.js';
import './site-footer.js';
import './page-banner.js';
import './personality-values.js';
import './draft-board.js';
import { personalityContent } from '../data/site-content';

class PortfolioPersonalityPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <portfolio-navbar current-page="personality"></portfolio-navbar>
      <main class="page-stack">
        <section class="page-section">
          <page-banner
            eyebrow="${personalityContent.banner.eyebrow}"
            title="${personalityContent.banner.title}"
            description="${personalityContent.banner.description}">
          </page-banner>
        </section>
        <section class="page-section">
          <personality-values></personality-values>
        </section>
        <section class="page-section">
          <draft-board
            eyebrow="${personalityContent.interestsDraft.eyebrow}"
            title="${personalityContent.interestsDraft.title}"
            description="${personalityContent.interestsDraft.description}">
          </draft-board>
        </section>
      </main>
      <site-footer></site-footer>
    `;

    const draftBoard = this.querySelector('draft-board');
    if (draftBoard) {
      draftBoard.items = personalityContent.interestsDraft.items;
    }
  }
}

if (!customElements.get('portfolio-personality-page')) {
  customElements.define('portfolio-personality-page', PortfolioPersonalityPage);
}
