export default function Brand() {
  return (
    <a
      className="rmc-brand"
      href="/"
      aria-label="Ramavana Mathematical Centre home"
    >
      <img
        className="rmc-crest"
        src="/ramavana-crest-transparent.png"
        width="44"
        height="44"
        alt=""
      />
      <img
        className="rmc-wordmark"
        src="/ramavana-wordmark.png"
        width="320"
        height="44"
        alt="RAMAVANA"
      />
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="rmc-footer rmc-container">
      <div className="rmc-footer-top">
        <div>
          <strong>Ramavana Mathematical Centre</strong>
          <p>Run by professional mathematicians · Bengaluru</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/teacher">Teacher log in</a>
          <a href="/terms">Terms</a>
          <a href="/privacy-policy">Privacy</a>
        </nav>
      </div>
      <img
        className="rmc-footer-wordmark"
        src="/ramavana-wordmark.png"
        width="320"
        height="44"
        alt="RAMAVANA"
      />
      <small>© 2026 Ramavana Mathematical Centre</small>
    </footer>
  );
}
