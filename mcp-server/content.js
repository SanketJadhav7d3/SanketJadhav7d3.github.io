import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// content root: the portfolio repo. inside the container everything lives at /app/content
const ROOT = process.env.CONTENT_ROOT || path.resolve(process.cwd(), "..");

function readCollection(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(abs, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title || f.replace(/\.md$/, ""),
        summary: data.summary || "",
        date: data.date ? new Date(data.date).toISOString().slice(0, 10) : null,
        tech: data.tech || [],
        repo: data.repo || null,
        url: data.permalink || null,
        body: content.trim(),
      };
    })
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function readJson(file) {
  const abs = path.join(ROOT, "_data", file);
  if (!fs.existsSync(abs)) return [];
  return JSON.parse(fs.readFileSync(abs, "utf8"));
}

// loaded once at boot — content is baked into the image, so it never changes at runtime
export const projects = readCollection("projects");
export const blogs = readCollection("blogs");
export const experience = readJson("experience.json");
export const education = readJson("education.json");

export function search(query) {
  const q = query.toLowerCase();
  const hits = [];
  for (const kind of [["project", projects], ["blog", blogs]]) {
    for (const item of kind[1]) {
      const hay = [item.title, item.summary, item.tech.join(" "), item.body].join(" ").toLowerCase();
      if (hay.includes(q)) {
        hits.push({ kind: kind[0], slug: item.slug, title: item.title, summary: item.summary, url: item.url });
      }
    }
  }
  return hits;
}
