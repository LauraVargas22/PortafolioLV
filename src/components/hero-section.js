 import { homeContent } from '../data/site-content';
import { bootstrapCss } from './bootstrap-css';
import { sectionFrameStyles } from './shared-styles';
import { escapeHtml } from './utils';

class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const { hero } = homeContent;

    this.shadowRoot.innerHTML = `
      <style>${bootstrapCss}</style>
      <style>
        ${sectionFrameStyles}

        :host {
          color: inherit;
          font-family: inherit;
          display: block;
        }

        .hero-frame {
          background:
            radial-gradient(circle at 16% 26%, rgba(110, 211, 255, 0.16), transparent 22%),
            radial-gradient(circle at 82% 18%, rgba(255, 45, 117, 0.12), transparent 18%),
            radial-gradient(circle at 68% 86%, rgba(58, 136, 255, 0.14), transparent 24%),
            linear-gradient(160deg, rgba(6, 16, 34, 0.98), rgba(8, 21, 44, 0.92));
        }

        .hero-frame::after {
          content: '';
          position: absolute;
          inset: 1.2rem;
          border-radius: calc(var(--radius-xl) - 10px);
          border: 1px solid rgba(255, 255, 255, 0.04);
          pointer-events: none;
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        .hero-copy {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 1rem;
          max-width: 35rem;
        }

        .hero-name {
          margin: 0;
          color: rgba(238, 244, 255, 0.92);
          font-size: clamp(1.05rem, 0.95rem + 0.5vw, 1.55rem);
          font-weight: 600;
          letter-spacing: 0.02em;
          opacity: 0;
          transform: translateY(18px);
          animation: revealUp 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .hero-role {
          margin: 0;
          color: #ffffff;
          font-size: clamp(2.1rem, 1.5rem + 3vw, 4.5rem);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -0.03em;
          text-shadow: 0 10px 30px rgba(110, 211, 255, 0.12);
          opacity: 0;
          transform: translateY(18px);
          animation: revealUp 820ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 120ms;
          word-break: break-word;
        }

        .hero-description {
          max-width: 31rem;
          color: rgba(169, 184, 211, 0.92);
          font-size: clamp(0.95rem, 0.9rem + 0.22vw, 1.12rem);
          line-height: 1.8;
          letter-spacing: 0.01em;
          opacity: 0;
          transform: translateY(18px);
          animation: revealUp 920ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 240ms;
        }

        .button-row {
          opacity: 0;
          transform: translateY(18px);
          animation: revealUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 360ms;
        }

        .button {
          min-height: 3.35rem;
          padding-inline: 1.9rem;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(255, 45, 117, 0.96), rgba(255, 45, 117, 0.84));
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          box-shadow: 0 18px 34px rgba(255, 45, 117, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .button:hover {
          box-shadow: 0 22px 40px rgba(255, 45, 117, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .button:focus-visible {
          outline: 2px solid rgba(110, 211, 255, 0.5);
          outline-offset: 4px;
        }

        .media-column {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .media-column::before,
        .media-column::after {
          content: '';
          position: absolute;
          border-radius: 999px;
          filter: blur(24px);
          pointer-events: none;
        }

        .media-column::before {
          width: clamp(11rem, 34vw, 21rem);
          height: clamp(11rem, 34vw, 21rem);
          left: 50%;
          top: 50%;
          background: radial-gradient(circle, rgba(110, 211, 255, 0.42), rgba(110, 211, 255, 0.08) 56%, transparent 72%);
          transform: translate(-56%, -50%);
          animation: haloPulse 6s ease-in-out infinite;
        }

        .media-column::after {
          width: clamp(8rem, 24vw, 14rem);
          height: clamp(8rem, 24vw, 14rem);
          right: 12%;
          top: 16%;
          background: radial-gradient(circle, rgba(255, 45, 117, 0.34), rgba(255, 45, 117, 0.08) 52%, transparent 72%);
          animation: pinkPulse 7s ease-in-out infinite reverse;
        }

        .portrait-stage {
          position: relative;
          width: min(100%, 30rem);
          aspect-ratio: 0.86;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: floatPortrait 7s ease-in-out infinite;
        }

        .portrait-stage::before {
          content: '';
          position: absolute;
          inset: 6% 10% 8%;
          border-radius: 38% 62% 58% 42% / 40% 42% 58% 60%;
          background:
            radial-gradient(circle at 30% 32%, rgba(110, 211, 255, 0.26), transparent 30%),
            linear-gradient(180deg, rgba(13, 32, 63, 0.92), rgba(5, 13, 28, 0.74));
          border: 1px solid rgba(169, 184, 211, 0.16);
          box-shadow: 0 28px 70px rgba(2, 6, 23, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(18px);
        }

        .portrait-stage::after {
          content: '';
          position: absolute;
          inset: 10% 14%;
          border-radius: 34px;
          border: 1px solid rgba(110, 211, 255, 0.16);
          opacity: 0.9;
          transform: rotate(-7deg);
          box-shadow: 0 0 28px rgba(110, 211, 255, 0.12);
        }

        .portrait-orbit {
          position: absolute;
          border-radius: 999px;
          border: 1px solid rgba(169, 184, 211, 0.14);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          box-shadow: 0 12px 28px rgba(2, 6, 23, 0.22);
        }

        .portrait-orbit.one {
          width: clamp(1.6rem, 6vw, 2.8rem);
          height: clamp(1.6rem, 6vw, 2.8rem);
          top: 8%;
          left: 16%;
          background: radial-gradient(circle at center, rgba(110, 211, 255, 0.9), rgba(110, 211, 255, 0.2) 52%, transparent 66%);
          animation: orbitMove 8s ease-in-out infinite;
        }

        .portrait-orbit.two {
          width: clamp(2.4rem, 9vw, 4.2rem);
          height: clamp(2.4rem, 9vw, 4.2rem);
          right: 8%;
          bottom: 18%;
          background: radial-gradient(circle at center, rgba(255, 45, 117, 0.64), rgba(255, 45, 117, 0.15) 50%, transparent 68%);
          animation: orbitMove 9s ease-in-out infinite reverse;
        }

        .portrait-frame {
          position: relative;
          width: 100%;
          border-radius: 34px;
          padding: 0.95rem;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.03)),
            linear-gradient(180deg, rgba(7, 19, 37, 0.65), rgba(7, 19, 37, 0.22));
          border: 1px solid rgba(169, 184, 211, 0.22);
          box-shadow: 0 22px 60px rgba(2, 6, 23, 0.38), 0 0 34px rgba(58, 136, 255, 0.12);
          backdrop-filter: blur(18px);
          transition: transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease;
        }

        .portrait-frame:hover {
          transform: translateY(-6px);
          border-color: rgba(110, 211, 255, 0.34);
          box-shadow: 0 26px 72px rgba(2, 6, 23, 0.42), 0 0 42px rgba(58, 136, 255, 0.18);
        }

        .portrait {
          width: 100%;
          display: block;
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 18px 44px rgba(2, 6, 23, 0.34);
        }

        .particle-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          display: block;
          border-radius: 999px;
          opacity: 0.9;
          filter: blur(0.2px);
        }

        .particle::after {
          content: '';
          position: absolute;
          inset: -0.45rem;
          border-radius: inherit;
          opacity: 0.2;
          background: inherit;
          filter: blur(10px);
        }

        .particle.one { top: 18%; left: 10%; width: 0.7rem; height: 0.7rem; background: #6ed3ff; animation: particleDriftOne 11s ease-in-out infinite; }
        .particle.two { top: 28%; left: 18%; width: 0.38rem; height: 0.38rem; background: rgba(255,255,255,0.85); animation: particleDriftTwo 9s ease-in-out infinite; }
        .particle.three { top: 12%; right: 18%; width: 0.85rem; height: 0.85rem; background: rgba(255,45,117,0.92); animation: particleDriftThree 12s ease-in-out infinite; }
        .particle.four { bottom: 18%; left: 14%; width: 0.5rem; height: 0.5rem; background: rgba(110,211,255,0.82); animation: particleDriftTwo 10s ease-in-out infinite reverse; }
        .particle.five { top: 58%; right: 10%; width: 0.65rem; height: 0.65rem; background: rgba(255,255,255,0.9); animation: particleDriftOne 13s ease-in-out infinite reverse; }
        .particle.six { bottom: 14%; right: 24%; width: 0.9rem; height: 0.9rem; background: rgba(255,45,117,0.78); animation: particleDriftThree 14s ease-in-out infinite reverse; }
        .particle.seven { top: 44%; left: 46%; width: 0.42rem; height: 0.42rem; background: rgba(110,211,255,0.88); animation: particleDriftTwo 8s ease-in-out infinite; }
        .particle.eight { top: 74%; left: 64%; width: 0.52rem; height: 0.52rem; background: rgba(255,255,255,0.82); animation: particleDriftOne 10s ease-in-out infinite; }

        @keyframes revealUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatPortrait { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes haloPulse { 0%, 100% { transform: translate(-56%, -50%) scale(1); opacity: 0.88; } 50% { transform: translate(-56%, -50%) scale(1.06); opacity: 1; } }
        @keyframes pinkPulse { 0%, 100% { transform: scale(1); opacity: 0.78; } 50% { transform: scale(1.08); opacity: 0.96; } }
        @keyframes orbitMove { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes particleDriftOne { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.88; } 50% { transform: translate3d(10px, -18px, 0) scale(1.12); opacity: 1; } }
        @keyframes particleDriftTwo { 0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.72; } 50% { transform: translate3d(-12px, 14px, 0); opacity: 1; } }
        @keyframes particleDriftThree { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.8; } 50% { transform: translate3d(14px, 10px, 0) scale(0.9); opacity: 1; } }

        @media (max-width: 991px) {
          .hero-copy {
            margin: 0 auto;
            text-align: center;
          }

          .hero-description {
            margin-inline: auto;
          }
        }

        @media (max-width: 767px) {
          .hero-frame::after {
            inset: 0.85rem;
            border-radius: 18px;
          }

          .portrait-stage {
            width: min(72%, 18rem);
          }
        }

        @media (max-width: 575px) {
          .hero-copy {
            gap: 0.8rem;
          }

          .hero-name {
            font-size: 0.98rem;
          }

          .hero-role {
            font-size: clamp(1.9rem, 1.4rem + 4vw, 2.7rem);
          }

          .hero-description {
            font-size: 0.94rem;
            line-height: 1.72;
          }

          .portrait-stage {
            width: min(70%, 14rem);
          }

          .portrait-frame {
            padding: 0.7rem;
            border-radius: 24px;
          }

          .portrait {
            border-radius: 18px;
          }
        }

        @media (max-width: 400px) {
          .portrait-stage {
            width: min(68%, 15rem);
          }

          .particle.three,
          .particle.six {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .media-column::before,
          .media-column::after,
          .particle,
          .portrait-stage,
          .portrait-orbit.one,
          .portrait-orbit.two,
          .hero-name,
          .hero-role,
          .hero-description,
          .button-row {
            animation: none;
          }

          .hero-name,
          .hero-role,
          .hero-description,
          .button-row {
            opacity: 1;
            transform: none;
          }
        }
      </style>
      <section class="section-frame hero-frame">
        <div class="particle-field" aria-hidden="true">
          <span class="particle one"></span>
          <span class="particle two"></span>
          <span class="particle three"></span>
          <span class="particle four"></span>
          <span class="particle five"></span>
          <span class="particle six"></span>
          <span class="particle seven"></span>
          <span class="particle eight"></span>
        </div>
        <div class="container-fluid hero-container">
          <div class="row g-3 g-lg-5 align-items-center">
            <div class="col-12 col-lg-6 order-1">
              <div class="hero-copy text-center text-lg-start">
                <p class="hero-name">${escapeHtml(hero.greeting)}</p>
                <h1 class="hero-role">${escapeHtml(hero.title)}</h1>
                <p class="hero-description">${escapeHtml(hero.description)}</p>
                <div class="button-row d-flex justify-content-center justify-content-lg-start">
                  <a class="button" href="${hero.primaryCta.href}" target="_blank" rel="noreferrer">
                    ${escapeHtml(hero.primaryCta.label)}
                  </a>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 order-2">
              <div class="media-column">
                <div class="portrait-stage">
                  <span class="portrait-orbit one" aria-hidden="true"></span>
                  <span class="portrait-orbit two" aria-hidden="true"></span>
                  <div class="portrait-frame">
                    <img class="portrait" src="${hero.image}" alt="Laura Vargas">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

if (!customElements.get('hero-section')) {
  customElements.define('hero-section', HeroSection);
}