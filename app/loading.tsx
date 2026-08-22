import { BrandMark } from "./components/BrandMark";

export default function Loading() {
  return <div className="site-loader" role="status"><BrandMark /><span className="visually-hidden">Loading BioPancrea</span></div>;
}
