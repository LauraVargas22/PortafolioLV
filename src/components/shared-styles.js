export const sectionFrameStyles = `
  :host {
    display: block;
  }

  .section-frame {
    position: relative;
    max-width: var(--content-width);
    margin: 0 auto;
    padding: clamp(1.5rem, 3vw, 2.8rem);
    border-radius: var(--radius-xl);
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .section-frame::before {
    content: '';
    position: absolute;
    inset: auto auto -2rem -1rem;
    width: 9rem;
    height: 9rem;
    border-radius: 999px;
    background: rgba(58, 136, 255, 0.12);
    filter: blur(18px);
    pointer-events: none;
  }

  .section-header {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.75rem;
    margin-bottom: 1.6rem;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 110, 248, 0.22);
    background: rgba(255, 110, 195, 0.08);
    color: var(--home-accent-2, #ff2d75);
    font-family: var(--font-display);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 1.45rem + 2vw, 3.6rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: white;
  }

  .description {
    margin: 0;
    max-width: 44rem;
    color: var(--text-secondary);
    font-size: clamp(1rem, 0.95rem + 0.2vw, 1.08rem);
    line-height: 1.7;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0.55rem 0.9rem;
    border-radius: 999px;
    border: 1px solid rgba(169, 184, 211, 0.16);
    background: rgba(169, 184, 211, 0.08);
    color: var(--text-primary);
    font-size: 0.92rem;
    font-weight: 600;
  }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 3.1rem;
    padding: 0.9rem 1.3rem;
    border-radius: 999px;
    border: 1px solid rgba(110, 211, 255, 0.2);
    background: linear-gradient(135deg, rgba(58, 136, 255, 0.95), rgba(110, 211, 255, 0.85));
    color: #03101f;
    text-decoration: none;
    font-weight: 700;
    transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(58, 136, 255, 0.24);
  }

  .button.secondary {
    background: rgba(255, 255, 255, 0.02);
    color: white;
    border-color: rgba(169, 184, 211, 0.2);
  }

  @media (max-width: 991px) {
    .section-frame {
      padding: 1.4rem;
      border-radius: 28px;
    }
  }

  @media (max-width: 767px) {
    .section-frame {
      padding: 1.2rem 1rem;
      border-radius: 22px;
    }

    .title {
      font-size: clamp(1.75rem, 1.2rem + 4.2vw, 2.5rem);
    }

    .description {
      max-width: 100%;
    }
  }

  @media (max-width: 575px) {
    .section-frame {
      padding: 0.95rem 0.85rem;
      border-radius: 18px;
    }

    .eyebrow {
      font-size: 0.74rem;
      padding: 0.38rem 0.72rem;
    }

    .button-row {
      flex-direction: column;
      align-items: stretch;
    }

    .button {
      width: 100%;
      min-height: 3rem;
    }
  }
`;

export const shellStyles = `
  :host {
    display: block;
  }

  .shell {
    position: relative;
    max-width: var(--content-width);
    margin: 0 auto;
    padding: clamp(1.5rem, 3vw, 2.8rem);
    border-radius: var(--radius-xl);
    background:
      radial-gradient(circle at top right, rgba(110, 211, 255, 0.14), transparent 24%),
      linear-gradient(160deg, rgba(12, 12, 15, 0.96), rgba(24, 25, 31, 0.9));
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .shell::before {
    content: '';
    position: absolute;
    inset: auto auto -2rem -1rem;
    width: 9rem;
    height: 9rem;
    border-radius: 999px;
    background: rgba(58, 136, 255, 0.12);
    filter: blur(18px);
    pointer-events: none;
  }

  .section-header {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.75rem;
    margin-bottom: 1.6rem;
  }

.eyebrow {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.35rem 0.72rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 110, 248, 0.22);
  background: rgba(255, 110, 195, 0.08);
  color: var(--home-accent-2, #ff2d75);
  font-family: var(--font-display, inherit);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

  .title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 1.45rem + 2vw, 3.6rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: white;
  }

  .description {
    margin: 0;
    max-width: 44rem;
    color: var(--text-secondary);
    font-size: clamp(1rem, 0.95rem + 0.2vw, 1.08rem);
    line-height: 1.7;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0.55rem 0.9rem;
    border-radius: 999px;
    border: 1px solid rgba(169, 184, 211, 0.16);
    background: rgba(169, 184, 211, 0.08);
    color: var(--text-primary);
    font-size: 0.92rem;
    font-weight: 600;
  }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 3.1rem;
    padding: 0.9rem 1.3rem;
    border-radius: 999px;
    border: 1px solid rgba(110, 211, 255, 0.2);
    background: linear-gradient(135deg, rgba(58, 136, 255, 0.95), rgba(110, 211, 255, 0.85));
    color: #03101f;
    text-decoration: none;
    font-weight: 700;
    transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(58, 136, 255, 0.24);
  }

  .button.secondary {
    background: rgba(255, 255, 255, 0.02);
    color: white;
    border-color: rgba(169, 184, 211, 0.2);
  }

  .grid {
    display: grid;
    gap: 1rem;
  }

  .card {
    position: relative;
    z-index: 1;
    padding: 1.3rem;
    border-radius: var(--radius-lg);
    background: linear-gradient(180deg, rgba(27, 28, 34, 0.94), rgba(12, 13, 18, 0.98));
    border: 1px solid rgba(169, 184, 211, 0.14);
    box-shadow: 0 16px 36px rgba(2, 6, 23, 0.22);
  }

  .card-title {
    margin: 0 0 0.45rem;
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: white;
  }

  .card-copy {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.98rem;
    line-height: 1.65;
  }

  ul.clean-list {
    margin: 0;
    padding-left: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  @media (max-width: 991px) {
    .shell {
      padding: 1.4rem;
      border-radius: 28px;
    }
  }

  @media (max-width: 767px) {
    .shell {
      padding: 1.2rem 1rem;
      border-radius: 22px;
    }

    .title {
      font-size: clamp(1.75rem, 1.2rem + 4.2vw, 2.5rem);
    }

    .description {
      max-width: 100%;
    }
  }
`;
