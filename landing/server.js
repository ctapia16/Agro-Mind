const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3003;
const host = "localhost";
const root = __dirname;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
};

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(request.url.split("?")[0]);
  const safePath = path.normalize(urlPath).replace(/^[/\\]+/, "").replace(/^(\.\.[/\\])+/, "");
  const requestedPath = path.join(root, safePath === "" ? "index.html" : safePath);

  if (!requestedPath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(requestedPath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(requestedPath)] || "application/octet-stream",
    });
    response.end(content);
  });
});

function checkExistingServer() {
  const request = http.get(`http://${host}:${port}`, (response) => {
    if (response.statusCode === 200) {
      console.log(`AgroMind landing is already running at http://${host}:${port}`);
      process.exit(0);
    }

    console.error(`Port ${port} is already in use by another service.`);
    process.exit(1);
  });

  request.on("error", () => {
    console.error(`Port ${port} is already in use. Close the other process and run npm run dev again.`);
    process.exit(1);
  });
}

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    checkExistingServer();
    return;
  }

  console.error(error.message);
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`AgroMind landing running at http://${host}:${port}`);
});

