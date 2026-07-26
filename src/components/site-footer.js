import { socialLinks } from '../data/site-content';
import { escapeHtml } from './utils';

class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          margin-top: 2rem;
          border-top: 1px solid rgba(169, 184, 211, 0.14);
          background:
            linear-gradient(180deg, rgba(7, 19, 37, 0.96), rgba(4, 11, 24, 0.98));
        }

        * {
          box-sizing: border-box;
        }

        .footer {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 2rem 1.25rem 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .copy {
          display: grid;
          gap: 0.35rem;
          min-width: 0;
        }

        .title {
          font-family: var(--font-display);
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .text {
          color: var(--text-muted);
          font-size: 0.92rem;
          opacity: 0.8;
        }

        .text:last-child {
          font-size: 0.85rem;
          opacity: 0.6;
        }

        .social {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          padding: 0;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
          position: relative;
        }

        .social-link:hover {
          transform: translateY(-3px) scale(1.05);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .social-link svg {
          width: 22px;
          height: 22px;
          fill: currentColor;
          transition: transform 0.3s ease;
        }

        .social-link:hover svg {
          transform: scale(1.1);
        }

        .social-link.linkedin:hover {
          background: #0a66c2;
          border-color: #0a66c2;
          color: white;
          box-shadow: 0 4px 20px rgba(10, 102, 194, 0.3);
        }

        .social-link.github:hover {
          background: #24292f;
          border-color: #24292f;
          color: white;
          box-shadow: 0 4px 20px rgba(36, 41, 47, 0.3);
        }

        .social-link .tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) scale(0.8);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .social-link .tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: rgba(0, 0, 0, 0.9);
        }

        .social-link:hover .tooltip {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }

        @media (max-width: 767px) {
          .footer {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem 0.9rem 2rem;
            gap: 1.25rem;
          }

          .copy {
            gap: 0.2rem;
          }

          .title {
            font-size: 1rem;
          }

          .social {
            gap: 0.6rem;
          }

          .social-link {
            width: 40px;
            height: 40px;
          }

          .social-link svg {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 1.25rem 0.7rem 1.5rem;
          }

          .social-link {
            width: 36px;
            height: 36px;
          }

          .social-link svg {
            width: 18px;
            height: 18px;
          }

          .text {
            font-size: 0.85rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .social-link,
          .social-link svg,
          .social-link .tooltip {
            transition: none !important;
          }
          
          .social-link:hover {
            transform: none !important;
          }
        }
      </style>
      <footer class="footer">
        <div class="copy">
          <span class="title">Laura Mariana Vargas Rojas</span>
          <span class="text">Desarrolladora de Software</span>
          <span class="text">Estudiante de Ingeniería en Ciencia de Datos</span>
        </div>
        <div class="social">
          <a 
            href="https://www.linkedin.com/in/laura-vargas2209s/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-link linkedin"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span class="tooltip">LinkedIn</span>
          </a>
          <a 
            href="https://github.com/LauraVargas22" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-link github"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.695.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span class="tooltip">GitHub</span>
          </a>
        </div>
      </footer>
    `;
  }
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', SiteFooter);
}