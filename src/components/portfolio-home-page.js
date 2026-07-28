import './portfolio-navbar.js';
import './hero-section.js';
import './site-footer.js';
import './technology-carousel.js';
import './featured-projects.js';
import { getHomeContent, socialLinks } from '../data/site-content';
import { technologies } from '../data/technologies';
import {
  getCurrentLanguage,
  onLanguageChange,
  setCurrentLanguage,
} from '../i18n';
import { escapeHtml } from './utils';

const highlightedWordsByLanguage = {
  es: [
    'WebForms',
    'HTML',
    'CSS',
    'JavaScript',
    'C#',
    'GitHub',
    'Git',
    'MySQL',
    'PostgreSQL',
    'comunicación',
    'liderazgo',
    'adaptabilidad',
    'trabajo en equipo',
  ],
  en: [
    'WebForms',
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
    const { about, knowledge, contact } = homeContent;
    const contactLinks = socialLinks.filter((link) => link.label !== 'Email');

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
            <div class="home-contact-shell home-reveal">
              <div class="home-contact-grid">

                <div class="home-contact-left">
                  <h2 class="home-contact-title">${escapeHtml(contact.eyebrow)}</h2>
                  <div class="home-contact-underline"></div>
                  <h3 class="home-contact-subtitle">${escapeHtml(contact.title)}</h3>

                  <p class="home-contact-description">${escapeHtml(contact.description)}</p>

                  <a class="home-contact-email-pill" href="mailto:${escapeHtml(contact.email)}">
                    <span class="home-contact-email-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="5" width="18" height="14" rx="2"/>
                        <path d="M3 7l9 6 9-6"/>
                      </svg>
                    </span>
                    <span class="home-contact-email-text">
                      <strong>${escapeHtml(contact.emailLabel)}</strong>
                      <span>${escapeHtml(contact.email)}</span>
                    </span>
                    <span class="home-contact-email-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </span>
                  </a>

                  <div class="home-contact-links-block">
                    <p class="home-contact-links-label">${escapeHtml(contact.linksLabel)}</p>
                    <div class="home-contact-links">
                      ${contactLinks
                        .map(
                          (link) => `
                            <a
                              class="home-contact-link-pill"
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

                <div class="home-contact-divider" aria-hidden="true"></div>

                <div class="home-contact-right">
                  <div class="home-business-card">
                    <span class="home-business-card-sparkle sparkle-1">&#10022;</span>
                    <span class="home-business-card-sparkle sparkle-2">&#10022;</span>

                    <div class="home-business-card-avatar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/>
                      </svg>
                    </div>

                    <h3 class="home-business-card-name">${escapeHtml(contact.name)}</h3>
                    <p class="home-business-card-role">${escapeHtml(contact.role)}</p>

                    <hr class="home-business-card-divider" />

                    <p class="home-business-card-quote">
                      ${escapeHtml(contact.quote)}
                      <span aria-hidden="true">&#9829;</span>
                    </p>
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
