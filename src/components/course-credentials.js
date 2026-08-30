import { getCurrentLanguage } from '../i18n';
import { getStudiesContent } from '../data/site-content';
import { shellStyles } from './shared-styles';
import { escapeHtml } from './utils';

const DEFAULT_ACCENT = {
  color: '#6ed3ff',
  soft: 'rgba(110, 211, 255, 0.18)',
  strong: 'rgba(110, 211, 255, 0.34)',
  glow: 'rgba(58, 136, 255, 0.22)',
};

const FALLBACK_PROVIDER_META = {
  'Cisco Networking Academy': {
    categoryKey: 'languages',
    category: {
      es: 'Idiomas',
      en: 'Languages',
    },
    accent: {
      color: '#6ed3ff',
      soft: 'rgba(110, 211, 255, 0.18)',
      strong: 'rgba(110, 211, 255, 0.34)',
      glow: 'rgba(58, 136, 255, 0.24)',
    },
  },
  IBM: {
    categoryKey: 'artificial-intelligence',
    category: {
      es: 'Inteligencia Artificial',
      en: 'Artificial Intelligence',
    },
    accent: {
      color: '#ff6091',
      soft: 'rgba(255, 96, 145, 0.18)',
      strong: 'rgba(255, 96, 145, 0.34)',
      glow: 'rgba(143, 124, 255, 0.24)',
    },
  },
  Google: {
    categoryKey: 'data',
    category: {
      es: 'Datos',
      en: 'Data',
    },
    accent: {
      color: '#ffbc5c',
      soft: 'rgba(255, 188, 92, 0.18)',
      strong: 'rgba(255, 188, 92, 0.34)',
      glow: 'rgba(255, 188, 92, 0.22)',
    },
  },
};

const icons = {
  verified: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`,
  external: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 5h5v5"></path>
      <path d="M10 14L19 5"></path>
      <path d="M19 14v5h-14v-14h5"></path>
    </svg>`,
};

const resolveText = (value, language) => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object') {
    return (
      value[language] ??
      value.en ??
      value.es ??
      Object.values(value).find((entry) => typeof entry === 'string') ??
      ''
    );
  }

  return '';
};

class CourseCredentials extends HTMLElement {
  static observedAttributes = ['eyebrow', 'title', 'description'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._courses = [];
    this._observer = null;
    this._reducedMotionQuery =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
  }

  set courses(value) {
    this._courses = Array.isArray(value) ? value : [];

    if (this.isConnected) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    this._observer = null;
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const language = getCurrentLanguage();
    const eyebrow = this.getAttribute('eyebrow') ?? 'Credentials';
    const title = this.getAttribute('title') ?? 'Additional courses';
    const description =
      this.getAttribute('description') ??
      'Credentials and complementary courses with verifiable evidence.';
    const labels = getStudiesContent(language).coursesDraft.labels;
    const courses = this._courses.map((course, index) =>
      this._normalizeCourse(course, index, language)
    );

    this._observer?.disconnect();
    this._observer = null;

    this.shadowRoot.innerHTML = `
      <style>
        ${shellStyles}

        :host {
          display: block;
        }

        .credentials-shell {
          position: relative;
          max-width: var(--content-width);
          margin: 0 auto;
          padding: clamp(1.35rem, 3vw, 2.4rem);
          border-radius: 30px;
          border: 1px solid rgba(169, 184, 211, 0.1);
          background:
            radial-gradient(circle at 12% 18%, rgba(110, 211, 255, 0.12), transparent 24%),
            radial-gradient(circle at 88% 12%, rgba(255, 96, 145, 0.1), transparent 22%),
            radial-gradient(circle at 52% 100%, rgba(255, 188, 92, 0.08), transparent 26%),
            linear-gradient(160deg, rgba(10, 12, 18, 0.98), rgba(21, 24, 33, 0.92));
          box-shadow: 0 28px 64px rgba(2, 6, 23, 0.28);
          overflow: hidden;
        }

        .credentials-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.03), transparent 30%),
            linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.02));
          pointer-events: none;
        }

        .credentials-shell::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 96px 96px;
          mask-image: radial-gradient(circle at center, black, transparent 85%);
          opacity: 0.24;
          pointer-events: none;
        }

        .section-header {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.55rem;
          margin-bottom: clamp(1.45rem, 3vw, 2rem);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          width: fit-content;
          padding: 0.3rem 0.85rem 0.3rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 110, 248, 0.22);
          background: rgba(255, 110, 195, 0.08);
          color: #ff9fc6;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: var(--font-display);
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff2d75;
          box-shadow: 0 0 14px rgba(255, 45, 117, 0.36);
        }

        .title {
          margin: 0;
          color: white;
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 1.4rem + 2.2vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        .description {
          margin: 0;
          max-width: 38rem;
          color: rgba(226, 232, 240, 0.76);
          font-size: 0.98rem;
          line-height: 1.7;
        }

        .header-divider {
          width: min(100%, 16rem);
          height: 1px;
          margin-top: 0.3rem;
          background: linear-gradient(90deg, rgba(110, 211, 255, 0.04), rgba(110, 211, 255, 0.5), rgba(255, 96, 145, 0.44), rgba(255, 188, 92, 0.1));
          box-shadow: 0 0 24px rgba(110, 211, 255, 0.12);
        }

        .credentials-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(0.95rem, 2vw, 1.3rem);
          justify-items: center;
          align-items: stretch;
        }

        .credential-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          width: min(100%, 21.75rem);
          height: 100%;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(169, 184, 211, 0.14);
          background:
            radial-gradient(circle at top right, var(--credential-accent-soft), transparent 28%),
            linear-gradient(180deg, rgba(18, 20, 27, 0.98), rgba(9, 11, 16, 0.98));
          box-shadow:
            0 12px 30px rgba(2, 6, 23, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 620ms cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms),
            transform 620ms cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms),
            border-color 240ms ease,
            box-shadow 240ms ease;
        }

        .credential-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.06), transparent 20%),
            linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.02));
          pointer-events: none;
        }

        .credential-card::after {
          content: '';
          position: absolute;
          inset: auto 1rem 0.8rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--credential-accent-strong), transparent);
          opacity: 0;
          transition: opacity 240ms ease;
          pointer-events: none;
        }

        .credential-card.is-visible {
          opacity: 1;
          transform: none;
        }

        .credential-card:hover,
        .credential-card:focus-within {
          transform: translateY(-4px);
          border-color: var(--credential-accent-strong);
          box-shadow:
            0 18px 38px rgba(2, 6, 23, 0.24),
            0 0 0 1px rgba(255, 255, 255, 0.03),
            0 0 18px var(--credential-accent-glow);
        }

        .credential-card:hover::after,
        .credential-card:focus-within::after {
          opacity: 1;
        }

        .credential-media {
          position: relative;
          display: block;
          overflow: hidden;
          min-height: 11.5rem;
          aspect-ratio: 16 / 10;
          background:
            radial-gradient(circle at top, var(--credential-accent-soft), transparent 38%),
            linear-gradient(180deg, rgba(16, 18, 25, 0.4), rgba(8, 10, 15, 0.9));
          text-decoration: none;
        }

        .credential-media::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 32%),
            radial-gradient(circle at 50% 14%, rgba(255, 255, 255, 0.12), transparent 22%);
          pointer-events: none;
          z-index: 1;
        }

        .credential-media::after {
          content: '';
          position: absolute;
          inset: 42% 0 0;
          background: linear-gradient(180deg, transparent, rgba(8, 10, 15, 0.18) 20%, rgba(8, 10, 15, 0.88));
          pointer-events: none;
          z-index: 2;
        }

        .credential-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 340ms ease;
        }

        .credential-card:hover .credential-media img,
        .credential-card:focus-within .credential-media img {
          transform: scale(1.025);
        }

        .credential-badge {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          min-height: 1.85rem;
          padding: 0.32rem 0.62rem;
          border-radius: 999px;
          border: 1px solid var(--credential-accent-strong);
          background: rgba(7, 12, 20, 0.54);
          backdrop-filter: blur(12px);
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          box-shadow: 0 10px 18px rgba(2, 6, 23, 0.14);
        }

        .credential-badge svg,
        .credential-issuer-icon,
        .credential-link-icon {
          width: 0.9rem;
          height: 0.9rem;
          flex-shrink: 0;
        }

        .credential-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 0.68rem;
          padding: 0.88rem 0.92rem 0.94rem;
        }

        .credential-date {
          margin: 0;
          color: rgba(169, 184, 211, 0.72);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .credential-title {
          margin: 0;
          color: white;
          font-family: var(--font-display);
          font-size: clamp(1rem, 0.94rem + 0.24vw, 1.18rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          text-wrap: balance;
        }

        .credential-issuer {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--credential-accent);
          font-size: 0.82rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .credential-issuer-icon {
          color: #8df1b6;
        }

        .credential-summary {
          margin: 0;
          color: rgba(226, 232, 240, 0.74);
          font-size: 0.84rem;
          line-height: 1.58;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .credential-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .credential-tags li {
          padding: 0.24rem 0.56rem;
          border-radius: 999px;
          border: 1px solid rgba(169, 184, 211, 0.12);
          background: rgba(255, 255, 255, 0.035);
          color: rgba(226, 232, 240, 0.72);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .credential-action {
          margin-top: auto;
          padding-top: 0.2rem;
        }

        .credential-link {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          width: 100%;
          box-sizing: border-box;
          min-height: 2.75rem;
          padding: 0.66rem 0.8rem;
          border-radius: 14px;
          border: 1px solid rgba(169, 184, 211, 0.12);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(238, 244, 255, 0.92);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 700;
          transition:
            color 220ms ease,
            border-color 220ms ease,
            background 220ms ease,
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .credential-link:hover,
        .credential-link:focus-visible {
          color: var(--credential-accent);
          border-color: var(--credential-accent-strong);
          background: rgba(255, 255, 255, 0.045);
          box-shadow: 0 12px 26px rgba(2, 6, 23, 0.18);
          outline: none;
        }

        .credential-link:hover .credential-link-icon,
        .credential-link:focus-visible .credential-link-icon {
          transform: translate3d(3px, -2px, 0);
        }

        .credential-link-icon {
          flex: 0 0 auto;
          transition: transform 220ms ease;
        }

        .empty-state {
          position: relative;
          z-index: 1;
          padding: 2rem;
          border-radius: 20px;
          border: 1px dashed rgba(169, 184, 211, 0.14);
          background: rgba(255, 255, 255, 0.02);
          color: rgba(226, 232, 240, 0.58);
          text-align: center;
          font-size: 0.95rem;
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

        @media (min-width: 768px) {
          .credentials-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1200px) {
          .credentials-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .credentials-shell {
            padding: 1rem;
            border-radius: 22px;
          }

          .credential-media {
            min-height: 10.75rem;
          }
        }

        @media (max-width: 575px) {
          .credentials-shell {
            padding: 0.85rem;
            border-radius: 18px;
          }

          .section-header {
            margin-bottom: 1.25rem;
          }

          .eyebrow {
            font-size: 0.65rem;
          }

          .description {
            font-size: 0.9rem;
          }

          .credential-card {
            width: 100%;
            border-radius: 20px;
          }

          .credential-media {
            min-height: 10rem;
          }

          .credential-badge {
            top: 0.75rem;
            right: 0.75rem;
            padding-inline: 0.62rem;
            font-size: 0.6rem;
          }

          .credential-body {
            padding: 0.86rem;
            gap: 0.66rem;
          }

          .credential-title {
            font-size: 0.98rem;
          }

          .credential-issuer {
            font-size: 0.8rem;
          }

          .credential-summary {
            font-size: 0.83rem;
            line-height: 1.6;
          }

          .credential-link {
            min-height: 2.7rem;
            padding: 0.68rem 0.78rem;
            font-size: 0.86rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .credential-card {
            opacity: 1;
            transform: none;
          }

          .credential-card,
          .credential-media img,
          .credential-link,
          .credential-link-icon {
            transition: none !important;
          }

          .credential-card:hover,
          .credential-card:focus-within {
            transform: none;
          }

          .credential-card:hover .credential-media img,
          .credential-card:focus-within .credential-media img,
          .credential-link:hover .credential-link-icon,
          .credential-link:focus-visible .credential-link-icon {
            transform: none;
          }
        }
      </style>

      <div class="credentials-shell">
        <header class="section-header">
          <span class="eyebrow">
            <span class="eyebrow-dot"></span>
            ${escapeHtml(eyebrow)}
          </span>
          <h2 class="title">${escapeHtml(title)}</h2>
          <p class="description">${escapeHtml(description)}</p>
          <div class="header-divider" aria-hidden="true"></div>
        </header>

        ${
          courses.length
            ? `
              <div class="credentials-grid">
                ${courses
                  .map((course, index) => this._renderCourse(course, labels, index))
                  .join('')}
              </div>
            `
            : `
              <div class="empty-state">
                <p>${escapeHtml(labels.emptyState)}</p>
              </div>
            `
        }
      </div>
    `;

    this._setupRevealObserver();
  }

  _normalizeCourse(course, index, language) {
    const fallbackMeta = FALLBACK_PROVIDER_META[course?.issuer] ?? {};
    const accent = {
      ...DEFAULT_ACCENT,
      ...(fallbackMeta.accent ?? {}),
      ...(course?.accent ?? {}),
    };
    const category =
      resolveText(course?.category, language) ||
      resolveText(fallbackMeta.category, language);

    return {
      ...course,
      categoryKey: course?.categoryKey ?? fallbackMeta.categoryKey ?? `credential-${index}`,
      category,
      title: resolveText(course?.title, language),
      issuedAt: resolveText(course?.issuedAt, language),
      imageAlt: resolveText(course?.imageAlt, language),
      summary: resolveText(course?.summary, language),
      accent,
    };
  }

  _renderCourse(course, labels, index) {
    const courseTitle = course.title || labels.courseFallback;
    const courseIssuer = course.issuer || labels.issuerFallback;
    const issuedAt = course.issuedAt || labels.pendingDate;
    const imageAlt = course.imageAlt || courseTitle;
    const credentialLabel = `${labels.credentialAria} ${courseTitle}`;

    return `
      <article
        class="credential-card"
        data-category="${escapeHtml(course.categoryKey ?? '')}"
        data-category-label="${escapeHtml(course.category ?? '')}"
        style="
          --credential-accent: ${course.accent.color};
          --credential-accent-soft: ${course.accent.soft};
          --credential-accent-strong: ${course.accent.strong};
          --credential-accent-glow: ${course.accent.glow};
          --reveal-delay: ${index * 80}ms;
        "
      >
        ${
          course.credentialUrl
            ? `
              <a
                class="credential-media"
                href="${escapeHtml(course.credentialUrl)}"
                target="_blank"
                rel="noreferrer"
                aria-label="${escapeHtml(credentialLabel)}"
              >
                <img
                  src="${escapeHtml(course.image ?? '')}"
                  alt="${escapeHtml(imageAlt)}"
                  loading="lazy"
                >
                <span class="credential-badge">
                  ${icons.verified}
                  <span>${escapeHtml(labels.verified)}</span>
                </span>
              </a>
            `
            : `
              <div class="credential-media">
                <img
                  src="${escapeHtml(course.image ?? '')}"
                  alt="${escapeHtml(imageAlt)}"
                  loading="lazy"
                >
                <span class="credential-badge">
                  ${icons.verified}
                  <span>${escapeHtml(labels.verified)}</span>
                </span>
              </div>
            `
        }

        <div class="credential-body">
          <p class="credential-date">${escapeHtml(issuedAt)}</p>
          <div class="credential-copy">
            <h3 class="credential-title">${escapeHtml(courseTitle)}</h3>
            <p class="credential-issuer">
              <span>${escapeHtml(courseIssuer)}</span>
              <span class="credential-issuer-icon">${icons.verified}</span>
            </p>
          </div>

          <p class="credential-summary">${escapeHtml(course.summary ?? '')}</p>

          ${
            Array.isArray(course.tags) && course.tags.length
              ? `
                <ul class="credential-tags">
                  ${course.tags
                    .map((tag) => `<li>${escapeHtml(tag)}</li>`)
                    .join('')}
                </ul>
              `
              : ''
          }

          ${
            course.credentialUrl
              ? `
                <div class="credential-action">
                  <a
                    class="credential-link"
                    href="${escapeHtml(course.credentialUrl)}"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="${escapeHtml(credentialLabel)}"
                  >
                    <span>${escapeHtml(labels.viewCredential)}</span>
                    <span class="credential-link-icon">${icons.external}</span>
                  </a>
                </div>
              `
              : '<span class="sr-only"></span>'
          }
        </div>
      </article>
    `;
  }

  _setupRevealObserver() {
    const revealItems = [...this.shadowRoot.querySelectorAll('.credential-card')];

    if (!revealItems.length) {
      return;
    }

    if (
      this._reducedMotionQuery?.matches ||
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window)
    ) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

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
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    revealItems.forEach((item) => this._observer?.observe(item));
  }
}

if (!customElements.get('course-credentials')) {
  customElements.define('course-credentials', CourseCredentials);
}
