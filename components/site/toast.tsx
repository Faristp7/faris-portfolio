export function Toast() {
  return (
    <div className="toast" data-toast="" role="status" aria-live="polite" hidden>
      <i className="toast__dot" aria-hidden="true" />
      <div><p className="toast__title" data-toast-title="" /><p className="toast__text" data-toast-text="" /></div>
    </div>
  );
}
