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
    const currentPage = this._resolveCurrentPage();
    const activeLinkId = this._resolveActiveLinkId(currentPage);
    const isHomePage = currentPage === 'home';
    const homeHref = isHomePage ? '#main' : 'index.html';
    const contactHref = isHomePage ? '#contactMe' : 'index.html#contactMe';

    const links = [
      { id: 'home', label: 'Home', href: homeHref },
      { id: 'personality', label: 'Sobre Mi', href: 'personality.html' },
      { id: 'studies', label: 'Estudios', href: 'studies.html' },
      { id: 'experience', label: 'Trayectoria', href: 'experience.html' },
      { id: 'contact', label: 'Contacto', href: contactHref },
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
          border-bottom: 1px solid rgba(85, 102, 152, 0.28);
          background:
            linear-gradient(180deg, rgba(10, 17, 34, 0.98), rgba(6, 12, 26, 0.96)),
            linear-gradient(90deg, rgba(94, 53, 177, 0.08), rgba(110, 211, 255, 0.06));
          box-shadow: 0 12px 28px rgba(2, 6, 23, 0.18);
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
            radial-gradient(circle at 35% 28%, rgba(110, 211, 255, 0.22), transparent 55%),
            linear-gradient(180deg, rgba(20, 33, 65, 0.98), rgba(11, 21, 41, 0.98));
          border: 1px solid rgba(110, 211, 255, 0.18);
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
          color: rgba(169, 184, 211, 0.9);
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
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-1px);
        }

        .nav-link:focus-visible,
        .menu-toggle:focus-visible {
          outline: 2px solid rgba(110, 211, 255, 0.55);
          outline-offset: 3px;
        }

        .nav-link[aria-current='page'] {
          color: white;
          background: linear-gradient(135deg, rgba(94, 53, 177, 0.95), rgba(79, 70, 229, 0.92));
          box-shadow:
            0 10px 22px rgba(94, 53, 177, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .menu-toggle {
          display: none;
          width: 2.9rem;
          height: 2.9rem;
          align-items: center;
          justify-content: center;
          gap: 0.24rem;
          flex-direction: column;
          border: 1px solid rgba(169, 184, 211, 0.16);
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
          border-color: rgba(110, 211, 255, 0.34);
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
            box-shadow: 0 10px 22px rgba(2, 6, 23, 0.16);
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
            border-top: 1px solid rgba(169, 184, 211, 0.12);
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
              <span class="brand-title">Laura Vargas</span>
              <span class="brand-subtitle">Software Developer</span>
            </span>
          </a>
          <button
            class="menu-toggle"
            type="button"
            aria-label="Abrir menu"
            aria-controls="portfolio-nav-links"
            aria-expanded="${this._isOpen ? 'true' : 'false'}">
            <span class="menu-toggle-line"></span>
            <span class="menu-toggle-line"></span>
            <span class="menu-toggle-line"></span>
          </button>
          <nav class="nav-links" id="portfolio-nav-links" aria-label="Navegacion principal">
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
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.menu-toggle')?.addEventListener('click', () => {
      this._isOpen = !this._isOpen;
      this.render();
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
