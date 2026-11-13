/* 05 Resume */
export function Resume() {
  return (
    <section
      className="resume room s-paper"
      id="resume"
      aria-labelledby="resume-title"
      data-chapter="05"
      data-chapter-name="Resume"
    >
      <div className="wrap">
        <p className="sec__label micro"><span className="sec__num">05.</span> Resume</p>
        <h2 className="h2" id="resume-title" data-reveal="">Download My CV</h2>
        <div className="sheet-wrap">
          <span className="dot-anchor sheet__dot" data-dot="4" aria-hidden="true" />
          <article className="sheet s-ink" data-sheet="">
            <header className="sheet__head micro">
              <p className="sheet__kind">Curriculum Vitae</p>
              <p className="sheet__ext">.pdf</p>
            </header>
            <h3 className="sheet__title">Faris — Full Stack Developer</h3>
            <p className="sheet__text">
              2+ years of full-stack experience building production-grade web applications for clients across Dubai. Specialized in React, Next.js, Node.js, and TypeScript.
            </p>
            <dl className="sheet__facts">
              <div><dt>Years Experience</dt><dd data-count="2" data-suffix="+">2+</dd></div>
              <div><dt>Projects Shipped</dt><dd data-count="5" data-suffix="+">5+</dd></div>
              <div><dt>Technologies</dt><dd data-count="15" data-suffix="+">15+</dd></div>
            </dl>
            <div className="sheet__actions">
              <a
                className="btn btn--solid"
                href="/resume.pdf"
                download="Faris-Full-Stack-Developer.pdf"
                data-magnetic=""
              >
                <svg className="icon" aria-hidden="true"><use href="#i-download" /></svg>
                <span>Download PDF</span>
              </a>
              {" "}
              <a className="btn btn--line" href="/resume.pdf" target="_blank" rel="noopener noreferrer" data-magnetic="">
                <span>View Online</span>
                <svg className="icon" aria-hidden="true"><use href="#i-arrow-ur" /></svg>
              </a>
            </div>
          </article>
        </div>
      </div>
      <div className="marquee" aria-hidden="true" data-marquee="">
        <div className="marquee__track">
          <span className="marquee__item">What&apos;s Next?<i /></span>
          {" "}
          <span className="marquee__item">What&apos;s Next?<i /></span>
        </div>
      </div>
    </section>
  );
}
