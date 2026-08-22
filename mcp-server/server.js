import express from "express";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { projects, blogs, experience, education, search } from "./content.js";

const text = (value) => ({
  content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }],
});

function buildServer() {
  const server = new McpServer({ name: "sanket-portfolio", version: "1.0.0" });

  server.registerTool(
    "list_projects",
    {
      title: "List projects",
      description: "List every project in Sanket Jadhav's portfolio with its summary, tech stack, repo and URL.",
      inputSchema: {},
    },
    async () => text(projects.map(({ body, ...rest }) => rest))
  );

  server.registerTool(
    "get_project",
    {
      title: "Get project",
      description: "Get the full write-up for one project by its slug (use list_projects to find slugs).",
      inputSchema: { slug: z.string().describe("Project slug, e.g. 'talktorepo'") },
    },
    async ({ slug }) => {
      const project = projects.find((p) => p.slug === slug);
      if (!project) return text(`No project named "${slug}". Known slugs: ${projects.map((p) => p.slug).join(", ")}`);
      return text(project);
    }
  );

  server.registerTool(
    "search_portfolio",
    {
      title: "Search portfolio",
      description: "Full-text search across project and blog content. Returns matching slugs and summaries.",
      inputSchema: { query: z.string().describe("Search terms, e.g. 'langgraph' or 'game'") },
    },
    async ({ query }) => text(search(query))
  );

  server.registerTool(
    "get_profile",
    {
      title: "Get profile",
      description: "Get Sanket Jadhav's work experience, education, and the titles of his blog posts.",
      inputSchema: {},
    },
    async () =>
      text({
        name: "Sanket Jadhav",
        site: "https://sanketjadhav7d3.github.io",
        experience,
        education,
        blogs: blogs.map(({ body, ...rest }) => rest),
      })
  );

  return server;
}

const app = express();
app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.set("Access-Control-Allow-Headers", "content-type, mcp-session-id, mcp-protocol-version, authorization");
  res.set("Access-Control-Expose-Headers", "mcp-session-id");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/health", (_req, res) => res.json({ ok: true, projects: projects.length }));

// stateless: a fresh server + transport per request, so Cloud Run can scale to zero
// and any instance can serve any request.
app.post("/mcp", async (req, res) => {
  const server = buildServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  res.on("close", () => {
    transport.close();
    server.close();
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

// stateless mode has no server->client stream to resume
app.get("/mcp", (_req, res) => res.status(405).json({ error: "Method not allowed" }));
app.delete("/mcp", (_req, res) => res.status(405).json({ error: "Method not allowed" }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`portfolio MCP listening on :${port} (${projects.length} projects)`));
