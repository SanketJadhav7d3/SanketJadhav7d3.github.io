# built by Cloud Run from the repo root: content is copied in alongside the server
FROM node:22-slim

WORKDIR /app

COPY mcp-server/package.json ./
RUN npm install --omit=dev

COPY mcp-server/*.js ./

# bake the portfolio content into the image
COPY projects/ ./content/projects/
COPY blogs/ ./content/blogs/
COPY _data/ ./content/_data/

ENV CONTENT_ROOT=/app/content
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
