/* 04 Experience: day */
export function ExperienceChapter() {
  return (
    <section
      className="chapter experience room s-paper"
      id="experience"
      aria-labelledby="exp-title"
      data-chapter="04"
      data-chapter-name="Experience"
    >
      <header className="tcard" data-flood="3">
        <div className="tcard__pin">
          <div className="wrap tcard__in">
            <p className="sec__label micro">
              <span className="dot-slot" aria-hidden="true"><span className="dot-anchor" data-dot="3" /></span>
              <span className="sec__num">04.</span>
              {" "}Experience
            </p>
            <h2 className="tcard__title" id="exp-title" data-tcard-title="">Where I&apos;ve Worked</h2>
          </div>
        </div>
      </header>
      <div className="wrap chapter__body">
        <ol className="timeline" role="list" data-timeline="">
          <li className="role" data-role="">
            <p className="role__period micro">2025 — Present</p>
            <span className="role__node" aria-hidden="true"><span className="dot-anchor" data-dot="4" /></span>
            <div className="role__body">
              <h3 className="role__head">
                <span className="role__company">Accore Labs</span>
                {" "}
                <span className="role__title">Full Stack Developer</span>
              </h3>
              <p className="role__desc">
                Building a high-performance financial analytics platform for enterprise clients in Dubai.
              </p>
            </div>
          </li>
          <li className="role" data-role="">
            <p className="role__period micro">2023 — 2025</p>
            <span className="role__node" aria-hidden="true"><span className="dot-anchor" data-dot="4" /></span>
            <div className="role__body">
              <h3 className="role__head">
                <span className="role__company">Diffrenz Business Solutions</span>
                {" "}
                <span className="role__title">Full Stack Developer</span>
              </h3>
              <p className="role__desc">
                Engineered a scalable car rental booking platform serving users across Dubai.
              </p>
            </div>
          </li>
          <li className="role" data-role="">
            <p className="role__period micro">2021 — 2023</p>
            <span className="role__node" aria-hidden="true"><span className="dot-anchor" data-dot="4" /></span>
            <div className="role__body">
              <h3 className="role__head">
                <span className="role__company">Freelancer</span>
                {" "}
                <span className="role__title">Full Stack Developer</span>
              </h3>
              <p className="role__desc">
                Delivered full-stack solutions end-to-end, modernized legacy systems, and shipped refined UI/UX experiences.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
