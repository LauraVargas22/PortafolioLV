import { getNavigationContent } from '../data/site-content';
import { getCurrentLanguage, setCurrentLanguage } from '../i18n';
import { escapeHtml } from './utils';

const logoUrl = new URL('../images/logo.png', import.meta.url).href;
const VALID_PAGES = new Set([
  'home',
  'personality',
  'studies',
  'experience',
  'contact',
]);

class PortfolioNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
    this._handleResize = () => {
      if (window.innerWidth > 991 && this._isOpen) {
        this._isOpen = false;
        this.render();
      }
    };
    this._handleLocationChange = () => {
      this.render();
    };
  }

  connectedCallback() {
    window.addEventListener('resize', this._handleResize);
    window.addEventListener('hashchange', this._handleLocationChange);
    window.addEventListener('popstate', this._handleLocationChange);
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._handleResize);
    window.removeEventListener('hashchange', this._handleLocationChange);
    window.removeEventListener('popstate', this._handleLocationChange);
  }

  render() {
    const language = getCurrentLanguage();
    const navigationContent = getNavigationContent(language);
    const currentPage = this._resolveCurrentPage();
    const activeLinkId = this._resolveActiveLinkId(currentPage);
    const isHomePage = currentPage === 'home';
    const homeHref = isHomePage ? '#main' : 'index.html';
    const contactHref = isHomePage ? '#contactMe' : 'index.html#contactMe';

    const links = [
      {
        id: 'home',
        label: navigationContent.links.home.label,
        href: homeHref,
      },
      {
        id: 'personality',
        label: navigationContent.links.personality.label,
        href: 'personality.html',
      },
      {
        id: 'studies',
        label: navigationContent.links.studies.label,
        href: 'studies.html',
      },
      {
        id: 'experience',
        label: navigationContent.links.experience.label,
        href: 'experience.html',
      },
      {
        id: 'contact',
        label: navigationContent.links.contact.label,
        href: contactHref,
      },
    ];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          z-index: 40;
          display: block;
        }

        * {
          box-sizing: border-box;
        }

        .nav-shell {
          width: 100%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(180deg, rgba(8, 8, 10, 0.98), rgba(18, 19, 24, 0.96)),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04), rgba(110, 211, 255, 0.04));
          box-shadow: 0 12px 28px rgba(2, 6, 23, 0.24);
        }

        .nav-frame {
          max-width: var(--content-width);
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.25rem;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          min-width: 0;
          color: white;
          text-decoration: none;
        }

        .brand-mark {
          flex: 0 0 3.5rem;
          width: 3.5rem;
          height: 3.5rem;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background:
            radial-gradient(circle at 35% 28%, rgba(255, 110, 224, 0.18), transparent 55%),
            linear-gradient(180deg, rgba(30, 24, 29, 0.98), rgba(18, 12, 17, 0.98));
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 10px 24px rgba(2, 6, 23, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .brand-mark img {
          width: 2rem;
          height: 2rem;
          object-fit: contain;
        }

        .brand-copy {
          display: grid;
          min-width: 0;
        }

        .brand-title {
          color: #f8fbff;
          font-family: var(--font-display);
          font-size: 1.02rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          white-space: nowrap;
        }

        .brand-subtitle {
          color: rgba(188, 196, 211, 0.86);
          font-size: 0.84rem;
          white-space: nowrap;
        }

        .nav-links {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.35rem;
          min-width: 0;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.7rem;
          padding: 0.7rem 1rem;
          border-radius: 14px;
          color: rgba(226, 232, 240, 0.86);
          text-decoration: none;
          font-size: 0.94rem;
          font-weight: 600;
          line-height: 1;
          transition:
            color 180ms ease,
            background 180ms ease,
            border-color 180ms ease,
            transform 180ms ease;
        }

        .nav-link:hover {
          color: white;
          background: rgba(209, 38, 152, 0.73);
          transform: translateY(-1px);
        }

        .nav-link:focus-visible,
        .menu-toggle:focus-visible,
        .lang-option:focus-visible {
          outline: 2px solid rgba(110, 211, 255, 0.55);
          outline-offset: 3px;
        }

        .nav-link[aria-current='page'] {
          color: white;
          background: linear-gradient(135deg, rgba(66, 56, 64, 0.96), rgba(28, 30, 36, 0.96));
          box-shadow:
            0 10px 22px rgba(24, 15, 22, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .nav-tools {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .lang-switch {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .lang-option {
          min-width: 2.75rem;
          min-height: 2.2rem;
          padding: 0.45rem 0.78rem;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: rgba(226, 232, 240, 0.78);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition:
            background 180ms ease,
            color 180ms ease,
            transform 180ms ease;
        }

        .lang-option:hover {
          color: white;
          transform: translateY(-1px);
        }

        .lang-option.is-active {
          background: linear-gradient(135deg, rgba(185, 101, 160, 0.92), rgba(194, 107, 172, 0.589));
          color: #1f061b;
          box-shadow: 0 10px 20px rgba(255, 58, 166, 0.34);
        }

        .menu-toggle {
          display: none;
          width: 2.9rem;
          height: 2.9rem;
          align-items: center;
          justify-content: center;
          gap: 0.24rem;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          color: white;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            transform 180ms ease;
        }

        .menu-toggle:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 110, 199, 0.34);
          transform: translateY(-1px);
        }

        .menu-toggle-line {
          width: 1rem;
          height: 2px;
          border-radius: 999px;
          background: currentColor;
        }

        @media (max-width: 991px) {
          .nav-shell {
            box-shadow: 0 10px 22px rgba(2, 6, 23, 0.22);
          }

          .nav-frame {
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 0.85rem;
          }

          .menu-toggle {
            display: inline-flex;
          }

          .nav-links {
            grid-column: 1 / -1;
            display: ${this._isOpen ? 'grid' : 'none'};
            gap: 0.55rem;
            padding-top: 0.85rem;
            margin-top: 0.15rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .nav-link {
            width: 100%;
            justify-content: flex-start;
            padding-inline: 1rem;
          }
        }

        @media (max-width: 640px) {
          .nav-frame {
            padding: 0.75rem 0.9rem;
          }

          .brand-mark {
            flex-basis: 3rem;
            width: 3rem;
            height: 3rem;
          }

          .brand-mark img {
            width: 1.75rem;
            height: 1.75rem;
          }

          .brand-title {
            font-size: 0.95rem;
          }

          .brand-subtitle {
            font-size: 0.78rem;
          }

          .nav-tools {
            gap: 0.45rem;
          }

          .lang-option {
            min-width: 2.45rem;
            padding-inline: 0.62rem;
          }
        }

        @media (max-width: 420px) {
          .nav-frame {
            padding: 0.7rem 0.7rem;
          }

          .brand {
            gap: 0.55rem;
          }

          .brand-mark {
            flex-basis: 2.7rem;
            width: 2.7rem;
            height: 2.7rem;
          }

          .brand-mark img {
            width: 1.55rem;
            height: 1.55rem;
          }

          .brand-title {
            font-size: 0.9rem;
          }

          .brand-subtitle {
            display: none;
          }
        }
      </style>
      <div class="nav-shell">
        <div class="nav-frame">
          <a class="brand" href="${homeHref}">
            <span class="brand-mark">
              <img src="${logoUrl}" alt="Laura Vargas">
            </span>
            <span class="brand-copy">
              <span class="brand-title">${escapeHtml(navigationContent.brandTitle)}</span>
              <span class="brand-subtitle">${escapeHtml(navigationContent.brandSubtitle)}</span>
            </span>
          </a>
          <nav class="nav-links" id="portfolio-nav-links" aria-label="${escapeHtml(
            navigationContent.navLabel
          )}">
            ${links
              .map(
                (link) => `
                  <a
                    class="nav-link"
                    href="${link.href}"
                    ${activeLinkId === link.id ? 'aria-current="page"' : ''}>
                    ${escapeHtml(link.label)}
                  </a>
                `
              )
              .join('')}
          </nav>
          <div class="nav-tools">
            <div class="lang-switch" role="group" aria-label="${escapeHtml(
              navigationContent.languageLabel
            )}">
              <button
                class="lang-option ${language === 'es' ? 'is-active' : ''}"
                type="button"
                data-lang="es"
                aria-pressed="${language === 'es'}"
              >
                ES
              </button>
              <button
                class="lang-option ${language === 'en' ? 'is-active' : ''}"
                type="button"
                data-lang="en"
                aria-pressed="${language === 'en'}"
              >
                EN
              </button>
            </div>
            <button
              class="menu-toggle"
              type="button"
              aria-label="${escapeHtml(navigationContent.menuLabel)}"
              aria-controls="portfolio-nav-links"
              aria-expanded="${this._isOpen ? 'true' : 'false'}">
              <span class="menu-toggle-line"></span>
              <span class="menu-toggle-line"></span>
              <span class="menu-toggle-line"></span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.menu-toggle')?.addEventListener('click', () => {
      this._isOpen = !this._isOpen;
      this.render();
    });

    this.shadowRoot.querySelectorAll('.lang-option').forEach((button) => {
      button.addEventListener('click', () => {
        const nextLanguage = button.getAttribute('data-lang');

        if (!nextLanguage || nextLanguage === language) {
          return;
        }

        setCurrentLanguage(nextLanguage);
      });
    });

    this.shadowRoot.querySelector('.nav-frame')?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this._isOpen) {
        this._isOpen = false;
        this.render();
      }
    });

    const closeMenuAfterNavigation = () => {
      if (!this._isOpen) {
        return;
      }

      window.setTimeout(() => {
        if (!this.isConnected) {
          return;
        }

        this._isOpen = false;
        this.render();
      }, 0);
    };

    this.shadowRoot.querySelector('.brand')?.addEventListener('click', closeMenuAfterNavigation);
    this.shadowRoot.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMenuAfterNavigation);
    });
  }

  _resolveCurrentPage() {
    const routePage = this._resolvePageFromLocation();

    if (routePage) {
      return routePage;
    }

    const attributePage = (this.getAttribute('current-page') ?? '').toLowerCase();
    return VALID_PAGES.has(attributePage) ? attributePage : 'home';
  }

  _resolvePageFromLocation() {
    if (typeof window === 'undefined') {
      return null;
    }

    const lastSegment =
      window.location.pathname.split('/').filter(Boolean).pop()?.toLowerCase() ?? '';

    if (!lastSegment || lastSegment === 'index.html' || lastSegment === 'index') {
      return 'home';
    }

    if (lastSegment === 'personality.html' || lastSegment === 'personality') {
      return 'personality';
    }

    if (lastSegment === 'studies.html' || lastSegment === 'studies') {
      return 'studies';
    }

    if (lastSegment === 'experience.html' || lastSegment === 'experience') {
      return 'experience';
    }

    return null;
  }

  _resolveActiveLinkId(currentPage) {
    if (currentPage === 'home' && typeof window !== 'undefined') {
      const currentHash = window.location.hash.toLowerCase();

      if (currentHash === '#contact' || currentHash === '#contactme') {
        return 'contact';
      }
    }

    return currentPage;
  }
}

if (!customElements.get('portfolio-navbar')) {
  customElements.define('portfolio-navbar', PortfolioNavbar);
}
