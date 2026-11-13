/* eslint-disable @next/next/no-img-element -- plain <img> keeps the static markup exactly */
import type React from "react";

/* The opening, and 01 About, as one scene.
   At rest it is the title: the name set whole, him beside it, and the dot where the dot of an
   i belongs. Scrolling plays the rest (lib/experience): the dot leaves the i and comes to rest
   behind his head, the name sinks away, and the introduction is read in beside him.
   Without the script, with reduced motion, or on a screen too short to hold it, the same
   markup is simply a title followed by a section.
*/
export function Scene() {
  return (
    <section className="scene room s-mist" id="top" aria-labelledby="hero-title" data-scene="">
      <div className="scene__pin">
        <div className="scene__hero">
          <p className="scene__cap scene__cap--a micro">Faris — Portfolio</p>
          <p className="scene__cap scene__cap--b micro">(2026)</p>
          <h1 className="sr-only" id="hero-title">Faris</h1>
          {/* the name as drawn (the heading above carries it for assistive tech); its i is set
             without a dot, because the dot is the one that travels
          */}
          <div className="scene__name">
            <p className="scene__mark" aria-hidden="true">
              <span className="scene__word">
                <span className="ch" style={{ "--n": "0" } as React.CSSProperties}>F</span>
                <span className="ch" style={{ "--n": "1" } as React.CSSProperties}>a</span>
                <span className="ch" style={{ "--n": "2" } as React.CSSProperties}>r</span>
                <span className="ch scene__i" style={{ "--n": "3" } as React.CSSProperties}>ı</span>
                <span className="ch" style={{ "--n": "4" } as React.CSSProperties}>s</span>
              </span>
            </p>
            <a className="scene__start" href="#about" data-glide="">
              <span className="scene__hint micro">Follow the dot</span>
              <span className="dot-anchor scene__tittle" data-dot="1" data-dot-pre="" aria-hidden="true" />
            </a>
          </div>
          <div className="scene__intro">
            <p className="scene__note">
              I&apos;m Faris, a Full Stack Creative Developer crafting digital experiences with a focus on motion, aesthetic precision, and performant code.
            </p>
            <div className="scene__actions">
              <a className="btn btn--solid" href="#projects" data-magnetic="">
                <span>View Projects</span>
                <svg className="icon" aria-hidden="true"><use href="#i-arrow-down" /></svg>
              </a>
              {" "}
              <a className="btn btn--line" href="/resume.pdf" target="_blank" rel="noopener noreferrer" data-magnetic="">
                <svg className="icon" aria-hidden="true"><use href="#i-download" /></svg>
                <span>Resume</span>
              </a>
            </div>
          </div>
          <ul className="scene__social micro" role="list">
            <li><a href="https://github.com/faristp7" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li>
              <a href="https://www.linkedin.com/in/faris-tp" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
            <li>
              <a href="https://www.instagram.com/faris_tp_" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li><a href="https://x.com/faristp07" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
          {/* figure: its box in the layout; shift: moved by the scene; lean: moved by the pointer;
             body: the photograph's own box. Each kind of movement has an element to itself.
          */}
          <div className="scene__figure">
            <div className="scene__shift" data-figure-shift="">
              <div className="scene__lean" data-figure-lean="">
                <div className="scene__body">
                  <span className="dot-anchor scene__halo" data-dot="1" aria-hidden="true" />
                  {" "}
                  <img
                    className="scene__img"
                    src="/assets/portrait/faris-1086.webp"
                    srcSet="/assets/portrait/faris-720.webp 720w, /assets/portrait/faris-1086.webp 1086w"
                    sizes="(min-width: 560px) and (min-height: 340px) and (min-aspect-ratio: 5/4) 68vh, 116vw"
                    width="1086"
                    height="1448"
                    alt="Faris, standing in a black suit and white shirt"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section
          className="scene__about"
          id="about"
          aria-labelledby="about-title"
          data-chapter="01"
          data-chapter-name="About"
        >
          <div className="about__in">
            <p className="sec__label micro"><span className="sec__num">01.</span> About</p>
            <h2 className="about__statement" id="about-title" data-scrub-words="">
              I am Faris, a self-taught full-stack developer. I build scalable web applications, craft intuitive user experiences, and turn complex ideas into products.
            </h2>
            <p className="about__lede">
              Over the last 2+ years, I&apos;ve worked on real-world products across automotive, chemical, and eCommerce domains. My focus is building fast, scalable, and accessible digital experiences using React, Next.js, Node.js, TypeScript, PostgreSQL, and modern cloud technologies.
            </p>
          </div>
        </section>
      </div>
      {/* marks the part of the scene's scroll that belongs to About, for the dock */}
      <span className="scene__spy" data-spy-for="about" aria-hidden="true" />
    </section>
  );
}
