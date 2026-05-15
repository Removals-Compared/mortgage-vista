import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author: string;
  readingTime: string;
  body: string; // raw markdown
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllPosts(): Promise<Post[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
        const { data, content } = matter(raw);
        const slug = file.replace(/\.(md|mdx)$/, "");
        return {
          slug,
          title: data.title as string,
          category: (data.category as string) ?? "Insights",
          date: data.date as string,
          excerpt: data.excerpt as string,
          author: (data.author as string) ?? "Mortgage Vista",
          readingTime: estimateReadingTime(content),
          body: content,
        } satisfies Post;
      }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getRecentPosts(n = 3) {
  return (await getAllPosts()).slice(0, n);
}

export async function renderMarkdown(md: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(md);
  return String(result);
}

function estimateReadingTime(text: string) {
  const words = text.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export const categories = [
  "Market Updates",
  "Buyer Guides",
  "Remortgaging",
  "Investment",
  "Self-Employed",
] as const;
