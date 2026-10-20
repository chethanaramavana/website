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
      <span className="rmc-wordmark-stack">
        <img
          className="rmc-wordmark"
          src="/ramavana-wordmark.svg"
          width="320"
          height="44"
          alt="RAMAVANA"
        />
        <small>Mathematical Center</small>
      </span>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="rmc-footer rmc-container">
      <div className="rmc-footer-top">
        <div>
          <a className="rmc-footer-logo" href="/">
            <img
              src="/ramavana-paper-logo.png"
              width="120"
              height="120"
              alt="Ramavana Mathematical Centre"
            />
          </a>
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
        src="/ramavana-wordmark.svg"
        width="320"
        height="44"
        alt="RAMAVANA"
      />
      <small>© 2026 Ramavana Mathematical Centre</small>
    </footer>
  );
}
