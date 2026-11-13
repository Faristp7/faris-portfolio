/* 06 Contact: the last room */
export function Contact() {
  return (
    <section
      className="chapter contact room s-cobalt"
      id="contact"
      aria-labelledby="contact-title"
      data-chapter="06"
      data-chapter-name="Contact"
    >
      <div className="tcard tcard--contact" data-flood="4">
        <div className="tcard__pin">
          <div className="wrap tcard__in">
            <p className="sec__label micro">
              <span className="dot-slot" aria-hidden="true"><span className="dot-anchor" data-dot="4" /></span>
              <span className="sec__num">06.</span>
              {" "}What&apos;s Next?
            </p>
            <h2 className="tcard__title contact__title" id="contact-title" data-tcard-title="">
              Let&apos;s work together.
            </h2>
            <div className="contact__row" data-tcard-rest="">
              <p className="contact__text">
                I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
              <div className="contact__actions">
                <button className="btn btn--solid" type="button" data-open-hello="" data-magnetic="">
                  <svg className="icon" aria-hidden="true"><use href="#i-send" /></svg>
                  <span>Say Hello</span>
                </button>
                {" "}
                <button className="btn btn--line" type="button" data-schedule="" data-magnetic="">
                  <svg className="icon" aria-hidden="true"><use href="#i-calendar" /></svg>
                  <span>Schedule a Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
