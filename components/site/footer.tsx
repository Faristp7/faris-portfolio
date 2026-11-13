/* eslint-disable @next/next/no-img-element -- plain <img> keeps the static markup exactly */

export function Footer() {
  return (
    <footer className="footer room s-cobalt">
      {/* The name once more; this time the dot on the i is him */}
      <div className="outro" aria-hidden="true">
        <p className="outro__word">
          <span className="ch">F</span>
          <span className="ch">a</span>
          <span className="ch">r</span>
          <span className="ch outro__i">
            ı
            <span className="outro__tittle">
              <img
                src="/assets/portrait/faris-bust-640.webp"
                alt=""
                width="640"
                height="640"
                loading="lazy"
                decoding="async"
              />
            </span>
          </span>
          <span className="ch">s</span>
        </p>
      </div>
      <div className="wrap footer__row">
        <p className="footer__copy">© <span data-year="">2026</span> Faris Dev. All rights reserved.</p>
        <ul className="footer__social" role="list">
          <li>
            <a className="link" href="https://x.com/faristp07" target="_blank" rel="noopener noreferrer">Twitter</a>
          </li>
          <li>
            <a className="link" href="https://www.linkedin.com/in/faris-tp" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link" href="https://github.com/faristp7" target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a className="link" href="https://www.instagram.com/faris_tp_" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        </ul>
        <a className="footer__top" href="#top"><span>Back to top</span><i aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
