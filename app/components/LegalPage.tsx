import type { ReactNode } from "react";

export function LegalPage({ title, intro, children, updated = "August 2026" }: { title: string; intro: string; children: ReactNode; updated?: string }) {
  return <main className="legal-page container"><header><p className="eyebrow"><span>Legal</span>BioPancrea</p><h1>{title}</h1><p>{intro}</p><span>Last updated: {updated}</span></header><article>{children}</article><aside>This website provides general corporate and educational information only and does not provide medical advice.</aside></main>;
}
