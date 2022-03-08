const express = require("express");
const proxy = require("express-http-proxy");
const { run, listen } = require("./util.js");
const ports = require("./ports.js");

(async function main() {
  console.log("Starting application…");
  run("npx", "node api1.js");
  run("npx", "node api2.js");
  
  const app = express();
  app.use(proxyWithFallthrough(ports.api1));
  app.use(proxyWithFallthrough(ports.api2));
  
  const { url } = await listen(app, ports.app);
  console.log(`Application listening at ${url}`);
  
})();

function proxyWithFallthrough(port) {
  return proxy(`localhost:${port}`, {
    skipToNextHandlerFilter(proxyRes) {
      return proxyRes.statusCode === 404;
    },
  });
}
