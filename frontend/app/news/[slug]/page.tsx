import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "../../home/include/site-shell";
import { allPosts, findPost } from "../../home/include/catalog";
import { container, cx, section } from "../../home/include/ui";
import NewsSidebar from "../include/news-sidebar";
import Article from "./include/article";
import PostNav from "./include/post-nav";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPost((await params).slug);
  return {
    title: `${post ? post.title : "Article not found"} | Madras Modern Tourism`,
    description: post?.excerpt,
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const i = allPosts.indexOf(post);
  return (
    <SiteShell current="/news" title={post.title}>
      <section className={section}>
        <div className={cx(container, "grid grid-cols-[minmax(0,1fr)_360px] gap-[40px] max1024:grid-cols-[1fr]")}>
          <div>
            <Article post={post} />
            <PostNav prev={allPosts[i - 1]} next={allPosts[i + 1]} />
          </div>
          <NewsSidebar exclude={post.slug} />
        </div>
      </section>
    </SiteShell>
  );
}
