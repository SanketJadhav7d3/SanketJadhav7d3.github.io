---
title: "portfolio mcp server"
date: 2026-08-21
layout: project.njk        # directly in _includes/
summary: "an mcp server that lets any llm read this portfolio as structured data"
tech:
  - mcp
  - node.js
  - express
  - docker
  - google cloud run
cover: /assets/videos/portfolio-mcp.mp4
permalink: /projects/portfolio-mcp/
repo: https://github.com/SanketJadhav7d3/SanketJadhav7d3.github.io/tree/main/mcp-server
---

# 🔌 portfolio mcp server

this site talks to language models. not through a scraper or a copy-pasted résumé — through a real [model context protocol](https://modelcontextprotocol.io) server that exposes the portfolio as **callable tools**.

point any mcp client at it and ask "what has sanket built with langgraph?" — the model calls a tool, gets structured json back, and answers from the actual content of this site.

live at `https://portfolio-mcp-7980055254.europe-west1.run.app/mcp`

## 🧰 the tools

| tool | what it returns |
|---|---|
| `list_projects` | every project with summary, tech stack, repo, url |
| `get_project` | the full write-up for one slug |
| `search_portfolio` | full-text matches across projects and blogs |
| `get_profile` | experience, education, blog index |

## 🏗 how it reads the site

there's no database and no api call. the server reads **the same markdown files that build this page**.

at docker build time, `projects/`, `blogs/`, and `_data/` are copied into the image. on boot, every `.md` goes through `gray-matter` once — frontmatter split from body — into a plain in-memory array. after that, requests touch no filesystem at all.

the tradeoff is deliberate: **adding a project means redeploying.** in exchange the container is genuinely stateless, which is what lets it scale to zero.

## ⚡ stateless by design

the mcp streamable http transport supports long-lived sessions. this server deliberately doesn't use them:

```js
// a fresh server + transport per request, so cloud run can scale
// to zero and any instance can serve any request
app.post("/mcp", async (req, res) => {
  const server = buildServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  ...
});
```

session affinity would mean a request has to reach the same instance that started the conversation. for a read-only server over a few hundred kilobytes of markdown, that constraint buys nothing and costs the ability to idle at zero instances. a portfolio that nobody is currently reading should cost nothing to run.

## ☁️ deployment

a single `Dockerfile` at the repo root, deployed straight from source:

```bash
gcloud run deploy portfolio-mcp --source . --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars ALLOWED_ORIGIN=https://sanketjadhav7d3.github.io
```

cors is pinned to this site's origin rather than left open, and `/health` reports the parsed project count — so a bad deploy that ships an empty image is visible immediately instead of silently returning nothing.

## 🔭 what's next

a small chat backend holding the anthropic api key, so the widget on this site can use these tools directly. the key can't live in the browser, so the server that holds it is the missing piece — the mcp layer underneath it is already done.
