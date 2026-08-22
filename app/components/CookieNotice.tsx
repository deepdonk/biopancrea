"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const storageKey = "biopancrea-cookie-notice";

export function CookieNotice() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <div><p>Essential storage only</p><span>We use device storage only to remember this preference. No advertising or analytics cookies are currently used.</span></div>
      <Link href="/cookies">Review policy</Link>
      <button type="button" onClick={() => { localStorage.setItem(storageKey, "acknowledged"); window.dispatchEvent(new Event(storageKey)); }}>Acknowledge</button>
    </aside>
  );
}

function subscribe(callback: () => void) {
  window.addEventListener(storageKey, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(storageKey, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(storageKey) !== "acknowledged";
}
