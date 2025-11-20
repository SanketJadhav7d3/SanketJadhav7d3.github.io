module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css/");
  eleventyConfig.addPassthroughCopy("assets/");
  eleventyConfig.addPassthroughCopy("fonts/");



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
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
};