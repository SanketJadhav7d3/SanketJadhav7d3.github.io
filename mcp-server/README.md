# portfolio MCP server

A minimal [MCP](https://modelcontextprotocol.io) server that exposes the portfolio content
(`projects/`, `blogs/`, `_data/`) as tools an LLM can call.




https://github.com/user-attachments/assets/3a66e056-301b-47bc-aec5-daa71b75bdb9



## tools

| tool | what it does |
| --- | --- |
| `list_projects` | every project + summary, tech, repo, url |
| `get_project` | full markdown write-up for one slug |
| `search_portfolio` | full-text search over projects and blogs |
| `get_profile` | experience, education, blog index |

Transport is **Streamable HTTP** at `POST /mcp`, stateless (a fresh server per request), so it
scales to zero on Cloud Run. `GET /health` reports the number of projects parsed, so a bad
deploy that ships an empty image is visible immediately rather than silently returning nothing.

Live at `https://portfolio-mcp-7980055254.europe-west1.run.app/mcp`.

## run locally

```bash
cd mcp-server
npm install
CONTENT_ROOT=.. npm start        # http://localhost:8080/mcp
```

On PowerShell the env var is set separately:

```powershell
cd mcp-server; npm install; $env:CONTENT_ROOT = ".."; npm start
```

Point Claude Code at it:

```bash
claude mcp add --transport http portfolio http://localhost:8080/mcp
```

## deploy to GCP (Cloud Run)

The `Dockerfile` lives at the **repo root** (not here) because `gcloud run deploy --source .`
only auto-detects a Dockerfile at the root of the source directory. It bakes the markdown
content into the image, **so a project added or edited since the last deploy is not visible to
the server until you redeploy.**

One-time setup:

```
gcloud projects create sanket-portfolio-mcp --name="Portfolio MCP"
gcloud billing projects link sanket-portfolio-mcp --billing-account=YOUR_BILLING_ID
gcloud config set project sanket-portfolio-mcp
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

Deploy, from the repo root:

```
gcloud run deploy portfolio-mcp --source . --region europe-west1 --allow-unauthenticated --set-env-vars ALLOWED_ORIGIN=https://sanketjadhav7d3.github.io
```

## wiring it to the website

The browser must **not** hold your Anthropic API key. Two options:

1. **Chat backend (recommended).** Add a second Cloud Run service that holds the key, calls the
   Claude Messages API with this server attached via the MCP connector, and exposes a `/chat`
   endpoint your page fetches. Only that endpoint is public.
2. **Bring-your-own-key.** The visitor pastes their own key into the widget; the page calls the
   API directly. Zero cost to you, high friction for visitors.

`ALLOWED_ORIGIN` controls CORS — set it to your site's origin once the widget is live.
