export function Menu() {
  return (
    <dialog className="menu s-paper" id="menu" aria-label="Index" data-lenis-prevent="">
      <div className="menu__bar">
        <span className="menu__name">Faris</span>
        {" "}
        <button className="menu__close" type="button" data-close-menu="">Close</button>
      </div>
      <nav className="menu__links" aria-label="Sections">
        <a href="#about"><span><i>01</i>About</span></a>
        {" "}
        <a href="#skills"><span><i>02</i>Skills</span></a>
        {" "}
        <a href="#projects"><span><i>03</i>Projects</span></a>
        {" "}
        <a href="#experience"><span><i>04</i>Experience</span></a>
        {" "}
        <a href="#resume"><span><i>05</i>Resume</span></a>
        {" "}
        <a href="#contact"><span><i>06</i>Contact</span></a>
      </nav>
      <ul className="menu__social" role="list">
        <li><a href="https://github.com/faristp7" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/faris-tp" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://www.instagram.com/faris_tp_" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://x.com/faristp07" target="_blank" rel="noopener noreferrer">Twitter</a></li>
      </ul>
    </dialog>
  );
}
