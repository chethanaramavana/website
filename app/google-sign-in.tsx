/** Google's unmodified pre-approved light pill button, PNG @4x. */
export default function GoogleSignIn({ href }: { href: string }) {
  return (
    <a className="google-sign-in" href={href}>
      <img
        src="/google-sign-in.png"
        width="180"
        height="40"
        alt="Sign in with Google"
      />
    </a>
  );
}
