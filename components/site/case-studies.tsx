/* eslint-disable @next/next/no-img-element -- plain <img> keeps the static markup exactly */
import type React from "react";

export function CaseStudies() {
  return (
    <>
      {/* Case studies */}
      <dialog
        className="case s-paper"
        id="case-dollar-uae"
        aria-labelledby="case-dollar-uae-title"
        style={{ "--hue": "#e0303f" } as React.CSSProperties}
        data-case-dialog="dollar-uae"
      >
        <button className="round-btn case__close" type="button" data-case-close="">
          <svg className="icon" aria-hidden="true"><use href="#i-x" /></svg>
          <span className="sr-only">Close case study</span>
        </button>
        <div className="case__panel" data-lenis-prevent="">
          <div className="case__media">
            <img
              className="case__img"
              loading="lazy"
              src="/assets/work/dollar-uae-1280.webp"
              srcSet="/assets/work/dollar-uae-1280.webp 1280w, /assets/work/dollar-uae-1920.webp 1920w"
              sizes="(min-width: 1212px) 1180px, 100vw"
              width="1920"
              height="1072"
              alt="Dollar UAE interface: car selection, booking calendar and pricing panels"
              decoding="async"
            />
          </div>
          <div className="case__body">
            <div className="case__main">
              <p className="case__meta micro"><span className="case__idx">02</span><span>Web Application</span></p>
              <h2 className="case__title" id="case-dollar-uae-title">Dollar UAE</h2>
              <p className="case__desc">
                A seamless car rental app for Dubai, letting users book, manage, and track rentals with ease.
              </p>
              <ul className="case__points" role="list">
                <li>
                  Led frontend development for Dollar and Thrifty car rental platforms serving 10K+ monthly users.
                </li>
                <li>
                  Shipped 5+ production features using TanStack Query, Zustand, and GitHub Actions CI/CD pipelines.
                </li>
              </ul>
            </div>
            <aside className="case__side">
              <dl className="case__facts">
                <div><dt>Year</dt><dd>2023</dd></div>
                <div><dt>Made at</dt><dd>Diffrenz Solutions</dd></div>
                <div>
                  <dt>Built with</dt>
                  <dd><ul role="list"><li>React</li><li>Redux</li><li>Node.js</li><li>MongoDB</li></ul></dd>
                </div>
                <div>
                  <dt>Also in the archive</dt>
                  <dd>
                    <a
                      className="link"
                      href="https://www.dollaruae.com/personal-leasing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dollar PL
                    </a>
                    , 2024
                  </dd>
                </div>
              </dl>
              <a className="btn btn--solid" href="https://dollaruae.com" target="_blank" rel="noopener noreferrer">
                <span>Live demo</span>
                <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
              </a>
            </aside>
          </div>
          <button className="case__next" type="button" data-case-next="thrifty">
            <span className="case__next-label micro">Next project</span>
            <span className="case__next-name">Thrifty</span>
            <svg className="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg>
          </button>
        </div>
      </dialog>

      <dialog
        className="case s-paper"
        id="case-thrifty"
        aria-labelledby="case-thrifty-title"
        style={{ "--hue": "#1f6fd6" } as React.CSSProperties}
        data-case-dialog="thrifty"
      >
        <button className="round-btn case__close" type="button" data-case-close="">
          <svg className="icon" aria-hidden="true"><use href="#i-x" /></svg>
          <span className="sr-only">Close case study</span>
        </button>
        <div className="case__panel" data-lenis-prevent="">
          <div className="case__media">
            <img
              className="case__img"
              loading="lazy"
              src="/assets/work/thrifty-1280.webp"
              srcSet="/assets/work/thrifty-1280.webp 1280w, /assets/work/thrifty-1920.webp 1920w"
              sizes="(min-width: 1212px) 1180px, 100vw"
              width="1920"
              height="1072"
              alt="Thrifty interface: vehicle cards, date picker, price breakdown and pickup map"
              decoding="async"
            />
          </div>
          <div className="case__body">
            <div className="case__main">
              <p className="case__meta micro"><span className="case__idx">03</span><span>Web Application</span></p>
              <h2 className="case__title" id="case-thrifty-title">Thrifty</h2>
              <p className="case__desc">
                A high-performance car rental booking platform in the UAE, featuring live fleet updates, pricing integrations, and seamless booking flows.
              </p>
              <ul className="case__points" role="list">
                <li>
                  Rebuilt legacy React platform to Next.js, improving SEO and page load speed through server-side rendering.
                </li>
                <li>Developed flexi-lease and subscription booking flows integrated with backend microservices.</li>
              </ul>
            </div>
            <aside className="case__side">
              <dl className="case__facts">
                <div><dt>Year</dt><dd>2024</dd></div>
                <div><dt>Made at</dt><dd>Diffrenz Solutions</dd></div>
                <div>
                  <dt>Built with</dt>
                  <dd>
                    <ul role="list">
                      <li>Next.js</li>
                      <li>Node.js</li>
                      <li>MongoDB</li>
                      <li>Shadcn UI</li>
                      <li>TanStack Query</li>
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Also in the archive</dt>
                  <dd>
                    <a className="link" href="https://pl.thriftyuae.com" target="_blank" rel="noopener noreferrer">
                      Thrifty PL
                    </a>
                    , 2024
                  </dd>
                </div>
              </dl>
              <a className="btn btn--solid" href="https://www.thriftyuae.com" target="_blank" rel="noopener noreferrer">
                <span>Live demo</span>
                <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
              </a>
            </aside>
          </div>
          <button className="case__next" type="button" data-case-next="pvs">
            <span className="case__next-label micro">Next project</span>
            <span className="case__next-name">PVS</span>
            <svg className="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg>
          </button>
        </div>
      </dialog>

      <dialog
        className="case s-paper"
        id="case-pvs"
        aria-labelledby="case-pvs-title"
        style={{ "--hue": "#12884c" } as React.CSSProperties}
        data-case-dialog="pvs"
      >
        <button className="round-btn case__close" type="button" data-case-close="">
          <svg className="icon" aria-hidden="true"><use href="#i-x" /></svg>
          <span className="sr-only">Close case study</span>
        </button>
        <div className="case__panel" data-lenis-prevent="">
          <div className="case__media">
            <img
              className="case__img"
              loading="lazy"
              src="/assets/work/pvs-1408.webp"
              srcSet="/assets/work/pvs-720.webp 720w, /assets/work/pvs-1408.webp 1408w"
              sizes="(min-width: 1212px) 1180px, 100vw"
              width="1408"
              height="768"
              alt="PVS dashboard: performance charts, balances and risk panels"
              decoding="async"
            />
          </div>
          <div className="case__body">
            <div className="case__main">
              <p className="case__meta micro"><span className="case__idx">04</span><span>Web Application</span></p>
              <h2 className="case__title" id="case-pvs-title">PVS</h2>
              <p className="case__desc">
                AI-powered data visualization tool for enterprise clients to process and interpret large datasets with predictive modeling.
              </p>
            </div>
            <aside className="case__side">
              <dl className="case__facts">
                <div><dt>Year</dt><dd>2025</dd></div>
                <div><dt>Made at</dt><dd>Diffrenz Solutions</dd></div>
                <div>
                  <dt>Built with</dt>
                  <dd><ul role="list"><li>Next.js</li><li>TypeScript</li><li>Antd</li></ul></dd>
                </div>
              </dl>
              <a
                className="btn btn--solid"
                href="https://pvscrm.tycanapps.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Live demo</span>
                <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
              </a>
            </aside>
          </div>
          <button className="case__next" type="button" data-case-next="dollar-uae">
            <span className="case__next-label micro">Next project</span>
            <span className="case__next-name">Dollar UAE</span>
            <svg className="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg>
          </button>
        </div>
      </dialog>
    </>
  );
}
