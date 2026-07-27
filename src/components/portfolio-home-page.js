import './portfolio-navbar.js';
import './hero-section.js';
import './site-footer.js';
import './technology-carousel.js';
import './featured-projects.js';
import { getHomeContent, socialLinks } from '../data/site-content';
import { technologies } from '../data/technologies';
import { getCurrentLanguage, onLanguageChange, setCurrentLanguage } from '../i18n';
import { escapeHtml } from './utils';

const highlightedWordsByLanguage = {
  es: [
    'Python',
    'HTML',
    'CSS',
    'JavaScript',
    'C#',
    'GitHub',
    'Git',
    'MySQL',
    'PostgreSQL',
    'comunicacion',
    'liderazgo',
    'adaptabilidad',
    'trabajo en equipo',
  ],
  en: [
    'Python',
    'HTML',
    'CSS',
    'JavaScript',
    'C#',
    'GitHub',
    'Git',
    'MySQL',
    'PostgreSQL',
    'communication',
    'leadership',
    'adaptability',
    'teamwork',
  ],
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightText = (text, language) => {
  let highlighted = escapeHtml(text);

  (highlightedWordsByLanguage[language] ?? highlightedWordsByLanguage.en).forEach(
    (word) => {
      const matcher = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi');
      highlighted = highlighted.replace(
        matcher,
        (match) => `<span class="home-highlight">${match}</span>`
      );
    }
  );

  return highlighted;
};

class PortfolioHomePage extends HTMLElement {
  constructor() {
    super();
    this._observer = null;
    this._removeLanguageListener = null;
  }

  connectedCallback() {
    this._removeLanguageListener = onLanguageChange(() => this.render());
    this.render();
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    this._observer = null;
    this._removeLanguageListener?.();
    this._removeLanguageListener = null;
  }

  render() {
    const language = getCurrentLanguage();
    const homeContent = getHomeContent(language);
    const { hero, about, knowledge, contact } = homeContent;

    setCurrentLanguage(language);
    document.title =
      language === 'es' ? 'Laura Vargas | Inicio' : 'Laura Vargas | Home';

    this._observer?.disconnect();
    this._observer = null;

    this.innerHTML = `
      <div style="padding-bottom: 1rem;">
        <portfolio-navbar current-page="home"></portfolio-navbar>
      </div>
      <main class="page-stack home-page">
        <section id="main" class="page-section home-section">
          <hero-section></hero-section>
        </section>

        <section id="aboutme" class="page-section home-section">
          <div class="container-xl">
            <div class="home-section-shell home-section-shell--about home-reveal">
              <div class="home-section-heading home-reveal">
                <span class="home-section-eyebrow">${escapeHtml(about.eyebrow)}</span>
                <h2 class="home-section-title">${escapeHtml(about.title)}</h2>
              </div>

              <div class="row g-4 g-xl-5 align-items-stretch">
                <div class="col-12 col-lg-6 order-2 order-lg-1">
                  <div class="home-about-copy home-reveal">
                    <div class="home-about-line" aria-hidden="true"></div>
                    <div class="home-about-paragraphs">
                      ${about.paragraphs
                        .map(
                          (paragraph) => `
                            <p class="home-about-text">${highlightText(paragraph, language)}</p>
                          `
                        )
                        .join('')}
                    </div>
                  </div>
                </div>

                <div class="col-12 col-lg-6 order-1 order-lg-2">
                  <ul class="home-about-accordion home-reveal">
                    ${about.cards
                      .map(
                        (card, index) => `
                          <li class="home-about-item" style="--i:${index}">
                            <img
                              class="home-about-image"
                              src="${escapeHtml(card.src)}"
                              alt="${escapeHtml(card.alt)}"
                              loading="lazy"
                            >
                            <div class="home-about-overlay"></div>
                            <div class="home-about-card-copy">
                              <h3>${escapeHtml(card.title)}</h3>
                              <p>${escapeHtml(card.subtitle)}</p>
                            </div>
                          </li>
                        `
                      )
                      .join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="knowledge" class="page-section home-section">
          <div class="container-xl">
            <div class="home-carousel-shell home-reveal">
              <technology-carousel
                visible-items="3"
                autoplay="true"
                autoplay-interval="4200"
                heading="${escapeHtml(knowledge.heading)}"
                subheading="${escapeHtml(knowledge.subheading)}"
                locale="${escapeHtml(language)}">
              </technology-carousel>
            </div>
          </div>
        </section>

        <section id="projects" class="page-section home-section">
          <div class="home-projects-shell home-reveal">
            <featured-projects></featured-projects>
          </div>
        </section>

        <section id="contact" class="page-section home-section">
          <div id="contactMe" class="anchor-target" aria-hidden="true"></div>
          <div class="container-xl">
            <div class="home-section-shell home-section-shell--contact home-reveal">
              <div class="row g-4 g-xl-5 align-items-stretch">
                <div class="col-12 col-lg-7 order-2 order-lg-1">
                  <div class="home-contact-copy home-reveal">
                    <span class="home-contact-eyebrow">${escapeHtml(contact.eyebrow)}</span>
                    <h2 class="home-section-title">${escapeHtml(contact.title)}</h2>
                    <p class="home-contact-description">${escapeHtml(contact.description)}</p>

                    <div class="d-flex flex-column flex-sm-row gap-3 home-contact-actions">
                      <a class="home-primary-button" href="mailto:${escapeHtml(contact.email)}">
                        ${escapeHtml(contact.primaryCta.label)}
                      </a>
                      <a
                        class="home-secondary-button"
                        href="${escapeHtml(contact.cv)}"
                        target="_blank"
                        rel="noreferrer"
                      >
                        ${escapeHtml(contact.secondaryCta.label)}
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-lg-5 order-1 order-lg-2">
                  <div class="home-contact-card home-reveal">
                    <div class="home-contact-card-surface">
                      <h3 class="home-contact-mail">${escapeHtml(contact.email)}</h3>
                      <div class="d-flex flex-wrap gap-2 home-contact-links">
                        ${socialLinks
                          .map(
                            (link) => `
                              <a
                                class="home-social-pill"
                                href="${escapeHtml(link.href)}"
                                target="_blank"
                                rel="noreferrer"
                              >
                                ${escapeHtml(link.label)}
                              </a>
                            `
                          )
                          .join('')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <site-footer></site-footer>
    `;

    const carousel = this.querySelector('technology-carousel');
    if (carousel) {
      carousel.technologies = technologies;
      carousel.labels = knowledge.labels;
    }

    this._setupRevealObserver();
  }

  _setupRevealObserver() {
    const revealNodes = [...this.querySelectorAll('.home-reveal')];

    if (!revealNodes.length) {
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    this._observer?.disconnect();
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          this._observer?.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.18,
      }
    );

    revealNodes.forEach((node) => this._observer?.observe(node));
  }
}

if (!customElements.get('portfolio-home-page')) {
  customElements.define('portfolio-home-page', PortfolioHomePage);
}
