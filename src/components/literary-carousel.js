import styles from './literary-carousel.css?raw';
import { bootstrapCss } from './bootstrap-css';
import { sectionFrameStyles } from './shared-styles';
import { books as defaultBooks } from '../data/books';
import { escapeHtml } from './utils';

const DEFAULT_LABELS = {
  carousel: 'Carrusel de intereses literarios',
  previous: 'Mostrar libro anterior',
  next: 'Mostrar libro siguiente',
  goTo: 'Ir al libro',
  return: 'Volver a la portada',
};

const SWIPE_THRESHOLD = 52;

const parseInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const clampIndex = (value, total) => {
  if (!total) {
    return 0;
  }

  return (value + total) % total;
};

const normalizeBook = (book, index) => ({
  id: book?.id ?? `book-${index + 1}`,
  title: book?.title ?? 'Libro',
  author: book?.author ?? 'Autor desconocido',
  cover: book?.cover ?? '',
  coverAlt: book?.coverAlt ?? `Portada de ${book?.title ?? 'Libro'}`,
  status: book?.status ?? 'Pendiente',
  review: book?.review ?? 'Sin resena disponible.',
  rating: Number.isFinite(Number(book?.rating)) ? Number(book.rating) : null,
  year: book?.year ?? '---',
  accent: book?.accent ?? '#6ed3ff',
  accentSoft: book?.accentSoft ?? 'rgba(110, 211, 255, 0.24)',
});

const getStatusTone = (status = '') => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes('final')) {
    return 'completed';
  }

  if (
    normalizedStatus.includes('curso') ||
    normalizedStatus.includes('leyendo') ||
    normalizedStatus.includes('reading')
  ) {
    return 'current';
  }

  return 'pending';
};

const formatIndex = (value) => String(value).padStart(2, '0');

const formatRating = (value) => {
  if (!Number.isFinite(value)) {
    return '';
  }

  return value.toFixed(1);
};

const renderStars = () => '&#9733;&#9733;&#9733;&#9733;&#9733;';

class LiteraryCarousel extends HTMLElement {
  static observedAttributes = [
    'eyebrow',
    'title',
    'description',
    'autoplay',
    'autoplay-interval',
  ];

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this._books = defaultBooks.map((book, index) => normalizeBook(book, index));
    this._labels = { ...DEFAULT_LABELS };
    this._currentIndex = 0;
    this._flippedBookId = null;
    this._autoplayTimer = null;
    this._isHovered = false;
    this._pointerStartX = null;
    this._suppressActivationUntil = 0;
    this._elements = {};
    this._mediaQuery =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    this._handleStageClick = this._handleStageClick.bind(this);
    this._handleStageKeyDown = this._handleStageKeyDown.bind(this);
    this._handlePointerDown = this._handlePointerDown.bind(this);
    this._handlePointerUp = this._handlePointerUp.bind(this);
    this._handlePointerCancel = this._handlePointerCancel.bind(this);
    this._pauseAutoplay = this._pauseAutoplay.bind(this);
    this._resumeAutoplay = this._resumeAutoplay.bind(this);
    this._handleReducedMotionChange =
      this._handleReducedMotionChange.bind(this);
  }

  connectedCallback() {
    this._upgradeProperty('books');
    this._upgradeProperty('labels');

    if (!this.hasAttribute('autoplay')) {
      this.setAttribute('autoplay', 'true');
    }

    if (!this.hasAttribute('autoplay-interval')) {
      this.setAttribute('autoplay-interval', '5200');
    }

    this._mediaQuery?.addEventListener(
      'change',
      this._handleReducedMotionChange
    );

    this.render();
  }

  disconnectedCallback() {
    this._clearAutoplay();
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

  get books() {
    return this._books;
  }

  set books(value) {
    const nextBooks = Array.isArray(value)
      ? value.map((book, index) => normalizeBook(book, index))
      : [];

    this._books = nextBooks;
    this._currentIndex = Math.min(
      this._currentIndex,
      Math.max(this._books.length - 1, 0)
    );

    if (
      this._flippedBookId &&
      !this._books.some((book) => book.id === this._flippedBookId)
    ) {
      this._flippedBookId = null;
    }

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
    const eyebrow = this.getAttribute('eyebrow') ?? 'Lecturas';
    const title = this.getAttribute('title') ?? 'Intereses literarios';
    const description = this.getAttribute('description') ?? '';
    const activeBook = this._activeBook;

    this.shadowRoot.innerHTML = `
      <style>${bootstrapCss}</style>
      <style>${sectionFrameStyles}</style>
      <style>${styles}</style>
      <section
        class="section-frame literary-frame"
        style="--book-accent: ${escapeHtml(activeBook?.accent ?? '#6ed3ff')}; --book-accent-soft: ${escapeHtml(
          activeBook?.accentSoft ?? 'rgba(110, 211, 255, 0.24)'
        )};"
      >
        <div
          class="ambient-cover"
          style="background-image: url('${escapeHtml(activeBook?.cover ?? '')}');"
          aria-hidden="true"
        ></div>
        <div class="ambient-overlay" aria-hidden="true"></div>
        <div class="ambient-halo" aria-hidden="true"></div>
        <div class="container-fluid literary-stack">
          <header class="section-header literary-header">
            <h2 class="title literary-title">${escapeHtml(title)}</h2>
            ${
              description
                ? `
                  <blockquote class="literary-quote">
                    <p class="description literary-description">${escapeHtml(description)} "</p>
                  </blockquote>
                `
                : ''
            }
            <p class="carousel-note">
              Walt Disney
            </p>
          </header>
          ${
            this._books.length
              ? `
                <div class="carousel-shell">
                  <button
                    class="nav-button nav-button--previous"
                    type="button"
                    aria-label="${escapeHtml(this._labels.previous)}"
                  >
                    <span class="nav-icon" aria-hidden="true">&#8249;</span>
                  </button>
                  <div
                    class="carousel-stage"
                    tabindex="0"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="${escapeHtml(this._labels.carousel)}"
                  >
                    <div class="book-track">
                      ${this._books
                        .map((book, index) => this._renderBookCard(book, index))
                        .join('')}
                    </div>
                    <p class="sr-only" aria-live="polite"></p>
                  </div>
                  <button
                    class="nav-button nav-button--next"
                    type="button"
                    aria-label="${escapeHtml(this._labels.next)}"
                  >
                    <span class="nav-icon" aria-hidden="true">&#8250;</span>
                  </button>
                </div>
                <div class="carousel-footer">
                  <div class="counter">
                    <strong data-counter-current></strong>
                    <span>/</span>
                    <span data-counter-total></span>
                  </div>
                  <div class="indicators" aria-label="${escapeHtml(
                    this._labels.carousel
                  )}">
                    ${this._books
                      .map(
                        (book, index) => `
                          <button
                            class="indicator"
                            type="button"
                            data-index="${index}"
                            aria-label="${escapeHtml(this._labels.goTo)} ${escapeHtml(
                              book.title
                            )}"
                          ></button>
                        `
                      )
                      .join('')}
                  </div>
                </div>
              `
              : `
                <div class="empty-state">
                  <p>No hay libros disponibles para mostrar en este momento.</p>
                </div>
              `
          }
        </div>
      </section>
    `;

    this._cacheElements();
    this._bindEvents();
    this._updatePresentation();
  }

  next(fromUser = false) {
    if (this._books.length < 2) {
      return;
    }

    this._currentIndex = clampIndex(this._currentIndex + 1, this._books.length);
    this._flippedBookId = null;
    this._updatePresentation();

    if (fromUser) {
      this._restartAutoplay();
    }
  }

  previous(fromUser = false) {
    if (this._books.length < 2) {
      return;
    }

    this._currentIndex = clampIndex(this._currentIndex - 1, this._books.length);
    this._flippedBookId = null;
    this._updatePresentation();

    if (fromUser) {
      this._restartAutoplay();
    }
  }

  goTo(index, fromUser = false) {
    if (!this._books.length) {
      return;
    }

    const safeIndex = Math.min(Math.max(index, 0), this._books.length - 1);

    if (safeIndex === this._currentIndex) {
      if (fromUser) {
        this._restartAutoplay();
      }
      return;
    }

    this._currentIndex = safeIndex;
    this._flippedBookId = null;
    this._updatePresentation();

    if (fromUser) {
      this._restartAutoplay();
    }
  }

  _renderBookCard(book, index) {
    const tone = getStatusTone(book.status);
    const formattedRating = formatRating(book.rating);

    return `
      <article class="book-slide" data-index="${index}">
        <div
          class="book-card"
          tabindex="0"
          role="button"
          aria-pressed="false"
          aria-label="${escapeHtml(book.title)} de ${escapeHtml(
            book.author
          )}. Estado ${escapeHtml(book.status)}."
        >
          <div class="book-card__inner">
            <div class="book-card__face book-card__front">
              <img
                class="book-card__cover"
                src="${escapeHtml(book.cover)}"
                alt="${escapeHtml(book.coverAlt)}"
                loading="lazy"
              />
              <div class="book-card__shade" aria-hidden="true"></div>
              <div class="book-card__topline">
                <span class="book-card__badge">${escapeHtml(String(book.year))}</span>
                ${
                  formattedRating
                    ? `
                      <span class="book-card__score" aria-label="Calificacion ${formattedRating} de 5">
                        <strong>${formattedRating}</strong>
                      </span>
                    `
                    : ''
                }
              </div>
              <div class="book-card__content">
                <h3 class="book-card__title">${escapeHtml(book.title)}</h3>
                <p class="book-card__author">${escapeHtml(book.author)}</p>
                <span class="book-status book-status--${tone}">
                  ${escapeHtml(book.status)}
                </span>
              </div>
            </div>
            <div class="book-card__face book-card__back">
              <span class="book-card__back-badge">Resena</span>
              <div class="book-card__back-copy">
                <p class="book-card__back-title">${escapeHtml(book.title)}</p>
                <p class="book-card__back-author">${escapeHtml(book.author)}</p>
                <p class="book-card__review">${escapeHtml(book.review)}</p>
              </div>
              <div class="book-card__meta">
                ${
                  formattedRating
                    ? `
                      <div class="book-rating" aria-label="Calificacion ${formattedRating} de 5">
                        <span class="book-stars" aria-hidden="true">${renderStars()}</span>
                        <strong>${formattedRating}</strong>
                      </div>
                    `
                    : ''
                }
                <div class="book-card__meta-row">
                  <span class="book-status book-status--${tone}">
                    ${escapeHtml(book.status)}
                  </span>
                  <span>${escapeHtml(String(book.year))}</span>
                </div>
              </div>
              <button class="book-card__return" type="button">
                ${escapeHtml(this._labels.return)}
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  _cacheElements() {
    this._elements = {
      frame: this.shadowRoot.querySelector('.literary-frame'),
      stage: this.shadowRoot.querySelector('.carousel-stage'),
      liveRegion: this.shadowRoot.querySelector('.sr-only[aria-live="polite"]'),
      slides: [...this.shadowRoot.querySelectorAll('.book-slide')],
      indicators: [...this.shadowRoot.querySelectorAll('.indicator')],
      previousButton: this.shadowRoot.querySelector('.nav-button--previous'),
      nextButton: this.shadowRoot.querySelector('.nav-button--next'),
      currentCounter: this.shadowRoot.querySelector('[data-counter-current]'),
      totalCounter: this.shadowRoot.querySelector('[data-counter-total]'),
      ambientCover: this.shadowRoot.querySelector('.ambient-cover'),
    };
  }

  _bindEvents() {
    this._elements.previousButton?.addEventListener('click', () =>
      this.previous(true)
    );
    this._elements.nextButton?.addEventListener('click', () => this.next(true));
    this._elements.stage?.addEventListener('click', this._handleStageClick);
    this._elements.stage?.addEventListener('keydown', this._handleStageKeyDown);
    this._elements.stage?.addEventListener('pointerdown', this._handlePointerDown);
    this._elements.stage?.addEventListener('pointerup', this._handlePointerUp);
    this._elements.stage?.addEventListener(
      'pointercancel',
      this._handlePointerCancel
    );
    this._elements.stage?.addEventListener(
      'pointerleave',
      this._handlePointerCancel
    );
    this._elements.stage?.addEventListener('mouseenter', this._pauseAutoplay);
    this._elements.stage?.addEventListener('mouseleave', this._resumeAutoplay);

    this._elements.indicators.forEach((indicator) => {
      indicator.addEventListener('click', () => {
        this.goTo(parseInteger(indicator.dataset.index, 0), true);
      });
    });
  }

  _handleStageClick(event) {
    const now = performance.now();

    if (now < this._suppressActivationUntil) {
      return;
    }

    const returnButton = event.target.closest('.book-card__return');

    if (returnButton) {
      event.preventDefault();
      event.stopPropagation();
      this._flippedBookId = null;
      this._updatePresentation();
      return;
    }

    const card = event.target.closest('.book-card');

    if (!card) {
      return;
    }

    const slide = card.closest('.book-slide');
    const index = parseInteger(slide?.dataset.index, -1);

    if (index < 0) {
      return;
    }

    if (index !== this._currentIndex) {
      this.goTo(index, true);
      return;
    }

    this._toggleFlip();
  }

  _handleStageKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous(true);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next(true);
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    if (event.target.closest('.book-card__return')) {
      return;
    }

    const card = event.target.closest('.book-card');

    if (!card) {
      return;
    }

    event.preventDefault();

    const slide = card.closest('.book-slide');
    const index = parseInteger(slide?.dataset.index, -1);

    if (index < 0) {
      return;
    }

    if (index !== this._currentIndex) {
      this.goTo(index, true);
      return;
    }

    this._toggleFlip();
  }

  _handlePointerDown(event) {
    if (this._books.length < 2) {
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

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    this._suppressActivationUntil = performance.now() + 260;

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
    this._syncAutoplay();
    this._updatePresentation();
  }

  _pauseAutoplay() {
    this._isHovered = true;
    this._clearAutoplay();
  }

  _resumeAutoplay() {
    this._isHovered = false;
    this._syncAutoplay();
  }

  _toggleFlip() {
    const activeBookId = this._activeBook?.id;

    if (!activeBookId) {
      return;
    }

    this._flippedBookId =
      this._flippedBookId === activeBookId ? null : activeBookId;
    this._updatePresentation();
  }

  _updatePresentation() {
    if (!this._books.length) {
      this._clearAutoplay();
      return;
    }

    const activeBook = this._activeBook;

    this._elements.frame?.style.setProperty(
      '--book-accent',
      activeBook?.accent ?? '#6ed3ff'
    );
    this._elements.frame?.style.setProperty(
      '--book-accent-soft',
      activeBook?.accentSoft ?? 'rgba(110, 211, 255, 0.24)'
    );

    if (this._elements.ambientCover) {
      this._elements.ambientCover.style.backgroundImage = `url('${activeBook?.cover ?? ''}')`;
    }

    if (this._elements.currentCounter) {
      this._elements.currentCounter.textContent = formatIndex(
        this._currentIndex + 1
      );
    }

    if (this._elements.totalCounter) {
      this._elements.totalCounter.textContent = formatIndex(this._books.length);
    }

    if (this._elements.liveRegion) {
      this._elements.liveRegion.textContent = `${activeBook.title} de ${activeBook.author}. Estado ${activeBook.status}.`;
    }

    this._elements.slides.forEach((slide, index) => {
      const position = this._getSlidePosition(index);
      const book = this._books[index];
      const isActive = index === this._currentIndex;
      const isFlipped = this._flippedBookId === book.id && isActive;
      const card = slide.querySelector('.book-card');

      slide.dataset.position = position;
      slide.classList.toggle('is-active', isActive);
      slide.classList.toggle('is-flipped', isFlipped);
      slide.setAttribute('aria-hidden', String(position === 'hidden'));

      if (card) {
        card.tabIndex = position === 'hidden' ? -1 : 0;
        card.setAttribute('aria-pressed', String(isFlipped));

        if (isActive) {
          card.setAttribute('aria-current', 'true');
        } else {
          card.removeAttribute('aria-current');
        }
      }
    });

    this._elements.indicators.forEach((indicator, index) => {
      if (index === this._currentIndex) {
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.removeAttribute('aria-current');
      }
    });

    const disableNavigation = this._books.length < 2;

    this._elements.previousButton?.toggleAttribute('disabled', disableNavigation);
    this._elements.nextButton?.toggleAttribute('disabled', disableNavigation);

    this._syncAutoplay();
  }

  _getSlidePosition(index) {
    if (index === this._currentIndex) {
      return 'active';
    }

    const total = this._books.length;
    let delta = index - this._currentIndex;

    if (delta > total / 2) {
      delta -= total;
    } else if (delta < -total / 2) {
      delta += total;
    }

    if (delta === -1) {
      return 'near-prev';
    }

    if (delta === 1) {
      return 'near-next';
    }

    if (delta === -2) {
      return 'far-prev';
    }

    if (delta === 2) {
      return 'far-next';
    }

    return 'hidden';
  }

  _clearAutoplay() {
    if (this._autoplayTimer) {
      window.clearInterval(this._autoplayTimer);
      this._autoplayTimer = null;
    }
  }

  _restartAutoplay() {
    if (this._isHovered) {
      return;
    }

    this._syncAutoplay();
  }

  _syncAutoplay() {
    this._clearAutoplay();

    if (
      this._books.length < 2 ||
      !this._isAutoplayEnabled ||
      this._isHovered ||
      this._flippedBookId
    ) {
      return;
    }

    this._autoplayTimer = window.setInterval(() => {
      this.next();
    }, this._autoplayInterval);
  }

  _upgradeProperty(propertyName) {
    if (Object.prototype.hasOwnProperty.call(this, propertyName)) {
      const propertyValue = this[propertyName];
      delete this[propertyName];
      this[propertyName] = propertyValue;
    }
  }

  get _activeBook() {
    return this._books[this._currentIndex] ?? null;
  }

  get _isAutoplayEnabled() {
    return (
      this.hasAttribute('autoplay') &&
      this.getAttribute('autoplay') !== 'false' &&
      !this._prefersReducedMotion
    );
  }

  get _autoplayInterval() {
    return Math.min(
      Math.max(parseInteger(this.getAttribute('autoplay-interval'), 5200), 2500),
      15000
    );
  }

  get _prefersReducedMotion() {
    return this._mediaQuery?.matches ?? false;
  }
}

if (!customElements.get('literary-carousel')) {
  customElements.define('literary-carousel', LiteraryCarousel);
}
