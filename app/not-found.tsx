/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation is required for reliable routing on the public Sites host. */

import { OrganicField } from "./components/OrganicField";

export default function NotFound() {
  return <main className="not-found"><div><p className="eyebrow"><span>404</span>Page not found</p><h1>This path is still taking shape.</h1><p>The page you’re looking for is not available.</p><a className="button button-dark" href="/">Return home <span aria-hidden="true">↗</span></a></div><OrganicField /></main>;
}
