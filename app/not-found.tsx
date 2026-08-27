/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation is required for reliable routing on the public Sites host. */

import { PlatformModel } from "./components/PlatformModel";

export default function NotFound() {
  return (
    <main className="not-found not-found-branded">
      <div>
        <p className="eyebrow"><span>404</span>Page not found</p>
        <h1>Nothing here.</h1>
        <p>The page you’re looking for doesn’t exist.</p>
        <a className="button button-dark" href="/">Return home</a>
      </div>
      <figure className="not-found-lattice" aria-label="An incomplete vascular stent lattice">
        <PlatformModel id="not-found-platform" title="Incomplete vascular stent lattice" description="A simplified stent lattice with one section missing." />
      </figure>
    </main>
  );
}
