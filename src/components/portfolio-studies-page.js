import './portfolio-navbar.js';
import './site-footer.js';
import './page-banner.js';
import './studies-timeline.js';
import './course-credentials.js';
import { studiesContent } from '../data/site-content';

class PortfolioStudiesPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="padding-bottom: 1rem;">
        <portfolio-navbar current-page="studies"></portfolio-navbar>
      </div>
      <main class="page-stack">
        <section class="page-section">
          <page-banner
            eyebrow="${studiesContent.banner.eyebrow}"
            title="${studiesContent.banner.title}"
            description="${studiesContent.banner.description}"
            plain>
          </page-banner>
        </section>
        <section class="page-section">
          <studies-timeline></studies-timeline>
        </section>
        <section class="page-section">
          <course-credentials
            eyebrow="${studiesContent.coursesDraft.eyebrow}"
            title="${studiesContent.coursesDraft.title}"
            description="${studiesContent.coursesDraft.description}">
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
