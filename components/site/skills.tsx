/* 02 Skills: the dot becomes the room, and the stack is drawn on it like a blueprint */
export function Skills() {
  return (
    <section
      className="chapter skills room s-cobalt"
      id="skills"
      aria-labelledby="skills-title"
      data-chapter="02"
      data-chapter-name="Skills"
    >
      <header className="tcard" data-flood="1">
        <div className="tcard__pin">
          <div className="wrap tcard__in">
            <p className="sec__label micro">
              <span className="dot-slot" aria-hidden="true"><span className="dot-anchor" data-dot="1" /></span>
              <span className="sec__num">02.</span>
              {" "}My Arsenal
            </p>
            <h2 className="tcard__title" id="skills-title" data-tcard-title="">Technologies I work with</h2>
          </div>
        </div>
      </header>
      <div className="wrap chapter__body">
        <div className="stack" data-stack="">
          <div className="stack__figure" aria-hidden="true">
            <span className="dot-anchor stack__dot" data-dot="2" />
            {" "}
            <svg className="stack__svg" viewBox="0 0 400 500" fill="none">
              <g className="stack__guides"><path d="M30.3 110V390M369.7 110V390M200 205V485M200-64V60" /></g>
              <g className="plane" data-plane="tools" transform="translate(200 390)">
                <g transform="scale(1 .56) rotate(45)">
                  <rect className="plane__side" x="-108" y="-108" width="240" height="240" rx="30" />
                  <rect className="plane__top" x="-120" y="-120" width="240" height="240" rx="30" />
                  <g className="plane__glyph">
                    <path d="M-42-52V52M-42 20C-42-14 44 14 44-22" />
                    <circle cx="-42" cy="-62" r="10" />
                    <circle cx="-42" cy="62" r="10" />
                    <circle cx="44" cy="-32" r="10" />
                  </g>
                </g>
              </g>
              <g className="plane" data-plane="backend" transform="translate(200 250)">
                <g transform="scale(1 .56) rotate(45)">
                  <rect className="plane__side" x="-108" y="-108" width="240" height="240" rx="30" />
                  <rect className="plane__top" x="-120" y="-120" width="240" height="240" rx="30" />
                  <g className="plane__glyph">
                    <rect x="-70" y="-70" width="140" height="140" rx="12" />
                    <path d="M-70-30H70M-44-6-22 12-44 30M-6 34H30" />
                  </g>
                </g>
              </g>
              <g className="plane" data-plane="frontend" transform="translate(200 110)">
                <g transform="scale(1 .56) rotate(45)">
                  <rect className="plane__side" x="-108" y="-108" width="240" height="240" rx="30" />
                  <rect className="plane__top" x="-120" y="-120" width="240" height="240" rx="30" />
                  <g className="plane__glyph">
                    <rect x="-70" y="-70" width="140" height="140" rx="12" />
                    <path d="M-70-30H70M-26-30V70" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div className="stack__groups">
            <section className="group" data-group="frontend" aria-labelledby="g-frontend">
              <header className="group__head">
                <svg className="group__glyph" viewBox="0 0 24 32" aria-hidden="true">
                  <path d="M12 19 22 25 12 31 2 25z" />
                  <path d="M12 10 22 16 12 22 2 16z" />
                  <path className="on" d="M12 1 22 7 12 13 2 7z" />
                </svg>
                <h3 className="group__title" id="g-frontend">Frontend</h3>
              </header>
              <ul className="group__list" role="list">
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Next.js</li>
                <li>Framer Motion</li>
                <li>TanStack Query</li>
              </ul>
            </section>
            <section className="group" data-group="backend" aria-labelledby="g-backend">
              <header className="group__head">
                <svg className="group__glyph" viewBox="0 0 24 32" aria-hidden="true">
                  <path d="M12 19 22 25 12 31 2 25z" />
                  <path className="on" d="M12 10 22 16 12 22 2 16z" />
                  <path d="M12 1 22 7 12 13 2 7z" />
                </svg>
                <h3 className="group__title" id="g-backend">Backend</h3>
              </header>
              <ul className="group__list" role="list">
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>Rest API</li>
                <li>Socket.io</li>
                <li>Redis</li>
              </ul>
            </section>
            <section className="group" data-group="tools" aria-labelledby="g-tools">
              <header className="group__head">
                <svg className="group__glyph" viewBox="0 0 24 32" aria-hidden="true">
                  <path className="on" d="M12 19 22 25 12 31 2 25z" />
                  <path d="M12 10 22 16 12 22 2 16z" />
                  <path d="M12 1 22 7 12 13 2 7z" />
                </svg>
                <h3 className="group__title" id="g-tools">Tools &amp; DevOps</h3>
              </header>
              <ul className="group__list" role="list">
                <li>Git</li>
                <li>Docker</li>
                <li>AWS</li>
                <li>Vercel</li>
                <li>Figma</li>
                <li>Postman</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
