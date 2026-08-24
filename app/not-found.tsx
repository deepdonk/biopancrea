import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><div><p className="eyebrow"><span>404</span>Page not found</p><h1>This path is still taking shape.</h1><p>The page you’re looking for is not available.</p><Link className="button button-dark" href="/">Return home <span aria-hidden="true">↗</span></Link></div><div className="not-found-plane" aria-hidden="true" /></main>;
}
