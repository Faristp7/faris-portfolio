/* eslint-disable @next/next/no-img-element -- plain <img> keeps the static markup exactly */
import type React from "react";

/* 03 Projects: night. One project at a time, stacking as you go */
export function Projects() {
  return (
    <section
      className="chapter work room s-ink"
      id="projects"
      aria-labelledby="work-title"
      data-chapter="03"
      data-chapter-name="Projects"
    >
      <header className="tcard" data-flood="2">
        <div className="tcard__pin">
          <div className="wrap tcard__in">
            <p className="sec__label micro">
              <span className="dot-slot" aria-hidden="true"><span className="dot-anchor" data-dot="2" /></span>
              <span className="sec__num">03.</span>
              {" "}Selected Work
            </p>
            <h2 className="tcard__title" id="work-title" data-tcard-title="">Featured Projects</h2>
          </div>
        </div>
      </header>
      <div className="wrap chapter__body">
        <div className="opener">
          <ol className="toc" role="list">
            <li>
              <a className="toc__row" href="#project-dollar-uae">
                <span className="toc__n micro">02</span>
                <span className="toc__name">Dollar UAE</span>
                <span className="toc__type micro">Web Application</span>
                <span className="toc__year micro">2023</span>
              </a>
            </li>
            <li>
              <a className="toc__row" href="#project-thrifty">
                <span className="toc__n micro">03</span>
                <span className="toc__name">Thrifty</span>
                <span className="toc__type micro">Web Application</span>
                <span className="toc__year micro">2024</span>
              </a>
            </li>
            <li>
              <a className="toc__row" href="#project-pvs">
                <span className="toc__n micro">04</span>
                <span className="toc__name">PVS</span>
                <span className="toc__type micro">Web Application</span>
                <span className="toc__year micro">2025</span>
              </a>
            </li>
          </ol>
          <div className="film-wrap">
            <span className="dot-anchor film__dot" data-dot="3" aria-hidden="true" />
            <figure className="film" data-film="">
              {/* the still is an ordinary lazy image rather than a poster attribute, which would be
                 fetched with the page; the film is laid over it once it plays
              */}
              <img
                className="film__poster"
                src="/assets/film/rose-garden-poster-900.webp"
                srcSet="/assets/film/rose-garden-poster-480.webp 480w, /assets/film/rose-garden-poster-900.webp 900w"
                sizes="(min-width: 900px) 34vw, 92vw"
                width="900"
                height="1204"
                alt=""
                loading="lazy"
                decoding="async"
              />
              {" "}
              <video className="film__video" muted loop playsInline preload="none" tabIndex={-1} aria-hidden="true">
                <source data-src="/assets/film/rose-garden-720.webm" type="video/webm" />
                <source data-src="/assets/film/rose-garden-720.mp4" type="video/mp4" />
              </video>
              <figcaption className="film__cap">
                <span className="film__idx micro">01</span>
                <h3 className="film__title">Projects</h3>
              </figcaption>
              <button className="round-btn film__toggle" type="button" data-film-toggle="" hidden>
                <svg className="icon" aria-hidden="true"><use href="#i-pause" /></svg>
                <span className="sr-only" data-film-toggle-label="">Pause film</span>
              </button>
            </figure>
          </div>
        </div>
        <ol className="pstack" role="list">
          <li
            className="pcard"
            id="project-dollar-uae"
            data-case="dollar-uae"
            style={{ "--hue": "#ff5a67", "--i": "0" } as React.CSSProperties}
          >
            <article className="pcard__inner">
              <header className="pcard__bar micro">
                <span className="pcard__idx">02</span>
                <span>Web Application</span>
                {" "}
                <span className="pcard__gap" />
                {" "}
                <span>2023</span>
                <span className="pcard__at">Diffrenz Solutions</span>
              </header>
              <button
                className="pcard__media"
                type="button"
                aria-haspopup="dialog"
                aria-controls="case-dollar-uae"
                data-open-case=""
                data-cursor="Open case"
              >
                <img
                  className="pcard__img"
                  src="/assets/work/dollar-uae-1280.webp"
                  srcSet="/assets/work/dollar-uae-720.webp 720w, /assets/work/dollar-uae-1280.webp 1280w, /assets/work/dollar-uae-1920.webp 1920w"
                  sizes="(min-width: 900px) 60vw, 100vw"
                  width="1920"
                  height="1072"
                  alt="Dollar UAE"
                  loading="lazy"
                  decoding="async"
                />
                {" "}
                <span className="sr-only">Open case study: Dollar UAE</span>
              </button>
              <h3 className="pcard__title">Dollar UAE</h3>
              <div className="pcard__body">
                <p className="pcard__desc">
                  A seamless car rental app for Dubai, letting users book, manage, and track rentals with ease.
                </p>
                <ul className="pcard__tags micro" role="list">
                  <li>React</li>
                  <li>Redux</li>
                  <li>Node.js</li>
                  <li>MongoDB</li>
                </ul>
                <div className="pcard__actions">
                  <button
                    className="btn btn--solid"
                    type="button"
                    aria-haspopup="dialog"
                    aria-controls="case-dollar-uae"
                    data-open-case=""
                    data-magnetic=""
                  >
                    <span>Case study</span>
                    <svg className="icon" aria-hidden="true"><use href="#i-plus" /></svg>
                  </button>
                  {" "}
                  <a className="pcard__live" href="https://dollaruae.com" target="_blank" rel="noopener noreferrer">
                    dollaruae.com
                    <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                  </a>
                </div>
              </div>
            </article>
          </li>
          <li
            className="pcard"
            id="project-thrifty"
            data-case="thrifty"
            style={{ "--hue": "#5aa9ff", "--i": "1" } as React.CSSProperties}
          >
            <article className="pcard__inner">
              <header className="pcard__bar micro">
                <span className="pcard__idx">03</span>
                <span>Web Application</span>
                {" "}
                <span className="pcard__gap" />
                {" "}
                <span>2024</span>
                <span className="pcard__at">Diffrenz Solutions</span>
              </header>
              <button
                className="pcard__media"
                type="button"
                aria-haspopup="dialog"
                aria-controls="case-thrifty"
                data-open-case=""
                data-cursor="Open case"
              >
                <img
                  className="pcard__img"
                  src="/assets/work/thrifty-1280.webp"
                  srcSet="/assets/work/thrifty-720.webp 720w, /assets/work/thrifty-1280.webp 1280w, /assets/work/thrifty-1920.webp 1920w"
                  sizes="(min-width: 900px) 60vw, 100vw"
                  width="1920"
                  height="1072"
                  alt="Thrifty"
                  loading="lazy"
                  decoding="async"
                />
                {" "}
                <span className="sr-only">Open case study: Thrifty</span>
              </button>
              <h3 className="pcard__title">Thrifty</h3>
              <div className="pcard__body">
                <p className="pcard__desc">
                  A high-performance car rental booking platform in the UAE, featuring live fleet updates, pricing integrations, and seamless booking flows.
                </p>
                <ul className="pcard__tags micro" role="list">
                  <li>Node.js</li>
                  <li>MongoDB</li>
                  <li>Shadcn UI</li>
                  <li>TanStack Query</li>
                </ul>
                <div className="pcard__actions">
                  <button
                    className="btn btn--solid"
                    type="button"
                    aria-haspopup="dialog"
                    aria-controls="case-thrifty"
                    data-open-case=""
                    data-magnetic=""
                  >
                    <span>Case study</span>
                    <svg className="icon" aria-hidden="true"><use href="#i-plus" /></svg>
                  </button>
                  {" "}
                  <a className="pcard__live" href="https://www.thriftyuae.com" target="_blank" rel="noopener noreferrer">
                    thriftyuae.com
                    <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                  </a>
                </div>
              </div>
            </article>
          </li>
          <li
            className="pcard"
            id="project-pvs"
            data-case="pvs"
            style={{ "--hue": "#4be08f", "--i": "2" } as React.CSSProperties}
          >
            <article className="pcard__inner">
              <header className="pcard__bar micro">
                <span className="pcard__idx">04</span>
                <span>Web Application</span>
                {" "}
                <span className="pcard__gap" />
                {" "}
                <span>2025</span>
                <span className="pcard__at">Diffrenz Solutions</span>
              </header>
              <button
                className="pcard__media"
                type="button"
                aria-haspopup="dialog"
                aria-controls="case-pvs"
                data-open-case=""
                data-cursor="Open case"
              >
                <img
                  className="pcard__img"
                  src="/assets/work/pvs-1408.webp"
                  srcSet="/assets/work/pvs-720.webp 720w, /assets/work/pvs-1408.webp 1408w"
                  sizes="(min-width: 900px) 60vw, 100vw"
                  width="1408"
                  height="768"
                  alt="PVS"
                  loading="lazy"
                  decoding="async"
                />
                {" "}
                <span className="sr-only">Open case study: PVS</span>
              </button>
              <h3 className="pcard__title">PVS</h3>
              <div className="pcard__body">
                <p className="pcard__desc">
                  AI-powered data visualization tool for enterprise clients to process and interpret large datasets with predictive modeling.
                </p>
                <ul className="pcard__tags micro" role="list"><li>Next.js</li><li>TypeScript</li><li>Antd</li></ul>
                <div className="pcard__actions">
                  <button
                    className="btn btn--solid"
                    type="button"
                    aria-haspopup="dialog"
                    aria-controls="case-pvs"
                    data-open-case=""
                    data-magnetic=""
                  >
                    <span>Case study</span>
                    <svg className="icon" aria-hidden="true"><use href="#i-plus" /></svg>
                  </button>
                  {" "}
                  <a
                    className="pcard__live"
                    href="https://pvscrm.tycanapps.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pvscrm.tycanapps.com
                    <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                  </a>
                </div>
              </div>
            </article>
          </li>
        </ol>
        <button
          className="archive-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="archive"
          data-archive-toggle=""
        >
          <span className="archive-toggle__count micro">
            <span className="dot-slot" aria-hidden="true"><span className="dot-anchor" data-dot="3" /></span>
            <b>8</b>
            {" "}projects, 2021 to 2026
          </span>
          {" "}
          <span className="archive-toggle__label" data-archive-toggle-label="">View Full Project Archive</span>
          {" "}
          <svg className="icon" aria-hidden="true"><use href="#i-plus" /></svg>
        </button>
        {/* Archive: open by default without JS, collapsed and animated with it */}
        <div className="archive" id="archive" data-archive="">
          <div className="archive__clip">
            <div className="archive__inner">
              <header className="archive__head">
                <div>
                  <h3 className="archive__title">Project Archive</h3>
                  <p className="archive__sub">A complete list of things I’ve worked on.</p>
                </div>
                <label className="search">
                  <svg className="icon" aria-hidden="true"><use href="#i-search" /></svg>
                  {" "}
                  <span className="sr-only">Search projects</span>
                  {" "}
                  <input
                    type="search"
                    placeholder="Search projects..."
                    autoComplete="off"
                    spellCheck="false"
                    data-archive-search=""
                  />
                </label>
              </header>
              <table className="atable" role="table">
                <thead role="rowgroup">
                  <tr role="row">
                    <th role="columnheader" scope="col">Year</th>
                    <th role="columnheader" scope="col">Project</th>
                    <th role="columnheader" scope="col">Made at</th>
                    <th role="columnheader" scope="col">Built with</th>
                    <th role="columnheader" scope="col">Link</th>
                  </tr>
                </thead>
                <tbody role="rowgroup" data-archive-rows="">
                  <tr role="row">
                    <td role="cell" className="atable__year">2026</td>
                    <th role="rowheader" scope="row" className="atable__name">pazhayidom</th>
                    <td role="cell" className="atable__at">Freelance</td>
                    <td role="cell" className="atable__with">
                      <ul role="list"><li>Next.js</li><li>TypeScript</li><li>Framer motion</li></ul>
                    </td>
                    <td role="cell" className="atable__link">
                      <a
                        href="https://pazhayidom.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo: pazhayidom"
                      >
                        <span>pazhayidom.com</span>
                        <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                      </a>
                    </td>
                  </tr>
                  <tr role="row">
                    <td role="cell" className="atable__year">2026</td>
                    <th role="rowheader" scope="row" className="atable__name">builtii</th>
                    <td role="cell" className="atable__at">Freelance</td>
                    <td role="cell" className="atable__with">
                      <ul role="list"><li>Next.js</li><li>TypeScript</li><li>Framer motion</li></ul>
                    </td>
                    <td role="cell" className="atable__link">
                      <a
                        href="https://builtii.ftslab.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo: builtii"
                      >
                        <span>builtii.ftslab.in</span>
                        <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                      </a>
                    </td>
                  </tr>
                  <tr role="row">
                    <td role="cell" className="atable__year">2025</td>
                    <th role="rowheader" scope="row" className="atable__name">PVS</th>
                    <td role="cell" className="atable__at">Diffrenz Solutions</td>
                    <td role="cell" className="atable__with">
                      <ul role="list"><li>Next.js</li><li>TypeScript</li><li>Antd</li></ul>
                    </td>
                    <td role="cell" className="atable__link">
                      <a
                        href="https://pvscrm.tycanapps.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo: PVS"
                      >
                        <span>pvscrm.tycanapps.com</span>
                        <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                      </a>
                    </td>
                  </tr>
                  <tr role="row">
                    <td role="cell" className="atable__year">2024</td>
                    <th role="rowheader" scope="row" className="atable__name">Thrifty UAE</th>
                    <td role="cell" className="atable__at">Diffrenz Solutions</td>
                    <td role="cell" className="atable__with">
                      <ul role="list"><li>Next.js</li><li>Shadcn UI</li><li>TanStack Query</li></ul>
                    </td>
                    <td role="cell" className="atable__link">
                      <a
                        href="https://www.thriftyuae.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo: Thrifty UAE"
                      >
                        <span>thriftyuae.com</span>
                        <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                      </a>
                    </td>
                  </tr>
                  <tr role="row">
                    <td role="cell" className="atable__year">2024</td>
                    <th role="rowheader" scope="row" className="atable__name">Thrifty PL</th>
                    <td role="cell" className="atable__at">Diffrenz Solutions</td>
                    <td role="cell" className="atable__with">
                      <ul role="list"><li>React</li><li>TanStack Query</li><li>Zustand</li></ul>
                    </td>
                    <td role="cell" className="atable__link">
                      <a
                        href="https://pl.thriftyuae.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo: Thrifty PL"
                      >
                        <span>pl.thriftyuae.com</span>
                        <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                      </a>
                    </td>
                  </tr>
                  <tr role="row">
                    <td role="cell" className="atable__year">2024</td>
                    <th role="rowheader" scope="row" className="atable__name">Dollar PL</th>
                    <td role="cell" className="atable__at">Diffrenz Solutions</td>
                    <td role="cell" className="atable__with">
                      <ul role="list"><li>React</li><li>TanStack Query</li><li>Zustand</li></ul>
                    </td>
                    <td role="cell" className="atable__link">
                      <a
                        href="https://www.dollaruae.com/personal-leasing"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo: Dollar PL"
                      >
                        <span>dollaruae.com/personal-leasing</span>
                        <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                      </a>
                    </td>
                  </tr>
                  <tr role="row">
                    <td role="cell" className="atable__year">2023</td>
                    <th role="rowheader" scope="row" className="atable__name">Dollar UAE</th>
                    <td role="cell" className="atable__at">Diffrenz Solutions</td>
                    <td role="cell" className="atable__with">
                      <ul role="list"><li>React</li><li>Redux</li><li>Node.js</li><li>MongoDB</li></ul>
                    </td>
                    <td role="cell" className="atable__link">
                      <a
                        href="https://dollaruae.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo: Dollar UAE"
                      >
                        <span>dollaruae.com</span>
                        <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
                      </a>
                    </td>
                  </tr>
                  <tr role="row">
                    <td role="cell" className="atable__year">2021</td>
                    <th role="rowheader" scope="row" className="atable__name">Audio</th>
                    <td role="cell" className="atable__at">Freelance</td>
                    <td role="cell" className="atable__with">
                      <ul role="list"><li>React</li><li>Redux</li><li>Node.js</li><li>MongoDB</li></ul>
                    </td>
                    <td role="cell" className="atable__link">
                      <a
                        href="https://github.com/Faristp7/Audio"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository: Audio"
                      >
                        <span>github.com/Faristp7/Audio</span>
                        <svg className="icon" aria-hidden="true"><use href="#i-github" /></svg>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="archive__empty" data-archive-empty="" hidden>
                No projects found matching &quot;
                <span data-archive-query="" />
                &quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
