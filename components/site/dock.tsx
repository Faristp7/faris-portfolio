/* Navigation lives in a small dock at the foot of the screen */
export function Dock() {
  return (
    <nav className="dock" aria-label="Sections" data-dock="">
      <a className="dock__home" href="#top" aria-label="Faris, back to top">Faris</a>
      <ol className="dock__index" role="list">
        <li><a href="#about"><span className="dock__n">01</span><span className="dock__t">About</span></a></li>
        <li><a href="#skills"><span className="dock__n">02</span><span className="dock__t">Skills</span></a></li>
        <li><a href="#projects"><span className="dock__n">03</span><span className="dock__t">Projects</span></a></li>
        <li>
          <a href="#experience"><span className="dock__n">04</span><span className="dock__t">Experience</span></a>
        </li>
        <li><a href="#resume"><span className="dock__n">05</span><span className="dock__t">Resume</span></a></li>
        <li><a href="#contact"><span className="dock__n">06</span><span className="dock__t">Contact</span></a></li>
      </ol>
      <button className="dock__menu" type="button" aria-haspopup="dialog" aria-controls="menu" data-open-menu="">
        Index
      </button>
      {" "}
      <span className="dock__time" aria-hidden="true"><span>Dubai, UAE</span><span data-clock="">--:--</span></span>
      {" "}
      {/* sound on or off; shown by the script, since without it there is no sound to switch */}
      {" "}
      <button className="dock__sound" type="button" aria-pressed="true" data-sound-toggle="" hidden>
        <span className="dock__bars" aria-hidden="true"><i /><i /><i /><i /></span>
        {" "}
        <span className="sr-only">Sound</span>
      </button>
      {" "}
      <button className="dock__cta" type="button" data-open-hello="">Say Hello</button>
      {" "}
      <span className="dock__progress" aria-hidden="true"><i data-progress="" /></span>
    </nav>
  );
}
