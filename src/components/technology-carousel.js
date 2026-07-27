import styles from './technology-carousel.css?raw';
import { bootstrapCss } from './bootstrap-css';

const DEFAULT_LABELS = {
  carouselLabel: 'Technology carousel',
  previous: 'Show previous technologies',
  next: 'Show next technologies',
  level: 'Proficiency',
  goTo: 'Go to technology',
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const parseInteger = (value, fallback) => {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const resolveLocalizedText = (value, locale) => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object') {
    return (
      value[locale] ??
      value.en ??
      Object.values(value).find((entry) => typeof entry === 'string') ??
      ''
    );
  }

  return '';
};

class TechnologyCarousel extends HTMLElement {
  static observedAttributes = [
    'visible-items',
    'autoplay',
    'autoplay-interval',
    'heading',
    'subheading',
    'locale',
  ];

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this._technologies = [];
    this._labels = { ...DEFAULT_LABELS };
    this._elements = {};
    this._currentIndex = 0;
    this._renderedIndex = 0;
    this._visibleItems = 1;
    this._canNavigate = false;
    this._autoplayTimer = null;
    this._pointerStartX = null;
    this._isHovered = false;
    this._mediaQuery =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    this._handleResize = this._handleResize.bind(this);
    this._handleTransitionEnd = this._handleTransitionEnd.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handlePointerDown = this._handlePointerDown.bind(this);
    this._handlePointerUp = this._handlePointerUp.bind(this);
    this._handlePointerCancel = this._handlePointerCancel.bind(this);
    this._pauseAutoplay = this._pauseAutoplay.bind(this);
    this._resumeAutoplay = this._resumeAutoplay.bind(this);
    this._handleReducedMotionChange =
      this._handleReducedMotionChange.bind(this);
  }

  connectedCallback() {
    this._upgradeProperty('technologies');
    this._upgradeProperty('labels');

    if (!this.hasAttribute('visible-items')) {
      this.setAttribute('visible-items', '3');
    }

    if (!this.hasAttribute('autoplay')) {
      this.setAttribute('autoplay', 'true');
    }

    if (!this.hasAttribute('autoplay-interval')) {
      this.setAttribute('autoplay-interval', '4000');
    }

    if (!this.hasAttribute('locale')) {
      this.setAttribute('locale', 'en');
    }

    if (!this.hasAttribute('heading')) {
      this.setAttribute('heading', 'Technologies I work with');
    }

    if (!this.hasAttribute('subheading')) {
      this.setAttribute(
        'subheading',
        'Tools I use to build polished interfaces, backend logic, and reliable databases.'
      );
    }

    window.addEventListener('resize', this._handleResize, { passive: true });
    this._mediaQuery?.addEventListener(
      'change',
      this._handleReducedMotionChange
    );

    this.render();
  }

  disconnectedCallback() {
    this._clearAutoplay();
    window.removeEventListener('resize', this._handleResize);
    this._mediaQuery?.removeEventListener(
      'change',
      this._handleReducedMotionChange
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    if (name === 'autoplay' || name === 'autoplay-interval') {
      this._syncAutoplay();
      return;
    }

    this.render();
  }

  get technologies() {
    return this._technologies;
  }

  set technologies(value) {
    const techList = Array.isArray(value) ? value : [];

    this._technologies = techList.map((technology) =>
      this._normalizeTechnology(technology)
    );
    this._currentIndex = clamp(
      this._currentIndex,
      0,
      Math.max(this._technologies.length - 1, 0)
    );

    if (this.isConnected) {
      this.render();
    }
  }

  get labels() {
    return this._labels;
  }

  set labels(value) {
    this._labels = {
      ...DEFAULT_LABELS,
      ...(value ?? {}),
    };

    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const technologyCount = this._technologies.length;
    const locale = this._locale;
    const visibleItems = Math.min(
      this._getVisibleItemsForViewport(),
      Math.max(technologyCount, 1)
    );

    this._visibleItems = visibleItems;
    this._canNavigate = technologyCount > visibleItems;
    this._currentIndex = clamp(
      this._currentIndex,
      0,
      Math.max(technologyCount - 1, 0)
    );
    this._renderedIndex = this._canNavigate
      ? this._currentIndex + visibleItems
      : 0;

    const slideData = this._buildSlideData();

    this.shadowRoot.innerHTML = `
      <style>${bootstrapCss}</style>
      <style>${styles}</style>
      <section class="carousel-frame" data-reduced-motion="${this._prefersReducedMotion}">
        <div class="container-fluid">
          <header class="section-header">
            <h2 class="section-title">${escapeHtml(this._heading)}</h2>
            ${
              this._subheading
                ? `<p class="section-subtitle">${escapeHtml(this._subheading)}</p>`
                : ''
            }
          </header>
          <div
            class="carousel-panel"
            tabindex="0"
            role="region"
            aria-roledescription="carousel"
            aria-label="${escapeHtml(this._labels.carouselLabel)}"
          >
            ${
              technologyCount
                ? `
                  <div class="viewport">
                    <ul class="track" style="--items-per-view: ${visibleItems};">
                      ${slideData
                        .map((slide, index) => this._renderSlide(slide, index, locale))
                        .join('')}
                    </ul>
                  </div>
                `
                : `
                  <div class="empty-state">
                    <p>Technologies will appear here soon.</p>
                  </div>
                `
            }
            <p class="sr-only" aria-live="polite">${this._buildStatusText()}</p>
          </div>
          ${
            this._canNavigate
              ? `
                <div class="controls">
                  <button class="nav-button nav-button--previous" type="button" aria-label="${escapeHtml(this._labels.previous)}">
                    <span class="nav-icon" aria-hidden="true">&#8249;</span>
                  </button>
                  <div class="indicators" aria-label="${escapeHtml(this._labels.carouselLabel)}">
                    ${this._technologies
                      .map(
                        (technology, index) => `
                          <button
                            class="indicator"
                            type="button"
                            data-index="${index}"
                            aria-label="${escapeHtml(this._labels.goTo)} ${escapeHtml(
                              technology.name
                            )}"
                            ${index === this._currentIndex ? 'aria-current="true"' : ''}
                          ></button>
                        `
                      )
                      .join('')}
                  </div>
                  <button class="nav-button nav-button--next" type="button" aria-label="${escapeHtml(this._labels.next)}">
                    <span class="nav-icon" aria-hidden="true">&#8250;</span>
                  </button>
                </div>
              `
              : ''
          }
        </div>
      </section>
    `;

    this._cacheElements();
    this._bindEvents();
    this._updateTrackPosition(false);
    this._updateVisibleSlides();
    this._animateProgressBars();
    this._syncAutoplay();
  }

  next(fromUser = false) {
    if (!this._canNavigate) {
      return;
    }

    this._currentIndex = (this._currentIndex + 1) % this._technologies.length;
    this._renderedIndex += 1;

    this._updateTrackPosition(true);
    this._updateVisibleSlides();

    if (fromUser) {
      this._restartAutoplay();
    }
  }

  previous(fromUser = false) {
    if (!this._canNavigate) {
      return;
    }

    this._currentIndex =
      (this._currentIndex - 1 + this._technologies.length) %
      this._technologies.length;
    this._renderedIndex -= 1;

    this._updateTrackPosition(true);
    this._updateVisibleSlides();

    if (fromUser) {
      this._restartAutoplay();
    }
  }

  goTo(index) {
    if (!this._canNavigate) {
      return;
    }

    const targetIndex = clamp(index, 0, this._technologies.length - 1);

    this._currentIndex = targetIndex;
    this._renderedIndex = this._visibleItems + targetIndex;

    this._updateTrackPosition(true);
    this._updateVisibleSlides();
    this._restartAutoplay();
  }

  _upgradeProperty(propertyName) {
    if (Object.prototype.hasOwnProperty.call(this, propertyName)) {
      const propertyValue = this[propertyName];
      delete this[propertyName];
      this[propertyName] = propertyValue;
    }
  }

  _normalizeTechnology(technology) {
    return {
      name: technology?.name ?? 'Technology',
      logo: technology?.logo ?? '',
      logoAlt: technology?.logoAlt ?? `${technology?.name ?? 'Technology'} logo`,
      color: technology?.color ?? '#38bdf8',
      level: clamp(parseInteger(technology?.level, 0), 0, 100),
      description: technology?.description ?? '',
    };
  }

  _buildSlideData() {
    if (!this._canNavigate) {
      return this._technologies.map((technology, index) => ({
        technology,
        realIndex: index,
        clone: false,
      }));
    }

    const leadingClones = this._technologies
      .slice(-this._visibleItems)
      .map((technology, index) => ({
        technology,
        realIndex: this._technologies.length - this._visibleItems + index,
        clone: true,
      }));

    const realSlides = this._technologies.map((technology, index) => ({
      technology,
      realIndex: index,
      clone: false,
    }));

    const trailingClones = this._technologies
      .slice(0, this._visibleItems)
      .map((technology, index) => ({
        technology,
        realIndex: index,
        clone: true,
      }));

    return [...leadingClones, ...realSlides, ...trailingClones];
  }

  _renderSlide(slide, trackIndex, locale) {
    const description = resolveLocalizedText(
      slide.technology.description,
      locale
    );

    return `
      <li
        class="slide"
        data-track-index="${trackIndex}"
        data-real-index="${slide.realIndex}"
        data-clone="${slide.clone}"
        aria-hidden="true"
      >
        <article
          class="card"
          style="--accent: ${escapeHtml(slide.technology.color)};"
          aria-label="${escapeHtml(slide.technology.name)}, ${escapeHtml(
            this._labels.level
          )} ${slide.technology.level}%"
        >
          <header class="card-header">
            <div class="logo-badge">
              <img
                class="logo"
                src="${escapeHtml(slide.technology.logo)}"
                alt="${escapeHtml(slide.technology.logoAlt)}"
                loading="lazy"
              />
            </div>
            <div class="card-meta">
              <h3 class="card-title">${escapeHtml(slide.technology.name)}</h3>
              ${
                description
                  ? `<p class="card-description">${escapeHtml(description)}</p>`
                  : ''
              }
            </div>
          </header>
          <footer class="card-footer">
            <div class="card-level">
              <span>${escapeHtml(this._labels.level)}</span>
              <strong>${slide.technology.level}%</strong>
            </div>
            <div class="progress" aria-hidden="true">
              <span class="progress-bar" data-target="${slide.technology.level}"></span>
            </div>
          </footer>
        </article>
      </li>
    `;
  }

  _cacheElements() {
    this._elements = {
      panel: this.shadowRoot.querySelector('.carousel-panel'),
      viewport: this.shadowRoot.querySelector('.viewport'),
      track: this.shadowRoot.querySelector('.track'),
      slides: [...this.shadowRoot.querySelectorAll('.slide')],
      indicators: [...this.shadowRoot.querySelectorAll('.indicator')],
      previousButton: this.shadowRoot.querySelector('.nav-button--previous'),
      nextButton: this.shadowRoot.querySelector('.nav-button--next'),
      progressBars: [...this.shadowRoot.querySelectorAll('.progress-bar')],
      status: this.shadowRoot.querySelector('.sr-only[aria-live="polite"]'),
    };
  }

  _bindEvents() {
    this._elements.previousButton?.addEventListener('click', () =>
      this.previous(true)
    );
    this._elements.nextButton?.addEventListener('click', () => this.next(true));
    this._elements.track?.addEventListener(
      'transitionend',
      this._handleTransitionEnd
    );
    this._elements.panel?.addEventListener('keydown', this._handleKeyDown);
    this._elements.panel?.addEventListener('mouseenter', this._pauseAutoplay);
    this._elements.panel?.addEventListener('mouseleave', this._resumeAutoplay);
    this._elements.viewport?.addEventListener(
      'pointerdown',
      this._handlePointerDown
    );
    this._elements.viewport?.addEventListener('pointerup', this._handlePointerUp);
    this._elements.viewport?.addEventListener(
      'pointercancel',
      this._handlePointerCancel
    );

    this._elements.indicators.forEach((indicator) => {
      indicator.addEventListener('click', () => {
        this.goTo(parseInteger(indicator.dataset.index, 0));
      });
    });
  }

  _handleResize() {
    const nextVisibleItems = Math.min(
      this._getVisibleItemsForViewport(),
      Math.max(this._technologies.length, 1)
    );

    if (nextVisibleItems !== this._visibleItems) {
      this.render();
      return;
    }

    this._updateTrackPosition(false);
  }

  _handleTransitionEnd(event) {
    if (event.target !== this._elements.track || event.propertyName !== 'transform') {
      return;
    }

    this._resetClonePositionIfNeeded();
  }

  _handleKeyDown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (event.key === 'ArrowLeft') {
      this.previous(true);
      return;
    }

    this.next(true);
  }

  _handlePointerDown(event) {
    if (!this._canNavigate) {
      return;
    }

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    this._pointerStartX = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  _handlePointerUp(event) {
    if (this._pointerStartX === null) {
      return;
    }

    const deltaX = event.clientX - this._pointerStartX;

    this._pointerStartX = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (Math.abs(deltaX) < 48) {
      return;
    }

    if (deltaX < 0) {
      this.next(true);
      return;
    }

    this.previous(true);
  }

  _handlePointerCancel() {
    this._pointerStartX = null;
  }

  _handleReducedMotionChange() {
    this.render();
  }

  _updateTrackPosition(animate) {
    if (!this._elements.track || !this._elements.slides.length) {
      return;
    }

    const firstSlide = this._elements.slides[0];
    const trackStyles = window.getComputedStyle(this._elements.track);
    const gap =
      Number.parseFloat(trackStyles.columnGap || trackStyles.gap || '0') || 0;
    const slideWidth = firstSlide.getBoundingClientRect().width;
    const offset = (slideWidth + gap) * this._renderedIndex;

    this._elements.track.style.transitionDuration =
      animate && !this._prefersReducedMotion ? '560ms' : '0ms';
    this._elements.track.style.transform = `translate3d(${-offset}px, 0, 0)`;

    if (!animate || this._prefersReducedMotion) {
      this._resetClonePositionIfNeeded();
    }
  }

  _resetClonePositionIfNeeded() {
    if (!this._canNavigate) {
      return;
    }

    const firstRealTrackIndex = this._visibleItems;
    const firstCloneAfterRealContent =
      this._technologies.length + this._visibleItems;

    if (
      this._renderedIndex >= firstCloneAfterRealContent ||
      this._renderedIndex < firstRealTrackIndex
    ) {
      this._renderedIndex = this._visibleItems + this._currentIndex;
      this._updateTrackPosition(false);
      this._updateVisibleSlides();
    }
  }

  _updateVisibleSlides() {
    const activeRangeStart = this._renderedIndex;
    const activeRangeEnd = this._renderedIndex + this._visibleItems - 1;

    this._elements.slides.forEach((slide, index) => {
      const isVisible = index >= activeRangeStart && index <= activeRangeEnd;
      slide.setAttribute('aria-hidden', String(!isVisible));
    });

    this._elements.indicators.forEach((indicator, index) => {
      if (index === this._currentIndex) {
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.removeAttribute('aria-current');
      }
    });

    if (this._elements.status) {
      this._elements.status.textContent = this._buildStatusText();
    }
  }

  _animateProgressBars() {
    this._elements.progressBars.forEach((progressBar) => {
      const progress = clamp(parseInteger(progressBar.dataset.target, 0), 0, 100);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progressBar.style.width = `${progress}%`;
        });
      });
    });
  }

  _clearAutoplay() {
    if (this._autoplayTimer) {
      window.clearInterval(this._autoplayTimer);
      this._autoplayTimer = null;
    }
  }

  _pauseAutoplay() {
    this._isHovered = true;
    this._clearAutoplay();
  }

  _resumeAutoplay() {
    this._isHovered = false;
    this._syncAutoplay();
  }

  _restartAutoplay() {
    if (this._isHovered) {
      return;
    }

    this._syncAutoplay();
  }

  _syncAutoplay() {
    this._clearAutoplay();

    if (!this._canNavigate || !this._isAutoplayEnabled || this._isHovered) {
      return;
    }

    this._autoplayTimer = window.setInterval(() => {
      this.next();
    }, this._autoplayInterval);
  }

  _buildStatusText() {
    if (!this._technologies.length) {
      return '';
    }

    const currentTechnology = this._technologies[this._currentIndex];
    return `${this._currentIndex + 1}/${this._technologies.length}: ${currentTechnology.name}`;
  }

  _getVisibleItemsForViewport() {
    const desktopItems = clamp(
      parseInteger(this.getAttribute('visible-items'), 3),
      1,
      4
    );
    const viewportWidth = window.innerWidth || 1280;

    if (viewportWidth <= 767) {
      return 1;
    }

    if (viewportWidth <= 991) {
      return Math.min(desktopItems, 2);
    }

    return desktopItems;
  }

  get _prefersReducedMotion() {
    return this._mediaQuery?.matches ?? false;
  }

  get _isAutoplayEnabled() {
    return (
      this.hasAttribute('autoplay') &&
      this.getAttribute('autoplay') !== 'false' &&
      !this._prefersReducedMotion
    );
  }

  get _autoplayInterval() {
    return clamp(
      parseInteger(this.getAttribute('autoplay-interval'), 4000),
      2000,
      20000
    );
  }

  get _heading() {
    return this.getAttribute('heading') ?? 'Technologies I work with';
  }

  get _subheading() {
    return this.getAttribute('subheading') ?? '';
  }

  get _locale() {
    return this.getAttribute('locale') ?? 'en';
  }
}

if (!customElements.get('technology-carousel')) {
  customElements.define('technology-carousel', TechnologyCarousel);
}
