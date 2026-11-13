/* Title card: shown once per session while the page gets ready */
export function Loader() {
  return (
    <div className="loader" data-loader="" aria-hidden="true">
      <p className="loader__a micro">Faris — Portfolio</p>
      <p className="loader__b micro">(2026)</p>
      <p className="loader__count"><span data-loader-count="">0</span></p>
      <p className="loader__c micro">Full Stack Creative Developer</p>
    </div>
  );
}
