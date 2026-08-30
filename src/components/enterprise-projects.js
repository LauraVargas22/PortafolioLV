import { getEnterpriseCompanies } from '../data/projects';
import { getHomeContent } from '../data/site-content';
import { escapeHtml, renderTagList } from './utils';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, summary, [role="button"]';

const iconMap = {
  briefcase: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M8 7V5.75A1.75 1.75 0 0 1 9.75 4h4.5A1.75 1.75 0 0 1 16 5.75V7"></path>
      <rect x="3" y="7" width="18" height="13" rx="2.25"></rect>
      <path d="M3 12.5h18"></path>
      <path d="M10.5 12.5v1.25h3V12.5"></path>
    </svg>`,
  spark: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3v5"></path>
      <path d="M12 16v5"></path>
      <path d="M3 12h5"></path>
      <path d="M16 12h5"></path>
      <path d="M6.5 6.5l3.4 3.4"></path>
      <path d="M14.1 14.1l3.4 3.4"></path>
      <path d="M17.5 6.5l-3.4 3.4"></path>
      <path d="M9.9 14.1l-3.4 3.4"></path>
    </svg>`,
  production: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 18h18"></path>
      <path d="M5 18V9l4-3v12"></path>
      <path d="M9 10h6"></path>
      <path d="M9 14h6"></path>
      <path d="M15 18V6l4 3v9"></path>
    </svg>`,
  logistics: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 8h11v8H3z"></path>
      <path d="M14 11h3l3 3v2h-6z"></path>
      <circle cx="7" cy="18" r="1.7"></circle>
      <circle cx="17" cy="18" r="1.7"></circle>
    </svg>`,
  commercial: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 19h16"></path>
      <path d="M7 16V9"></path>
      <path d="M12 16V5"></path>
      <path d="M17 16v-4"></path>
      <path d="M7 9l5-4 5 7"></path>
    </svg>`,
  financial: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 20h16"></path>
      <path d="M6.5 17v-5.5"></path>
      <path d="M12 17V7"></path>
      <path d="M17.5 17V10"></path>
      <path d="M4.5 9.5 12 4l7.5 5.5"></path>
    </svg>`,
  fuel: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M7 20V6.5A2.5 2.5 0 0 1 9.5 4H15a2 2 0 0 1 2 2v14"></path>
      <path d="M7 20h10"></path>
      <path d="M17 9h2l2 2v5a2 2 0 0 1-2 2h-2"></path>
      <path d="M10 8h4"></path>
    </svg>`,
  reports: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 3h9l4 4v14H6z"></path>
      <path d="M15 3v4h4"></path>
      <path d="M9 12h6"></path>
      <path d="M9 16h4"></path>
    </svg>`,
};

class EnterpriseProjects extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._openCompanies = new Set();
    this._openProjectDetails = new Map();
    this._currentPages = new Map();
    this._visibleItems = 4;
    this._pointerState = new Map();
    this._mediaQuery =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    this._handleResize = this._handleResize.bind(this);
    this._handleReducedMotionChange =
      this._handleReducedMotionChange.bind(this);
  }

  connectedCallback() {
    this._syncVisibleItems();
    window.addEventListener('resize', this._handleResize, { passive: true });
    this._mediaQuery?.addEventListener(
      'change',
      this._handleReducedMotionChange
    );
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._handleResize);
    this._mediaQuery?.removeEventListener(
      'change',
      this._handleReducedMotionChange
    );
  }

  get _companies() {
    return getEnterpriseCompanies();
  }

  get _labels() {
    return getHomeContent().projects.enterprise;
  }

  _handleResize() {
    const previousVisibleItems = this._visibleItems;
    this._syncVisibleItems();

    if (previousVisibleItems !== this._visibleItems) {
      this.render();
    }
  }

  _handleReducedMotionChange() {
    this.render();
  }

  _syncVisibleItems() {
    const width = window.innerWidth || 1440;

    if (width <= 767) {
      this._visibleItems = 1;
      return;
    }

    if (width <= 991) {
      this._visibleItems = 2;
      return;
    }

    this._visibleItems = 4;
  }

  _getPageCount(company) {
    return Math.max(1, Math.ceil(company.projects.length / this._visibleItems));
  }

  _getCurrentPage(company) {
    const pageCount = this._getPageCount(company);
    const storedPage = this._currentPages.get(company.id) ?? 0;
    const safePage = clamp(storedPage, 0, pageCount - 1);

    if (safePage !== storedPage) {
      this._currentPages.set(company.id, safePage);
    }

    return safePage;
  }

  _getPages(company) {
    const pages = [];

    for (let index = 0; index < company.projects.length; index += this._visibleItems) {
      pages.push(company.projects.slice(index, index + this._visibleItems));
    }

    return pages;
  }

  _toggleCompany(companyId) {
    if (!companyId) {
      return;
    }

    if (this._openCompanies.has(companyId)) {
      this._openCompanies.delete(companyId);
      this._openProjectDetails.delete(companyId);
    } else {
      this._openCompanies.add(companyId);
    }

    this.render();
  }

  _isProjectDetailsOpen(companyId, projectId) {
    return this._openProjectDetails.get(companyId) === projectId;
  }

  _toggleProjectDetails(companyId, projectId) {
    if (!companyId || !projectId) {
      return;
    }

    const currentProjectId = this._openProjectDetails.get(companyId);

    if (currentProjectId === projectId) {
      this._openProjectDetails.delete(companyId);
    } else {
      this._openProjectDetails.set(companyId, projectId);
    }

    this.render();
  }

  _changePage(companyId, direction) {
    const company = this._companies.find((entry) => entry.id === companyId);

    if (!company) {
      return;
    }

    const currentPage = this._getCurrentPage(company);
    this._setPage(companyId, currentPage + direction);
  }

  _setPage(companyId, pageIndex) {
    const company = this._companies.find((entry) => entry.id === companyId);

    if (!company) {
      return;
    }

    const safePage = clamp(pageIndex, 0, this._getPageCount(company) - 1);

    if (safePage === this._getCurrentPage(company)) {
      return;
    }

    this._currentPages.set(companyId, safePage);
    this.render();
  }

  _buildStatusText(company, currentPage, pageCount) {
    return `${company.name}: ${currentPage + 1}/${pageCount}`;
  }

  getStateSnapshot() {
    return {
      openCompanies: [...this._openCompanies],
      openProjectDetails: Object.fromEntries(this._openProjectDetails.entries()),
      currentPages: Object.fromEntries(this._currentPages.entries()),
    };
  }

  setStateSnapshot(snapshot) {
    this._openCompanies = new Set(snapshot?.openCompanies ?? []);
    this._openProjectDetails = new Map(
      Object.entries(snapshot?.openProjectDetails ?? {})
    );
    this._currentPages = new Map(Object.entries(snapshot?.currentPages ?? {}));

    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const companies = this._companies;
    const labels = this._labels;

    if (!companies.length) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: clamp(2rem, 4vw, 3rem);
          padding-top: clamp(1.45rem, 3vw, 2rem);
          border-top: 1px solid rgba(169, 184, 211, 0.16);
        }

        .enterprise-shell {
          position: relative;
          display: grid;
          gap: clamp(1.2rem, 2vw, 1.7rem);
        }

        .enterprise-shell::before {
          content: '';
          position: absolute;
          inset: 1rem auto auto -1.2rem;
          width: 9rem;
          height: 9rem;
          border-radius: 999px;
          background: rgba(255, 96, 145, 0.12);
          filter: blur(22px);
          pointer-events: none;
          opacity: 0.7;
        }

        .enterprise-header {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.7rem;
          max-width: 46rem;
        }

        .enterprise-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          width: fit-content;
          padding: 0.55rem 0.95rem;
          border-radius: 999px;
          border: 1px solid rgba(169, 184, 211, 0.14);
          background:
            linear-gradient(135deg, rgba(255, 96, 145, 0.16), rgba(110, 211, 255, 0.08)),
            rgba(11, 14, 20, 0.84);
          color: rgba(244, 247, 255, 0.96);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .enterprise-header-badge svg,
        .enterprise-list-title-row svg {
          width: 1rem;
          height: 1rem;
        }

        .enterprise-title {
          margin: 0;
          font-family: var(--font-display, inherit);
          font-size: clamp(1.5rem, 1.15rem + 1vw, 2.25rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: white;
        }

        .enterprise-title span {
          background: linear-gradient(90deg, #f8fbff 0%, #6ed3ff 42%, #ffbc5c 75%, #ff6091 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .enterprise-description {
          margin: 0;
          color: rgba(226, 232, 240, 0.78);
          font-size: 0.98rem;
          line-height: 1.72;
        }

        .companies {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 1rem;
        }

        .company-shell {
          display: grid;
          gap: 0.8rem;
        }

        .company-card {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr);
          gap: clamp(1rem, 2vw, 1.55rem);
          align-items: stretch;
          min-width: 0;
          padding: clamp(1rem, 2vw, 1.45rem);
          border-radius: calc(var(--radius-xl, 32px) - 4px);
          border: 1px solid rgba(169, 184, 211, 0.16);
          background:
            radial-gradient(circle at 12% 18%, var(--company-accent-soft), transparent 28%),
            radial-gradient(circle at 88% 24%, rgba(255, 96, 145, 0.12), transparent 24%),
            linear-gradient(160deg, rgba(8, 10, 15, 0.96), rgba(18, 21, 30, 0.92));
          overflow: hidden;
          box-shadow:
            0 28px 60px rgba(2, 6, 23, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }

        .company-card:hover {
          transform: translateY(-3px);
          border-color: var(--company-accent-strong);
          box-shadow:
            0 36px 68px rgba(2, 6, 23, 0.36),
            0 0 0 1px rgba(255, 255, 255, 0.03);
        }

        .company-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(4, 9, 20, 0.18), rgba(4, 9, 20, 0.05) 42%, rgba(4, 9, 20, 0.6)),
            linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 26%);
          pointer-events: none;
        }

        .company-content,
        .company-visual {
          position: relative;
          z-index: 1;
          min-width: 0;
        }

        .company-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.9rem;
        }

        .company-meta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          width: fit-content;
          padding: 0.35rem 0.72rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(226, 232, 240, 0.86);
          font-size: 0.73rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .company-name {
          margin: 0;
          font-family: var(--font-display, inherit);
          font-size: clamp(1.5rem, 1.25rem + 0.8vw, 2.2rem);
          line-height: 1.04;
          letter-spacing: -0.03em;
          color: white;
        }

        .company-copy {
          margin: 0;
          color: rgba(226, 232, 240, 0.82);
          line-height: 1.72;
        }

        .company-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.7rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .company-stat {
          padding: 0.9rem 0.8rem;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
        }

        .company-stat strong {
          display: block;
          margin-bottom: 0.3rem;
          color: white;
          font-size: clamp(1.1rem, 0.95rem + 0.4vw, 1.35rem);
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .company-stat span {
          display: block;
          color: rgba(226, 232, 240, 0.72);
          font-size: 0.82rem;
          line-height: 1.45;
        }

        .company-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          align-self: flex-start;
          min-height: 3rem;
          padding: 0.75rem 1.1rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
            rgba(4, 9, 20, 0.42);
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        .company-toggle:hover,
        .company-toggle:focus-visible,
        .company-action-toggle:hover,
        .company-action-toggle:focus-visible,
        .carousel-button:hover:not(:disabled),
        .carousel-button:focus-visible:not(:disabled),
        .page-dot:hover,
        .page-dot:focus-visible,
        .project-details:hover,
        .project-details:focus-visible {
          outline: none;
          transform: translateY(-1px);
        }

        .company-toggle:hover,
        .company-toggle:focus-visible {
          border-color: var(--company-accent-strong);
          box-shadow: 0 16px 28px rgba(2, 6, 23, 0.22);
        }

        .company-toggle-arrow {
          font-size: 0.95rem;
          transition: transform 180ms ease;
        }

        .company-toggle[aria-expanded='true'] .company-toggle-arrow {
          transform: rotate(180deg);
        }

        .company-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
          padding: clamp(0.55rem, 1.2vw, 0.9rem);
          border-radius: calc(var(--radius-lg, 24px) - 2px);
          overflow: hidden;
          isolation: isolate;
          background:
            radial-gradient(circle at center, rgba(255, 255, 255, 0.14), transparent 58%),
            rgba(5, 8, 15, 0.72);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .company-visual img {
          width: 100%;
          height: 100%;
          min-height: 0;
          object-fit: contain;
          object-position: center;
          border-radius: calc(var(--radius-lg, 24px) - 8px);
          background: rgba(248, 251, 255, 0.96);
          filter: saturate(0.98) brightness(0.96);
        }

        .company-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(90deg, rgba(4, 9, 20, 0.34), rgba(4, 9, 20, 0.12) 24%, rgba(4, 9, 20, 0.04) 62%, rgba(4, 9, 20, 0.2)),
            linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(4, 9, 20, 0.18));
          pointer-events: none;
        }

        .company-projects {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transform: translateY(-12px);
          transition:
            grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 260ms ease,
            transform 260ms ease;
          pointer-events: none;
        }

        .company-projects.is-open {
          grid-template-rows: 1fr;
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }

        .company-projects-inner {
          min-height: 0;
          overflow: hidden;
        }

        .company-projects-surface {
          padding: clamp(1rem, 2vw, 1.25rem);
          border-radius: calc(var(--radius-xl, 32px) - 6px);
          border: 1px solid rgba(169, 184, 211, 0.14);
          background:
            linear-gradient(160deg, rgba(8, 11, 18, 0.98), rgba(18, 20, 28, 0.92)),
            rgba(9, 12, 18, 0.96);
          box-shadow: 0 26px 56px rgba(2, 6, 23, 0.22);
        }

        .enterprise-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .enterprise-list-title-wrap {
          display: grid;
          gap: 0.4rem;
        }

        .enterprise-list-title-row {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          color: white;
        }

        .enterprise-list-title-row h4 {
          margin: 0;
          font-family: var(--font-display, inherit);
          font-size: 1.08rem;
          letter-spacing: -0.02em;
        }

        .enterprise-list-copy {
          margin: 0;
          color: rgba(226, 232, 240, 0.72);
          font-size: 0.92rem;
          line-height: 1.65;
        }

        .company-action-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          min-height: 2.7rem;
          padding: 0.7rem 0.95rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.03);
          color: rgba(244, 247, 255, 0.96);
          font-weight: 700;
          cursor: pointer;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }

        .company-action-toggle:hover,
        .company-action-toggle:focus-visible {
          border-color: var(--company-accent-strong);
          background: rgba(255, 255, 255, 0.05);
        }

        .carousel-shell {
          display: grid;
          gap: 1rem;
        }

        .carousel-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          gap: 0.8rem;
          align-items: center;
        }

        .carousel-button {
          width: 2.95rem;
          height: 2.95rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)),
            rgba(4, 9, 20, 0.5);
          color: white;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 800;
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
        }

        .carousel-button:hover:not(:disabled),
        .carousel-button:focus-visible:not(:disabled) {
          border-color: var(--company-accent-strong);
          box-shadow: 0 14px 28px rgba(2, 6, 23, 0.24);
        }

        .carousel-button:disabled {
          opacity: 0.36;
          cursor: not-allowed;
        }

        .carousel-viewport {
          min-width: 0;
          overflow: hidden;
          padding: 0.18rem 0.18rem 0.46rem;
          box-sizing: border-box;
          border-radius: 22px;
          touch-action: pan-y;
        }

        .carousel-track {
          display: flex;
          align-items: stretch;
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .carousel-page {
          flex: 0 0 100%;
          width: 100%;
          min-width: 0;
          display: grid;
          grid-template-columns: repeat(var(--enterprise-columns), minmax(0, 1fr));
          gap: 0.95rem;
          align-items: stretch;
        }

        .enterprise-project-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.72rem;
          min-width: 0;
          height: 100%;
          box-sizing: border-box;
          padding: 0.92rem;
          border-radius: 20px;
          border: 1px solid var(--project-accent-strong);
          background:
            radial-gradient(circle at top right, var(--project-accent-soft), transparent 28%),
            linear-gradient(180deg, rgba(15, 18, 25, 0.94), rgba(8, 10, 15, 0.98));
          box-shadow: 0 18px 36px rgba(2, 6, 23, 0.2);
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }

        .enterprise-project-card.is-open {
          box-shadow:
            0 20px 40px rgba(2, 6, 23, 0.24),
            0 0 0 1px rgba(255, 255, 255, 0.02);
        }

        .enterprise-project-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 42px rgba(2, 6, 23, 0.28);
        }

        .project-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.65rem;
        }

        .project-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 16px;
          border: 1px solid var(--project-accent-strong);
          background: rgba(255, 255, 255, 0.04);
          color: var(--project-accent);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }

        .project-icon svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        .project-chip {
          display: inline-flex;
          align-items: center;
          min-height: 1.8rem;
          padding: 0.28rem 0.58rem;
          border-radius: 999px;
          border: 1px solid var(--project-accent-strong);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(244, 247, 255, 0.86);
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .project-title {
          margin: 0;
          color: white;
          font-family: var(--font-display, inherit);
          font-size: 1.05rem;
          letter-spacing: -0.02em;
        }

        .project-summary {
          margin: 0;
          color: rgba(226, 232, 240, 0.78);
          font-size: 0.89rem;
          line-height: 1.58;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.42rem;
          margin-top: 0.05rem;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          padding: 0.32rem 0.62rem;
          border-radius: 999px;
          border: 1px solid var(--project-accent-strong);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(244, 247, 255, 0.94);
          font-size: 0.71rem;
          font-weight: 600;
        }

        .project-details {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          align-self: flex-start;
          margin-top: auto;
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--project-accent);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 180ms ease, color 180ms ease;
        }

        .project-details[aria-expanded='true'] {
          color: white;
        }

        .project-details:hover,
        .project-details:focus-visible {
          color: white;
        }

        .project-expanded {
          display: grid;
          gap: 0.72rem;
          margin-top: 0.08rem;
          padding: 0.85rem 0.9rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015)),
            rgba(4, 9, 20, 0.36);
        }

        .project-expanded-copy {
          margin: 0;
          color: rgba(226, 232, 240, 0.76);
          font-size: 0.86rem;
          line-height: 1.58;
        }

        .project-functionalities {
          display: grid;
          gap: 0.55rem;
        }

        .project-functionalities-title {
          margin: 0;
          color: rgba(244, 247, 255, 0.92);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .project-functionalities-list {
          display: grid;
          gap: 0.38rem;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .project-functionalities-list li {
          position: relative;
          padding-left: 0.9rem;
          color: rgba(226, 232, 240, 0.72);
          font-size: 0.82rem;
          line-height: 1.5;
        }

        .project-functionalities-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55rem;
          width: 0.34rem;
          height: 0.34rem;
          border-radius: 999px;
          background: var(--project-accent);
          box-shadow: 0 0 12px var(--project-accent-soft);
        }

        .carousel-footer {
          display: grid;
          justify-items: center;
          gap: 0.75rem;
        }

        .page-dots {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .page-dot {
          width: 0.78rem;
          height: 0.78rem;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: rgba(169, 184, 211, 0.28);
          cursor: pointer;
          transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
        }

        .page-dot[aria-current='true'] {
          background: var(--company-accent);
          box-shadow: 0 0 0 4px var(--company-accent-soft);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 1199px) {
          .company-card {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
          }
        }

        @media (max-width: 991px) {
          .company-card {
            grid-template-columns: 1fr;
          }

          .company-visual {
            min-height: 220px;
          }

          .carousel-row {
            grid-template-columns: 1fr;
          }

          .carousel-row .carousel-button {
            display: none;
          }
        }

        @media (max-width: 767px) {
          :host {
            margin-top: 1.7rem;
            padding-top: 1.2rem;
          }

          .company-card {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .company-meta,
          .company-toggle {
            align-self: center;
          }

          .company-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .company-visual {
            min-height: 180px;
          }

          .company-visual::before {
            background:
              linear-gradient(180deg, rgba(4, 9, 20, 0.24), rgba(4, 9, 20, 0.08), rgba(4, 9, 20, 0.26)),
              linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(4, 9, 20, 0.16));
          }

          .enterprise-list-header {
            align-items: flex-start;
          }
        }

        @media (max-width: 575px) {
          .enterprise-title {
            font-size: clamp(1.32rem, 7vw, 1.7rem);
          }

          .company-card,
          .company-projects-surface {
            padding: 0.92rem;
            border-radius: 22px;
          }

          .company-stats {
            grid-template-columns: 1fr;
          }

          .company-copy,
          .enterprise-description,
          .enterprise-list-copy,
          .project-summary {
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .project-expanded {
            padding: 0.78rem 0.82rem;
          }

          .project-expanded-copy,
          .project-functionalities-list li {
            font-size: 0.82rem;
          }

          .company-toggle,
          .company-action-toggle {
            width: 100%;
            justify-content: center;
          }

          .carousel-viewport {
            padding: 0.14rem 0.14rem 0.34rem;
            border-radius: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .company-card,
          .company-projects,
          .company-toggle,
          .company-toggle-arrow,
          .company-action-toggle,
          .carousel-button,
          .carousel-track,
          .enterprise-project-card,
          .page-dot,
          .project-details {
            transition: none !important;
          }

          .company-card:hover,
          .company-toggle:hover,
          .company-action-toggle:hover,
          .carousel-button:hover:not(:disabled),
          .project-details:hover,
          .enterprise-project-card:hover {
            transform: none;
          }
        }
      </style>

      <section class="enterprise-shell">
        <header class="enterprise-header">
          <span class="enterprise-header-badge">
            ${iconMap.briefcase}
            <span>${escapeHtml(labels.title)}</span>
          </span>
          <h3 class="enterprise-title"><span>${escapeHtml(labels.title)}</span></h3>
          <p class="enterprise-description">${escapeHtml(labels.description)}</p>
        </header>

        <div class="companies">
          ${companies.map((company) => this._renderCompany(company, labels)).join('')}
        </div>
      </section>
    `;

    this._bindEvents();
  }

  _renderCompany(company, labels) {
    const isOpen = this._openCompanies.has(company.id);
    const currentPage = this._getCurrentPage(company);
    const pages = this._getPages(company);
    const pageCount = pages.length;
    const companyLabel = `${labels.companyCardLabel} ${company.name}`;

    return `
      <article
        class="company-shell"
        style="
          --company-accent: ${company.accent};
          --company-accent-soft: ${company.accentSoft};
          --company-accent-strong: ${company.accentStrong};
          --enterprise-columns: ${this._visibleItems};
        "
        aria-label="${escapeHtml(companyLabel)}"
      >
        <div class="company-card">
          <div class="company-content">
            <span class="company-meta">${escapeHtml(company.sector)}</span>
            <h4 class="company-name">${escapeHtml(company.name)}</h4>
            <p class="company-copy">${escapeHtml(company.description)}</p>

            <ul class="company-stats">
              ${company.stats
                .map(
                  (stat) => `
                    <li class="company-stat">
                      <strong>${escapeHtml(stat.value)}</strong>
                      <span>${escapeHtml(stat.label)}</span>
                    </li>
                  `
                )
                .join('')}
            </ul>

            <button
              class="company-toggle"
              type="button"
              data-action="toggle-company"
              data-company-id="${escapeHtml(company.id)}"
              aria-expanded="${isOpen}"
              aria-controls="company-projects-${escapeHtml(company.id)}"
            >
              <span>${escapeHtml(isOpen ? labels.hideProjectsLabel : labels.showProjectsLabel)}</span>
              <span class="company-toggle-arrow" aria-hidden="true">&#9662;</span>
            </button>
          </div>

          <div class="company-visual" aria-hidden="true">
            <img
              src="${escapeHtml(company.backgroundImage)}"
              alt="${escapeHtml(company.backgroundImageAlt)}"
              loading="lazy"
            >
          </div>
        </div>

        <div
          class="company-projects ${isOpen ? 'is-open' : ''}"
          id="company-projects-${escapeHtml(company.id)}"
          aria-hidden="${String(!isOpen)}"
        >
          <div class="company-projects-inner">
            <div class="company-projects-surface">
              <div class="enterprise-list-header">
                <div class="enterprise-list-title-wrap">
                  <div class="enterprise-list-title-row">
                    ${iconMap.spark}
                    <h4>${escapeHtml(labels.projectsHeading)}</h4>
                  </div>
                  <p class="enterprise-list-copy">${escapeHtml(labels.projectsDescription)}</p>
                </div>

                <button
                  class="company-action-toggle"
                  type="button"
                  data-action="toggle-company"
                  data-company-id="${escapeHtml(company.id)}"
                  aria-expanded="${isOpen}"
                  aria-controls="company-projects-${escapeHtml(company.id)}"
                >
                  ${escapeHtml(labels.hideProjectsLabel)}
                  <span aria-hidden="true">&#8593;</span>
                </button>
              </div>

              <div class="carousel-shell">
                <div class="carousel-row">
                  <button
                    class="carousel-button"
                    type="button"
                    data-action="previous-page"
                    data-company-id="${escapeHtml(company.id)}"
                    ${currentPage === 0 ? 'disabled' : ''}
                    aria-label="${escapeHtml(labels.previousPageLabel)}"
                  >
                    &#8249;
                  </button>

                  <div
                    class="carousel-viewport"
                    data-company-id="${escapeHtml(company.id)}"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="${escapeHtml(labels.carouselLabel)}"
                    tabindex="0"
                  >
                    <div
                      class="carousel-track"
                      style="transform: translate3d(-${currentPage * 100}%, 0, 0);"
                    >
                      ${pages
                        .map(
                          (page) => `
                            <div class="carousel-page">
                              ${page
                                .map((project) => this._renderProjectCard(company, project, labels))
                                .join('')}
                            </div>
                          `
                        )
                        .join('')}
                    </div>
                    <p class="sr-only" aria-live="polite">${this._buildStatusText(company, currentPage, pageCount)}</p>
                  </div>

                  <button
                    class="carousel-button"
                    type="button"
                    data-action="next-page"
                    data-company-id="${escapeHtml(company.id)}"
                    ${currentPage >= pageCount - 1 ? 'disabled' : ''}
                    aria-label="${escapeHtml(labels.nextPageLabel)}"
                  >
                    &#8250;
                  </button>
                </div>

                ${
                  pageCount > 1
                    ? `
                      <div class="carousel-footer">
                        <div class="page-dots" aria-label="${escapeHtml(labels.carouselLabel)}">
                          ${pages
                            .map(
                              (_, pageIndex) => `
                                <button
                                  class="page-dot"
                                  type="button"
                                  data-action="go-to-page"
                                  data-company-id="${escapeHtml(company.id)}"
                                  data-page-index="${pageIndex}"
                                  aria-label="${escapeHtml(labels.goToPageLabel)} ${pageIndex + 1}"
                                  ${pageIndex === currentPage ? 'aria-current="true"' : ''}
                                ></button>
                              `
                            )
                            .join('')}
                        </div>
                      </div>
                    `
                    : ''
                }
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  _renderProjectCard(company, project, labels) {
    const icon = iconMap[project.icon] ?? iconMap.reports;
    const isDetailsOpen = this._isProjectDetailsOpen(company.id, project.id);
    const detailPanelId = `enterprise-project-details-${company.id}-${project.id}`;

    return `
      <article
        class="enterprise-project-card ${isDetailsOpen ? 'is-open' : ''}"
        style="
          --project-accent: ${project.accent};
          --project-accent-soft: ${project.accentSoft};
          --project-accent-strong: ${project.accentStrong};
        "
      >
        <div class="project-card-top">
          <span class="project-icon">${icon}</span>
          <span class="project-chip">${escapeHtml(company.name)}</span>
        </div>
        <h5 class="project-title">${escapeHtml(project.name)}</h5>
        <p class="project-summary">${escapeHtml(project.shortDescription)}</p>
        <div class="project-tags">
          ${renderTagList(project.technologies)}
        </div>
        ${
          isDetailsOpen
            ? `
              <div class="project-expanded" id="${escapeHtml(detailPanelId)}">
                <p class="project-expanded-copy">${escapeHtml(project.description)}</p>
                ${
                  Array.isArray(project.functionalities) && project.functionalities.length
                    ? `
                      <div class="project-functionalities">
                        <p class="project-functionalities-title">${escapeHtml(
                          labels.functionalitiesLabel
                        )}</p>
                        <ul class="project-functionalities-list">
                          ${project.functionalities
                            .map((item) => `<li>${escapeHtml(item)}</li>`)
                            .join('')}
                        </ul>
                      </div>
                    `
                    : ''
                }
              </div>
            `
            : ''
        }
        <button
          class="project-details"
          type="button"
          data-action="project-details"
          data-company-id="${escapeHtml(company.id)}"
          data-project-id="${escapeHtml(project.id)}"
          aria-expanded="${isDetailsOpen}"
          aria-controls="${escapeHtml(detailPanelId)}"
          aria-label="${escapeHtml(
            `${isDetailsOpen ? labels.hideDetailsLabel : labels.detailsLabel} ${project.name}`
          )}"
        >
          <span>${escapeHtml(isDetailsOpen ? labels.hideDetailsLabel : labels.detailsLabel)}</span>
          <span aria-hidden="true">${isDetailsOpen ? '\u2191' : '&gt;'}</span>
        </button>
      </article>
    `;
  }

  _bindEvents() {
    [...this.shadowRoot.querySelectorAll('[data-action="toggle-company"]')].forEach(
      (button) => {
        button.addEventListener('click', () => {
          this._toggleCompany(button.dataset.companyId ?? '');
        });
      }
    );

    [...this.shadowRoot.querySelectorAll('[data-action="previous-page"]')].forEach(
      (button) => {
        button.addEventListener('click', () => {
          this._changePage(button.dataset.companyId ?? '', -1);
        });
      }
    );

    [...this.shadowRoot.querySelectorAll('[data-action="next-page"]')].forEach(
      (button) => {
        button.addEventListener('click', () => {
          this._changePage(button.dataset.companyId ?? '', 1);
        });
      }
    );

    [...this.shadowRoot.querySelectorAll('[data-action="go-to-page"]')].forEach(
      (button) => {
        button.addEventListener('click', () => {
          const pageIndex = Number.parseInt(button.dataset.pageIndex ?? '0', 10);
          this._setPage(button.dataset.companyId ?? '', pageIndex);
        });
      }
    );

    [...this.shadowRoot.querySelectorAll('.carousel-viewport')].forEach((viewport) => {
      viewport.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
          return;
        }

        event.preventDefault();

        if (event.key === 'ArrowLeft') {
          this._changePage(viewport.dataset.companyId ?? '', -1);
          return;
        }

        this._changePage(viewport.dataset.companyId ?? '', 1);
      });

      viewport.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) {
          return;
        }

        if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) {
          return;
        }

        const companyId = viewport.dataset.companyId ?? '';
        this._pointerState.set(companyId, event.clientX);
        event.currentTarget.setPointerCapture?.(event.pointerId);
      });

      viewport.addEventListener('pointerup', (event) => {
        const companyId = viewport.dataset.companyId ?? '';
        const pointerStartX = this._pointerState.get(companyId);

        if (pointerStartX === undefined) {
          return;
        }

        this._pointerState.delete(companyId);
        event.currentTarget.releasePointerCapture?.(event.pointerId);

        const deltaX = event.clientX - pointerStartX;

        if (Math.abs(deltaX) < 48) {
          return;
        }

        this._changePage(companyId, deltaX < 0 ? 1 : -1);
      });

      viewport.addEventListener('pointercancel', () => {
        this._pointerState.delete(viewport.dataset.companyId ?? '');
      });
    });

    [...this.shadowRoot.querySelectorAll('[data-action="project-details"]')].forEach(
      (button) => {
        button.addEventListener('click', () => {
          this._toggleProjectDetails(
            button.dataset.companyId ?? '',
            button.dataset.projectId ?? ''
          );

          this.dispatchEvent(
            new CustomEvent('enterprise-project-details', {
              bubbles: true,
              composed: true,
              detail: {
                companyId: button.dataset.companyId ?? '',
                projectId: button.dataset.projectId ?? '',
              },
            })
          );
        });
      }
    );
  }
}

if (!customElements.get('enterprise-projects')) {
  customElements.define('enterprise-projects', EnterpriseProjects);
}
