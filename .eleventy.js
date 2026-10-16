
const TeXZilla = require("texzilla");


module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css/");
  eleventyConfig.addPassthroughCopy("assets/");

  eleventyConfig.addGlobalData("year", new Date().getFullYear());

  // First n items of a list: {{ collections.projects | head(6) }}
  eleventyConfig.addFilter("head", (items, n) => (items || []).slice(0, n));

  // "Aug 2026" — dates are parsed as UTC, so format them as UTC too.
  eleventyConfig.addFilter("monthYear", (date) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
  );

  // the MCP server is deployed separately; keep its README out of the site
  eleventyConfig.ignores.add("mcp-server/**");
  // Repo documentation, not a page — Eleventy would otherwise publish it
  // unstyled at /README/.
  eleventyConfig.ignores.add("README.md");


  eleventyConfig.addPassthroughCopy({
    "node_modules/katex/dist": "katex"
  });

  eleventyConfig.addCollection("experiences", function (collectionApi) {
    return collectionApi.getFilteredByTag("experience").sort(function (a, b) {
      const ad = new Date(a.data.start || a.date);
      const bd = new Date(b.data.start || b.date);
      return bd - ad;
    });
  });


  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByGlob("projects/*.md").sort(function (a, b) {
      return (b.date || 0) - (a.date || 0);
    });
  });

  eleventyConfig.addCollection("blogs", function (collectionApi) {
    return collectionApi.getFilteredByGlob("blogs/*.md").sort(function (a, b) {
      return (b.date || 0) - (a.date || 0);
    });
  });


  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
};
