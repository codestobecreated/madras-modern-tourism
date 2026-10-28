import "../home.css";
import Header from "./header";
import PageBanner from "./page-banner";
import Footer from "./footer";
import BackToTop from "./back-to-top";
import RevealOnScroll from "./reveal-on-scroll";

/**
 * Wrapper for inner pages: header (with `current` nav item highlighted), optional title banner,
 * the page sections, footer and the shared scroll helpers.
 */
export default function SiteShell({ current, title, children }: { current: string; title?: string; children: React.ReactNode }) {
  return (
    <div className="mmt w-full overflow-x-hidden bg-white font-jakarta text-[16px] leading-[1.8] text-body">
      <Header current={current} />
      <main>
        {title && <PageBanner title={title} />}
        {children}
      </main>
      <Footer />
      <BackToTop />
      <RevealOnScroll />
    </div>
  );
}
