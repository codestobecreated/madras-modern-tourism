import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import { allPosts } from "../home/include/catalog";
import { container, cx, section } from "../home/include/ui";
import PostCard from "./include/post-card";
import NewsSidebar from "./include/news-sidebar";

export const metadata: Metadata = {
  title: "Latest News | Madras Modern Tourism",
};

export default function NewsPage() {
  return (
    <SiteShell current="/news" title="Latest News">
      <section className={section}>
        <div className={cx(container, "grid grid-cols-[minmax(0,1fr)_360px] gap-[40px] max1024:grid-cols-[1fr]")}>
          <div className="grid grid-cols-[1fr_1fr] gap-[28px] content-start max767:grid-cols-[1fr]">
            {allPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <NewsSidebar />
        </div>
      </section>
    </SiteShell>
  );
}
