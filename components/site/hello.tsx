/* Say Hello */
export function Hello() {
  return (
    <dialog
      className="hello s-paper"
      id="hello"
      aria-labelledby="hello-title"
      aria-describedby="hello-desc"
      data-lenis-prevent=""
    >
      <form className="hello__form" noValidate data-hello-form="">
        <button className="round-btn hello__close" type="button" data-close-hello="">
          <svg className="icon" aria-hidden="true"><use href="#i-x" /></svg>
          <span className="sr-only">Close</span>
        </button>
        <header className="hello__head">
          <h2 className="hello__title" id="hello-title">Say Hello</h2>
          <p className="hello__desc" id="hello-desc">
            Have a project in mind? Fill out the form below to send me a message directly.
          </p>
        </header>
        <div className="hello__pair">
          <div className="field">
            <label htmlFor="f-name">Name</label>
            {" "}
            <input
              id="f-name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              required
              minLength={2}
              aria-describedby="e-name"
            />
            <p className="field__error" id="e-name" aria-live="polite" />
          </div>
          <div className="field">
            <label htmlFor="f-email">Email</label>
            {" "}
            <input
              id="f-email"
              name="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              inputMode="email"
              required
              aria-describedby="e-email"
            />
            <p className="field__error" id="e-email" aria-live="polite" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-message">Message</label>
          {" "}
          <textarea
            id="f-message"
            name="message"
            rows={4}
            placeholder="Tell me about your project..."
            required
            minLength={10}
            aria-describedby="e-message"
          />
          <p className="field__error" id="e-message" aria-live="polite" />
        </div>
        <div className="field field--trap" aria-hidden="true">
          <label htmlFor="f-company">Company</label>
          {" "}
          <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <p className="hello__status" data-hello-status="" role="alert" />
        <button className="btn btn--solid hello__send" type="submit">
          <span data-hello-send="">Send Message</span>
          <svg className="icon" aria-hidden="true"><use href="#i-send" /></svg>
        </button>
      </form>
    </dialog>
  );
}
