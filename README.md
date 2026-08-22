# Portfolio MCP Demo

My portfolio, plus an [MCP](https://modelcontextprotocol.io) server that exposes it as
callable tools — so a language model can answer questions about my work by reading the
same markdown files that build the site, rather than scraping the rendered pages.

https://github.com/user-attachments/assets/faa67c59-12ae-4291-83c7-6d9085f6af06

## Tools

| Tool | Returns |
| --- | --- |
| `list_projects` | Every project with its summary, tech stack, repo and URL |
| `get_project` | The full write-up for one project, by slug |
| `search_portfolio` | Full-text matches across project and blog content |
| `get_profile` | Experience, education, and the blog index |

Live at `https://portfolio-mcp-7980055254.europe-west1.run.app/mcp` (Streamable HTTP).
Add it to Claude Code with:

```bash
claude mcp add --transport http portfolio https://portfolio-mcp-7980055254.europe-west1.run.app/mcp
```

Server source and deployment notes: [`mcp-server/`](mcp-server/).

## The site

Built with [Eleventy](https://www.11ty.dev). `npx @11ty/eleventy --serve` to run it
locally; `_site/` is the build output, deployed to GitHub Pages.
